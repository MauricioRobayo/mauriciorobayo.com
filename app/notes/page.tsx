import Link from "next/link";
import { getAllNotes } from "@/app/notes/utils";
import { cacheLife } from "next/cache";

export default async function Page() {
  "use cache";
  cacheLife("max");
  const allNotes = await getAllNotes("app/notes/(notes)");
  console.log("allNotes", allNotes);
  return (
    <ul className="flex flex-col gap-2">
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
