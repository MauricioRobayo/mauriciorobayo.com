import Link from "next/link";
import type {
  MdxFile,
  MetaJsonFile,
  NextraThemeLayoutProps,
  PageMapItem,
  PageOpts,
} from "nextra";
import { BlogContextProvider } from "../context/blog-context";
import { PostDate } from "./post-date";
import { Footer } from "./footer";
import { Header, NavPage } from "./header";

export default function Layout({ pageOpts, children }: NextraThemeLayoutProps) {
  const posts = getPosts(pageOpts);
  const navPages = getNavPages(pageOpts);
  const type = pageOpts.frontMatter?.type ?? "post";
  const postsList = (
    <ol className="list-none pl-0">
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
            <Link href={post.route} className="no-underline prose-lg truncate">
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
    <BlogContextProvider value={pageOpts}>
      <div className="bg-gray-50 dark:bg-slate-800 min-h-screen">
        <main className="prose prose-slate dark:prose-invert px-6 mx-auto">
          <article className="py-12">
            <Header navPages={navPages}>
              <Link href="/" className="no-underline">
                <h2 className="prose-lg my-0 text-gray-400">Mauricio Robayo</h2>
              </Link>
            </Header>
            {type === "post" && pageOpts.frontMatter?.date && (
              <PostDate
                className="prose-sm text-gray-400"
                date={new Date(pageOpts.frontMatter.date)}
              />
            )}
            <h1 className="mt-1 mb-12">{pageOpts.title}</h1>
            {type === "posts" ? postsList : children}
          </article>
          <Footer />
        </main>
      </div>
    </BlogContextProvider>
  );
}

function getNavPages(pageOpts: PageOpts): NavPage[] {
  const metaPage = pageOpts.pageMap.find(
    (page): page is MetaJsonFile => page.kind === "Meta"
  );
  console.log("route ========== ", pageOpts.route);
  if (metaPage) {
    const navPages = getNavPagesByMeta(pageOpts, metaPage);
    console.assert(
      navPages.length === 3,
      JSON.stringify(navPages, null, 2),
      JSON.stringify(metaPage, null, 2)
    );
    return navPages;
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
  const navPages = getPageByType(pageOpts.pageMap, ["page", "posts"]);
  for (const [name, meta] of Object.entries(metaPage.data)) {
    const navPage = navPages.find((p) => p.name === name);
    if (navPage) {
      const title: string =
        typeof meta === "string"
          ? meta
          : meta.title ?? navPage.frontMatter?.title ?? navPage.name;
      result.push({
        title,
        route: navPage.route,
        isActive: pageOpts.route === navPage.route,
      });
    }
  }
  return result;
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
  const mdxFile: MdxFile[] = [];
  traverse(pageMap, (page) => {
    if (page.kind === "MdxPage") {
      const type: string = page.frontMatter?.type ?? "post";
      if (types.includes(type)) {
        mdxFile.push(page);
      }
    }
  });
  return mdxFile;
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
