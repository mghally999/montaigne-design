import ProjectDetail from "./ProjectDetail";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return { title: "Not Found" };
  return { title: `${p.title} | Montaigne Design`, description: p.description, openGraph: { title: p.title, description: p.description, images: [p.hero] } };
}
export default function Page({ params }) { return <ProjectDetail slug={params.slug} />; }
