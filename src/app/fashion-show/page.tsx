
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterFeature from "@/components/FooterFeature";
import { navLinks } from "@/data/nav";
import { tiles } from "@/data/home";
import { designers } from "@/data/designers";

export default function FashionShowPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [missingImages, setMissingImages] = useState<string[]>([]);

    const sortedDesigners = useMemo(() => {
        return [...designers].sort((a, b) => {
            const aMissing = missingImages.includes(a.id) ? 1 : 0;
            const bMissing = missingImages.includes(b.id) ? 1 : 0;

            return aMissing - bMissing;
        });
    }, [missingImages]);

    const count = sortedDesigners.length;
    const designer = sortedDesigners[activeIndex];

    const nextDesigner = () => {
        setActiveIndex((prev) => (prev + 1) % count);
    };

    const previousDesigner = () => {
        setActiveIndex((prev) => (prev - 1 + count) % count);
    };

    useEffect(() => {
        const timer = window.setTimeout(() => setIsVisible(true), 200);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (count === 0) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") {
                setActiveIndex((prev) => (prev + 1) % count);
            }

            if (event.key === "ArrowLeft") {
                setActiveIndex((prev) => (prev - 1 + count) % count);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [count]);

    useEffect(() => {
        let cancelled = false;

        const checkImages = async () => {
            const missing = await Promise.all(
                designers.map(async (designer) => {
                    try {
                        const response = await fetch(designer.image, {
                            method: "HEAD",
                        });

                        return response.ok ? null : designer.id;
                    } catch {
                        return designer.id;
                    }
                })
            );

            if (!cancelled) {
                setMissingImages(
                    missing.filter((id): id is string => id !== null)
                );
                setActiveIndex(0);
            }
        };

        checkImages();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="relative z-50">
                <Navbar links={navLinks} />
            </div>

            <section
                className={`mx-auto w-full max-w-7xl px-4 pb-20 pt-40 text-center transition-opacity duration-1000 md:px-12 md:pt-20 md:text-left ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
            >
                {/* Page Heading */}
                <div className="mb-4">

                    <h1 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-black uppercase tracking-[0.15em]">
                        A Mind's Eye
                    </h1>

                    <div className="mt-0 border-t border-white/30" />
                </div>

                {/* Designers */}
                {designer ? (
                    <>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-xl font-semibold uppercase tracking-[0.1em] text-white">
                                Meet the Designers
                            </h2>

                            <span className="text-sm tracking-[0.2em] text-white/70">
                                {String(activeIndex + 1).padStart(2, "0")}
                                {" / "}
                                {String(count).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="mx-auto grid w-fit max-w-full items-start gap-6 lg:grid-cols-[300px_700px] lg:gap-14">
                            {/* Designer Photo */}
                            <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden bg-white/5 lg:mx-0">
                                <Image
                                    key={designer.id}
                                    src={designer.image}
                                    alt={`Portrait of ${designer.name}`}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 320px, 100vw"
                                    priority={activeIndex === 0}
                                    onError={() => {
                                        setMissingImages((prev) =>
                                            prev.includes(designer.id)
                                                ? prev
                                                : [...prev, designer.id]
                                        );
                                    }}
                                />
                            </div>

                            {/* Designer Information */}
                            <div className="flex flex-col items-center justify-start lg:items-start">

                                <h2 className="mb-6 before:content-none after:content-none text-[clamp(1.75rem,3vw,3rem)] font-black uppercase leading-[1.05] tracking-[0.04em]">
                                    {designer.name}
                                </h2>
                                <p
                                    className="w-full whitespace-pre-line text-sm leading-relaxed text-white/85 md:text-base"
                                    style={{
                                        fontFamily: 'Georgia, "Times New Roman", serif',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: designer.bio }}
                                />

                                {designer.instagram && (
                                    <a
                                        href={`https://instagram.com/${designer.instagram.replace(/^@/, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 w-fit border-b border-white/50 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:text-white/60"
                                    >
                                        Instagram ↗
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Navigation Arrows - Centered Below */}
                        <div className="mt-2 flex items-center justify-center gap-8">
                            <button
                                type="button"
                                onClick={previousDesigner}
                                aria-label="Previous designer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-xl transition hover:bg-white hover:text-black"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                onClick={nextDesigner}
                                aria-label="Next designer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-xl transition hover:bg-white hover:text-black"
                            >
                                →
                            </button>
                        </div>

                        {/* Designer Collection Gallery */}
                        <div className="mt-12 border-t border-white/20 pt-8">
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                                    The Collection
                                </h3>

                            </div>

                            <div className="grid grid-cols-2 justify-items-start gap-4 md:grid-cols-4 md:gap-6">
                                {designer.looks.map((look, index) => (
                                    <div
                                        key={`${designer.id}-${index}`}
                                        className="relative aspect-[3/4] w-full max-w-[260px] overflow-hidden"
                                    >
                                        <Image
                                            src={look}
                                            alt={`${designer.name} - Look ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 220px, 50vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-white/60">
                        Designer profiles coming soon.
                    </p>
                )}
            </section>

            <FooterFeature tiles={tiles} />
        </main>
    );
}
