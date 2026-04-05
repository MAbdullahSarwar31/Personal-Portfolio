"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";

const testimonials = [
  {
    initials: "AT",
    name: "Ahmed Tariq",
    role: "Senior Tech Lead",
    company: "Medquad Health Solutions",
    color: "#3b82f6",
    stars: 5,
    quote:
      "Abdullah transformed how our entire team operates. The internal portal he built is used daily by everyone, and the WhatsApp integration alone saved us hours every week. The AI chatbot he&#39;s architecting is going to be a genuine game-changer for our customer support pipeline.",
  },
  {
    initials: "FI",
    name: "Dr. Farrukh Iqbal",
    role: "Associate Professor",
    company: "Bahria University Islamabad",
    color: "#7c3aed",
    stars: 5,
    quote:
      "The FYP Management System Abdullah developed was truly exceptional — it solved a real pain point that faculty and students had lived with for years. The engineering quality, edge-case handling, and live demo performance earned it second place out of fifty competing projects.",
  },
  {
    initials: "SM",
    name: "Sarah M.",
    role: "Freelance Client",
    company: "E-commerce Startup",
    color: "#06b6d4",
    stars: 5,
    quote:
      "Hired Abdullah for a React dashboard project and was genuinely impressed. He delivered clean, production-ready code ahead of schedule, communicated clearly at every step, and added micro-interactions that made the UI feel truly polished. Will absolutely work with him again.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="star-rating">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label" style={{ justifyContent: "center" }}>
              <MessageSquare size={14} /> Social Proof
            </p>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
              What people{" "}
              <span className="gradient-text">say</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Feedback from colleagues, professors, and clients who have worked with me directly.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="testimonial-card"
            >
              {/* Large quotation mark */}
              <div
                style={{
                  fontSize: "4.5rem",
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                  color: t.color,
                  opacity: 0.25,
                  marginBottom: "0.25rem",
                  marginTop: "-0.5rem",
                  userSelect: "none",
                }}
                aria-hidden
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div style={{ marginBottom: "1rem" }}>
                <StarRating count={t.stars} />
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                }}
                dangerouslySetInnerHTML={{ __html: t.quote }}
              />

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: `${t.color}22`,
                    border: `2px solid ${t.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: t.color,
                    flexShrink: 0,
                    letterSpacing: "0.03em",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "0.1rem",
                    }}
                  >
                    {t.name}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {t.role} &middot; {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
