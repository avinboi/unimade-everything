import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/fx/Reveal";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { ReadingProgress } from "@/components/ReadingProgress";
import { posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: `${post.title} — Unimade`, description: post.description } : {};
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.pillar === post.pillar && p.slug !== slug);

  return (
    <div className="px-4 pb-16 pt-36 sm:px-6">
      <ReadingProgress />
      <Reveal>
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="chip transition hover:border-violet-400/60 hover:text-white">
            &larr; All posts
          </Link>
          <p className="hand-label mt-8 text-3xl text-violet-300">{post.pillar}</p>
          <SplitReveal as="h1" immediate by="words" className="mt-3 font-display text-4xl leading-[1] text-white sm:text-6xl">
            {post.title}
          </SplitReveal>
          <p data-reveal className="mt-6 text-xl text-zinc-400">
            {post.description}
          </p>
          <figure data-reveal className="mt-12 overflow-hidden rounded-[2rem] border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/blog/${post.slug}.svg`} alt={post.title} className="aspect-[16/10] w-full object-cover" />
          </figure>
          <div className="prose-um mt-14 space-y-10 text-lg leading-relaxed">
            {post.sections.map((s, i) => (
              <section key={i} data-reveal className="space-y-3">
                {s.heading && (
                  <h2 className="flex items-start gap-4 font-display text-3xl text-white">
                    <span className="mt-2 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-violet-500 to-cyan-300" />
                    {s.heading}
                  </h2>
                )}
                <p>{s.body}</p>
              </section>
            ))}
          </div>
        </article>

        <nav className="mx-auto mt-24 max-w-5xl">
          <p data-reveal className="hand-label text-3xl text-violet-300">
            keep reading
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {others.slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                data-reveal
                data-cursor="Read"
                className="group glass flex items-center gap-5 overflow-hidden rounded-2xl p-3 transition hover:border-violet-400/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/blog/${p.slug}.svg`} alt="" loading="lazy" className="aspect-square w-24 shrink-0 rounded-xl object-cover transition duration-700 group-hover:scale-110" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">{p.pillar}</p>
                  <p className="mt-1 font-display text-lg leading-snug text-white transition group-hover:text-violet-200">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </Reveal>
    </div>
  );
}
