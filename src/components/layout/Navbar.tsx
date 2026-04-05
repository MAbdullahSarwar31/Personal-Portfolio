"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  /* ── Scroll handler ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* ── Escape key closes menu ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ── Lock body scroll when menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggle = useCallback(() => setMenuOpen((v) => !v), []);
  const close  = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ── Fixed header bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          right:         0,
          zIndex:        200,
          background:    scrolled ? "rgba(15,23,42,0.92)" : "rgba(15,23,42,1)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:  scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition:    "background 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        <div
          className="container"
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            height:         "68px",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.65rem", flexShrink: 0 }}
          >
            <motion.div
              whileHover={{ scale: 1.06 }}
              style={{
                width: "38px", height: "38px", borderRadius: "11px",
                background: "#3b82f6",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
                flexShrink: 0,
              }}
            >
              <Code2 size={19} color="white" />
            </motion.div>
            {/* Full name on desktop, short on mobile */}
            <span
              className="hidden sm:inline"
              style={{ fontWeight: 700, fontSize: "1rem", color: "white", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
            >
              {siteConfig.shortName}
            </span>
            <span
              className="sm:hidden"
              style={{ fontWeight: 700, fontSize: "0.95rem", color: "white", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
            >
              M. Abdullah Sarwar
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2.5rem" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#3b82f6" : "rgba(148,163,184,1)",
                    textDecoration: "none",
                    position: "relative",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={(e) => { if (!isActive) e.currentTarget.style.color = "white"; }}
                  onMouseOut={(e)  => { if (!isActive) e.currentTarget.style.color = "rgba(148,163,184,1)"; }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      style={{
                        position: "absolute", bottom: "-4px", left: 0, right: 0,
                        height: "2px", background: "#3b82f6", borderRadius: "2px",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Hire Me button ── */}
          <Link
            href="/contact"
            className="hidden md:inline-flex"
            style={{
              background: "#3b82f6", color: "white",
              padding: "0.55rem 1.2rem", borderRadius: "10px",
              fontWeight: 600, fontSize: "0.88rem",
              textDecoration: "none", transition: "all 0.2s ease",
              alignItems: "center", gap: "0.4rem", whiteSpace: "nowrap",
              minHeight: "40px",
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={(e)  => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Hire Me
          </Link>

          {/* ── Mobile hamburger button ── */}
          <button
            className="md:hidden"
            onClick={toggle}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px",
              padding: "0.5rem",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              flexShrink: 0,
              transition: "background 0.2s ease",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex" }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate:  90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex" }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile overlay backdrop ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 150,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile slide-in drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            style={{
              position:   "fixed",
              top:        0,
              right:      0,
              bottom:     0,
              width:      "min(320px, 85vw)",
              zIndex:     199,
              background: "rgba(8,12,20,0.98)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              display:    "flex",
              flexDirection: "column",
              padding:    "1rem 1.5rem 2rem",
              gap:        "0.5rem",
              overflowY:  "auto",
            }}
            aria-label="Mobile navigation"
          >
            {/* Drawer header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", paddingTop: "0.75rem" }}>
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "rgba(148,163,184,0.7)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Navigation
              </span>
              <button
                onClick={close}
                aria-label="Close menu"
                style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px", color: "white", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "34px", height: "34px",
                }}
              >
                <X size={17} />
              </button>
            </div>

            {/* Nav links */}
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.9rem 1.1rem",
                      borderRadius: "12px",
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "1.05rem",
                      color: isActive ? "#3b82f6" : "rgba(241,245,249,0.85)",
                      background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                      minHeight: "52px",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "0.5rem 0" }} />

            {/* Hire Me CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 + 0.05, duration: 0.3 }}
            >
              <Link
                href="/contact"
                onClick={close}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", padding: "0.9rem 1.25rem", borderRadius: "12px",
                  background: "linear-gradient(135deg,#3b82f6,#0ea5e9)",
                  color: "white", fontWeight: 700, fontSize: "1rem",
                  textDecoration: "none", minHeight: "52px",
                  boxShadow: "0 8px 30px rgba(59,130,246,0.25)",
                  transition: "filter 0.2s ease",
                }}
              >
                Hire Me
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Content spacer ── */}
      <div style={{ height: "68px" }} />
    </>
  );
}
