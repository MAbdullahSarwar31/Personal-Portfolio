import { HeroSection }        from "@/components/home/HeroSection";
import { StatsSection }       from "@/components/home/StatsSection";
import { ProcessSection }     from "@/components/home/ProcessSection";
import { FeaturedProjects }   from "@/components/home/FeaturedProjects";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TechMarquee }        from "@/components/home/TechMarquee";
import { CTASection }         from "@/components/home/CTASection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Abdullah Sarwar — Full Stack Engineer & AI Specialist",
  description:
    "Portfolio of Muhammad Abdullah Sarwar — Lead Full Stack Developer at Medquad Health Solutions. Expert in React, Next.js, Node.js, and AI integration.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProcessSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <TechMarquee />
      <CTASection />
    </>
  );
}
