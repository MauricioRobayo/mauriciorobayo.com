import { ProjectCard } from "@/app/components/ProjectCard";

export interface Project {
  id: string;
  name: string;
  url?: string;
  description?: string;
  repoUrl?: string;
  isArchived?: boolean;
}

const projects: Project[] = [
  {
    id: "pyphoy",
    name: "PYPHOY",
    url: "https://www.pyphoy.com",
    description:
      "Top reference site for vehicle restrictions in Colombia, with over 2M visitors per month.",
  },
  {
    id: "registronnit",
    name: "RegistroNIT",
    url: "https://www.registronit.com",
  },
  {
    id: "ciiu",
    name: "CIIU",
    url: "https://www.ciiu.co",
  },
  {
    id: "codetyper",
    name: "CodeTyper",
    url: "https://codetyper-ashen.vercel.app/",
    repoUrl: "https://github.com/MauricioRobayo/codetyper",
    isArchived: true,
  },
  {
    id: "Nextjs GA4",
    name: "Nextjs Google Analytics",
    repoUrl: "https://github.com/MauricioRobayo/nextjs-google-analytics",
    isArchived: true,
  },
];

export default async function Page() {
  return (
    <ul className="flex flex-col gap-8">
      {projects.map((project) => {
        return <ProjectCard key={project.name} project={project} />;
      })}
    </ul>
  );
}
