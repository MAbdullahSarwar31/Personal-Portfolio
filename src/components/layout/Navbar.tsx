"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { href: "/",         label: "Home"     },
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(15, 23, 42, 0.85)" : "rgba(15, 23, 42, 1)", // Dark navy slate matches the image
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: "40px", height: "40px",
                borderRadius: "12px",
                background: "#3b82f6", // Solid blue from reference
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.2)",
              }}
            >
              <Code2 size={20} color="white" />
            </motion.div>
            <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "white", letterSpacing: "-0.01em" }}>
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Right Group: Nav + Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            
            {/* Desktop Nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hidden md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#3b82f6" : "var(--text-secondary)",
                      textDecoration: "none",
                      position: "relative",
                      transition: "color 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      if(!isActive) e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      if(!isActive) e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        style={{
                          position: "absolute",
                          bottom: "-4px",
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: "#3b82f6",
                          borderRadius: "2px"
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link href="/contact" className="hidden md:inline-flex" style={{
                background: "#3b82f6",
                color: "white",
                padding: "0.6rem 1.25rem",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
              onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
              >
                Hire Me
              </Link>

            {/* Mobile Hamburger Menu */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "0.5rem",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "flex",
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "68px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "var(--bg-card)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border-default)",
              padding: "1rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: pathname === link.href ? "var(--accent-primary)" : "var(--text-primary)",
                    background: pathname === link.href ? "var(--accent-subtle)" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div style={{ marginTop: "0.75rem" }}>
              <Link href="/contact" className="btn-accent" style={{ width: "100%", justifyContent: "center" }}>
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to push content below fixed nav */}
      <div style={{ height: "68px" }} />
    </>
  );
}
