import { getAllNotes } from "@/app/notes/utils";
import Link from "next/link";

export default async function Page() {
  const allNotes = await getAllNotes();
  return (
    <ul>
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
