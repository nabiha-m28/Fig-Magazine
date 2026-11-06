
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterFeature from "@/components/FooterFeature";
import { navLinks } from "@/data/nav";
import { tiles } from "@/data/home";
import { designers } from "@/data/designers";

export default function FashionShowPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const count = designers.length;
    const designer = designers[activeIndex];

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
                        Fashion Show '26
                    </h1>

                    <div className="mt-0 border-t border-white/30" />
                </div>

                {/* Designers */}
                {designer ? (
                    <>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                                Meet the Designers
                            </h2>

                            <span className="text-sm tracking-[0.2em] text-white/70">
                                {String(activeIndex + 1).padStart(2, "0")}
                                {" / "}
                                {String(count).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
                            {/* Designer Photo */}
                            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden bg-white/5 lg:mx-0">
                                <Image
                                    key={designer.id}
                                    src={designer.image}
                                    alt={`Portrait of ${designer.name}`}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 320px, 100vw"
                                    priority={activeIndex === 0}
                                />
                            </div>

                            {/* Designer Information */}
                            <div className="flex flex-col items-center justify-center lg:items-start">

                                <h2 className="text-[clamp(1.75rem,3vw,3rem)] font-black uppercase leading-[1.05] tracking-[0.04em]">
                                    {designer.name}
                                </h2>

                                <div className="my-4 border-t border-white/30" />

                                <h3
                                    className="mb-4 text-lg italic md:text-xl"
                                    style={{
                                        fontFamily: 'Georgia, "Times New Roman", serif',
                                    }}
                                >
                                    {designer.collection}
                                </h3>

                                <p
                                    className="max-w-md whitespace-pre-line text-sm leading-relaxed text-white/85 md:text-base"
                                    style={{
                                        fontFamily: 'Georgia, "Times New Roman", serif',
                                    }}
                                >
                                    {designer.bio}
                                </p>

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

                        {/* Clickable Designer Directory */}
                        <div className="mt-20 border-t border-white/20 pt-8">
                            <h3 className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                All Designers
                            </h3>

                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-start">
                                {designers.map((item, index) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        aria-current={
                                            activeIndex === index ? "true" : undefined
                                        }
                                        className={`border-b pb-2 text-sm font-semibold uppercase tracking-[0.15em] transition ${activeIndex === index
                                            ? "border-white text-white"
                                            : "border-transparent text-white/40 hover:text-white"
                                            }`}
                                    >
                                        {item.name}
                                    </button>
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
