import fs from "node:fs";
import path from "node:path";

export interface Note {
  slug: string;
  title: string;
  date: string;
}

export async function getAllNotes(notesPath: string): Promise<Note[]> {
  const notesDirectory = path.join(process.cwd(), notesPath);
  const entries = await fs.promises.readdir(notesDirectory, {
    withFileTypes: true,
  });

  const notes: Array<Note> = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const { metadata } = await import(
        `@/app/notes/(notes)/${entry.name}/page.mdx`
      );
      notes.push({
        slug: entry.name,
        title: metadata.title,
        date: metadata.date,
      });
    }
  }

  return notes.toSorted((a, b) => b.date.localeCompare(a.date));
}
