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
    default: "Muhammad Abdullah Sarwar — Full Stack Developer & AI Integration Engineer",
    template: "%s | Muhammad Abdullah Sarwar",
  },
  description:
    "Portfolio of Muhammad Abdullah Sarwar — Full Stack Developer & AI Integration Engineer. Sole developer at Medquad Health Solutions, building production health-tech for hospitals across Pakistan. MERN stack, Flutter, AWS, OpenAI.",
  keywords: [
    "Muhammad Abdullah Sarwar",
    "Full Stack Developer",
    "AI Integration Engineer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "Node.js",
    "Flutter",
    "Islamabad",
    "Pakistan",
    "Medquad Health Solutions",
  ],
  authors: [{ name: "Muhammad Abdullah Sarwar" }],
  creator: "Muhammad Abdullah Sarwar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://m-abdullah-sarwar.vercel.app/",
    title: "Muhammad Abdullah Sarwar — Full Stack Developer & AI Integration Engineer",
    description:
      "Sole developer at Medquad Health Solutions — shipping production health-tech for hospitals across Pakistan. View projects, skills, and experience.",
    siteName: "Muhammad Abdullah Sarwar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Abdullah Sarwar — Full Stack Developer & AI Integration Engineer",
    description:
      "Sole developer at Medquad Health Solutions — shipping production health-tech for hospitals across Pakistan.",
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
      "@id": "https://m-abdullah-sarwar.vercel.app/#person",
      "name": "Muhammad Abdullah Sarwar",
      "jobTitle": "Full Stack Developer & AI Integration Engineer",
      "url": "https://m-abdullah-sarwar.vercel.app/",
      "email": "mabdullahsarwar3731@gmail.com",
      "sameAs": [
        "https://github.com/MAbdullahSarwar31",
        "https://www.linkedin.com/in/muhammad-abdullah-sarwar-b727682a8/",
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
      "@id": "https://m-abdullah-sarwar.vercel.app/#website",
      "url": "https://m-abdullah-sarwar.vercel.app/",
      "name": "Muhammad Abdullah Sarwar Portfolio",
      "description":
        "Portfolio of Muhammad Abdullah Sarwar — Full Stack Developer & AI Integration Engineer",
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
