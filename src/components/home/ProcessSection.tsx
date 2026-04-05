"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Layers, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Understand the problem, map user flows, define scope, and plan the architecture before writing a single line of code.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Design",
    description:
      "Sketch out component hierarchy, data models, and API contracts. Eliminate ambiguity before development starts, not during.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Develop",
    description:
      "Write clean, typed, production-ready code — with performance and maintainability as first-class concerns, built iteratively.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deploy",
    description:
      "Ship to production with CI/CD, monitor performance, collect feedback, and iterate — because great products are never finished.",
  },
];

export function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="section"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-default)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label" style={{ justifyContent: "center" }}>
              <Code2 size={14} /> How I Work
            </p>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
              From idea to{" "}
              <span className="gradient-text">production</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              A disciplined four-step process that keeps projects on track, on scope, and shipped on time.
            </p>
          </motion.div>
        </div>

        {/* Steps grid */}
        <div style={{ position: "relative" }}>
          {/* Dashed connector line — desktop only */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: "2.75rem",
              left: "calc(12.5% + 1rem)",
              right: "calc(12.5% + 1rem)",
              height: "1px",
              borderTop: "2px dashed var(--border-strong)",
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
              gap: "1.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="process-card"
                >
                  {/* Step number + icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        background: "var(--gradient-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "var(--shadow-accent)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} color="white" />
                    </div>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--accent-primary)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "0.6rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
