import ArticleDetail from "./ArticleDetail";
import { articles, getArticle } from "@/data/journal";

export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export function generateMetadata({ params }) {
  const a = getArticle(params.slug);
  if (!a) return { title: "Not Found" };
  return { title: `${a.title} | Montaigne Design Journal`, description: a.excerpt, openGraph: { title: a.title, description: a.excerpt, images: [a.hero] } };
}
export default function Page({ params }) { return <ArticleDetail slug={params.slug} />; }
