import { useBlogContext } from "../context/blog-context";
import NextHead from "next/head";

export function Head() {
  const {
    pageOpts,
    themeConfig: { siteName },
  } = useBlogContext();
  const pageTitle: string = pageOpts.frontMatter?.tittle || pageOpts.title;
  const title =
    pageOpts.route === "/" ? siteName : `${pageTitle} - ${siteName}`;

  return (
    <NextHead>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
    </NextHead>
  );
}
