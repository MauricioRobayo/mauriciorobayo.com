import fs from "node:fs";
import path from "node:path";

export interface Note {
	slug: string;
	title: string;
}

export function getAllNotes(): Note[] {
	const notesDirectory = path.join(process.cwd(), "app/notes");
	const entries = fs.readdirSync(notesDirectory, { withFileTypes: true });

	const notes: Note[] = [];

	for (const entry of entries) {
		if (entry.isDirectory()) {
			const mdxPath = path.join(notesDirectory, entry.name, "page.mdx");

			if (fs.existsSync(mdxPath)) {
				const content = fs.readFileSync(mdxPath, "utf-8");
				const titleMatch = content.match(/^#\s+(.+)$/m);

				if (titleMatch) {
					notes.push({
						slug: entry.name,
						title: titleMatch[1].trim(),
					});
				}
			}
		}
	}

	return notes.reverse();
}
