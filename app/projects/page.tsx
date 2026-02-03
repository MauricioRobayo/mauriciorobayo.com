import { ProjectCard } from "@/app/components/ProjectCard";
import { ReactNode } from "react";

export interface Project {
  id: string;
  name: string;
  url?: string;
  description?: ReactNode;
  repoUrl?: string;
  isArchived?: boolean;
}

const projects: Project[] = [
  {
    id: "pyphoy",
    name: "PYPHOY",
    url: "https://www.pyphoy.com",
    description:
      "Top reference site for vehicle restrictions in Colombia, with over 2M page views/month, and near 800K active users/month.",
  },
  {
    id: "registronnit",
    name: "RegistroNIT",
    url: "https://www.registronit.com",
    description:
      "Large-scale platform that aggregates and normalizes business information from multiple public data sources, exposing over 9 million public company records in a structured and searchable interface.",
  },
  {
    id: "ciiu",
    name: "CIIU",
    description:
      "Reference platform for Colombia's CIIU economic activity codes, integrating data from public APIs and search-optimized content. Engineered for high performance, reliability, and SEO discoverability.",
    url: "https://www.ciiu.co",
  },
  {
    id: "codetyper",
    name: "CodeTyper",
    url: "https://codetyper-ashen.vercel.app/",
    repoUrl: "https://github.com/MauricioRobayo/codetyper",
    description: "Practice touch typing with your favorite code snippets.",
    isArchived: true,
  },
  {
    id: "Nextjs GA4",
    name: "Nextjs Google Analytics",
    repoUrl: "https://github.com/MauricioRobayo/nextjs-google-analytics",
    description: (
      <>
        The go-to Google Analytics package for Next.js for many years, before
        Next.js's built-in{" "}
        <a href="https://nextjs.org/docs/app/guides/third-party-libraries">
          Third Party Libraries
        </a>{" "}
        support was added.
      </>
    ),
    isArchived: true,
  },
];

export default async function Page() {
  return (
    <div>
      <div className="prose dark:prose-invert">
        <h1 className="text-center mb-8">Projects</h1>
      </div>
      <ul className="flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </ul>
    </div>
  );
}
