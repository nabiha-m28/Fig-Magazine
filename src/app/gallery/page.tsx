import GalleryView from "./GalleryView";
import { getGalleryImages } from "@/lib/gallery";

export const revalidate = 60;

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();
  return <GalleryView galleryImages={galleryImages} />;
}