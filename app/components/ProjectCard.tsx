import type { Project } from "@/app/projects/page";

export function ProjectCard({ project }: { project: Project }) {
  const { name, repoUrl, url, description, isArchived } = project;
  return (
    <section className="m-auto text-center prose dark:prose-invert prose-headings:m-0 prose-p:m-0 flex flex-col gap-1">
      <h4 className="flex items-center justify-center gap-2">
        <span>{name}</span>
        {isArchived && (
          <span className="inline-flex items-center rounded-full border border-zinc-300/70 bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            Archived
          </span>
        )}
      </h4>
      {description && <p className="small text-balance">{description}</p>}
      <div className="flex gap-4 justify-center">
        {url && (
          <div>
            <a href={url}>{isArchived ? "Demo" : "Live Site"}</a>
          </div>
        )}
        {repoUrl && (
          <div>
            <a href={repoUrl}>Repository</a>
          </div>
        )}
      </div>
    </section>
  );
}
