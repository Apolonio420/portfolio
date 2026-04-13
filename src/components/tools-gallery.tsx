"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toolCategories, totalToolCount } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/language-context"
import { sections, toolNameTranslations, categoryTranslations } from "@/lib/translations"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

// ── Helpers ────────────────────────────────────────────────────────────────

function toDisplayName(filename: string): string {
  return filename
    .replace(/\.html$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// One color identity per category — oklch-based warm/cool set, no AI-slop cyan/purple
const CATEGORY_COLORS: Record<string, { from: string; to: string; glow: string; border: string }> = {
  "Restaurant & Kitchen":    { from: "#f97316", to: "#dc2626", glow: "rgba(249,115,22,0.35)", border: "#f97316" },
  "Point of Sale & Delivery":{ from: "#eab308", to: "#f97316", glow: "rgba(234,179,8,0.35)",  border: "#eab308" },
  "Inventory & Warehouse":   { from: "#84cc16", to: "#22c55e", glow: "rgba(132,204,22,0.35)", border: "#84cc16" },
  "HR & Scheduling":         { from: "#38bdf8", to: "#6366f1", glow: "rgba(56,189,248,0.35)", border: "#38bdf8" },
  "CRM & Customers":         { from: "#f472b6", to: "#ec4899", glow: "rgba(244,114,182,0.35)",border: "#f472b6" },
  "Finance & Admin":         { from: "#a3e635", to: "#4ade80", glow: "rgba(163,230,53,0.35)", border: "#a3e635" },
  "Health & Wellness":       { from: "#2dd4bf", to: "#0ea5e9", glow: "rgba(45,212,191,0.35)", border: "#2dd4bf" },
  "Auto & Services":         { from: "#94a3b8", to: "#64748b", glow: "rgba(148,163,184,0.35)",border: "#94a3b8" },
  "Education":               { from: "#c084fc", to: "#818cf8", glow: "rgba(192,132,252,0.35)",border: "#c084fc" },
}

function getColor(name: string) {
  return CATEGORY_COLORS[name] ?? { from: "#64748b", to: "#475569", glow: "rgba(100,116,139,0.3)", border: "#64748b" }
}

// ── Count-up hook ──────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // expo-out easing
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

// ── FlatTool type ──────────────────────────────────────────────────────────

interface FlatTool {
  id: string
  filename: string
  displayName: string
  categoryName: string
  emoji: string
}

// Pre-built flat list
const allTools: FlatTool[] = toolCategories.flatMap((cat) =>
  cat.tools.map((filename) => ({
    id: `${cat.name}__${filename}`,
    filename,
    displayName: toDisplayName(filename),
    categoryName: cat.name,
    emoji: cat.emoji,
  }))
)

// ── Sub-components ─────────────────────────────────────────────────────────

function ToolCard({ tool, index }: { tool: FlatTool; index: number }) {
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const color = getColor(tool.categoryName)
  const filenameWithoutHtml = tool.filename.replace(/\.html$/i, "")
  const displayName = lang === "en"
    ? (toolNameTranslations[filenameWithoutHtml] ?? tool.displayName)
    : tool.displayName

  return (
    <>
      <motion.button
        layout
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 28,
          delay: Math.min(index * 0.035, 0.55),
        }}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="group relative flex flex-col gap-2 rounded-xl p-3.5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-label={`View details for ${displayName}`}
      >
        {/* Subtle hover fill */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"
          style={{ background: `radial-gradient(ellipse at 30% 30%, ${color.glow}, transparent 70%)` }}
        />

        {/* Gradient bottom border */}
        <div
          className="absolute bottom-0 left-4 right-4 h-px rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${color.border}, transparent)` }}
        />

        <span className="text-xl leading-none relative z-10" aria-hidden="true">
          {tool.emoji}
        </span>

        <span className="text-[0.75rem] sm:text-[0.8rem] leading-snug font-medium text-white/75 group-hover:text-white transition-colors relative z-10 line-clamp-2">
          {displayName}
        </span>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <span aria-hidden="true">{tool.emoji}</span>
              {displayName}
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm leading-relaxed">
              Self-contained HTML app with demo data — no backend, no setup.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground font-mono">
              {tool.filename}
            </div>
            <a
              href={process.env.NODE_ENV === "development" ? `http://localhost:3501/${tool.filename}` : `/tools/${tool.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
              onClick={() => setOpen(false)}
            >
              {t(sections.toolsOpenDemo.en, sections.toolsOpenDemo.es)}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function ToolsGallery() {
  const { lang, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { count, ref: countRef } = useCountUp(totalToolCount, 1200)

  const visibleTools = useMemo<FlatTool[]>(() => {
    if (!activeCategory) return allTools
    return allTools.filter((t) => t.categoryName === activeCategory)
  }, [activeCategory])

  return (
    <section
      id="tools"
      className="relative py-28 px-4 overflow-hidden scroll-mt-16"
      style={{
        // Dot grid background — CSS only, no image deps
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Ambient top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] opacity-20 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #f97316 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          ref={countRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-left"
        >
          <div className="flex items-end gap-4 mb-3">
            <span
              className="font-black leading-none tabular-nums"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                color: "#fff",
                letterSpacing: "-0.03em",
                // Subtle pulse via CSS animation, no JS
              }}
            >
              {count}
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: "#f97316", display: "inline-block" }}
              >
                +
              </motion.span>
            </span>
          </div>

          <p className="text-xl sm:text-2xl font-semibold text-white/60 tracking-wide uppercase">
            {t(sections.toolsTitle.en, sections.toolsTitle.es)}
          </p>
          <p className="mt-3 text-sm text-white/35 max-w-lg">
            {t(sections.toolsSubtitle.en, sections.toolsSubtitle.es)}
          </p>
        </motion.div>

        {/* ── Category Navigation Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {toolCategories.map((cat, i) => {
              const isActive = activeCategory === cat.name
              const color = getColor(cat.name)

              return (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveCategory(isActive ? null : cat.name)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                  className="relative group flex flex-col gap-1.5 rounded-xl px-3 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${color.from}22, ${color.to}18)`
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? `1px solid ${color.border}60`
                      : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isActive ? `0 0 24px ${color.glow}` : "none",
                  }}
                  aria-pressed={isActive}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="category-indicator"
                      className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: color.border }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="text-xl leading-none">{cat.emoji}</span>

                  <span
                    className="text-[0.7rem] font-semibold leading-tight transition-colors"
                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}
                  >
                    {lang === "es" ? (categoryTranslations[cat.name] ?? cat.name) : cat.name}
                  </span>

                  <span
                    className="text-[0.65rem] font-mono tabular-nums"
                    style={{
                      color: isActive ? color.border : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {cat.tools.length} tools
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Filter status line */}
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 flex items-center gap-2"
              >
                <span className="text-xs text-white/40">
                  Showing
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: getColor(activeCategory).border }}
                >
                  {lang === "es" ? (categoryTranslations[activeCategory] ?? activeCategory) : activeCategory}
                </span>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="ml-auto text-[0.65rem] text-white/30 hover:text-white/60 transition-colors font-mono underline underline-offset-2"
                >
                  clear filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Tools Grid ── */}
        <motion.div layout className="relative min-h-[12rem]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory ?? "all"}
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"
            >
              {visibleTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Footer ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center text-xs text-white/25 font-mono tracking-widest"
          style={{
            textShadow: "0 0 20px rgba(255,255,255,0.15)",
          }}
        >
          {t(sections.toolsFooter.en, sections.toolsFooter.es)}
        </motion.p>

      </div>
    </section>
  )
}
