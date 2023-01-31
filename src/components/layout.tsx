import Link from "next/link";
import type { MdxFile, NextraThemeLayoutProps, PageOpts } from "nextra";
import { BlogContextProvider } from "../context/blog-context";
import { getPageByType } from "../utils/get-pages-by-type";
import { PostDate } from "./post-date";
import { Footer } from "./footer";
import { Header, NavPage } from "./header";

export default function Layout({ pageOpts, children }: NextraThemeLayoutProps) {
  const posts = getPosts(pageOpts);
  const type = pageOpts.frontMatter?.type ?? "post";
  const navPages = getNavPages(pageOpts);
  const postsList = (
    <ol className="list-none pl-0">
      {posts.map((post) => {
        const dateString: string = post.frontMatter?.date ?? "";
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
      <div className="bg-slate-50 dark:bg-slate-800 min-h-screen">
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

function getNavPages(opts: PageOpts): NavPage[] {
  const navPages = getPageByType(opts.pageMap, ["page", "posts"]);
  return navPages.map(
    (navPage): NavPage => ({
      title: navPage.frontMatter?.title ?? "",
      route: navPage.route,
      isActive: opts.route === navPage.route,
    })
  );
}

function getPosts(opts: PageOpts): MdxFile[] {
  return getPageByType(opts.pageMap, ["post"]).sort(dateSort);
}

function dateSort(a: MdxFile, b: MdxFile) {
  return b.frontMatter?.date?.localeCompare(a.frontMatter?.date);
}
