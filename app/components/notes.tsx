import { getNotes } from "app/utils";
import Link from "next/link";

export function Notes() {
  const allBlogs = getNotes();

  return (
    <div className="flex flex-col gap-4">
      {allBlogs
        .toSorted((a, b) => b.metadata.date.localeCompare(a.metadata.date))
        .map((post) => (
          <Link
            key={post.slug}
            className="w-full flex flex-col text-neutral-900 dark:text-neutral-100"
            href={`/${post.slug}`}
          >
            {post.metadata.title}
          </Link>
        ))}
    </div>
  );
}
