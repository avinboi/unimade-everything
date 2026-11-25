import type { Metadata } from "next";
import { ProductPage } from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Product — Unimade",
  description: "Laundry, food, cleaning, storage, errands, internships and student deals.",
};

export default function Product() {
  return <ProductPage />;
}
