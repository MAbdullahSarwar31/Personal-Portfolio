/* ── Site Config ───────────────────────────────────────────── */
export const siteConfig = {
  name:           "Muhammad Abdullah Sarwar",
  shortName:      "Abdullah Sarwar",
  role:           "Full Stack Developer | AI Integration Engineer",
  tagline:        "Sole developer at Medquad Health Solutions — shipping production health-tech for hospitals across Pakistan.",
  location:       "Islamabad, Pakistan",
  email:          "mabdullahsarwar3731@gmail.com",
  github:         "https://github.com/MAbdullahSarwar31",
  linkedin:       "https://www.linkedin.com/in/muhammad-abdullah-sarwar-b727682a8/",
  website:        "https://m-abdullah-sarwar.vercel.app/",
  resumeUrl:      "/resume.pdf",
  avatarUrl:      "/profile.jpg",
  availableForWork: true,
};

/* ── Stats ─────────────────────────────────────────────────── */
export const stats = [
  { label: "Years Experience",  value: "2+",  suffix: "" },
  { label: "Students Impacted", value: "200", suffix: "+" },
  { label: "Hospitals Served",  value: "20",  suffix: "+" },
  { label: "Top Project Rank",  value: "#2",  suffix: "/50" },
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
    subtitle: "Production MERN Stack Operations System — 20+ Hospitals",
    description:
      "Full-stack multi-role operations portal serving hospitals across Pakistan — built solo, end-to-end, running in production.",
    longDescription:
      "As the sole developer at Medquad Health Solutions, I designed, architected, and shipped the complete operations portal used daily across 20+ hospitals in Pakistan. The system handles four user roles (Admin, Doctor, Nurse, Receptionist), real-time patient queue management via WebSockets, an NLP-powered ticket routing engine, predictive equipment maintenance via Prophet time-series forecasting, and WhatsApp Business API automation. Deployed on AWS ECS Fargate with a full CI/CD pipeline.",
    image: "/projects/medquad-portal.png",
    tags: [
      "MongoDB", "Express.js", "React", "Node.js",
      "WebSocket", "OpenAI API", "WhatsApp Business API",
      "AWS ECS Fargate", "Docker", "GitHub Actions", "Prophet",
    ],
    category: "professional",
    projectTag: "Professional · Production",
    metrics: [
      "Live in production across 20+ hospitals in Pakistan",
      "Multi-role system: Admin, Doctor, Nurse, Receptionist",
      "Real-time WebSocket communication for live patient queue data",
      "NLP-based ticket routing — auto-classifies & assigns support requests",
      "WhatsApp Business API for automated appointment reminders",
      "Prophet time-series forecasting for predictive maintenance",
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
    subtitle: "Flutter Mobile App — Ranked 2nd / 50 Projects",
    description:
      "Cross-platform Flutter mobile app automating the complete Final Year Project lifecycle for 200+ students and 10 faculty at Bahria University.",
    longDescription:
      "Sole developer of a Flutter cross-platform mobile app that fully digitized the manual FYP management process at Bahria University Islamabad. The app covers project submissions, supervisor assignments, milestone tracking, evaluation scheduling, and grading — eliminating an entirely paper-based workflow. Ranked 2nd out of 50 competing projects at the university showcase, evaluated by a panel of industry professionals and academic faculty.",
    image: "/projects/fyp-app.png",
    tags: ["Flutter", "Dart", "Firebase", "Firebase Realtime DB", "Firebase Auth"],
    category: "mobile",
    projectTag: "Academic · Mobile App",
    metrics: [
      "200+ students and 10 faculty members served",
      "Automated supervisor assignment, milestone tracking & grading workflows",
      "Firebase Realtime Database for live notifications and status updates",
      "Ranked 2nd out of 50 projects at Bahria University showcase",
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
      "Full-stack MERN e-commerce platform for a toy store — product catalog, shopping cart, JWT authentication, and order management.",
    longDescription:
      "Built as part of a 4-member academic team using the MERN stack. The platform includes a fully featured product catalog with search and filtering, shopping cart with persistent state, user authentication with JWT, and an admin dashboard for order and inventory management. I led the backend API design and database schema.",
    image: "/projects/wonderland.png",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "REST API"],
    category: "fullstack",
    projectTag: "Academic · Team Project",
    metrics: [
      "Full MERN stack e-commerce with product catalog, cart, and checkout",
      "JWT authentication with role-based admin dashboard",
      "RESTful API with real-time inventory management",
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
  level: number; // 0–100
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
  { name: "React 18",       level: 92, category: "frontend" },
  { name: "Next.js",        level: 90, category: "frontend" },
  { name: "Tailwind CSS",   level: 92, category: "frontend" },
  { name: "HTML5 / CSS3",   level: 95, category: "frontend" },
  { name: "Bootstrap",      level: 82, category: "frontend" },
  // Backend
  { name: "Node.js",        level: 88, category: "backend" },
  { name: "Express.js",     level: 88, category: "backend" },
  { name: "Django",         level: 72, category: "backend" },
  { name: "RESTful APIs",   level: 90, category: "backend" },
  // Mobile
  { name: "Flutter",        level: 82, category: "mobile" },
  { name: "Dart",           level: 80, category: "mobile" },
  { name: "Firebase",       level: 82, category: "mobile" },
  // Databases
  { name: "MongoDB Atlas",         level: 85, category: "database" },
  { name: "MySQL",                 level: 80, category: "database" },
  { name: "Firebase Realtime DB",  level: 78, category: "database" },
  // AI & Automation
  { name: "OpenAI API",            level: 85, category: "ai" },
  { name: "Google Gemini API",     level: 78, category: "ai" },
  { name: "WhatsApp Business API", level: 82, category: "ai" },
  { name: "Hugging Face",          level: 72, category: "ai" },
  { name: "Prophet Forecasting",   level: 70, category: "ai" },
  // DevOps & Cloud
  { name: "AWS (ECS Fargate / S3 / CloudFront)", level: 72, category: "devops" },
  { name: "Docker",          level: 72, category: "devops" },
  { name: "GitHub Actions",  level: 78, category: "devops" },
  { name: "Vercel",          level: 90, category: "devops" },
  // Languages
  { name: "JavaScript",  level: 90, category: "languages" },
  { name: "Python",      level: 82, category: "languages" },
  { name: "C++",         level: 75, category: "languages" },
  { name: "Java",        level: 70, category: "languages" },
  // Tools
  { name: "Git / GitHub",  level: 90, category: "tools" },
  { name: "Postman",       level: 85, category: "tools" },
  { name: "Figma",         level: 72, category: "tools" },
  { name: "Arduino IDE",   level: 68, category: "tools" },
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
      "Sole developer responsible for all engineering at Medquad — a biomedical health-tech company. I architect, build, and maintain the production operations portal serving hospitals across Pakistan.",
    achievements: [
      "Architected and shipped a MERN stack multi-role operations portal (Admin, Doctor, Nurse, Receptionist) running across 20+ hospitals in Pakistan",
      "Implemented real-time WebSocket communication for live patient queue updates and staff coordination",
      "Built an NLP-based ticket routing system that automatically classifies and assigns support requests to the correct department",
      "Integrated WhatsApp Business API for automated patient appointment reminders and broadcast messaging",
      "Developed a predictive maintenance module using Facebook Prophet time-series forecasting to detect equipment anomalies before failure",
      "Deployed on AWS ECS Fargate with S3 static assets, CloudFront CDN, and GitHub Actions CI/CD pipeline",
      "Building an OpenAI-powered AI chatbot for automated customer support across WhatsApp and web channels",
    ],
    tags: ["MERN Stack", "WebSocket", "OpenAI API", "WhatsApp API", "AWS ECS", "Prophet", "Docker"],
  },
  {
    id: "codealpha",
    company: "CodeAlpha",
    role: "AI & Machine Learning Intern",
    period: "Mar 2025 — May 2025",
    current: false,
    location: "Remote",
    description:
      "Completed a remote AI & ML internship delivering real-world machine learning and NLP projects using Python and the Hugging Face ecosystem.",
    achievements: [
      "Developed supervised and unsupervised ML models for classification and regression tasks using scikit-learn",
      "Built end-to-end NLP pipelines using Hugging Face Transformers for text classification and sentiment analysis",
      "Worked with Python's data science stack — pandas, NumPy, scikit-learn, and matplotlib for data analysis and visualization",
      "Delivered 3+ AI project submissions across NLP, computer vision, and time-series forecasting domains",
    ],
    tags: ["Python", "scikit-learn", "Hugging Face", "NLP", "pandas", "NumPy"],
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
  },
];
