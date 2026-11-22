import { config } from "dotenv";
config({ path: ".env.local" });

import { Client } from "pg";
import { articles } from "../src/data/articles";
import { designers } from "../src/data/designers";

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing from .env.local");

  const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await db.connect();
  await db.query("BEGIN");
  try {
    for (const a of articles as any[]) {
      const res = await db.query(
        `UPDATE articles SET body = $1, sources = $2, coming_soon = $3 WHERE slug = $4`,
        [a.content, a.sources ?? [], !!a.comingSoon, a.id]
      );
      if (res.rowCount !== 1) throw new Error(`No article with slug "${a.id}"`);
    }

    await db.query("DELETE FROM designer_looks");
    await db.query("DELETE FROM designers");
    let lookCount = 0;
    for (let n = 0; n < designers.length; n++) {
      const d = designers[n];
      const { rows } = await db.query(
        `INSERT INTO designers (name, image_url, collection, bio, instagram, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [
          d.name,
          d.image,
          d.collection === "Collection Title" ? null : d.collection,
          d.bio,
          d.instagram || null,
          n,
        ]
      );
      for (let i = 0; i < d.looks.length; i++) {
        await db.query(
          `INSERT INTO designer_looks (designer_id, image_url, position) VALUES ($1, $2, $3)`,
          [rows[0].id, d.looks[i], i]
        );
        lookCount++;
      }
    }
    await db.query("COMMIT");
    console.log(`Updated ${articles.length} articles. Inserted ${designers.length} designers and ${lookCount} looks.`);
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  } finally {
    await db.end();
  }
}

main();