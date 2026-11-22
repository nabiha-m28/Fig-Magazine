import { pool } from "./db";

export type Person = { name: string; url: string | null };

export type ArticleCard = {
  id: string;
  title: string;
  subtitle: string | null;
  thumbnail: string | null;
  href: string;
  comingSoon: boolean;
  writers: Person[];
  photographers: Person[];
};

export async function getPublishedArticles(): Promise<ArticleCard[]> {
  const { rows } = await pool.query(`
    SELECT
      a.slug AS id,
      a.title,
      a.subtitle,
      a.cover_url AS thumbnail,
      '/articles/' || a.slug AS href,
      a.coming_soon AS "comingSoon",
      COALESCE((
        SELECT json_agg(json_build_object('name', au.name, 'url', au.url) ORDER BY aa.position)
        FROM article_authors aa JOIN authors au ON au.id = aa.author_id
        WHERE aa.article_id = a.id
      ), '[]'::json) AS writers,
      COALESCE((
        SELECT json_agg(json_build_object('name', p.name, 'url', p.url) ORDER BY ap.position)
        FROM article_photographers ap JOIN photographers p ON p.id = ap.photographer_id
        WHERE ap.article_id = a.id
      ), '[]'::json) AS photographers
    FROM articles a
    WHERE a.status = 'published' OR a.coming_soon
    ORDER BY a.published_at DESC NULLS LAST, a.id
  `);
  return rows;
}

export type ArticleFull = ArticleCard & { body: string; sources: string[] };

export async function getArticleBySlug(slug: string): Promise<ArticleFull | null> {
  const { rows } = await pool.query(
    `SELECT
       a.slug AS id,
       a.title,
       a.subtitle,
       a.cover_url AS thumbnail,
       '/articles/' || a.slug AS href,
       a.coming_soon AS "comingSoon",
       COALESCE(a.body, '') AS body,
       a.sources,
       COALESCE((
         SELECT json_agg(json_build_object('name', au.name, 'url', au.url) ORDER BY aa.position)
         FROM article_authors aa JOIN authors au ON au.id = aa.author_id
         WHERE aa.article_id = a.id
       ), '[]'::json) AS writers,
       COALESCE((
         SELECT json_agg(json_build_object('name', p.name, 'url', p.url) ORDER BY ap.position)
         FROM article_photographers ap JOIN photographers p ON p.id = ap.photographer_id
         WHERE ap.article_id = a.id
       ), '[]'::json) AS photographers
     FROM articles a
     WHERE a.slug = $1 AND a.status = 'published'`,
    [slug]
  );
  return rows[0] ?? null;
}