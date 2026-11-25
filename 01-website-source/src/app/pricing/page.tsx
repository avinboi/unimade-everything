import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Pricing — Unimade",
  description: "Student and partner pricing is coming. Join the waitlist.",
};

export default function Pricing() {
  return <PricingPage />;
}
