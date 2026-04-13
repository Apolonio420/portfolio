"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  MessageCircle,
  Paintbrush,
  Bot,
  UtensilsCrossed,
  HeartPulse,
  ChevronDown,
  ExternalLink,
} from "lucide-react"
import { caseStudies } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/language-context"
import { sections, caseStudyTranslations } from "@/lib/translations"

// ── Icon map ────────────────────────────────────────────────────────────────
const ICONS: Record<string, React.ElementType> = {
  "whatsapp-bot": MessageCircle,
  "ai-designer": Paintbrush,
  "nova-rag": Bot,
  "restaurant-os": UtensilsCrossed,
  healthtech: HeartPulse,
  jarvis: Bot,
}

// ── Parse a result string into { value, label } ─────────────────────────────
function parseResult(result: string): { value: string; label: string } {
  // Match patterns like "50+", "180+", "7.4B", "34", "AES-256-GCM", etc.
  const match = result.match(/^([0-9][0-9.,+BKM%]*)\s+(.+)$/)
  if (match) return { value: match[1], label: match[2] }
  // Split at first space for non-numeric ones
  const spaceIdx = result.indexOf(" ")
  if (spaceIdx > 0) {
    return { value: result.slice(0, spaceIdx), label: result.slice(spaceIdx + 1) }
  }
  return { value: result, label: "" }
}

// ── Animated counting number ────────────────────────────────────────────────
function CountUp({ value, color, inView }: { value: string; color: string; inView: boolean }) {
  const [display, setDisplay] = useState("0")
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    // Only animate pure-numeric values
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""))
    if (isNaN(numeric)) {
      setDisplay(value)
      hasAnimated.current = true
      return
    }
    hasAnimated.current = true
    const suffix = value.replace(/[0-9.]/g, "")
    const duration = 1200
    const steps = 40
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numeric * 10) / 10
      setDisplay(current % 1 === 0 ? `${Math.round(current)}${suffix}` : `${current}${suffix}`)
      if (step >= steps) {
        setDisplay(value)
        clearInterval(timer)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span
      className="text-3xl font-black tabular-nums"
      style={{ color }}
    >
      {display}
    </span>
  )
}

// ── Individual card ─────────────────────────────────────────────────────────
function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[number]
  index: number
}) {
  const { lang, t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: "-80px" })

  const csId = study.id as keyof typeof caseStudyTranslations
  const Icon = ICONS[study.id] ?? Bot
  const rgb = hexToRgb(study.color)
  const glow = rgb ? `rgba(${rgb.r},${rgb.g},${rgb.b},0.35)` : "transparent"
  const glowFaint = rgb ? `rgba(${rgb.r},${rgb.g},${rgb.b},0.08)` : "transparent"
  const glowMid = rgb ? `rgba(${rgb.r},${rgb.g},${rgb.b},0.18)` : "transparent"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        boxShadow: `0 0 0 1px ${glowMid}, 0 8px 48px ${glow}`,
        y: -4,
        transition: { duration: 0.25 },
      }}
      className="relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0d0d0f] cursor-pointer group"
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4)`,
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* ── Header / Hero ── */}
      <div
        className="relative h-44 flex flex-col justify-between p-6 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${glowMid} 0%, transparent 70%), #0d0d0f`,
        }}
      >
        {/* Subtle background radial bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 10% 80%, ${glowFaint} 0%, transparent 60%)`,
          }}
        />

        {/* Top row: icon + expand hint */}
        <div className="relative flex items-start justify-between">
          {/* Icon bubble */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex items-center justify-center w-14 h-14 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${study.color}33 0%, ${study.color}15 100%)`,
              border: `1px solid ${study.color}40`,
              boxShadow: `0 0 20px ${study.color}30`,
            }}
          >
            <Icon size={28} style={{ color: study.color }} />
          </motion.div>

          {/* Expand chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 opacity-40 group-hover:opacity-70 transition-opacity"
          >
            <ChevronDown size={18} className="text-white" />
          </motion.div>
        </div>

        {/* Title + tagline */}
        <div className="relative">
          <h3
            className="text-xl font-bold leading-tight mb-1"
            style={{
              color: "#fff",
              textShadow: `0 0 30px ${study.color}60`,
            }}
          >
            {caseStudyTranslations[csId]?.title[lang] ?? study.title}
          </h3>
          <p className="text-sm text-white/50 leading-snug">{caseStudyTranslations[csId]?.tagline[lang] ?? study.tagline}</p>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div
        className="grid grid-cols-2 gap-px"
        style={{ background: `${study.color}15` }}
      >
        {(caseStudyTranslations[csId]?.results[lang] ?? study.results).slice(0, 4).map((result, i) => {
          const { value, label } = parseResult(result)
          return (
            <div
              key={i}
              className="flex flex-col gap-0.5 px-4 py-3 bg-[#0d0d0f]"
            >
              <CountUp value={value} color={study.color} inView={inView} />
              {label && (
                <span className="text-[10px] sm:text-xs text-white/40 leading-tight line-clamp-2">{label}</span>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Stack pills ── */}
      <div className="flex flex-wrap gap-2 px-6 py-4">
        {study.stack.map((tech) => (
          <motion.span
            key={tech}
            whileHover={{
              boxShadow: `0 0 10px ${glow}`,
              borderColor: `${study.color}80`,
            }}
            className="px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
            style={{
              background: `${study.color}10`,
              borderColor: `${study.color}25`,
              color: study.color,
            }}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* ── Expandable problem/solution ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2, delay: 0.1 } },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { opacity: { duration: 0.1 }, height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
            }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-6 pb-6 pt-2 border-t space-y-4"
              style={{ borderColor: `${study.color}20` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: study.color }}
                >
                  {t(sections.csProblem.en, sections.csProblem.es)}
                </span>
                <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                  {caseStudyTranslations[csId]?.problem[lang] ?? study.problem}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: study.color }}
                >
                  {t(sections.csSolution.en, sections.csSolution.es)}
                </span>
                <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                  {caseStudyTranslations[csId]?.solution[lang] ?? study.solution}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── hex → {r,g,b} ────────────────────────────────────────────────────────────
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// ── Section header animated underline ───────────────────────────────────────
function SectionHeading() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          {t(sections.csTitle.en, sections.csTitle.es)}
        </h2>
        {/* Animated gradient underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-3 h-1 w-32 rounded-full origin-left"
          style={{
            background:
              "linear-gradient(90deg, #22c55e, #3b82f6, #a855f7, #f97316, #06b6d4)",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-5 text-white/40 text-base max-w-md mx-auto leading-relaxed"
        >
          Real systems. Real production. Click any card to see the full story.
        </motion.p>
      </motion.div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function CaseStudies() {
  return (
    <section className="relative py-24 px-4 overflow-hidden scroll-mt-16" id="case-studies">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #3b82f620 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 text-center text-white/25 text-sm flex items-center justify-center gap-2"
        >
          <ExternalLink size={13} />
          All projects shipped to production — not demos
        </motion.p>
      </div>
    </section>
  )
}
