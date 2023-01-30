import type {
  MdxFile,
  NextraThemeLayoutProps,
  PageMapItem,
  PageOpts,
} from "nextra";
import { BlogContextProvider } from "../context/blog-context";
import Link from "next/link";

export default function Layout({ pageOpts }: NextraThemeLayoutProps) {
  const navPages = getNavPages(pageOpts);
  const posts = getPosts(pageOpts);
  const type = pageOpts.frontMatter?.type ?? "post";
  return (
    <BlogContextProvider value={pageOpts}>
      <div className="min-h-screen">
        <h2 className="text-base">Mauricio Robayo</h2>
        <nav>
          <ul className="flex gap-4">
            {navPages.map((page) => {
              if (!page.frontMatter) {
                return null;
              }
              const { frontMatter, route, isActive } = page;
              if (isActive) {
                return (
                  <li key={route} className="bg-red-300">
                    <div>{frontMatter.title}</div>
                  </li>
                );
              }
              return (
                <li key={route}>
                  <Link href={route}>
                    <div>{frontMatter.title}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <article className="prose lg:prose-lg mx-auto py-8 lg:py-12">
          <h1>{pageOpts.title}</h1>
          {type !== "post" ? (
            <ol>
              {posts.map((post) => (
                <li key={post.route}>
                  <Link href={post.route}>{post.frontMatter?.title}</Link>
                </li>
              ))}
            </ol>
          ) : (
            "Post content"
          )}
        </article>
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
  return getPageByType(opts.pageMap, ["post"]);
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
