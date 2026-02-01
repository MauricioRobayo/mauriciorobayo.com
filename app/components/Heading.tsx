import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

export default function Heading({
  size = "default",
}: {
  size?: "large" | "default";
}) {
  return (
    <div
      className={twJoin(
        "flex flex-col align-center text-center",
        size === "large" ? "gap-4" : "gap-2",
      )}
    >
      <h1
        className={twJoin(
          "uppercase font-bold tracking-widest",
          size === "large" ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl",
        )}
      >
        <Link href="/">Mauricio Robayo</Link>
      </h1>
      <nav
        className={twJoin(
          "flex gap-4 justify-center",
          size === "large" ? "text-md" : "text-sm",
        )}
      >
        <Link href="/projects">Projects</Link>
        <Link href="/notes">Notes</Link>
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
    </div>
  );
}
