import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "./ArticleView";
import { getArticleBySlug } from "@/lib/articles";
import { bodyToParagraphs } from "@/lib/sanitize";

export const revalidate = 60;

// cache() makes the metadata and the page share one database query per request
const getArticle = cache(getArticleBySlug);

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Fig Magazine`,
    description: article.subtitle ?? undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const paragraphs = bodyToParagraphs(article.body);
  return <ArticleView article={article} paragraphs={paragraphs} />;
}