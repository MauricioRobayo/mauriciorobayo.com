import { PageOpts } from "nextra";
import { createContext, ReactNode } from "react";

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
