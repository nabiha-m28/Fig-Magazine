
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

export default function LatestArticles() {
  // Exclude articles that haven't been published
  const latestArticles = articles
    .filter((article) => !("comingSoon" in article && article.comingSoon))
    .slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 text-white sm:px-6 lg:px-8">
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

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>

            <h3 className="mt-4 text-lg font-bold tracking-[0.08em] transition group-hover:text-white/80">
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
                className="mt-2 text-sm text-white/60"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Writer: {article.writer}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
