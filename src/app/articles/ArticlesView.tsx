"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterFeature from "@/components/FooterFeature";
import { navLinks } from "@/data/nav";
import { tiles } from "@/data/home";
import type { ArticleCard, Person } from "@/lib/articles";

const serif = { fontFamily: 'Georgia, "Times New Roman", serif' };

function People({ people }: { people: Person[] }) {
  return (
    <>
      {people.map((person, i) => (
        <span key={person.name}>
          {i > 0 && ", "}
          {person.url ? (
            <span
              className="cursor-pointer underline transition hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(person.url as string, "_blank", "noopener,noreferrer");
              }}
            >
              {person.name}
            </span>
          ) : (
            person.name
          )}
        </span>
      ))}
    </>
  );
}

export default function ArticlesView({ articles }: { articles: ArticleCard[] }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative z-50">
        <Navbar links={navLinks} />
      </div>

      <section
        className={`mx-auto w-full max-w-7xl px-4 pb-20 pt-40 md:pt-24 transition-opacity duration-1000 sm:px-6 lg:px-8 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {articles.map((article) => {
            const content = (
              <>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10 bg-white/5 transition group-hover:border-white/30">
                  {article.thumbnail && (
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className={`object-cover transition duration-500 ${
                        article.comingSoon ? "" : "group-hover:scale-105"
                      }`}
                    />
                  )}
                  {article.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                <h2 className="mt-4 text-lg font-bold tracking-[0.08em] text-white transition group-hover:text-white/90">
                  {article.title}
                </h2>
                {article.subtitle && (
                  <p className="mt-1 text-sm font-medium italic text-white/95" style={serif}>
                    {article.subtitle}
                  </p>
                )}
                <div className="mt-2 space-y-1 text-sm font-medium text-white/80" style={serif}>
                  {article.writers.length > 0 && (
                    <p>Writer: <People people={article.writers} /></p>
                  )}
                  {article.photographers.length > 0 && (
                    <p>Photographer: <People people={article.photographers} /></p>
                  )}
                </div>
              </>
            );

            if (article.comingSoon) {
              return (
                <div key={article.id} className="group flex flex-col cursor-default">
                  {content}
                </div>
              );
            }

            return (
              <Link key={article.id} href={article.href} className="group flex flex-col">
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      <FooterFeature tiles={tiles} />
    </main>
  );
}