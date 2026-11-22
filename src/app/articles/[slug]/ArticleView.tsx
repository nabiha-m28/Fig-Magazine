"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterFeature from "@/components/FooterFeature";
import { navLinks } from "@/data/nav";
import { tiles } from "@/data/home";
import type { ArticleFull, Person } from "@/lib/articles";

const serif = { fontFamily: 'Georgia, "Times New Roman", serif' };

function People({ people }: { people: Person[] }) {
  return (
    <>
      {people.map((person, i) => (
        <span key={person.name}>
          {i > 0 && ", "}
          {person.url ? (
            <a
              href={person.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-white"
            >
              {person.name}
            </a>
          ) : (
            person.name
          )}
        </span>
      ))}
    </>
  );
}

export default function ArticleView({
  article,
  paragraphs,
}: {
  article: ArticleFull;
  paragraphs: string[];
}) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 100;

    // Swipe from left to right - go back
    if (distance > minSwipeDistance) {
      router.back();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <main
      className="min-h-screen bg-black text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative z-50">
        <Navbar links={navLinks} />
      </div>

      <button
        onClick={() => router.back()}
        className="hidden fixed left-6 top-1/2 z-40 -translate-y-1/2 md:flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
      >
        <span className="text-xl">←</span>
        <span>Back</span>
      </button>

      <section
        className={`mx-auto w-full max-w-5xl px-4 pb-20 pt-40 transition-opacity duration-1000 sm:px-6 lg:px-8 md:pt-24 md:pl-20 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {article.thumbnail && (
          <div className="mx-auto max-w-lg">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10 bg-white/5">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-[0.1em]">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mt-2 text-lg font-medium italic text-white md:text-xl" style={serif}>
              {article.subtitle}
            </p>
          )}
          <div className="mt-4 space-y-1 text-sm font-medium text-white/80" style={serif}>
            {article.writers.length > 0 && (
              <p>
                Writer: <People people={article.writers} />
              </p>
            )}
            {article.photographers.length > 0 && (
              <p>
                Photographer: <People people={article.photographers} />
              </p>
            )}
          </div>
        </div>

        <div
          className="article-content mt-8 space-y-6 text-base font-medium leading-relaxed text-white/95 md:text-lg"
          style={serif}
        >
          {paragraphs.map((html, index) => (
            <p
              key={index}
              className="[&_a]:underline [&_a]:decoration-white/50 hover:[&_a]:decoration-white"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}

          {article.sources.length > 0 && (
            <div className="mt-12 border-t border-white/20 pt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-white/70">
                Sources
              </h3>
              <ul className="space-y-2 text-sm text-white/60">
                {article.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition hover:text-white/80"
                    >
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <FooterFeature tiles={tiles} />
    </main>
  );
}