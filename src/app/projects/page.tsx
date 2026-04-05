"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink, GitBranch, Clock, Filter, Zap,
  X, BarChart2, Tag, Lock,
} from "lucide-react";
import { projects, type Project } from "@/lib/data";

const categories = [
  { key: "all",          label: "All Projects"    },
  { key: "professional", label: "Professional"    },
  { key: "ai",           label: "AI / ML"         },
  { key: "fullstack",    label: "Full Stack"      },
  { key: "mobile",       label: "Mobile"          },
  { key: "web",          label: "Web / Desktop"   },
  { key: "iot",          label: "IoT"             },
];

const statusConfig = {
  live:          { label: "Live",        color: "#10b981", bg: "rgba(16,185,129,0.1)"  },
  "in-progress": { label: "In Progress", color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
  completed:     { label: "Completed",   color: "#6366f1", bg: "rgba(99,102,241,0.1)"  },
};

const cardGradients = [
  "135deg, #0057d9 0%, #0ea5e9 100%",
  "135deg, #7c3aed 0%, #8b5cf6 100%",
  "135deg, #0891b2 0%, #06b6d4 100%",
  "135deg, #059669 0%, #10b981 100%",
  "135deg, #b45309 0%, #f59e0b 100%",
  "135deg, #be185d 0%, #ec4899 100%",
  "135deg, #4338ca 0%, #6366f1 100%",
];

/* ── Detail Modal ───────────────────────────────────────────── */
function ProjectModal({
  project,
  gradientIndex,
  onClose,
}: {
  project: Project;
  gradientIndex: number;
  onClose: () => void;
}) {
  const status = statusConfig[project.status];

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Gradient header */}
        <div
          style={{
            height: "130px",
            background: `linear-gradient(${cardGradients[gradientIndex % cardGradients.length]})`,
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px 24px 0 0",
            flexShrink: 0,
          }}
        >
          <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={48} color="rgba(255,255,255,0.2)" />
          </div>
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(0,0,0,0.35)", border: "none",
              color: "white", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            <X size={15} />
          </button>
          {/* Status badge */}
          <div style={{ position: "absolute", bottom: "0.9rem", left: "1.25rem" }}>
            <span style={{
              fontSize: "0.68rem", fontWeight: 600, padding: "0.22rem 0.6rem",
              borderRadius: "999px", background: status.bg, color: status.color,
              border: `1px solid ${status.color}33`, backdropFilter: "blur(4px)",
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: status.color }} />
              {status.label}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ padding: "1.5rem 1.75rem 2rem", overflowY: "auto" }}>
          {/* Project tag */}
          <span style={{
            fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "var(--accent-primary)",
            display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.4rem",
          }}>
            <Tag size={10} /> {project.projectTag}
          </span>

          <h2 style={{
            fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)",
            letterSpacing: "-0.025em", marginBottom: "0.25rem",
          }}>
            {project.title}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 500, marginBottom: "1rem" }}>
            {project.subtitle}
          </p>

          <p style={{
            fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem",
          }}>
            {project.longDescription}
          </p>

          {/* Key Metrics / Achievements */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{
              fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.6rem",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              <BarChart2 size={11} /> Key Highlights
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {project.metrics.map((m) => (
                <li key={m} style={{
                  display: "flex", alignItems: "flex-start", gap: "0.6rem",
                  padding: "0.5rem 0.75rem", borderRadius: "10px",
                  background: "var(--accent-subtle)", border: "1px solid var(--accent-light)",
                  fontSize: "0.82rem", color: "var(--text-secondary)",
                }}>
                  <div style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: "var(--accent-primary)", marginTop: "0.45em", flexShrink: 0,
                  }} />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{
              fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.6rem",
            }}>
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} className="tech-badge" style={{ fontSize: "0.76rem" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="btn-accent" style={{ fontSize: "0.85rem" }}>
                <ExternalLink size={14} /> Live Site
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="btn-ghost" style={{ fontSize: "0.85rem" }}>
                <GitBranch size={14} /> View Code
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span style={{
                fontSize: "0.8rem", color: "var(--text-muted)",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <Lock size={13} />
                {project.status === "in-progress" ? "In active development" : "Code available on request"}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project Card ───────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project, idx: number) => void;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-40px" });
  const status  = statusConfig[project.status];

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const r  = cardRef.current.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      setTilt({
        x: ((e.clientY - r.top  - cy) / cy) * -3,
        y: ((e.clientX - r.left - cx) / cx) *  3,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6, ease: "easeOut" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card"
        style={{
          display: "flex", flexDirection: "column", height: "100%",
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease",
        }}
      >
        {/* Gradient image area */}
        <div className="project-card-img" style={{
          height: "190px",
          background: `linear-gradient(${cardGradients[index % cardGradients.length]})`,
          position: "relative", overflow: "hidden", flexShrink: 0,
        }}>
          <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={52} color="rgba(255,255,255,0.2)" />
          </div>
          {/* Status */}
          <div style={{ position: "absolute", top: "0.9rem", left: "0.9rem" }}>
            <span style={{
              fontSize: "0.68rem", fontWeight: 600, padding: "0.22rem 0.6rem",
              borderRadius: "999px", background: status.bg, color: status.color,
              border: `1px solid ${status.color}33`, backdropFilter: "blur(4px)",
              display: "flex", alignItems: "center", gap: "0.3rem",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: status.color }} />
              {status.label}
            </span>
          </div>
          {/* Featured */}
          {project.featured && (
            <div style={{ position: "absolute", top: "0.9rem", right: "0.9rem" }}>
              <span style={{
                fontSize: "0.68rem", fontWeight: 600, padding: "0.22rem 0.6rem",
                borderRadius: "999px", background: "rgba(255,255,255,0.18)",
                color: "white", backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}>
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Project tag */}
          <span style={{
            fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.09em", color: "var(--accent-primary)",
            marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.3rem",
          }}>
            <Tag size={9} /> {project.projectTag}
          </span>

          <h2 style={{
            fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)",
            marginBottom: "0.3rem", letterSpacing: "-0.02em",
          }}>
            {project.title}
          </h2>
          <p style={{ fontSize: "0.78rem", color: "var(--accent-primary)", fontWeight: 500, marginBottom: "0.7rem" }}>
            {project.subtitle}
          </p>
          <p style={{
            fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.6,
            marginBottom: "1rem", flex: 1,
          }}>
            {project.description}
          </p>

          {/* Tags — first 4 only */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.1rem" }}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tech-badge" style={{ fontSize: "0.7rem" }}>{tag}</span>
            ))}
            {project.tags.length > 4 && (
              <span className="tech-badge" style={{ fontSize: "0.7rem" }}>+{project.tags.length - 4}</span>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "auto" }}>
            <button
              onClick={() => onOpen(project, index)}
              className="btn-accent"
              style={{ flex: 1, justifyContent: "center", padding: "0.5rem", fontSize: "0.8rem" }}
            >
              View Details
            </button>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{ justifyContent: "center", padding: "0.5rem 0.75rem", fontSize: "0.8rem" }}
                aria-label="Live site"
              >
                <ExternalLink size={14} />
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span style={{
                fontSize: "0.75rem", color: "var(--text-muted)",
                display: "flex", alignItems: "center", gap: "0.3rem",
              }}>
                <Clock size={12} />
                {project.status === "in-progress" ? "Coming soon" : "Private"}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeProject, setActiveProject] = useState<{ project: Project; index: number } | null>(null);
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
              Real-world applications — from a production health-tech portal serving hospitals
              across Pakistan, to AI-powered tools, mobile apps, and academic projects.
            </p>
          </motion.div>

          {/* Filter Tabs — horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="filter-row"
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              marginTop: "2rem", overflowX: "auto", paddingBottom: "0.25rem",
            }}
          >
            <Filter size={15} style={{ color: "var(--text-muted)", flexShrink: 0, marginRight: "0.15rem" }} />
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                style={{
                  padding: "0.4rem 0.9rem", borderRadius: "999px",
                  fontSize: "0.83rem", fontWeight: 500, cursor: "pointer",
                  transition: "all 0.2s ease", border: "1.5px solid", flexShrink: 0,
                  borderColor: activeFilter === cat.key ? "var(--accent-primary)" : "var(--border-default)",
                  background:  activeFilter === cat.key ? "var(--accent-subtle)"  : "transparent",
                  color:       activeFilter === cat.key ? "var(--accent-primary)" : "var(--text-secondary)",
                  whiteSpace: "nowrap",
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
            gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
            gap: "1.75rem",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={(p, idx) => setActiveProject({ project: p, index: idx })}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject.project}
            gradientIndex={activeProject.index}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .filter-row::-webkit-scrollbar { display: none; }
        .filter-row { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 480px) {
          .project-card-img { height: 160px !important; }
        }
      `}</style>
    </div>
  );
}
