
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";
import { galleryImages } from "@/data/gallery";

export default function ArticlesGalleryPreview() {
    const latestArticles = articles
        .filter((article) => !("comingSoon" in article && article.comingSoon))
        .slice(0, 2);

    const previewImages = galleryImages.slice(0, 9);

    return (
        <section className="w-full bg-[#301827] text-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">

                    {/* LEFT: Latest Articles */}
                    <div>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold uppercase tracking-[0.05em]">
                                Latest Articles
                            </h2>

                            <Link
                                href="/articles"
                                className="cursor-pointer text-xs font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:text-white"
                            >
                                View All →
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {latestArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={article.href}
                                    className="group flex cursor-pointer flex-col"
                                >
                                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10 bg-white/5">
                                        <Image
                                            src={article.thumbnail}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                            sizes="(min-width: 768px) 25vw, 50vw"
                                        />
                                    </div>

                                    <h3 className="mt-4 text-base font-bold tracking-[0.05em] transition group-hover:text-white/80">
                                        {article.title}
                                    </h3>

                                    {article.subtitle && (
                                        <p
                                            className="mt-1 text-sm italic text-white/80"
                                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                                        >
                                            {article.subtitle}
                                        </p>
                                    )}
                                    {article.writer && (
                                        <p
                                            className="mt-2 text-sm font-medium text-white/80"
                                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                                        >
                                            Writer: {article.writer}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Gallery Preview */}
                    <div>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold uppercase tracking-[0.05em]">
                                Gallery
                            </h2>

                            <Link
                                href="/gallery"
                                className="cursor-pointer text-xs font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:text-white"
                            >
                                View Gallery →
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {previewImages.map((image, index) => (
                                <div
                                    key={`${image.src}-${index}`}
                                    className="relative aspect-square w-full overflow-hidden border border-white/10 bg-white/5"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 25vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
