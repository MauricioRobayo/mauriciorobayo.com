import type {
  MdxFile,
  NextraThemeLayoutProps,
  PageMapItem,
  PageOpts,
} from "nextra";
import { BlogContextProvider } from "../context/blog-context";
import Link from "next/link";

export default function Layout({ pageOpts, children }: NextraThemeLayoutProps) {
  const navPages = getNavPages(pageOpts);
  const posts = getPosts(pageOpts);
  const type = pageOpts.frontMatter?.type ?? "post";
  return (
    <BlogContextProvider value={pageOpts}>
      <div className="bg-gray-50 dark:bg-slate-800 min-h-screen">
        <main className="prose dark:prose-invert px-6 mx-auto">
          <article className="py-12">
            <header className="mb-8">
              <div className="flex justify-between flex-col sm:flex-row items-baseline">
                <Link href="/" className="no-underline">
                  <h2 className="prose-lg my-0 text-gray-400">
                    Mauricio Robayo
                  </h2>
                </Link>
                <nav>
                  <ul className="flex gap-4 list-none p-0 m-0 text-gray-400">
                    {navPages.map((page) => {
                      if (!page.frontMatter) {
                        return null;
                      }
                      const { frontMatter, route, isActive } = page;
                      return (
                        <li key={route} className="p-0 m-0">
                          {isActive ? (
                            <div className="">{frontMatter.title}</div>
                          ) : (
                            <Link href={route}>
                              <div>{frontMatter.title}</div>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </header>
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
          <hr />
          <footer className="flex flex-col items-center py-16 text-center">
            <small>
              <p>
                The successful warrior is the average man, with laser-like
                focus.
              </p>
            </small>
            <div className="flex gap-4">
              <a href="https://github.com/MauricioRobayo">GitHub</a>
              {" · "}
              <a href="https://linkedin.com/mauriciorobayo">LinkedIn</a>
            </div>
          </footer>
        </main>
      </div>
    </BlogContextProvider>
  );
}

function getPageByType(pageMap: PageMapItem[], types: string[]): MdxFile[] {
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

function traverse(
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

function dateSort(a: MdxFile, b: MdxFile) {
  return b.frontMatter?.date?.localeCompare(a.frontMatter?.date);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
function formatDate(date: Date | number) {
  return dateFormatter.format(date);
}
