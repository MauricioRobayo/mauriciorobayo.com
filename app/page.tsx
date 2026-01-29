import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center grid-rows-[1fr_auto] gap-4 h-svh px-4 sm:px-0 text-center">
      <div className="flex flex-col gap-4 align-center">
        <h1 className="uppercase text-2xl sm:text-4xl font-bold tracking-widest">
          Mauricio Robayo
        </h1>
        <nav className="flex gap-4 justify-center">
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
    </div>
  );
}
