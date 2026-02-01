import type { Project } from "@/app/projects/page";

export function ProjectCard({ project }: { project: Project }) {
  const { name, repoUrl, url, description } = project;
  return (
    <section className="w-96 m-auto text-center prose dark:prose-invert flex flex-col prose-headings:m-0 prose-p:m-0">
      <h4>{name}</h4>
      <div>
        {description && <p className="small text-balance">{description}</p>}
        {url && (
          <div>
            <a href={url}>Live Site</a>
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
