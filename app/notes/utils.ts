import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export interface Note {
  slug: string;
  title: string;
  date: string;
}

function extractDateFromFrontMatter(content: string): string | null {
  const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[1];
    const dateMatch = frontMatter.match(/^date:\s*(.+)$/m);
    if (dateMatch) {
      return dateMatch[1].trim();
    }
  }
  return null;
}

function getGitCommitDate(filePath: string): string {
  try {
    const date = execSync(
      `git log --diff-filter=A --format="%aI" -- "${filePath}"`,
      { encoding: "utf-8" },
    )
      .trim()
      .split("\n")[0];
    return date || new Date().toISOString();
  } catch (_error) {
    return new Date().toISOString();
  }
}

export async function getAllNotes(notesPath: string): Promise<Note[]> {
  const notesDirectory = path.join(process.cwd(), notesPath);
  const entries = await fs.promises.readdir(notesDirectory, {
    withFileTypes: true,
  });

  const notes: Note[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const mdxPath = path.join(notesDirectory, entry.name, "page.mdx");

      if (fs.existsSync(mdxPath)) {
        const content = await fs.promises.readFile(mdxPath, "utf-8");
        const titleMatch = content.match(/^#\s+(.+)$/m);

        if (titleMatch) {
          const frontMatterDate = extractDateFromFrontMatter(content);
          const date = frontMatterDate || getGitCommitDate(mdxPath);

          notes.push({
            slug: entry.name,
            title: titleMatch[1].trim(),
            date,
          });
        }
      }
    }
  }

  // Sort notes by date, most recent first
  return notes.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
