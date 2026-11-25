import { Closer } from "@/components/home/Closer";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";

export function HomePage() {
  return (
    <div>
      <Hero />
      <Services />
      <Process />
      <Closer />
    </div>
  );
}
