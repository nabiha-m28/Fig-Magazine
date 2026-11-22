import { pool } from "./db";

export type Designer = {
  id: string;
  name: string;
  image: string;
  collection: string | null;
  bio: string;
  instagram: string;
  looks: string[];
};

export async function getDesigners(): Promise<Designer[]> {
  const { rows } = await pool.query(`
    SELECT
      d.id::text AS id,
      d.name,
      d.image_url AS image,
      d.collection,
      d.bio,
      COALESCE(d.instagram, '') AS instagram,
      COALESCE((
        SELECT json_agg(l.image_url ORDER BY l.position)
        FROM designer_looks l
        WHERE l.designer_id = d.id
      ), '[]'::json) AS looks
    FROM designers d
    ORDER BY d.sort_order
  `);
  return rows;
}