import { cacheLife } from "next/cache";
import Link from "next/link";
import { getAllNotes } from "@/app/notes/utils";

export default async function Page() {
  "use cache";
  cacheLife("max");
  const allNotes = await getAllNotes("app/notes/(notes)");
  return (
    <div>
      <div className="prose dark:prose-invert">
        <h1 className="text-center mb-8">Notes</h1>
      </div>
      <ul className="flex flex-col gap-4 text-gray-600 dark:text-gray-200">
        {allNotes.map((note) => {
          const date = new Date(note.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          return (
            <li key={note.slug} className="flex justify-between items-center">
              <Link href={`/notes/${note.slug}`}>{note.title}</Link>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {formattedDate}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
