import { ReactNode } from "react";

interface FooterProps {
  links?: { url: string; name: string }[];
  children: ReactNode;
}
export function Footer({ links, children }: FooterProps) {
  const footerLinks = [
    { url: "https://github.com/MauricioRobayo", name: "GitHub" },
    {
      url: "https://linkedin.com/in/mauriciorobayo",
      name: "LinkedIn",
    },
  ];
  return (
    <>
      <hr />
      <footer className="flex flex-col items-center py-16 text-center">
        {children}
        <div className="flex gap-4">
          {footerLinks.map((link) => (
            <a key={link.url} href={link.url}>
              {link.name}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
