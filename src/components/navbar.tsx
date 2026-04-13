"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { sections } from "@/lib/translations";

const NAV_HREFS = ["#case-studies", "#tools", "#stack", "#about", "#cta"] as const;

const SECTION_IDS = NAV_HREFS.map((href) => href.slice(1));

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const indicatorRef                      = useRef<string>("");

  const NAV_ITEMS = [
    { label: t(sections.navProjects.en, sections.navProjects.es), href: "#case-studies" },
    { label: t(sections.navTools.en,    sections.navTools.es),    href: "#tools"        },
    { label: t(sections.navStack.en,    sections.navStack.es),    href: "#stack"        },
    { label: t(sections.navAbout.en,    sections.navAbout.es),    href: "#about"        },
    { label: t(sections.navContact.en,  sections.navContact.es),  href: "#cta"          },
  ];

  // ------------------------------------------------------------------
  // Scroll-based transparency toggle
  // ------------------------------------------------------------------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ------------------------------------------------------------------
  // IntersectionObserver — track which section is in view
  // ------------------------------------------------------------------
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            indicatorRef.current = id;
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ------------------------------------------------------------------
  // Close mobile menu on resize to desktop
  // ------------------------------------------------------------------
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Smooth scroll is handled by CSS scroll-behavior: smooth on <html>
  };

  return (
    <>
      {/* ----------------------------------------------------------------
          Main navbar bar
      ---------------------------------------------------------------- */}
      <header
        className={[
          "fixed top-0 inset-x-0 z-40 h-14 flex items-center transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Left — monogram / name */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            aria-label="Back to top"
          >
            <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-foreground/70 transition-colors">
              VN
            </span>
            <span className="hidden sm:inline text-sm font-medium text-muted-foreground group-hover:text-foreground/70 transition-colors">
              Valentin Nunez
            </span>
          </a>

          {/* Right — desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map(({ label, href }) => {
              const sectionId = href.slice(1);
              const isActive  = activeSection === sectionId;

              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => handleNavClick(href)}
                  className="relative px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px bg-foreground rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Language toggle */}
            <div className="ml-3 flex items-center gap-0.5">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${lang === "en" ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={`px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${lang === "es" ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                aria-label="Cambiar a español"
              >
                ES
              </button>
            </div>

            {/* Availability badge */}
            <a
              href="mailto:valentin.nunez.dev@gmail.com"
              className="ml-3 flex items-center gap-1.5 text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
              aria-label="Available for hire — get in touch"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="hidden lg:inline">{t(sections.navAvailable.en, sections.navAvailable.es)}</span>
            </a>
          </nav>

          {/* Right — mobile: lang toggle + availability dot + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language toggle — always visible on mobile */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${lang === "en" ? "bg-blue-600 text-white" : "bg-white/10 text-white/50"}`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={`px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${lang === "es" ? "bg-blue-600 text-white" : "bg-white/10 text-white/50"}`}
                aria-label="Cambiar a español"
              >
                ES
              </button>
            </div>

            <a
              href="mailto:valentin.nunez.dev@gmail.com"
              className="flex items-center gap-1.5 text-sm font-medium text-green-400"
              aria-label="Available for hire"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* ----------------------------------------------------------------
          Mobile full-screen overlay
      ---------------------------------------------------------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-30 flex flex-col bg-background/95 backdrop-blur-lg pt-14 px-6"
          >
            <nav className="flex flex-col gap-1 mt-6" aria-label="Mobile navigation">
              {NAV_ITEMS.map(({ label, href }, i) => {
                const sectionId = href.slice(1);
                const isActive  = activeSection === sectionId;

                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => handleNavClick(href)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    className={[
                      "flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive
                        ? "text-foreground bg-accent/60"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                    )}
                  </motion.a>
                );
              })}

              {/* Language toggle — mobile */}
              <div className="mt-6 px-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setLang("en"); setMobileOpen(false); }}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${lang === "en" ? "bg-blue-600 text-white" : "bg-white/10 text-white/50 hover:text-white"}`}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => { setLang("es"); setMobileOpen(false); }}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${lang === "es" ? "bg-blue-600 text-white" : "bg-white/10 text-white/50 hover:text-white"}`}
                    aria-label="Cambiar a español"
                  >
                    ES
                  </button>
                </div>

                <a
                  href="mailto:valentin.nunez.dev@gmail.com"
                  className="flex items-center gap-2 text-sm font-medium text-green-400 ml-auto"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  {t(sections.navAvailable.en, sections.navAvailable.es)}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
