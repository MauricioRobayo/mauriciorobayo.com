import { LinkItem } from "@/context/blog-context";
import { ReactNode } from "react";

interface FooterProps {
  links?: LinkItem[];
  children: ReactNode;
}
export function Footer({ links, children }: FooterProps) {
  return (
    <>
      <footer className="flex flex-col items-center pb-16 text-center">
        {children}
        <div className="flex gap-4">
          {links?.map((link) => (
            <a key={link.url} href={link.url}>
              {link.name}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
