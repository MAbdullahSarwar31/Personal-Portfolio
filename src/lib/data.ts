/* ── Site Config ───────────────────────────────────────────── */
export const siteConfig = {
  name:           "Muhammad Abdullah Sarwar",
  shortName:      "Muhammad Abdullah Sarwar",
  role:           "Full Stack Developer | AI Integration Engineer",
  tagline:        "Sole developer at Medquad Health Solutions — shipping production health-tech for hospitals across Pakistan.",
  location:       "Islamabad, Pakistan",
  email:          "mabdullahsarwar3731@gmail.com",
  github:         "https://github.com/MAbdullahSarwar31",
  linkedin:       "https://www.linkedin.com/in/muhammad-abdullah-sarwar-b727682a8/",
  website:        "https://m-abdullah-sarwar.vercel.app/",
  resumeUrl:      "/Muhammad_Abdullah_Sarwar_Resume.pdf",
  avatarUrl:      "/profile.jpg",
  availableForWork: true,
};

/* ── Stats ─────────────────────────────────────────────────── */
export const stats = [
  { label: "Years Experience",  value: "2",   suffix: "+" },
  { label: "Students Impacted", value: "100", suffix: "+" },
  { label: "Hospital Clients",  value: "25",  suffix: "+" },
  { label: "Top Project Rank",  value: "#2",  suffix: "" },
];

/* ── Projects ──────────────────────────────────────────────── */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: "professional" | "web" | "mobile" | "ai" | "fullstack" | "iot";
  /** Display label shown on the card e.g. "Professional · Production" */
  projectTag: string;
  metrics: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "live" | "in-progress" | "completed";
}

export const projects: Project[] = [
  /* 1 — Medquad Portal */
  {
    id: "medquad-portal",
    title: "Medquad Health Solutions Portal",
    subtitle: "Production MERN Stack Operations System — 25+ Hospital Clients",
    description:
      "Full-stack multi-role operations portal serving 25+ hospital clients across Pakistan — built solo, end-to-end, running in production.",
    longDescription:
      "As the sole developer at Medquad Health Solutions, I designed, architected, and shipped the complete operations portal used daily across 25+ hospital clients in Pakistan. The system handles three user roles (Admin, Technician, Client), a real-time service ticket management system using Socket.io WebSockets — eliminating approximately 80% of manual status-check calls — an NLP-powered ticket routing engine, predictive equipment maintenance via Prophet time-series forecasting, and WhatsApp Business API automation. Deployed on AWS ECS Fargate with a full CI/CD pipeline.",
    image: "/projects/medquad-portal.png",
    tags: [
      "MongoDB", "Express.js", "React", "Node.js",
      "Socket.io", "OpenAI API", "WhatsApp Business API",
      "AWS ECS Fargate", "Docker", "GitHub Actions", "Prophet",
    ],
    category: "professional",
    projectTag: "Professional · Production",
    metrics: [
      "Live in production across 25+ hospital clients in Pakistan",
      "Multi-role system: Admin, Technician, Client",
      "Real-time service ticket system via Socket.io — eliminated ~80% of manual status-check calls",
      "NLP-based ticket routing — auto-classifies & assigns support requests",
      "WhatsApp Business API for automated client notifications and broadcast messaging",
      "Prophet time-series forecasting for predictive equipment maintenance",
      "AWS ECS Fargate deployment with CloudFront CDN & GitHub Actions CI/CD",
    ],
    liveUrl: "https://medquadhealth.com",
    featured: true,
    status: "live",
  },

  /* 2 — FYP Management System */
  {
    id: "fyp-management",
    title: "FYP Management System",
    subtitle: "Flutter Mobile App — Ranked 2nd / 50 Projects · Business Process Automation Course",
    description:
      "Cross-platform Flutter mobile app built for the Business Process Automation course, digitizing the complete FYP management lifecycle for 100+ students and 12 faculty at Bahria University.",
    longDescription:
      "Sole developer of a Flutter cross-platform mobile app built as part of the Business Process Automation course at Bahria University Islamabad. The app fully digitized the manual FYP management workflow — covering project submissions, supervisor assignments, milestone tracking, evaluation scheduling, and grading — eliminating an entirely paper-based process. Ranked 2nd out of 50 competing projects at the course showcase, evaluated by a panel of industry professionals and academic faculty.",
    image: "/projects/fyp-app.png",
    tags: ["Flutter", "Dart", "Firebase", "Firebase Realtime DB", "Firebase Auth"],
    category: "mobile",
    projectTag: "Academic · Mobile App",
    metrics: [
      "Business Process Automation course project — not a degree FYP",
      "100+ students and 12 faculty members served",
      "Automated supervisor assignment, milestone tracking & grading workflows",
      "Firebase Realtime Database for live notifications and status updates",
      "Ranked 2nd out of 50 projects at the course showcase",
    ],
    featured: true,
    status: "completed",
  },

  /* 3 — AI-Powered Portfolio */
  {
    id: "portfolio",
    title: "AI-Powered Personal Portfolio",
    subtitle: "Next.js + TypeScript + OpenAI Chatbot — This Site",
    description:
      "This portfolio itself — designed and developed end-to-end with an embedded OpenAI chatbot that answers visitor questions in real time.",
    longDescription:
      "Designed and built this portfolio to demonstrate both engineering execution quality and AI integration capability. Features a fully custom design system, Framer Motion animations, scroll progress, dark mode, and an embedded AI chatbot widget powered by OpenAI that can answer any visitor question about my background, projects, and skills in real time. Deployed on Vercel with 90+ Lighthouse scores on Performance, Accessibility, and SEO.",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "OpenAI API", "Vercel"],
    category: "ai",
    projectTag: "Personal · AI",
    metrics: [
      "OpenAI-powered AI chatbot for real-time visitor Q&A",
      "Custom design system with dark mode and Framer Motion animations",
      "90+ Lighthouse scores on Performance, Accessibility, and SEO",
      "Deployed on Vercel with continuous deployment from GitHub",
    ],
    liveUrl: "https://m-abdullah-sarwar.vercel.app/",
    featured: true,
    status: "live",
  },

  /* 4 — WonderLand Toy Store */
  {
    id: "wonderland",
    title: "WonderLand Toy Store",
    subtitle: "MERN Stack E-Commerce — 4-Member Team",
    description:
      "Full-featured MERN e-commerce platform with real-time product browsing, AI-powered product suggestions, and a complete admin panel.",
    longDescription:
      "Co-developed a full-featured e-commerce web application as part of a 4-member academic team using the MERN stack. The platform features real-time product browsing, a dynamic shopping cart, secure payment integration, and AI-powered product suggestions. Implemented smooth scrolling UX, category filtering, and a responsive storefront optimized for all device sizes. Built a complete admin panel for product and order management with role-based access.",
    image: "/projects/wonderland.png",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "REST API"],
    category: "fullstack",
    projectTag: "Academic · Team Project",
    metrics: [
      "Real-time product browsing, dynamic shopping cart, and secure payment integration",
      "AI-powered product suggestions and category filtering",
      "Complete admin panel for product and order management with role-based access",
    ],
    featured: false,
    status: "completed",
  },

  /* 5 — Bahria University LMS */
  {
    id: "bahria-lms",
    title: "Bahria University LMS",
    subtitle: "Desktop Learning Management System — Java Swing & MySQL",
    description:
      "Desktop LMS for Bahria University with course enrollment, grade tracking, attendance management, and multi-role access (Student, Faculty, Admin).",
    longDescription:
      "Developed a desktop Learning Management System using Java Swing for the GUI and MySQL for the backend database. Supports three user roles (Student, Faculty, Admin) with modules for course enrollment, grade management, attendance tracking, assignment submission, and faculty-to-student messaging. Designed a normalized MySQL schema with JDBC connectivity.",
    image: "/projects/bahria-lms.png",
    tags: ["Java", "Java Swing", "MySQL", "JDBC", "OOP"],
    category: "web",
    projectTag: "Academic · Solo",
    metrics: [
      "Multi-role desktop app: Student, Faculty, Admin",
      "Course enrollment, grade tracking, and attendance management",
      "Normalized MySQL database schema with full JDBC connectivity",
    ],
    featured: false,
    status: "completed",
  },

  /* 6 — Cat Road Crosser */
  {
    id: "cat-road-crosser",
    title: "Cat Road Crosser",
    subtitle: "Arcade Game in C++ OOP — Scored 100%, Highest in Class",
    description:
      "A Frogger-style arcade game built entirely in C++, demonstrating core OOP principles. Scored 100% — the highest grade in the class.",
    longDescription:
      "Developed a complete Frogger-style arcade game in C++ applying all core Object-Oriented Programming principles — inheritance, polymorphism, encapsulation, and abstraction. The game features multiple difficulty levels, procedural obstacle spawning, collision detection, and a high-score system. Scored 100% on the project evaluation — the highest in the class.",
    image: "/projects/cat-road-crosser.png",
    tags: ["C++", "OOP", "Game Development", "Data Structures"],
    category: "web",
    projectTag: "Academic · Solo",
    metrics: [
      "Scored 100% — highest grade in the class",
      "Full OOP design: inheritance, polymorphism, encapsulation, and abstraction",
    ],
    featured: false,
    status: "completed",
  },

  /* 7 — IoT Water Level Monitoring */
  {
    id: "iot-water-level",
    title: "IoT Water Level Monitor",
    subtitle: "Arduino + Blynk IoT — Real-Time Remote Monitoring",
    description:
      "IoT system for real-time water tank level monitoring using Arduino microcontrollers and the Blynk IoT platform with mobile alerts.",
    longDescription:
      "Built an IoT-based water level monitoring system using Arduino microcontrollers and the Blynk IoT cloud platform. Ultrasonic sensors continuously measure water tank levels; readings are streamed to the Blynk dashboard in real time and trigger push notifications when levels drop below user-defined thresholds. The mobile dashboard allows remote monitoring and manual control.",
    image: "/projects/iot-water.png",
    tags: ["Arduino", "Blynk IoT", "C++", "IoT", "Sensors"],
    category: "iot",
    projectTag: "Academic · Team",
    metrics: [
      "Real-time water level sensing via ultrasonic sensors",
      "Remote monitoring and threshold alerts via Blynk IoT mobile dashboard",
    ],
    featured: false,
    status: "completed",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* ── Skills ────────────────────────────────────────────────── */
export interface Skill {
  name: string;
  category:
    | "frontend"
    | "backend"
    | "mobile"
    | "devops"
    | "ai"
    | "database"
    | "languages"
    | "tools";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React 18",     category: "frontend" },
  { name: "Next.js",      category: "frontend" },
  { name: "HTML5",        category: "frontend" },
  { name: "CSS3",         category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Bootstrap",    category: "frontend" },
  // Backend
  { name: "Node.js",      category: "backend" },
  { name: "Express.js",   category: "backend" },
  { name: "Django",       category: "backend" },
  { name: "RESTful APIs", category: "backend" },
  // Mobile
  { name: "Flutter",   category: "mobile" },
  { name: "Dart",      category: "mobile" },
  { name: "Firebase",  category: "mobile" },
  // Databases
  { name: "MongoDB Atlas",        category: "database" },
  { name: "MySQL",                category: "database" },
  { name: "Firebase Realtime DB", category: "database" },
  // AI & Automation
  { name: "OpenAI API",            category: "ai" },
  { name: "Google Gemini API",     category: "ai" },
  { name: "WhatsApp Business API", category: "ai" },
  { name: "Hugging Face",          category: "ai" },
  { name: "Prophet Forecasting",   category: "ai" },
  // DevOps & Cloud
  { name: "AWS (ECS Fargate, S3, CloudFront)", category: "devops" },
  { name: "Docker",         category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "CI/CD",          category: "devops" },
  { name: "Vercel",         category: "devops" },
  // Languages
  { name: "JavaScript", category: "languages" },
  { name: "Python",     category: "languages" },
  { name: "C++",        category: "languages" },
  { name: "Java",       category: "languages" },
  { name: "Dart",       category: "languages" },
  // Tools
  { name: "Git",        category: "tools" },
  { name: "GitHub",     category: "tools" },
  { name: "Postman",    category: "tools" },
  { name: "VS Code",    category: "tools" },
  { name: "Arduino IDE",category: "tools" },
  { name: "Figma",      category: "tools" },
];

export const skillCategories: { key: Skill["category"]; label: string; color: string }[] = [
  { key: "frontend",  label: "Frontend",         color: "#3b82f6" },
  { key: "backend",   label: "Backend",           color: "#10b981" },
  { key: "mobile",    label: "Mobile",            color: "#f59e0b" },
  { key: "database",  label: "Databases",         color: "#ef4444" },
  { key: "ai",        label: "AI & Automation",   color: "#06b6d4" },
  { key: "devops",    label: "DevOps & Cloud",    color: "#8b5cf6" },
  { key: "languages", label: "Languages",         color: "#ec4899" },
  { key: "tools",     label: "Tools",             color: "#64748b" },
];

/* ── Tech Marquee ──────────────────────────────────────────── */
export const techStack = [
  "React 18", "Next.js", "TypeScript", "Node.js", "Express.js", "Django",
  "Flutter", "Dart", "Firebase", "MongoDB", "MySQL", "Tailwind CSS",
  "Bootstrap", "Docker", "AWS ECS", "GitHub Actions", "Vercel",
  "OpenAI API", "Hugging Face", "WhatsApp API", "Prophet",
  "Python", "JavaScript", "C++", "Java",
  "Git", "Postman", "Figma", "Arduino",
];

/* ── Experience ────────────────────────────────────────────── */
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
  /** Override the auto-calculated duration badge e.g. "3 mo" */
  durationOverride?: string;
}

export const experience: Experience[] = [
  {
    id: "medquad",
    company: "Medquad Health Solutions",
    role: "Full Stack Developer & AI Integration Engineer",
    period: "2024 — Present",
    current: true,
    location: "Islamabad, Pakistan",
    description:
      "Sole developer responsible for all engineering at Medquad — a biomedical health-tech company. I architect, build, and maintain the production operations portal serving 25+ hospital clients across Pakistan.",
    achievements: [
      "Architected and shipped a MERN stack multi-role operations portal (Admin, Technician, Client) running across 25+ hospital clients in Pakistan",
      "Built a real-time service ticket management system using Socket.io WebSockets, enabling instant status updates and eliminating approximately 80% of manual status-check calls from hospital clients",
      "Developed an NLP-based ticket routing system that automatically classifies and assigns support requests to the correct department",
      "Integrated WhatsApp Business API for automated client notifications and broadcast messaging",
      "Developed a predictive maintenance module using Facebook Prophet time-series forecasting to detect equipment anomalies before failure",
      "Deployed on AWS ECS Fargate with S3 static assets, CloudFront CDN, and GitHub Actions CI/CD pipeline",
      "Building an OpenAI-powered AI chatbot for automated customer support across WhatsApp and web channels",
    ],
    tags: ["MERN Stack", "Socket.io", "OpenAI API", "WhatsApp API", "AWS ECS", "Prophet", "Docker"],
  },
  {
    id: "codealpha",
    company: "CodeAlpha",
    role: "AI & Machine Learning Intern",
    period: "March 2026 — Present",
    current: true,
    location: "Remote",
    description:
      "Executing real-world AI and ML projects in a remote production environment across two concurrent internship tracks.",
    achievements: [
      "Developing an intelligent FAQ Chatbot capable of understanding and responding to natural language user queries using NLP techniques",
      "Building a Language Translation Tool leveraging transformer-based models for accurate cross-language text conversion",
      "Implementing an Emotion Recognition from Speech system using audio feature extraction and machine learning classification algorithms",
    ],
    tags: ["Python", "NLP", "Hugging Face", "OpenAI", "Machine Learning"],
  },
  {
    id: "developershub",
    company: "DevelopersHub",
    role: "Flutter Development Intern",
    period: "Jun 2025 — Aug 2025",
    current: false,
    location: "Pakistan",
    description:
      "Completed a summer internship focused on cross-platform mobile application development using Flutter and Dart.",
    achievements: [
      "Built and deployed cross-platform mobile applications using Flutter and Dart with Firebase backend integration",
    ],
    tags: ["Flutter", "Dart", "Firebase", "Mobile Development"],
    durationOverride: "3 mo",
  },
];
