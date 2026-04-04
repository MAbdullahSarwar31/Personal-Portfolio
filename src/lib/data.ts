export const siteConfig = {
  name: "Muhammad Abdullah Sarwar",
  shortName: "Abdullah Sarwar",
  role: "Full Stack Engineer & AI Integration Specialist",
  tagline: "Building scalable products where great engineering meets intelligent AI.",
  location: "Islamabad, Pakistan",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  website: "https://abdullahsarwar.dev",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/profile.jpg",
  availableForWork: true,
};

export const stats = [
  { label: "Years Experience",    value: "2+",  suffix: "" },
  { label: "Students Impacted",   value: "200", suffix: "+" },
  { label: "Technologies",        value: "15",  suffix: "+" },
  { label: "Top Project Rank",    value: "#2",  suffix: "/50" },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: "web" | "mobile" | "ai" | "fullstack";
  metrics: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "live" | "in-progress" | "completed";
}

export const projects: Project[] = [
  {
    id: "medquad-website",
    title: "Medquad Health Solutions",
    subtitle: "Public Website & WhatsApp Integration",
    description:
      "Built the public-facing website for Medquad Health Solutions with WhatsApp Business API integration to enable seamless customer communication.",
    longDescription:
      "Designed and developed the complete public website for Medquad Health Solutions from the ground up. Integrated WhatsApp Business API to enable automated and manual customer messaging workflows. Focused on performance, SEO, and a professional medical-industry aesthetic.",
    image: "/projects/medquad-website.png",
    tags: ["React", "Next.js", "Node.js", "WhatsApp API", "Tailwind CSS"],
    category: "fullstack",
    metrics: ["Live production site", "WhatsApp Business API integration", "SEO optimised"],
    liveUrl: "https://medquad.com",
    featured: true,
    status: "live",
  },
  {
    id: "medquad-portal",
    title: "Medquad Internal Portal",
    subtitle: "Full Stack Internal Management System",
    description:
      "Developed a secure internal portal for Medquad's team to manage operations, client data, and workflows — improving operational efficiency significantly.",
    longDescription:
      "Built a comprehensive internal management system used daily by the entire Medquad team. Features include role-based access control, client management, analytics dashboards, and integration with the WhatsApp messaging pipeline.",
    image: "/projects/medquad-portal.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST API"],
    category: "fullstack",
    metrics: ["Used by entire team daily", "Role-based access control", "Integrated analytics"],
    featured: true,
    status: "live",
  },
  {
    id: "ai-chatbot",
    title: "AI Customer Support Chatbot",
    subtitle: "OpenAI-Powered Automated Reply System",
    description:
      "Currently developing an intelligent chatbot for Medquad that automatically handles customer queries using OpenAI's API, reducing response time dramatically.",
    longDescription:
      "Architecting and building an AI-powered chatbot assistant that integrates with the Medquad WhatsApp channel and website. Uses OpenAI's GPT models to understand context, answer FAQs, and hand off to human agents when needed.",
    image: "/projects/ai-chatbot.png",
    tags: ["OpenAI API", "Node.js", "React", "WebSocket", "NLP"],
    category: "ai",
    metrics: ["Automated query handling", "OpenAI GPT integration", "WhatsApp + Web channels"],
    featured: true,
    status: "in-progress",
  },
  {
    id: "fyp-management",
    title: "FYP Management System",
    subtitle: "React Native Mobile App — Ranked 2nd / 50",
    description:
      "Cross-platform mobile application that automated the entire Final Year Project workflow for 200+ students and 10 faculty members at Bahria University.",
    longDescription:
      "Led the design and development of a React Native mobile application that fully digitised and automated the manual FYP management process at Bahria University Islamabad. The app handles project submissions, supervisor assignments, evaluation scheduling, grading, and progress tracking — eliminating paperwork and manual coordination for hundreds of users.",
    image: "/projects/fyp-app.png",
    tags: ["React Native", "Node.js", "MongoDB", "Express", "Firebase"],
    category: "mobile",
    metrics: ["200+ students served", "10 faculty members", "Ranked 2nd out of 50 projects"],
    featured: false,
    status: "completed",
  },
  {
    id: "portfolio",
    title: "AI-Powered Portfolio",
    subtitle: "This Site — Next.js + OpenAI Chatbot",
    description:
      "This portfolio itself — built with Next.js, TypeScript, Framer Motion, and featuring an embedded AI chatbot that can answer questions about my experience.",
    longDescription:
      "Designed and developed this portfolio to demonstrate both engineering execution quality and AI integration capability. Features an embedded AI chatbot widget powered by OpenAI that can answer any visitor questions about my background, projects, and skills in real time.",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "TypeScript", "Framer Motion", "OpenAI", "Tailwind CSS", "Vercel"],
    category: "ai",
    metrics: ["AI chatbot built-in", "Dark/light mode", "Deployed on Vercel"],
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: false,
    status: "live",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export interface Skill {
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "mobile" | "devops" | "ai" | "database";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React",        level: 92, category: "frontend" },
  { name: "Next.js",      level: 90, category: "frontend" },
  { name: "TypeScript",   level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "Framer Motion",level: 80, category: "frontend" },
  // Backend
  { name: "Node.js",      level: 88, category: "backend" },
  { name: "Express.js",   level: 88, category: "backend" },
  { name: "REST APIs",    level: 90, category: "backend" },
  // Mobile
  { name: "React Native", level: 82, category: "mobile" },
  // Databases
  { name: "MongoDB",      level: 85, category: "database" },
  { name: "PostgreSQL",   level: 78, category: "database" },
  // DevOps
  { name: "Git & GitHub", level: 90, category: "devops" },
  { name: "Docker",       level: 72, category: "devops" },
  { name: "AWS (basics)", level: 65, category: "devops" },
  { name: "Vercel",       level: 90, category: "devops" },
  // AI
  { name: "OpenAI API",   level: 85, category: "ai" },
  { name: "AI Integration",level: 82, category: "ai" },
  { name: "Prompt Engineering", level: 80, category: "ai" },
];

export const skillCategories = [
  { key: "frontend",  label: "Frontend",    color: "#3b82f6" },
  { key: "backend",   label: "Backend",     color: "#10b981" },
  { key: "mobile",    label: "Mobile",      color: "#f59e0b" },
  { key: "database",  label: "Database",    color: "#ef4444" },
  { key: "devops",    label: "DevOps",      color: "#8b5cf6" },
  { key: "ai",        label: "AI & ML",     color: "#06b6d4" },
];

export const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "React Native",
  "MongoDB", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Docker",
  "AWS", "Git", "Vercel", "OpenAI", "REST API", "JWT", "Firebase",
  "WhatsApp API", "Redux", "Prisma", "Jest",
];

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  current: boolean;
  location: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    id: "medquad",
    company: "Medquad Health Solutions",
    role: "Lead Full Stack Developer",
    period: "2023 — Present",
    current: true,
    location: "Islamabad, Pakistan",
    description:
      "Leading all software development efforts at Medquad — building the public website, internal management portal, and an AI-powered customer chatbot.",
    achievements: [
      "Built the company's public website from scratch with WhatsApp Business API integration",
      "Developed a full-featured internal portal used daily by the entire team",
      "Architecting an AI chatbot using OpenAI API to automate customer support responses",
      "Managed end-to-end product lifecycle from design to Vercel deployment",
    ],
    tags: ["React", "Next.js", "Node.js", "MongoDB", "OpenAI", "WhatsApp API"],
  },
  {
    id: "bahria",
    company: "Bahria University Islamabad",
    role: "Software Engineering Student & FYP Lead Developer",
    period: "2021 — 2025",
    current: false,
    location: "Islamabad, Pakistan",
    description:
      "Pursuing a Bachelor's degree in Software Engineering. Led the design and development of a Final Year Project that ranked 2nd out of 50 submitted projects.",
    achievements: [
      "Developed a React Native FYP Management App for 200+ students and 10 faculty",
      "Automated an entirely manual workflow — eliminating paperwork and approval delays",
      "Ranked 2nd out of 50 final year projects in the university showcase",
      "Presented to a panel of industry professionals and academic evaluators",
    ],
    tags: ["React Native", "Node.js", "MongoDB", "Firebase", "Agile"],
  },
];
