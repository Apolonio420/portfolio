"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Lang = "en" | "es"

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (en: string, es: string) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
})

function detectLang(): Lang {
  if (typeof window === "undefined") return "en"
  const browserLang = navigator.language || ""
  return browserLang.startsWith("es") ? "es" : "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const t = (en: string, es: string) => (lang === "en" ? en : es)

  // Auto-detect on first load (client-side only)
  useEffect(() => {
    setLang(detectLang())
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export type { Lang }
