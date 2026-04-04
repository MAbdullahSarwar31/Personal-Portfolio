"use client";

import Link from "next/link";
import { GitBranch, ExternalLink, Mail, Code2, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";

const footerLinks = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

const socialLinks = [
  { label: "GitHub",   href: siteConfig.github,   icon: GitBranch,    color: "#e2e8f0" },
  { label: "LinkedIn", href: siteConfig.linkedin,  icon: ExternalLink, color: "#0a66c2" },
  { label: "Email",    href: `mailto:${siteConfig.email}`, icon: Mail, color: "#3b82f6" },
];

export function Footer() {
  return (
    <footer
      className="footer-gradient-border"
      style={{
        background: "var(--bg-secondary)",
        padding: "3.5rem 0 1.5rem",
      }}
    >
      <div className="container">
        {/* 3-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-columns"
        >
          {/* Col 1: Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: "var(--gradient-accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(59,130,246,0.2)",
                }}
              >
                <Code2 size={17} color="white" />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                {siteConfig.shortName}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                maxWidth: "280px",
                lineHeight: 1.65,
                marginBottom: "1rem",
              }}
            >
              {siteConfig.tagline}
            </p>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                fontSize: "0.8rem", color: "var(--text-muted)",
              }}
            >
              <MapPin size={13} />
              {siteConfig.location}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p
              style={{
                fontSize: "0.72rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.12em",
                color: "var(--text-muted)", marginBottom: "1rem",
              }}
            >
              Navigation
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-nav-link"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social */}
          <div>
            <p
              style={{
                fontSize: "0.72rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.12em",
                color: "var(--text-muted)", marginBottom: "1rem",
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {socialLinks.map(({ label, href, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.6rem",
                    fontSize: "0.875rem", color: "var(--text-muted)",
                    textDecoration: "none", fontWeight: 500,
                    transition: "color 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "32px", height: "32px", borderRadius: "9px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-default)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                    className="social-icon-box"
                    data-color={color}
                  >
                    <Icon size={15} />
                  </div>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-default)",
            paddingTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Muhammad Abdullah Sarwar. All rights reserved.
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Built with Next.js &amp; Framer Motion
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer-nav-link:hover  { color: var(--accent-primary) !important; }
        .footer-social-link:hover { color: var(--text-primary) !important; }
        @media (max-width: 768px) {
          .footer-columns { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  );
}
