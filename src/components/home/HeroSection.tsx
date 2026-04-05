"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, Download, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";

const ROLES = [
  "Full Stack Developer",
  "AI Integration Engineer",
  "MERN Stack Specialist",
  "Flutter & Mobile Developer",
];

const floatingBadges = [
  { label: "React",    x: "8%",   y: "22%",  delay: 0    },
  { label: "Next.js",  x: "84%",  y: "18%",  delay: 0.3  },
  { label: "Node.js",  x: "5%",   y: "68%",  delay: 0.6  },
  { label: "OpenAI",   x: "81%",  y: "64%",  delay: 0.9  },
  { label: "MongoDB",  x: "50%",  y: "88%",  delay: 1.2  },
];

function TypeWriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const role = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === role) {
      timeout = setTimeout(() => setDeleting(true), 3000);
    } else if (deleting && text === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    } else {
      timeout = setTimeout(
        () =>
          setText((prev) =>
            deleting ? prev.slice(0, -1) : role.slice(0, prev.length + 1)
          ),
        deleting ? 40 : 75
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      {text}
      <span
        style={{
          color: "var(--accent-primary)",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s",
          fontWeight: 400,
        }}
      >
        |
      </span>
    </span>
  );
}

export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 50]);
  const textY  = useTransform(scrollY, [0, 600], [0, 20]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current || !spotlightRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlightRef.current.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(59,130,246,0.07), transparent 50%)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = "transparent";
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "calc(100vh - 68px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background: "var(--gradient-hero)",
      }}
    >
      {/* Mouse spotlight */}
      <div ref={spotlightRef} className="spotlight-layer" />

      {/* Animated mesh gradient blobs */}
      <div
        className="mesh-blob"
        style={{
          width: "520px", height: "520px",
          top: "5%", left: "5%",
          background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
          animation: "mesh-blob-1 18s ease-in-out infinite",
        }}
      />
      <div
        className="mesh-blob"
        style={{
          width: "400px", height: "400px",
          bottom: "10%", right: "5%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          animation: "mesh-blob-2 22s ease-in-out infinite",
        }}
      />
      <div
        className="mesh-blob"
        style={{
          width: "300px", height: "300px",
          top: "40%", left: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          animation: "mesh-blob-3 16s ease-in-out infinite",
        }}
      />

      {/* Background grid overlay */}
      <div
        className="bg-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.25, zIndex: 0 }}
      />

      {/* Radial vignette */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, var(--bg-primary) 100%)",
        }}
      />

      {/* Floating tech badges */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.label}
          style={{ position: "absolute", left: badge.x, top: badge.y, zIndex: 2 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: badge.delay + 0.8, duration: 0.5 },
            scale:   { delay: badge.delay + 0.8, duration: 0.5 },
            y: { delay: badge.delay + 1.2, duration: 3 + badge.delay, repeat: Infinity, ease: "easeInOut" },
          }}
          className="hidden lg:block"
        >
          <span className="glass tech-badge" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
            {badge.label}
          </span>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="container" style={{ position: "relative", zIndex: 3, paddingTop: "2rem", paddingBottom: "4rem" }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">

          {/* Left: Profile Photo with parallax */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", damping: 20 }}
            className="w-full lg:w-5/12 max-w-[300px] sm:max-w-[380px] lg:max-w-[420px] mx-auto lg:mx-0 order-last lg:order-first"
          >
            <div
              className="hero-photo-frame"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/5",
                borderRadius: "32px",
                padding: "3px",
                background: "var(--gradient-text)",
              }}
            >
              {/* Glow halo behind the frame */}
              <div
                style={{
                  position: "absolute", inset: "-4px", borderRadius: "36px",
                  background: "var(--gradient-accent)", opacity: 0.4, filter: "blur(24px)", zIndex: -1,
                }}
              />
              <div
                style={{
                  width: "100%", height: "100%", borderRadius: "29px",
                  overflow: "hidden", position: "relative", background: "var(--bg-card)",
                }}
              >
                <Image
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 1024px) 90vw, 420px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Text Content with parallax */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", damping: 20 }}
            className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Available badge */}
            {siteConfig.availableForWork && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-6"
              >
                <div
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.4rem 1rem",
                    borderRadius: "999px",
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    fontSize: "0.8rem", fontWeight: 600,
                    color: "#10b981",
                  }}
                >
                  <span
                    style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "#10b981", flexShrink: 0,
                    }}
                    className="animate-breathing-glow"
                  />
                  Available for new opportunities
                </div>
              </motion.div>
            )}

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                color: "var(--text-primary)",
              }}
            >
              Muhammad{" "}
              <span className="gradient-text">Abdullah</span>
              <br />
              Sarwar
            </motion.h1>

            {/* Typing role animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                color: "var(--text-secondary)",
                fontWeight: 600,
                marginBottom: "1rem",
                letterSpacing: "-0.01em",
                minHeight: "1.8em",
              }}
            >
              <TypeWriter />
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-2 mb-6 text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              <MapPin size={14} />
              {siteConfig.location}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                color: "var(--text-secondary)",
                maxWidth: "580px",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
              }}
            >
              Sole developer at{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                Medquad Health Solutions
              </span>{" "}
              — shipping production health-tech for hospitals across Pakistan. MERN stack,
              real-time systems, cloud infrastructure, and AI that runs in the real world.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="hero-cta-group"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <Link href="/projects" className="btn-accent hero-cta-btn">
                View My Work <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => document.getElementById("chat-widget-btn")?.click()}
                className="btn-ghost hero-cta-btn"
              >
                <Bot size={16} /> Chat with my AI
              </button>
              <a
                href={siteConfig.resumeUrl}
                download="Muhammad_Abdullah_Sarwar_Resume.pdf"
                className="btn-ghost"
                style={{ padding: "0.6rem 1rem", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
                aria-label="Download Resume"
              >
                <Download size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
