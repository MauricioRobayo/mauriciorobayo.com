import { PageMapItem, MdxFile } from "nextra";

export function getPageByType(
  pageMap: PageMapItem[],
  types: string[]
): MdxFile[] {
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
