"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { siteConfig, skills, skillCategories, experience, type Experience } from "@/lib/data";
import { Briefcase, GraduationCap, MapPin, User, Download, Code2, Award } from "lucide-react";

/* ── Duration Calculator ──────────────────────────────────── */
const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parsePeriodDate(s: string): Date {
  const str = s.trim();
  if (str === "Present") return new Date();
  // "Mar 2025" format
  const monthYear = str.match(/^([A-Z][a-z]{2})\s+(\d{4})$/);
  if (monthYear) {
    const m = MONTH_MAP[monthYear[1]] ?? 0;
    return new Date(parseInt(monthYear[2]), m);
  }
  // Plain year "2024"
  return new Date(parseInt(str), 0);
}

function getDuration(period: string, current: boolean): string {
  const parts = period.split(" — ");
  if (parts.length < 2) return "";
  const start = parsePeriodDate(parts[0]);
  const end   = current ? new Date() : parsePeriodDate(parts[1]);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() - start.getMonth();
  if (totalMonths <= 0) return "";
  const years  = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (months === 0) return `${years} yr`;
  if (years  === 0) return `${months} mo`;
  return `${years} yr ${months} mo`;
}

/* ── Experience Glass Card ────────────────────────────────── */
function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const duration = exp.durationOverride ?? getDuration(exp.period, exp.current);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className={`experience-card${exp.current ? " active" : ""}`}
      style={{ marginBottom: "1.25rem" }}
    >
      {/* Active glow strip */}
      {exp.current && (
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            borderRadius: "20px 20px 0 0",
            background: "var(--gradient-accent)",
          }}
        />
      )}

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          {/* Company initial circle */}
          <div
            style={{
              width: "44px", height: "44px",
              borderRadius: "12px",
              background: exp.current
                ? "var(--gradient-accent)"
                : "var(--bg-tertiary)",
              border: `1px solid ${exp.current ? "transparent" : "var(--border-default)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", fontWeight: 700,
              color: exp.current ? "white" : "var(--text-secondary)",
              flexShrink: 0,
              boxShadow: exp.current ? "var(--shadow-accent)" : "none",
            }}
          >
            {exp.company[0]}
          </div>

          <div>
            <h3
              style={{
                fontSize: "1rem", fontWeight: 700,
                color: "var(--text-primary)", marginBottom: "0.15rem",
              }}
            >
              {exp.role}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--accent-primary)", fontWeight: 600 }}>
              {exp.company}
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "flex-end" }}>
            <span
              style={{
                fontSize: "0.72rem", fontWeight: 600,
                padding: "0.2rem 0.65rem", borderRadius: "999px",
                background: exp.current ? "rgba(16,185,129,0.1)" : "var(--bg-tertiary)",
                color: exp.current ? "#10b981" : "var(--text-muted)",
                border: `1px solid ${exp.current ? "rgba(16,185,129,0.25)" : "var(--border-default)"}`,
              }}
            >
              {exp.current ? "Current" : "Completed"}
            </span>
            {duration && (
              <span
                style={{
                  fontSize: "0.72rem", fontWeight: 500,
                  padding: "0.2rem 0.65rem", borderRadius: "999px",
                  background: "var(--bg-tertiary)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-default)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {duration}
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: "0.78rem", color: "var(--text-muted)",
              marginTop: "0.4rem",
              display: "flex", alignItems: "center", gap: "0.25rem", justifyContent: "flex-end",
            }}
          >
            <MapPin size={11} /> {exp.period}
          </p>
        </div>
      </div>

      <p
        style={{
          fontSize: "0.875rem", color: "var(--text-secondary)",
          lineHeight: 1.65, marginBottom: "1rem",
        }}
      >
        {exp.description}
      </p>

      <ul
        style={{
          listStyle: "none", padding: 0, margin: "0 0 1rem",
          display: "flex", flexDirection: "column", gap: "0.4rem",
        }}
      >
        {exp.achievements.map((a) => (
          <li
            key={a}
            style={{
              fontSize: "0.83rem", color: "var(--text-secondary)",
              display: "flex", alignItems: "flex-start", gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "var(--accent-primary)",
                marginTop: "0.45rem", flexShrink: 0,
              }}
            />
            {a}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {exp.tags.map((tag) => (
          <span key={tag} className="tech-badge" style={{ fontSize: "0.72rem" }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingBottom: "5rem" }}>
      {/* Hero */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-default)",
          padding: "5rem 0 4rem",
        }}
      >
        <div className="container" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12 lg:gap-16"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative shrink-0"
            >
              <div
                style={{
                  position: "absolute", inset: "-10px", borderRadius: "32px",
                  background: "rgba(59, 130, 246, 0.15)", filter: "blur(20px)", zIndex: 0,
                }}
              />
              <div
                className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] lg:w-[260px] lg:h-[260px] rounded-[28px] overflow-hidden z-10"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05)", background: "var(--bg-card)" }}
              >
                <Image
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 768px) 200px, 260px"
                  priority
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <p
                className="flex items-center justify-center md:justify-start gap-2 text-[0.8rem] font-bold tracking-[0.15em] uppercase mb-4"
                style={{ color: "#3b82f6" }}
              >
                <User size={15} /> About Me
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight leading-tight" style={{ color: "var(--text-primary)" }}>
                Muhammad Abdullah{" "}
                <span style={{ color: "#818cf8" }}>Sarwar</span>
              </h1>

              <p className="font-semibold text-lg md:text-xl mb-4" style={{ color: "#3b82f6" }}>
                {siteConfig.role}
              </p>

              <p
                className="flex items-center justify-center md:justify-start gap-2 text-sm font-medium mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                <MapPin size={15} /> {siteConfig.location}
              </p>

              <p
                className="text-[1.05rem] leading-[1.7] mb-8 max-w-[640px]"
                style={{ color: "var(--text-secondary)" }}
              >
                I&apos;m a Full Stack Developer and AI Integration Engineer with 2+ years of
                hands-on experience shipping production software. I&apos;m the sole developer at{" "}
                <a
                  href="https://medquad-health-client.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--text-primary)", fontWeight: 700,
                    textDecoration: "underline",
                    textDecorationColor: "rgba(59, 130, 246, 0.5)",
                    textUnderlineOffset: "4px",
                  }}
                >
                  Medquad Health Solutions
                </a>{" "}
                — a biomedical health-tech company — where I&apos;ve built the operations portal
                that hospitals across Pakistan run on daily. The work spans real-time WebSocket
                systems, NLP-based ticket routing, cloud infrastructure on AWS, and AI integration
                via OpenAI. Beyond Medquad, I&apos;ve completed AI &amp; ML internships at
                CodeAlpha and DevelopersHub, and I&apos;m currently pursuing my BS in Software
                Engineering at Bahria University (expected June 2027), where my FYP Management
                System App — a Business Process Automation course project — ranked 2nd out of 50.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href={siteConfig.resumeUrl}
                  download="Muhammad_Abdullah_Sarwar_Resume.pdf"
                  className="btn-accent"
                >
                  <Download size={17} /> Download Resume
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <Code2 size={17} /> GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container" style={{ paddingTop: "4rem" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}
          className="about-main-grid"
        >
          {/* Left: Experience + Education */}
          <div>
            {/* Experience */}
            <div style={{ marginBottom: "3.5rem" }}>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem",
                }}
              >
                <div
                  style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: "var(--gradient-accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "var(--shadow-accent)",
                  }}
                >
                  <Briefcase size={18} color="white" />
                </div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Experience
                </h2>
              </div>

              {/* Animated vertical connector line */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "21px",
                    top: "52px",
                    bottom: "0",
                    width: "2px",
                    background:
                      "linear-gradient(180deg, var(--accent-primary) 0%, var(--border-default) 100%)",
                    zIndex: 0,
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  {experience.map((exp, i) => (
                    <ExperienceCard key={exp.id} exp={exp} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <GraduationCap size={18} color="white" />
                </div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Education
                </h2>
              </div>
              <div className="experience-card">
                <p
                  style={{
                    fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.08em", color: "#7c3aed", marginBottom: "0.4rem",
                  }}
                >
                  Sep 2023 — Present
                </p>
                <h3
                  style={{
                    fontSize: "1rem", fontWeight: 700,
                    color: "var(--text-primary)", marginBottom: "0.25rem",
                  }}
                >
                  Bachelor of Science in Software Engineering
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem", color: "var(--accent-primary)",
                    fontWeight: 600, marginBottom: "0.5rem",
                  }}
                >
                  Bahria University, Islamabad
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  Currently pursuing · Expected June 2027
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Award size={14} style={{ color: "#f59e0b" }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    BPA course project ranked 2nd out of 50
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Skills */}
          <div>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Code2 size={18} color="white" />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Technical Skills
              </h2>
            </div>

            {skillCategories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat.key);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat.key} style={{ marginBottom: "1.75rem" }}>
                  <h3
                    style={{
                      fontSize: "0.72rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      color: cat.color, marginBottom: "0.75rem",
                      display: "flex", alignItems: "center", gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{ width: "7px", height: "7px", borderRadius: "2px", background: cat.color }}
                    />
                    {cat.label}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {catSkills.map((skill) => (
                      <span
                        key={skill.name}
                        style={{
                          fontSize: "0.78rem",
                          padding: "0.25rem 0.7rem",
                          borderRadius: "999px",
                          background: `${cat.color}14`,
                          color: cat.color,
                          border: `1px solid ${cat.color}30`,
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-main-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
