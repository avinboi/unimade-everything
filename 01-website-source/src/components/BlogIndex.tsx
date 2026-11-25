"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import type { Post } from "@/lib/posts";

export function BlogIndex({ posts, pillars }: { posts: Post[]; pillars: string[] }) {
  const [filter, setFilter] = useState("All");
  const tabs = ["All", ...pillars];
  const [featured, ...rest] = posts;
  const shown = filter === "All" ? rest : posts.filter((p) => p.pillar === filter);

  return (
    <div className="px-4 pb-16 pt-40 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="hand-label text-3xl text-violet-300">the unimade blog</p>
        <SplitReveal as="h1" immediate by="chars" className="mt-3 font-display text-6xl leading-[0.92] text-white sm:text-8xl">
          College life, written down.
        </SplitReveal>

        <AnimatePresence>
          {filter === "All" ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="mt-14"
            >
              <Link href={`/blog/${featured.slug}`} data-cursor="Read" className="group block">
                <SpotlightCard className="grid items-center overflow-hidden !rounded-[2rem] md:grid-cols-2">
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/blog/${featured.slug}.svg`}
                      alt=""
                      className="aspect-[16/10] w-full object-cover transition duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <span className="chip w-fit">✦ featured · {featured.pillar}</span>
                    <h2 className="mt-5 font-display text-3xl leading-tight text-white sm:text-4xl">{featured.title}</h2>
                    <p className="mt-4 text-zinc-400">{featured.description}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-violet-300 transition-all group-hover:gap-4 group-hover:text-white">
                      Read the post →
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="sticky top-24 z-20 mt-16 flex justify-center">
          <div className="glass flex gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors sm:px-5 ${filter === t ? "text-white" : "text-zinc-400 hover:text-white"}`}
              >
                {filter === t ? (
                  <motion.span layoutId="blog-tab" className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                ) : null}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/blog/${p.slug}`} data-cursor="Read" className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col !rounded-[1.5rem]" color={i % 2 ? "rgba(34,211,238,0.16)" : undefined}>
                    <div className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/blog/${p.slug}.svg`}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover opacity-90 transition duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:opacity-100"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="hand-label text-xl text-cyan-300">{p.pillar}</p>
                      <h3 className="mt-2 font-display text-xl leading-snug text-white">{p.title}</h3>
                      <p className="mt-3 flex-1 text-sm text-zinc-400">{p.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm text-violet-300 transition-all group-hover:gap-3 group-hover:text-white">
                        Read →
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
