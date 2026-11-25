import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About — Unimade",
  description: "We were tired of figuring college life out ourselves. So we made Unimade.",
};

export default function About() {
  return <AboutPage />;
}
