"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code2, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { sections } from "@/lib/translations"

const links = [
  {
    icon: Code2,
    label: "GitHub",
    href: "https://github.com/Apolonio420",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:valentin.nunez.dev@gmail.com",
  },
  {
    icon: ExternalLink,
    label: "WhatsApp",
    href: "https://wa.me/541161759011",
  },
  {
    icon: ExternalLink,
    label: "Download CV",
    href: "/Valentin_Nunez_CV.pdf",
  },
]

export default function CTA() {
  const { t } = useLanguage()
  return (
    <section id="cta" className="px-4 py-24 border-t border-border scroll-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-xl mx-auto flex flex-col items-center text-center gap-5"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          {t(sections.ctaTitle.en, sections.ctaTitle.es)}
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          {t(sections.ctaSubtitle.en, sections.ctaSubtitle.es)}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-3 justify-center mt-2"
        >
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
