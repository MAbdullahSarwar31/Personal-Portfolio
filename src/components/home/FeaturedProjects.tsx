"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, GitBranch, Zap, X, BarChart2, Tag, Lock } from "lucide-react";
import { featuredProjects, type Project } from "@/lib/data";

const statusConfig = {
  live:          { label: "Live",        color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  "in-progress": { label: "In Progress", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  completed:     { label: "Completed",   color: "#6366f1", bg: "rgba(99,102,241,0.1)"  },
};

const cardGradients = [
  "135deg, #0057d9 0%, #0ea5e9 100%",
  "135deg, #7c3aed 0%, #8b5cf6 100%",
  "135deg, #0891b2 0%, #06b6d4 100%",
];

/* ── Case Study Modal ───────────────────────────────────────── */
function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
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
            height: "140px",
            background: `linear-gradient(${cardGradients[featuredProjects.indexOf(project) % cardGradients.length]})`,
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px 24px 0 0",
          }}
        >
          <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Zap size={52} color="rgba(255,255,255,0.25)" />
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(0,0,0,0.3)", border: "none",
              color: "white", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            <X size={16} />
          </button>
          <div style={{ position: "absolute", bottom: "1rem", left: "1.5rem" }}>
            <span
              style={{
                fontSize: "0.7rem", fontWeight: 600, padding: "0.25rem 0.65rem",
                borderRadius: "999px", background: status.bg, color: status.color,
                border: `1px solid ${status.color}33`, backdropFilter: "blur(4px)",
                display: "inline-flex", alignItems: "center", gap: "0.3rem",
              }}
            >
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: status.color }} />
              {status.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.75rem 2rem 2rem" }}>
          <span
            style={{
              fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.08em", color: "var(--accent-primary)",
              display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.4rem",
            }}
          >
            <Tag size={10} /> {project.projectTag}
          </span>
          <h2
            style={{
              fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)",
              letterSpacing: "-0.02em", marginBottom: "0.3rem",
            }}
          >
            {project.title}
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--accent-primary)", fontWeight: 500, marginBottom: "1.25rem" }}>
            {project.subtitle}
          </p>

          <p
            style={{
              fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            {project.longDescription}
          </p>

          {/* Metrics */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.6rem",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}
            >
              <BarChart2 size={12} /> Key Metrics
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "0.5rem",
              }}
            >
              {project.metrics.map((m) => (
                <div
                  key={m}
                  style={{
                    padding: "0.5rem 0.75rem", borderRadius: "10px",
                    background: "var(--accent-subtle)", border: "1px solid var(--accent-light)",
                    fontSize: "0.8rem", color: "var(--text-secondary)",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                  }}
                >
                  <div
                    style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: "var(--accent-primary)", flexShrink: 0,
                    }}
                  />
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* Full tech stack */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p
              style={{
                fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.6rem",
              }}
            >
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} className="tech-badge" style={{ fontSize: "0.78rem" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
                style={{ fontSize: "0.85rem" }}
              >
                <ExternalLink size={14} /> Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ fontSize: "0.85rem" }}
              >
                <GitBranch size={14} /> View Code
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span
                style={{
                  fontSize: "0.8rem", color: "var(--text-muted)",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                }}
              >
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
  onCaseStudy,
}: {
  project: Project;
  index: number;
  onCaseStudy: (p: Project) => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const status = statusConfig[project.status];

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rafTilt = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafTilt.current) cancelAnimationFrame(rafTilt.current);
    rafTilt.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      setTilt({
        x: ((y - cy) / cy) * -4,
        y: ((x - cx) / cx) * 4,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafTilt.current) cancelAnimationFrame(rafTilt.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease",
        }}
      >
        {/* Image area */}
        <div
          style={{
            height: "200px",
            background: `linear-gradient(${cardGradients[index % cardGradients.length]})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Zap size={48} color="rgba(255,255,255,0.3)" />
          </div>
          {/* Status badge */}
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <span
              style={{
                fontSize: "0.7rem", fontWeight: 600, padding: "0.25rem 0.65rem",
                borderRadius: "999px", background: status.bg, color: status.color,
                border: `1px solid ${status.color}33`, backdropFilter: "blur(4px)",
                display: "flex", alignItems: "center", gap: "0.3rem",
              }}
            >
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: status.color }} />
              {status.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.08em", color: "var(--accent-primary)", marginBottom: "0.35rem",
              display: "flex", alignItems: "center", gap: "0.3rem",
            }}
          >
            <Tag size={9} /> {project.projectTag}
          </span>

          <h3
            style={{
              fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)",
              marginBottom: "0.35rem", letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 500, marginBottom: "0.75rem" }}>
            {project.subtitle}
          </p>
          <p
            style={{
              fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6,
              marginBottom: "1rem", flex: 1,
            }}
          >
            {project.description}
          </p>

          {/* Metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "1rem" }}>
            {project.metrics.map((m) => (
              <div
                key={m}
                style={{
                  display: "flex", alignItems: "center", gap: "0.45rem",
                  fontSize: "0.78rem", color: "var(--text-secondary)",
                }}
              >
                <div
                  style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: "var(--accent-primary)", flexShrink: 0,
                  }}
                />
                {m}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tech-badge" style={{ fontSize: "0.72rem" }}>{tag}</span>
            ))}
            {project.tags.length > 4 && (
              <span className="tech-badge" style={{ fontSize: "0.72rem" }}>+{project.tags.length - 4}</span>
            )}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <button
              onClick={() => onCaseStudy(project)}
              className="btn-accent"
              style={{ flex: 1, justifyContent: "center", padding: "0.5rem", fontSize: "0.8rem" }}
            >
              View Case Study
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ justifyContent: "center", padding: "0.5rem 0.75rem", fontSize: "0.8rem" }}
                aria-label="Live Site"
              >
                <ExternalLink size={14} />
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span
                style={{
                  fontSize: "0.78rem", color: "var(--text-muted)",
                  display: "flex", alignItems: "center", gap: "0.3rem",
                }}
              >
                <Lock size={13} />
                {project.status === "in-progress" ? "Coming soon" : "Private"}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Featured Projects Section ──────────────────────────────── */
export function FeaturedProjects() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        {/* Header */}
        <div ref={ref} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label" style={{ justifyContent: "center" }}>
              <Zap size={14} /> Featured Work
            </p>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
              Projects I&apos;m proud of
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              A selection of real-world projects — from health-tech platforms to AI-powered applications.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "1.75rem",
          }}
        >
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onCaseStudy={setActiveProject}
            />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <Link href="/projects" className="btn-ghost">
            View All Projects <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
