import type { NextraThemeLayoutProps } from "nextra";
import { BlogContextProvider } from "../context/blog-context";

export default function Layout({ pageOpts }: NextraThemeLayoutProps) {
  return (
    <BlogContextProvider value={pageOpts}>
      <div className="h-screen">
        <h1>Mauricio Robayo</h1>
      </div>
    </BlogContextProvider>
  );
}
