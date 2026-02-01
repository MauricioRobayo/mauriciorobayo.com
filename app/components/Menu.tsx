"use client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

export function Menu({ size = "default" }: { size: "default" | "large" }) {
  const pathname = usePathname();
  return (
    <nav
      className={twJoin(
        "flex gap-4 justify-center",
        size === "large" ? "text-md" : "text-sm",
      )}
    >
      {pathname === "/projects" ? (
        <div className="font-bold text-gray-600 dark:text-gray-200">
          Projects
        </div>
      ) : (
        <Link href="/projects">Projects</Link>
      )}
      {pathname === "/notes" ? (
        <div className="font-bold text-gray-600 dark:text-gray-200">Notes</div>
      ) : (
        <Link href="/notes">Notes</Link>
      )}
      <a
        href="https://www.github.com/mauriciorobayo"
        className="flex gap-1 items-center"
        target="_blank"
        rel="noopener"
      >
        GitHub <ExternalLink size={12} />
      </a>
      <a
        href="https://www.linkedin.com/in/mauriciorobayo"
        className="flex gap-1 items-center"
        target="_blank"
        rel="noopener"
      >
        LinkedIn <ExternalLink size={12} />
      </a>
    </nav>
  );
}
