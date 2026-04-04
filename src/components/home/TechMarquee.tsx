"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { techStack } from "@/lib/data";
import { Layers } from "lucide-react";

export function TechMarquee() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  // Duplicate for seamless loop
  const items = [...techStack, ...techStack];

  return (
    <section style={{ padding: "4rem 0", background: "var(--bg-secondary)", overflow: "hidden",
      borderTop: "1px solid var(--border-default)", borderBottom: "1px solid var(--border-default)" }}>
      <div className="container" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-label"
          style={{ justifyContent: "center", marginBottom: "1.75rem" }}
        >
          <Layers size={14} /> Technologies I Work With
        </motion.p>
      </div>

      {/* Marquee container */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Fade masks */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
          background: "linear-gradient(90deg, var(--bg-secondary), transparent)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
          background: "linear-gradient(-90deg, var(--bg-secondary), transparent)" }} />

        <div
          className="animate-marquee"
          style={{ display: "flex", gap: "1rem", width: "max-content", padding: "0.5rem 0" }}
        >
          {items.map((tech, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.5rem 1.25rem",
                borderRadius: "999px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
                fontSize: "0.85rem", fontWeight: 500,
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
                cursor: "default",
                boxShadow: "var(--shadow-sm)",
                transition: "color 0.2s ease",
              }}
              className="marquee-item"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-item:hover { color: var(--accent-primary) !important; }
      `}</style>
    </section>
  );
}
