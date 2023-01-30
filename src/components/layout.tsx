import Link from "next/link";
import type { NextraThemeLayoutProps } from "nextra";
import { BlogContextProvider } from "../context/blog-context";

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  return (
    <BlogContextProvider value={pageOpts}>
      <div className="h-screen">
        <h1>My Theme</h1>
        {pageOpts.pageMap.map((item) => {
          if (item.kind === "MdxPage") {
            return (
              <Link key={item.name} href={item.route}>
                {item.route}
              </Link>
            );
          }
          return null;
        })}
        <div>{children}</div>
      </div>
    </BlogContextProvider>
  );
}
