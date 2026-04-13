"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { metrics } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/language-context"
import { sections } from "@/lib/translations"

// ── parse value string into parts ────────────────────────────────────────────
// "7.4B"   → { int: false, num: 7.4,  suffix: "B",  decimals: 1, hasComma: false }
// "4,823"  → { int: true,  num: 4823, suffix: "",   decimals: 0, hasComma: true  }
// "300+"   → { int: true,  num: 300,  suffix: "+",  decimals: 0, hasComma: false }
// "220K+"  → { int: true,  num: 220,  suffix: "K+", decimals: 0, hasComma: false }

interface ParsedValue {
  num: number
  suffix: string
  decimals: number
  hasComma: boolean
}

function parseValue(raw: string): ParsedValue {
  const hasComma = raw.includes(",")
  const cleaned = raw.replace(/,/g, "")
  const match = cleaned.match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: raw, decimals: 0, hasComma: false }
  const num = parseFloat(match[1])
  const suffix = match[2] ?? ""
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0
  return { num, suffix, decimals, hasComma }
}

function formatNumber(n: number, decimals: number, hasComma: boolean): string {
  const fixed = n.toFixed(decimals)
  if (!hasComma) return fixed
  // add commas to integer part
  const parts = fixed.split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

// ── ease-out curve (t ∈ [0,1]) ───────────────────────────────────────────────
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

// ── animated counter ─────────────────────────────────────────────────────────

function Counter({
  parsed,
  started,
  delay,
}: {
  parsed: ParsedValue
  started: boolean
  delay: number
}) {
  const [display, setDisplay] = useState("0")
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const duration = 2000 // ms

    function tick(now: number) {
      if (!startTime) startTime = now + delay
      const elapsed = now - startTime
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      const current = eased * parsed.num
      setDisplay(formatNumber(current, parsed.decimals, parsed.hasComma))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [started, parsed, delay])

  return (
    <span>
      {display}
      <span className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        {parsed.suffix}
      </span>
    </span>
  )
}

// ── metric card ───────────────────────────────────────────────────────────────

function MetricCard({
  metric,
  index,
  started,
  isLast,
}: {
  metric: (typeof metrics)[number]
  index: number
  started: boolean
  isLast: boolean
}) {
  const parsed = parseValue(metric.value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex flex-col items-center text-center px-4 py-6 group"
    >
      {/* vertical separator — hide on last item and on mobile */}
      {!isLast && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      )}

      {/* number */}
      <div className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50 tabular-nums">
        <Counter parsed={parsed} started={started} delay={index * 150} />
      </div>

      {/* label */}
      <p className="mt-2 text-sm font-semibold text-white/80 leading-tight">
        {metric.label}
      </p>

      {/* sub */}
      <p className="mt-1 text-xs text-muted-foreground">{metric.sub}</p>
    </motion.div>
  )
}

// ── section ───────────────────────────────────────────────────────────────────

export default function Metrics() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const translatedMetrics = metrics.map((m, i) => {
    const labelMap = [
      [sections.metricsTokens.en, sections.metricsTokens.es],
      [sections.metricsSessions.en, sections.metricsSessions.es],
      [sections.metricsTools.en, sections.metricsTools.es],
      [sections.metricsLOC.en, sections.metricsLOC.es],
      [sections.metricsCommits.en, sections.metricsCommits.es],
      [sections.metricsHours.en, sections.metricsHours.es],
    ]
    const subMap = [
      [sections.metricsTokensSub.en, sections.metricsTokensSub.es],
      [sections.metricsSessionsSub.en, sections.metricsSessionsSub.es],
      [sections.metricsToolsSub.en, sections.metricsToolsSub.es],
      [sections.metricsLOCSub.en, sections.metricsLOCSub.es],
      [sections.metricsCommitsSub.en, sections.metricsCommitsSub.es],
      [sections.metricsHoursSub.en, sections.metricsHoursSub.es],
    ]
    return {
      ...m,
      label: labelMap[i] ? t(labelMap[i][0], labelMap[i][1]) : m.label,
      sub: subMap[i] ? t(subMap[i][0], subMap[i][1]) : m.sub,
    }
  })

  return (
    <section id="metrics" ref={ref} className="relative overflow-hidden bg-grid py-16 sm:py-20 scroll-mt-16">
      {/* dim overlay */}
      <div className="absolute inset-0 bg-background/85 pointer-events-none" />

      {/* top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px translate-y-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px -translate-y-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-y sm:divide-y-0 divide-white/[0.06]">
          {translatedMetrics.map((metric, i) => (
            <MetricCard
              key={i}
              metric={metric}
              index={i}
              started={inView}
              isLast={i === translatedMetrics.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
