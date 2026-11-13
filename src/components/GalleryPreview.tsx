
import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/data/gallery";

export default function GalleryPreview() {
  const previewImages = galleryImages.slice(0, 5);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold uppercase tracking-[0.05em]">
          Gallery
        </h2>

        <Link
          href="/gallery"
          className="cursor-pointer text-xs font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:text-white"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {previewImages.map((image, index) => (
          <Link
            key={`${image.src}-${index}`}
            href="/gallery"
            className="group relative aspect-square w-full cursor-pointer overflow-hidden border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/30"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
