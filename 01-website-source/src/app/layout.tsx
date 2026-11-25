import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Dancing_Script, Outfit } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { ClickSpark } from "@/components/fx/ClickSpark";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const cursive = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Unimade — College life. Made easier.",
  description:
    "Laundry, food, cleaning, storage, errands, internships and student deals — one student-first platform.",
  icons: { icon: "/brand/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${display.variable} ${caveat.variable} ${cursive.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <div className="aurora" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        <ClickSpark />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
