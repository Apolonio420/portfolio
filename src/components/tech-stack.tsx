"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { techStack } from "@/lib/portfolio-data"

// ── helpers ──────────────────────────────────────────────────────────────────

const PALETTE = [
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#06b6d4", // cyan-500
  "#a855f7", // purple-500
  "#22c55e", // green-500
  "#f97316", // orange-500
  "#ec4899", // pink-500
]

function hashColor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]
}

function initials(name: string): string {
  return name.slice(0, 2).toUpperCase()
}

// ── card ─────────────────────────────────────────────────────────────────────

interface TechItem {
  name: string
  icon: string
  snippet: string
  fact: string
}

function TechCard({ item, index }: { item: TechItem; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const color = hashColor(item.name)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.055, ease: "easeOut" }}
      className="h-36 cursor-pointer"
      style={{ perspective: "800px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      {/* flip container */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-3 border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
            style={{ backgroundColor: color, boxShadow: `0 0 18px ${color}55` }}
          >
            {initials(item.name)}
          </div>
          <span className="text-sm font-medium text-white/80">{item.name}</span>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border border-white/[0.07] bg-[#0d1117] flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* snippet */}
          <div className="flex-1 p-3 overflow-hidden">
            <pre
              className="text-[9.5px] leading-[1.55] font-mono whitespace-pre-wrap break-words"
              style={{ color: "#4ade80" }}
            >
              {item.snippet}
            </pre>
          </div>
          {/* fact */}
          <div
            className="px-3 py-2 border-t text-[9px] italic leading-snug"
            style={{ borderColor: `${color}33`, color: "#94a3b8" }}
          >
            {item.fact}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── section ───────────────────────────────────────────────────────────────────

const TABS = Object.keys(techStack)

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const items = techStack[activeTab as keyof typeof techStack]

  return (
    <section id="stack" className="relative py-24 bg-dot-pattern scroll-mt-16">
      {/* dim overlay so dots don't overpower content */}
      <div className="absolute inset-0 bg-background/80 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            What I Build With
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Tech Stack
          </h2>
        </motion.div>

        {/* tab bar — scrollable on mobile */}
        <div className="flex justify-start sm:justify-center mb-10 overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="relative flex gap-1 rounded-full bg-white/[0.04] border border-white/[0.07] p-1 shrink-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 z-10 whitespace-nowrap"
                style={{
                  color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.45)",
                }}
              >
                {/* sliding pill */}
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* card grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
          >
            {items.map((item, i) => (
              <TechCard key={item.name} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
