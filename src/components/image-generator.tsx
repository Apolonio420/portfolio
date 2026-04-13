"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Download, Loader2, Wand2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// ── Styles ──────────────────────────────────────────────────────────────────

const STYLES = [
  { id: "neon-cyberpunk", name: "Neon Cyberpunk", emoji: "🌆", color: "#e040fb" },
  { id: "sticker-pop", name: "Sticker Pop", emoji: "🎨", color: "#ff6d00" },
  { id: "vintage-retro", name: "Vintage Retro", emoji: "📻", color: "#d4a574" },
  { id: "minimal-line", name: "Minimal Line", emoji: "✏️", color: "#90a4ae" },
  { id: "watercolor", name: "Watercolor", emoji: "💧", color: "#42a5f5" },
  { id: "pixel-art", name: "Pixel Art", emoji: "👾", color: "#66bb6a" },
  { id: "manga-anime", name: "Manga Anime", emoji: "⚡", color: "#ef5350" },
  { id: "3d-glass", name: "3D Glass", emoji: "💎", color: "#80deea" },
  { id: "street-graffiti", name: "Street Graffiti", emoji: "🎤", color: "#fdd835" },
  { id: "geometric", name: "Geometric", emoji: "🔷", color: "#7e57c2" },
  { id: "botanical", name: "Botanical", emoji: "🌿", color: "#4caf50" },
  { id: "surreal-collage", name: "Surreal Collage", emoji: "🌀", color: "#ff7043" },
]

const EXAMPLE_PROMPTS = {
  en: [
    "A wolf howling at the moon",
    "Japanese koi fish",
    "Astronaut on skateboard",
    "Phoenix rising",
    "Vintage motorcycle",
    "Cat with sunglasses",
  ],
  es: [
    "Un lobo aullando a la luna",
    "Pez koi japonés",
    "Astronauta en skate",
    "Fénix renaciendo",
    "Moto vintage",
    "Gato con anteojos",
  ],
}

// ── Component ───────────────────────────────────────────────────────────────

export default function ImageGenerator() {
  const { lang, t } = useLanguage()
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("neon-cyberpunk")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const styleScrollRef = useRef<HTMLDivElement>(null)

  const generate = async () => {
    const text = prompt.trim()
    if (!text || isGenerating) return

    setIsGenerating(true)
    setError(null)
    setImageUrl(null)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, style: selectedStyle }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Generation failed")
        return
      }

      setImageUrl(data.imageUrl)
    } catch {
      setError("Network error. Try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      generate()
    }
  }

  const downloadImage = async () => {
    if (!imageUrl) return
    try {
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `design-${selectedStyle}-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(imageUrl, "_blank")
    }
  }

  const examples = lang === "es" ? EXAMPLE_PROMPTS.es : EXAMPLE_PROMPTS.en

  return (
    <section id="generator" className="relative py-16 sm:py-24 px-4 overflow-hidden scroll-mt-16">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168, 85, 247, 0.08), transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Header — compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-300">
              {t("Live Demo", "Demo en Vivo")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            {t("AI Design Generator", "Generador de Diseños AI")}
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto">
            {t(
              "Type a prompt, pick a style, get a unique design.",
              "Escribí un prompt, elegí un estilo, obtené un diseño único."
            )}
          </p>
        </motion.div>

        {/* Generator Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/[0.08] bg-[#0d0d0f] overflow-hidden"
        >
          {/* Prompt Input */}
          <div className="p-4 sm:p-6 border-b border-white/[0.06]">
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
                placeholder={t(
                  "A wolf howling at the moon...",
                  "Un lobo aullando a la luna..."
                )}
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 sm:px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50 transition-all disabled:opacity-50"
              />
              <button
                onClick={generate}
                disabled={isGenerating || !prompt.trim()}
                className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-purple-600 px-3 sm:px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {isGenerating
                    ? t("Generating...", "Generando...")
                    : t("Generate", "Generar")}
                </span>
              </button>
            </div>

            {/* Quick prompts — horizontal scroll on mobile */}
            <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors whitespace-nowrap shrink-0"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Style Selector — horizontal scroll on mobile, grid on desktop */}
          <div className="p-4 sm:p-6 border-b border-white/[0.06]">
            <label className="block text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-widest mb-2 sm:mb-3">
              {t("Style", "Estilo")}
            </label>

            {/* Mobile: horizontal scroll */}
            <div
              ref={styleScrollRef}
              className="flex sm:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1"
            >
              {STYLES.map((style) => {
                const isActive = selectedStyle === style.id
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all shrink-0"
                    style={{
                      background: isActive
                        ? `${style.color}20`
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isActive ? `${style.color}60` : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    <span className="text-sm">{style.emoji}</span>
                    <span
                      className="text-[11px] font-medium whitespace-nowrap"
                      style={{ color: isActive ? style.color : "rgba(255,255,255,0.5)" }}
                    >
                      {style.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Desktop: grid */}
            <div className="hidden sm:grid grid-cols-4 md:grid-cols-6 gap-2">
              {STYLES.map((style) => {
                const isActive = selectedStyle === style.id
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className="relative flex flex-col items-center gap-1 rounded-xl px-2 py-3 transition-all text-center"
                    style={{
                      background: isActive
                        ? `${style.color}18`
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isActive ? `${style.color}50` : "rgba(255,255,255,0.06)"}`,
                      boxShadow: isActive
                        ? `0 0 20px ${style.color}20`
                        : "none",
                    }}
                  >
                    <span className="text-lg">{style.emoji}</span>
                    <span
                      className="text-[0.65rem] font-medium leading-tight"
                      style={{ color: isActive ? style.color : "rgba(255,255,255,0.5)" }}
                    >
                      {style.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Result Area */}
          <div className="p-4 sm:p-6 min-h-[160px] sm:min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="relative">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto h-5 w-5 sm:h-6 sm:w-6 text-purple-400 animate-pulse" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/40 font-mono">
                    {t("Creating your design...", "Creando tu diseño...")}
                  </p>
                </motion.div>
              ) : imageUrl ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-3 w-full"
                >
                  <div className="relative group rounded-xl overflow-hidden border border-white/10 max-w-md mx-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={`AI generated: ${prompt}`}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 md:transition-opacity flex items-center justify-center pointer-events-none md:pointer-events-auto">
                      <button
                        onClick={downloadImage}
                        className="flex items-center gap-2 rounded-lg bg-white/20 backdrop-blur px-4 py-2 text-sm text-white hover:bg-white/30 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        {t("Download", "Descargar")}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={downloadImage}
                    className="md:hidden flex items-center gap-2 mx-auto rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-500 transition-colors active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    {t("Download", "Descargar")}
                  </button>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-sm text-red-400">{error}</p>
                  <p className="text-xs text-white/30 mt-1">
                    {t("Try a different prompt or style", "Probá otro prompt o estilo")}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-4 sm:py-8"
                >
                  <Wand2 className="h-8 w-8 sm:h-10 sm:w-10 text-white/10 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-white/25">
                    {t(
                      "Type a prompt and hit Generate",
                      "Escribí un prompt y dale a Generar"
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 sm:mt-6 text-center text-[10px] sm:text-xs text-white/20 font-mono"
        >
          {t(
            "Powered by Google Gemini · Same engine behind Novamente's AI design studio",
            "Potenciado por Google Gemini · El mismo motor detrás del estudio de diseño de Novamente"
          )}
        </motion.p>
      </div>
    </section>
  )
}
