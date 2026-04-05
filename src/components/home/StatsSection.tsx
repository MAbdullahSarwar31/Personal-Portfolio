"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data";

// Cubic ease-out: decelerates naturally
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedCount({ value, suffix }: { value: string; suffix: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Special values like "#2" — show as-is
    if (value.startsWith("#")) {
      setDisplay(value);
      return;
    }

    const num = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(num)) { setDisplay(value); return; }

    const duration = 1600; // ms
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(eased * num);
      setDisplay(String(current));

      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(String(num));
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {value.startsWith("#") ? display : display + suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      style={{
        padding: "5rem 0",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-default)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <div className="container" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              style={{
                padding: "2rem 1rem",
                borderRadius: "16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              whileHover={{
                boxShadow: "var(--shadow-md)",
                borderColor: "rgba(59,130,246,0.25)",
              }}
            >
              <div className="stat-number">
                <AnimatedCount value={stat.value} suffix={stat.suffix} />
              </div>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
