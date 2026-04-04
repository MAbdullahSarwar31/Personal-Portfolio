"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, GitBranch, ExternalLink, MapPin, MessageSquare, Send } from "lucide-react";
import { siteConfig } from "@/lib/data";
import toast, { Toaster } from "react-hot-toast";

const socialLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    href:  `mailto:${siteConfig.email}`,
    icon:  Mail,
    color: "#0057d9",
  },
  {
    label: "GitHub",
    value: "@yourusername",
    href:  siteConfig.github,
    icon:  GitBranch,
    color: "#94a3b8",
  },
  {
    label: "LinkedIn",
    value: "Muhammad Abdullah Sarwar",
    href:  siteConfig.linkedin,
    icon:  ExternalLink,
    color: "#0077b5",
  },
];

type Status = "idle" | "loading";

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true });

  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Replace with your actual API call / EmailJS / Resend
      await new Promise((r) => setTimeout(r, 1500));
      toast.success("Message sent! I\u2019ll get back to you within 24 hours.", {
        duration: 5000,
        style: {
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: "12px",
          fontSize: "0.875rem",
        },
        iconTheme: { primary: "#10b981", secondary: "white" },
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.", {
        duration: 4000,
        style: {
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: "12px",
          fontSize: "0.875rem",
        },
      });
    } finally {
      setStatus("idle");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid var(--border-default)",
    background: "var(--bg-tertiary)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingBottom: "5rem" }}>
      <Toaster position="top-right" />

      {/* Header */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-default)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">
              <MessageSquare size={14} /> Contact
            </p>
            <h1 className="section-title" style={{ marginBottom: "1rem" }}>
              Let&apos;s <span className="gradient-text">Work Together</span>
            </h1>
            <p className="section-subtitle">
              Open to exciting opportunities — freelance, full-time roles, or interesting
              collaborations. Drop a message and I&apos;ll get back to you promptly.
            </p>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)",
              }}
            >
              <MapPin size={14} />
              {siteConfig.location} &nbsp;&middot;&nbsp; Usually responds within 24 hours
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "4rem" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "3rem", alignItems: "start" }}
          className="contact-grid"
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div
              style={{
                padding: "2.5rem",
                border: "1px solid var(--border-default)",
                borderRadius: "20px",
                background: "var(--bg-card)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem", fontWeight: 700,
                  color: "var(--text-primary)", marginBottom: "1.75rem",
                }}
              >
                Send a Message
              </h2>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
                  className="form-cols"
                >
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem", fontWeight: 600,
                        color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem",
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text" name="name" required value={form.name}
                      onChange={handleChange} placeholder="John Smith"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; }}
                      onBlur={(e)  => { e.target.style.borderColor = "var(--border-default)"; }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem", fontWeight: 600,
                        color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email" name="email" required value={form.email}
                      onChange={handleChange} placeholder="john@company.com"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; }}
                      onBlur={(e)  => { e.target.style.borderColor = "var(--border-default)"; }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "0.8rem", fontWeight: 600,
                      color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem",
                    }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text" name="subject" required value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry / Collaboration / Job opportunity"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "var(--border-default)"; }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "0.8rem", fontWeight: 600,
                      color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message" required value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={6}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "var(--border-default)"; }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, filter: "brightness(1.08)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-accent"
                  style={{
                    justifyContent: "center", padding: "0.85rem",
                    fontSize: "0.95rem", opacity: status === "loading" ? 0.7 : 1,
                  }}
                >
                  {status === "loading" ? "Sending..." : <><Send size={16} /> Send Message</>}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h2
              style={{
                fontSize: "1.1rem", fontWeight: 700,
                color: "var(--text-primary)", marginBottom: "0.25rem",
              }}
            >
              Other ways to reach me
            </h2>
            <p
              style={{
                fontSize: "0.875rem", color: "var(--text-secondary)",
                marginBottom: "0.5rem", lineHeight: 1.6,
              }}
            >
              Prefer to connect directly? Reach out through any of these channels.
            </p>

            {socialLinks.map(({ label, value, href, icon: Icon, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 4 }}
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1rem 1.25rem", borderRadius: "14px",
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-card)", textDecoration: "none",
                  transition: "all 0.2s ease", boxShadow: "var(--shadow-sm)",
                }}
                className="social-card"
              >
                <div
                  style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    background: `${color}15`, border: `1px solid ${color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)",
                      textTransform: "uppercase", letterSpacing: "0.07em",
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Available badge */}
            <div
              style={{
                marginTop: "0.5rem", padding: "1.25rem", borderRadius: "14px",
                background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <div
                  style={{
                    width: "8px", height: "8px", borderRadius: "50%", background: "#10b981",
                  }}
                  className="animate-breathing-glow"
                />
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#10b981" }}>
                  Available for Work
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Open to freelance projects, full-time roles, and exciting collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .social-card:hover {
          border-color: var(--accent-primary) !important;
          box-shadow: var(--shadow-md) !important;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-cols    { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
