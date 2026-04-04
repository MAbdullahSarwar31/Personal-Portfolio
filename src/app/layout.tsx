import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageTransitions } from "@/components/layout/PageTransitions";

export const metadata: Metadata = {
  title: {
    default: "Muhammad Abdullah Sarwar — Full Stack Engineer & AI Specialist",
    template: "%s | Muhammad Abdullah Sarwar",
  },
  description:
    "Portfolio of Muhammad Abdullah Sarwar — Lead Full Stack Developer at Medquad Health Solutions. Expert in React, Next.js, Node.js, and AI integration (OpenAI). Based in Islamabad, Pakistan.",
  keywords: [
    "Muhammad Abdullah Sarwar",
    "Full Stack Developer",
    "AI Integration Specialist",
    "React Developer",
    "Next.js",
    "Node.js",
    "Islamabad",
    "Pakistan",
    "Medquad",
  ],
  authors: [{ name: "Muhammad Abdullah Sarwar" }],
  creator: "Muhammad Abdullah Sarwar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdullahsarwar.dev",
    title: "Muhammad Abdullah Sarwar — Full Stack Engineer & AI Specialist",
    description:
      "Building scalable products where great engineering meets intelligent AI. View projects, skills, and experience.",
    siteName: "Muhammad Abdullah Sarwar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Abdullah Sarwar — Full Stack Engineer & AI Specialist",
    description:
      "Building scalable products where great engineering meets intelligent AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://abdullahsarwar.dev/#person",
      "name": "Muhammad Abdullah Sarwar",
      "jobTitle": "Full Stack Engineer & AI Integration Specialist",
      "url": "https://abdullahsarwar.dev",
      "sameAs": [
        "https://github.com/yourusername",
        "https://linkedin.com/in/yourusername",
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Medquad Health Solutions",
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Bahria University Islamabad",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://abdullahsarwar.dev/#website",
      "url": "https://abdullahsarwar.dev",
      "name": "Muhammad Abdullah Sarwar Portfolio",
      "description":
        "Portfolio of Muhammad Abdullah Sarwar — Full Stack Engineer & AI Integration Specialist",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <ScrollProgress />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <PageTransitions>{children}</PageTransitions>
            </main>
            <Footer />
          </div>
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
