import { Page, PageOpts } from "nextra";
import { createContext, useContext, ReactNode } from "react";

interface ThemeConfig {
  siteName: string;
}

interface BlogContext {
  pageOpts: PageOpts;
  themeConfig: ThemeConfig;
}

const BlogContext = createContext<BlogContext | null>(null);

interface BlogContextProviderProps {
  value: BlogContext;
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
