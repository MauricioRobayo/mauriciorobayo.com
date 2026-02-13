import fs from "node:fs";
import path from "node:path";

export interface Note {
  slug: string;
  title: string;
  date: string | null;
}

export async function getAllNotes(notesPath: string): Promise<Note[]> {
  const notesDirectory = path.join(process.cwd(), notesPath);
  const entries = await fs.promises.readdir(notesDirectory, {
    withFileTypes: true,
  });

  const notes: Array<Note & { dateTimestamp: number }> = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const mdxPath = path.join(notesDirectory, entry.name, "page.mdx");

      if (fs.existsSync(mdxPath)) {
        const content = await fs.promises.readFile(mdxPath, "utf-8");
        const frontMatterMatch = content.match(/^---\s*[\s\S]*?^---/m);
        const dateMatch = frontMatterMatch?.[0].match(
          /^date:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})\s*$/m,
        );
        const dateValue = dateMatch ? dateMatch[1] : null;
        const dateTimestamp = dateValue ? Date.parse(dateValue) : 0;
        const titleMatch = content.match(/^#\s+(.+)$/m);

        if (titleMatch) {
          notes.push({
            slug: entry.name,
            title: titleMatch[1].trim(),
            date: dateValue,
            dateTimestamp,
          });
        }
      }
    }
  }

  notes.sort((a, b) => b.dateTimestamp - a.dateTimestamp);
  return notes.map(({ dateTimestamp, ...note }) => note);
}
