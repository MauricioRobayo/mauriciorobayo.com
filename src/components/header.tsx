import Link from "next/link";
import { MdxFile, PageOpts } from "nextra";
import { ReactNode } from "react";
import { getPageByType } from "../utils/get-pages-by-type";

export interface NavPage {
  title: string;
  route: string;
  isActive: boolean;
}
interface HeaderProps {
  navPages: NavPage[];
  children: ReactNode;
}
export function Header({ navPages, children }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex justify-between flex-col sm:flex-row items-baseline">
        {children}
        <nav>
          <ul className="flex gap-4 list-none p-0 m-0 text-gray-400">
            {navPages.map((page) => {
              const { title, route, isActive } = page;
              return (
                <li key={route} className="p-0 m-0">
                  {isActive ? (
                    <div className="">{title}</div>
                  ) : (
                    <Link href={route}>
                      <div>{title}</div>
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
