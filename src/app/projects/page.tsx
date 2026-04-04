"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch, Clock, Filter, Zap } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import type { Metadata } from "next";

const categories = [
  { key: "all",       label: "All Projects" },
  { key: "fullstack", label: "Full Stack"   },
  { key: "ai",        label: "AI"           },
  { key: "mobile",    label: "Mobile"       },
];

const statusConfig = {
  live:          { label: "Live",        color: "#10b981", bg: "rgba(16,185,129,0.1)"  },
  "in-progress": { label: "In Progress", color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
  completed:     { label: "Completed",   color: "#6366f1", bg: "rgba(99,102,241,0.1)"  },
};

const gradients = [
  "135deg, #0057d9, #0ea5e9",
  "135deg, #7c3aed, #8b5cf6",
  "135deg, #0891b2, #06b6d4",
  "135deg, #059669, #10b981",
  "135deg, #b45309, #f59e0b",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const status = statusConfig[project.status];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6, ease: "easeOut" }}
      className="project-card"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Image area */}
      <div style={{
        height: "200px",
        background: `linear-gradient(${gradients[index % gradients.length]})`,
        position: "relative", overflow: "hidden",
      }}>
        <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={56} color="rgba(255,255,255,0.2)" />
        </div>
        {/* Status */}
        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 600, padding: "0.25rem 0.65rem",
            borderRadius: "999px", background: status.bg, color: status.color,
            border: `1px solid ${status.color}33`, backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", gap: "0.3rem",
          }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: status.color }} />
            {status.label}
          </span>
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <span style={{
              fontSize: "0.7rem", fontWeight: 600, padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.2)", color: "white",
              backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)",
            }}>
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{
          fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "var(--accent-primary)", display: "block", marginBottom: "0.4rem",
        }}>
          {project.category === "ai" ? "AI / ML" :
           project.category === "mobile" ? "Mobile App" :
           project.category === "fullstack" ? "Full Stack" : "Web"}
        </span>

        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)",
          marginBottom: "0.35rem", letterSpacing: "-0.02em" }}>
          {project.title}
        </h2>
        <p style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 500, marginBottom: "0.75rem" }}>
          {project.subtitle}
        </p>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6,
          marginBottom: "1rem", flex: 1 }}>
          {project.description}
        </p>

        {/* Metrics */}
        <div style={{ marginBottom: "1rem" }}>
          {project.metrics.map((m) => (
            <div key={m} style={{ display: "flex", alignItems: "center", gap: "0.45rem",
              fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%",
                background: "var(--accent-primary)", flexShrink: 0 }} />
              {m}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tech-badge" style={{ fontSize: "0.72rem" }}>{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto" }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="btn-accent" style={{ flex: 1, justifyContent: "center", padding: "0.5rem", fontSize: "0.8rem" }}>
              <ExternalLink size={14} /> Live
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "0.5rem", fontSize: "0.8rem" }}>
              <GitBranch size={14} /> Code
            </a>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)",
              display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Clock size={13} />
              {project.status === "in-progress" ? "In development" : "Private repo"}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true });

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-default)",
        padding: "4rem 0 3rem",
      }}>
        <div className="container" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">
              <Zap size={14} /> My Work
            </p>
            <h1 className="section-title" style={{ marginBottom: "1rem" }}>
              Projects &amp; <span className="gradient-text">Builds</span>
            </h1>
            <p className="section-subtitle">
              Real-world applications I&apos;ve built — from health-tech platforms to AI-powered tools.
              Every project ships to production.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "flex", gap: "0.5rem", flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            <Filter size={16} style={{ color: "var(--text-muted)", alignSelf: "center", marginRight: "0.25rem" }} />
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: "1.5px solid",
                  borderColor: activeFilter === cat.key ? "var(--accent-primary)" : "var(--border-default)",
                  background: activeFilter === cat.key ? "var(--accent-subtle)" : "transparent",
                  color: activeFilter === cat.key ? "var(--accent-primary)" : "var(--text-secondary)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="container" style={{ paddingTop: "3rem" }}>
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
            No projects in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
