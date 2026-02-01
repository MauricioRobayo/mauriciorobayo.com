import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { Menu } from "@/app/components/Menu";

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
      <Menu size={size} />
    </div>
  );
}
