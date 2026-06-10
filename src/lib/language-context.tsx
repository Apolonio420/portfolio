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

  // 1) Preferred browser language(s)
  const langs = [navigator.language, ...(navigator.languages || [])].filter(Boolean)
  if (langs.some((l) => l.toLowerCase().startsWith("es"))) return "es"

  // 2) Physical location via timezone — covers a visitor whose browser is in
  //    English but who is in a Spanish-speaking country (e.g. an AR recruiter
  //    on an English-locale work laptop). This is the "de dónde sos" signal.
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    const spanishTz =
      /Argentina|Buenos_Aires|Montevideo|Asuncion|La_Paz|Santiago|Lima|Bogota|Caracas|Guayaquil|Mexico|Monterrey|Cancun|Merida|Matamoros|Ojinaga|Chihuahua|Hermosillo|Mazatlan|Tijuana|Guatemala|Tegucigalpa|Managua|Costa_Rica|Panama|El_Salvador|Havana|Santo_Domingo|Puerto_Rico|Madrid|Canary|Ceuta/i
    if (spanishTz.test(tz)) return "es"
  } catch {
    // Intl unavailable — fall through to default
  }

  return "en"
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
