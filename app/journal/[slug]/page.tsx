import type { Metadata } from "next";
import { getEntry, JOURNAL } from "@/data/content";
import JournalDetail from "@/components/JournalDetail";

export function generateStaticParams() { return JOURNAL.map(j => ({ slug: j.slug })); }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const j = getEntry(params.slug);
  if (!j) return { title: "Not Found" };
  return { title: `${j.title} | Montaigne Design Journal`, description: j.excerpt, openGraph: { title: j.title, type: "article" } };
}
export default function Page() { return <JournalDetail />; }
