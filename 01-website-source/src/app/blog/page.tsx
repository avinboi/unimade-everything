import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";
import { pillars, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Unimade",
  description: "Hostel life tips, finding a PG, and saving money in college.",
};

export default function Blog() {
  return <BlogIndex posts={posts} pillars={pillars} />;
}
