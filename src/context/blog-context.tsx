import { PageOpts } from "nextra";
import { createContext, ReactNode, useContext } from "react";

interface Link {
  url: string;
  name: string;
}

export interface ThemeConfig {
  siteName: string;
  tagLine: string;
  footerLinks: Link[];
}

interface BlogContextValue {
  pageOpts: PageOpts;
  themeConfig: ThemeConfig;
}

const BlogContext = createContext<BlogContextValue | null>(null);

interface BlogContextProviderProps {
  value: BlogContextValue;
  children: ReactNode;
}
export function BlogContextProvider({
  value,
  children,
}: BlogContextProviderProps) {
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlogContext() {
  const value = useContext(BlogContext);

  if (!value) {
    throw new Error("BlogContext should be used within a BlogContextProvider.");
  }

  return value;
}
