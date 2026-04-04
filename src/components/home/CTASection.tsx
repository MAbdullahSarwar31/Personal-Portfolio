"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section"
      style={{
        background: "var(--bg-primary)",
        textAlign: "center",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "4rem 2rem",
            borderRadius: "24px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-lg)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div style={{
            position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,87,217,0.12) 0%, transparent 70%)",
            filter: "blur(30px)", zIndex: 0,
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "60px", height: "60px", borderRadius: "16px",
                background: "var(--gradient-accent)",
                boxShadow: "var(--shadow-accent)",
                marginBottom: "1.5rem",
              }}
            >
              <Sparkles size={28} color="white" />
            </motion.div>

            <h2 className="section-title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
              Let&apos;s Build Something
              <br />
              <span className="gradient-text">Remarkable Together</span>
            </h2>

            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem", fontSize: "1rem" }}>
              I&apos;m open to exciting opportunities — freelance projects, full-time roles,
              or interesting collaborations at the intersection of engineering and AI.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-accent">
                <Mail size={16} /> Get in Touch
              </Link>
              <Link href="/projects" className="btn-ghost">
                View My Work <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
