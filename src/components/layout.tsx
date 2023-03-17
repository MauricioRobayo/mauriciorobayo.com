import Link from "next/link";
import type {
  Folder,
  MdxFile,
  MetaJsonFile,
  NextraThemeLayoutProps,
  PageMapItem,
  PageOpts,
} from "nextra";
import { BlogContextProvider } from "@/context/blog-context";
import { PostDate } from "@/components/post-date";
import { Footer } from "@/components/footer";
import { Header, NavPage } from "@/components/header";
import { Head } from "@/components/head";
import Balancer from "react-wrap-balancer";
import { useMemo } from "react";

export default function Layout({
  pageOpts,
  themeConfig,
  children,
}: NextraThemeLayoutProps) {
  const posts = getPosts(pageOpts);
  const navPages = getNavPages(pageOpts);
  const type = pageOpts.frontMatter?.type ?? "post";
  const isPost = type === "post";
  const isHome = pageOpts.route === "/";
  const postsNav = useMemo(() => {
    const currentPostIndex = posts.findIndex((post) =>
      isPost ? post.route === pageOpts.route : false
    );
    if (currentPostIndex === -1) {
      return null;
    }
    return {
      next:
        currentPostIndex >= posts.length ? null : posts[currentPostIndex + 1],
      prev: currentPostIndex <= 0 ? null : posts[currentPostIndex - 1],
    };
  }, [isPost, pageOpts.route, posts]);
  const postsList = (
    <ol className="list-none pl-0 flex flex-col gap-2">
      {posts.map((post) => {
        const dateString: string | undefined = post.frontMatter?.date;
        if (!dateString) {
          throw new Error(`Post ${post.name} is missing the date field.`);
        }
        return (
          <li
            key={post.route}
            className="p-0 m-0 mb-2 flex flex-col-reverse sm:flex-row sm:gap-2 sm:items-baseline"
          >
            <Link
              href={post.route}
              className="no-underline prose-lg truncate leading-tight font-normal"
            >
              {post.frontMatter?.title}
            </Link>
            <PostDate
              className="prose-sm text-gray-400 flex-shrink-0"
              date={new Date(dateString)}
            />
          </li>
        );
      })}
    </ol>
  );
  return (
    <BlogContextProvider value={{ pageOpts, themeConfig }}>
      <Head />
      <div className="bg-gray-50 dark:bg-slate-800 min-h-screen">
        <main className="prose prose-slate dark:prose-invert px-6 m-auto">
          <article className="pt-12">
            <Header navPages={navPages} className="mb-16">
              <Link href="/" className="no-underline">
                <h2 className="prose-lg my-0 text-gray-400 mb-2 sm:mb-0">
                  Mauricio Robayo
                </h2>
              </Link>
            </Header>
            {isPost && pageOpts.frontMatter?.date && (
              <PostDate
                className="prose-sm text-gray-400"
                date={new Date(pageOpts.frontMatter.date)}
              />
            )}
            {isHome ? null : (
              <h1 className={`${isPost ? "" : "hidden sm:block"} mt-1 mb-12`}>
                {pageOpts.title}
              </h1>
            )}
            {type === "posts" ? (
              postsList
            ) : (
              <div className={isHome ? "my-32" : ""}>
                {children}
                {postsNav && (
                  <div
                    className={`flex text-sm ${
                      postsNav.prev ? "justify-between" : "justify-end"
                    } mt-16`}
                  >
                    {postsNav.prev && (
                      <Link
                        href={postsNav.prev.route}
                        className="no-underline text-slate-400"
                      >
                        &larr; prev
                      </Link>
                    )}
                    {postsNav.next && (
                      <Link
                        href={postsNav.next.route}
                        className="no-underline text-slate-400"
                      >
                        next &rarr;
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </article>
          {isHome ? null : <hr />}
          <Footer links={themeConfig.footerLinks}>
            {isHome ? null : (
              <p className="pb-8">
                <small>
                  <Balancer>{themeConfig.tagLine}</Balancer>
                </small>
              </p>
            )}
          </Footer>
        </main>
      </div>
    </BlogContextProvider>
  );
}

function getNavPages(pageOpts: PageOpts): NavPage[] {
  const metaPage = pageOpts.pageMap.find(
    (page): page is MetaJsonFile => page.kind === "Meta"
  );
  if (metaPage) {
    return getNavPagesByMeta(pageOpts, metaPage);
  }

  const navPages = getPageByType(pageOpts.pageMap, ["page", "posts"]);
  return navPages.map(
    (navPage): NavPage => ({
      title: navPage.frontMatter?.title ?? navPage.name,
      route: navPage.route,
      isActive: pageOpts.route === navPage.route,
    })
  );
}

function getNavPagesByMeta(
  pageOpts: PageOpts,
  metaPage: MetaJsonFile
): NavPage[] {
  const result: NavPage[] = [];
  for (const [name, meta] of Object.entries(metaPage.data)) {
    const navPage = pageOpts.pageMap.find(
      (page): page is MdxFile | Folder => isNavPage(page) && page.name === name
    );
    if (navPage) {
      const metaTitle: string | undefined =
        typeof meta === "string" ? meta : meta.title;
      const pageTitle: string =
        (navPage.kind === "MdxPage" && navPage.frontMatter?.title) ??
        navPage.name;
      result.push({
        title: metaTitle ?? pageTitle,
        route: navPage.route,
        isActive: pageOpts.route === navPage.route,
      });
    }
  }
  return result;
}

function isNavPage(page: PageMapItem): page is MdxFile | Folder {
  return ["MdxPage", "Folder"].includes(page.kind);
}

function getPosts(opts: PageOpts): MdxFile[] {
  return getPageByType(opts.pageMap, ["post"]).sort(dateSort);
}

function dateSort(a: MdxFile, b: MdxFile) {
  return b.frontMatter?.date?.localeCompare(a.frontMatter?.date);
}

export function getPageByType(
  pageMap: PageMapItem[],
  types: string[]
): MdxFile[] {
  const mdxFiles: MdxFile[] = [];
  traverse(pageMap, (page) => {
    if (page.kind === "MdxPage") {
      const type: string = page.frontMatter?.type ?? "post";
      if (types.includes(type)) {
        mdxFiles.push(page);
      }
    }
  });
  return mdxFiles;
}

export function traverse(
  pageMap: PageMapItem[],
  callback: (page: PageMapItem) => void
) {
  for (const page of pageMap) {
    if (page.kind === "Folder") {
      traverse(page.children, callback);
    } else {
      callback(page);
    }
  }
}
