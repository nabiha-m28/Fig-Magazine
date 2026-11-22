import ArticlesView from "./ArticlesView";
import { getPublishedArticles } from "@/lib/articles";

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();
  return <ArticlesView articles={articles} />;
}