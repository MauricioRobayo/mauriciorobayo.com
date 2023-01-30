import Link from "next/link";
import { PageOpts, MdxFile } from "nextra";
import { useBlogContext } from "../context/blog-context";
import { getPageByType } from "./utils/get-pages-by-type";

export function Header() {
  const pageOpts = useBlogContext();
  const navPages = getNavPages(pageOpts);
  return (
    <header className="mb-8">
      <div className="flex justify-between flex-col sm:flex-row items-baseline">
        <Link href="/" className="no-underline">
          <h2 className="prose-lg my-0 text-gray-400">Mauricio Robayo</h2>
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
  );
}

function getNavPages(opts: PageOpts): (MdxFile & { isActive: boolean })[] {
  const navPages = getPageByType(opts.pageMap, ["page", "posts"]);
  return navPages.map((navPage) => ({
    ...navPage,
    isActive: opts.route === navPage.route,
  }));
}
