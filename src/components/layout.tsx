import type { MdxFile, NextraThemeLayoutProps, PageOpts } from "nextra";
import { BlogContextProvider } from "../context/blog-context";
import Link from "next/link";
import { Footer } from "./footer";
import { getPageByType } from "./utils/get-pages-by-type";
import { Header } from "./header";

export default function Layout({ pageOpts, children }: NextraThemeLayoutProps) {
  const posts = getPosts(pageOpts);
  const type = pageOpts.frontMatter?.type ?? "post";
  return (
    <BlogContextProvider value={pageOpts}>
      <div className="bg-gray-50 dark:bg-slate-800 min-h-screen">
        <main className="prose prose-slate dark:prose-invert px-6 mx-auto">
          <article className="py-12">
            <Header />
            {type === "post" && pageOpts.frontMatter?.date && (
              <time
                className="prose-sm text-gray-400"
                dateTime={new Date(pageOpts.frontMatter?.date).toISOString()}
              >
                {formatDate(new Date(pageOpts.frontMatter.date))}
              </time>
            )}
            <h1 className="mt-1 mb-12">{pageOpts.title}</h1>
            {type === "posts" ? (
              <ol className="list-none pl-0">
                {posts.map((post) => (
                  <li key={post.route} className="p-0 m-0 prose-lg truncate">
                    <Link href={post.route} className="no-underline">
                      {post.frontMatter?.title}
                    </Link>
                  </li>
                ))}
              </ol>
            ) : (
              children
            )}
          </article>
          <Footer />
        </main>
      </div>
    </BlogContextProvider>
  );
}

function getNavPages(opts: PageOpts): (MdxFile & { isActive: boolean })[] {
  const navPages = getPageByType(opts.pageMap, ["page", "posts"]);
  return navPages.map((navPage) => ({
    ...navPage,
    isActive: opts.route === navPage.route,
  }));
}

function getPosts(opts: PageOpts): MdxFile[] {
  return getPageByType(opts.pageMap, ["post"]).sort(dateSort);
}

function dateSort(a: MdxFile, b: MdxFile) {
  return b.frontMatter?.date?.localeCompare(a.frontMatter?.date);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
function formatDate(date: Date | number) {
  return dateFormatter.format(date);
}
