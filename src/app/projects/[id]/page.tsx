import { projectsData } from "@/data/projectsData";
import ProjectDetailView from "@/components/projects/ProjectDetailView";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) {
    return {
      title: "Project | Zaheer Khan",
    };
  }
  return {
    title: `${project.title} | Zaheer Khan`,
    description: project.description.replace(/\*\*/g, ""),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectDetailView id={id} />;
}
