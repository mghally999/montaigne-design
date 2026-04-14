import type { Metadata } from "next";
import { getProject, PROJECTS } from "@/data/content";
import ProjectDetail from "@/components/ProjectDetail";

export function generateStaticParams() { return PROJECTS.map(p => ({ id: p.id })); }
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = getProject(params.id);
  if (!p) return { title: "Not Found" };
  return { title: `${p.title} | Montaigne Design`, description: p.tagline, openGraph: { title: p.title, images: [{ url: p.images[0] }] } };
}
export default function Page() { return <ProjectDetail />; }
