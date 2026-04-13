"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { sections } from "@/lib/translations"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const PARTICLES = [
  { top: "12%", left: "8%",  size: 2, delay: "0s",    duration: "4s"  },
  { top: "25%", left: "92%", size: 1, delay: "1.2s",  duration: "5s"  },
  { top: "60%", left: "5%",  size: 2, delay: "0.6s",  duration: "3.5s"},
  { top: "78%", left: "88%", size: 1, delay: "2s",    duration: "4.5s"},
  { top: "40%", left: "96%", size: 2, delay: "0.3s",  duration: "6s"  },
  { top: "88%", left: "15%", size: 1, delay: "1.8s",  duration: "3.8s"},
  { top: "18%", left: "55%", size: 1, delay: "2.4s",  duration: "5.2s"},
  { top: "70%", left: "45%", size: 2, delay: "0.9s",  duration: "4.2s"},
  { top: "5%",  left: "75%", size: 1, delay: "1.5s",  duration: "3.2s"},
  { top: "50%", left: "20%", size: 1, delay: "3s",    duration: "5.8s"},
  { top: "33%", left: "70%", size: 2, delay: "0.5s",  duration: "4.8s"},
  { top: "92%", left: "60%", size: 1, delay: "2.7s",  duration: "3.6s"},
]

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-black scroll-mt-16">

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blue orb */}
        <div
          className="absolute rounded-full animate-pulse-slow"
          style={{
            width: "60vw",
            height: "60vw",
            top: "50%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Purple orb */}
        <div
          className="absolute rounded-full"
          style={{
            width: "50vw",
            height: "50vw",
            top: "40%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.10) 0%, rgba(168,85,247,0.03) 50%, transparent 70%)",
            filter: "blur(50px)",
            animation: "pulse-slow 4s ease-in-out infinite 1.5s",
          }}
        />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `pulse-slow ${p.duration} ease-in-out infinite ${p.delay}`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl w-full">

        {/* Photo */}
        <motion.div {...fadeUp(0.1)}>
          <Image
            src="/foto-cv.jpeg"
            alt="Valentin Nunez"
            width={128}
            height={128}
            className="rounded-full object-cover ring-2 ring-blue-500/50"
            style={{
              boxShadow: "0 0 30px rgba(59,130,246,0.3), 0 0 80px rgba(59,130,246,0.1)",
            }}
            priority
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gradient"
        >
          Valentin Nunez
        </motion.h1>

        {/* Title */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-xl font-medium text-blue-400"
        >
          {t(sections.heroTitle.en, sections.heroTitle.es)}
        </motion.p>

        {/* Stats */}
        <motion.p
          {...fadeUp(0.4)}
          className="font-mono text-sm text-zinc-500 tracking-wider"
        >
          {t(sections.heroStats.en, sections.heroStats.es)}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-wrap gap-3 justify-center mt-2"
        >
          <a
            href="#case-studies"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 glow-blue hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            {t(sections.heroSeeWork.en, sections.heroSeeWork.es)}
          </a>
          <a
            href="#chat"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/20 hover:border-blue-500/50 text-white/80 hover:text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] bg-white/5 hover:bg-white/10 backdrop-blur-sm"
          >
            {t(sections.heroTalkAI.en, sections.heroTalkAI.es)}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
