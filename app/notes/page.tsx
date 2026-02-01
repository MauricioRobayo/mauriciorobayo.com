import { cacheLife } from "next/cache";
import Link from "next/link";
import { getAllNotes } from "@/app/notes/utils";

export default async function Page() {
  "use cache";
  cacheLife("max");
  const allNotes = await getAllNotes("app/notes/(notes)");
  return (
    <ul className="flex flex-col gap-4 text-gray-600 dark:text-gray-200">
      {allNotes.map((note) => {
        return (
          <li key={note.slug}>
            <Link href={`/notes/${note.slug}`}>{note.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
