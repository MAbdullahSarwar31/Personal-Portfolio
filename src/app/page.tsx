import { HeroSection }        from "@/components/home/HeroSection";
import { StatsSection }       from "@/components/home/StatsSection";
import { ProcessSection }     from "@/components/home/ProcessSection";
import { FeaturedProjects }   from "@/components/home/FeaturedProjects";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TechMarquee }        from "@/components/home/TechMarquee";
import { CTASection }         from "@/components/home/CTASection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Abdullah Sarwar — Full Stack Developer & AI Integration Engineer",
  description:
    "Sole developer at Medquad Health Solutions — building production health-tech for hospitals across Pakistan. MERN stack, Flutter, AWS, OpenAI. Based in Islamabad.",
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
