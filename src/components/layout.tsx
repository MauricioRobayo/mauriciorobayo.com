import type { MdxFile, NextraThemeLayoutProps, PageMapItem } from "nextra";
import { BlogContextProvider } from "../context/blog-context";
import Link from "next/link";

export default function Layout({ pageOpts }: NextraThemeLayoutProps) {
  const pages = getPages(pageOpts.pageMap);
  const posts = getPosts(pageOpts.pageMap);
  console.log(posts);
  return (
    <BlogContextProvider value={pageOpts}>
      <div className="min-h-screen">
        <h2 className="text-base">Mauricio Robayo</h2>
        <nav>
          <ul className="flex gap-4">
            {pages.map((page) => {
              if (!page.frontMatter) {
                return null;
              }
              const { frontMatter, route } = page;
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
          <ol>
            {posts.map((post) => (
              <li key={post.route}>
                <Link href={post.route}>{post.frontMatter?.title}</Link>
              </li>
            ))}
          </ol>
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

function getPages(pageMap: PageMapItem[]): MdxFile[] {
  return getPageByType(pageMap, ["page"]);
}

function getPosts(pageMap: PageMapItem[]): MdxFile[] {
  return getPageByType(pageMap, ["post"]);
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
