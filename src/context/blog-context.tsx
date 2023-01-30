import { PageOpts } from "nextra";
import { createContext, useContext, ReactNode } from "react";

const BlogContext = createContext<PageOpts | null>(null);

interface BlogContextProviderProps {
  value: PageOpts;
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
