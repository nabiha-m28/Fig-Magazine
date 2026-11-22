import { pool } from "./db";

export type GalleryImage = { src: string; alt: string };

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { rows } = await pool.query(
    `SELECT image_url AS src, COALESCE(alt_text, '') AS alt
     FROM gallery_images
     ORDER BY sort_order`
  );
  return rows;
}