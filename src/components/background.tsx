"use client"

import { motion, type Variants } from "framer-motion"
import { Building2, GraduationCap, Languages, MapPin, Code2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { sections } from "@/lib/translations"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
}

export default function Background() {
  const { t } = useLanguage()

  const items = [
    {
      icon: Building2,
      title: t(sections.bgEY.en, sections.bgEY.es),
      description: t(sections.bgEYDesc.en, sections.bgEYDesc.es),
    },
    {
      icon: Code2,
      title: t(sections.bgOsprera.en, sections.bgOsprera.es),
      description: t(sections.bgOspreraDesc.en, sections.bgOspreraDesc.es),
    },
    {
      icon: GraduationCap,
      title: t(sections.bgEng.en, sections.bgEng.es),
      description: t(sections.bgEngDesc.en, sections.bgEngDesc.es),
    },
    {
      icon: Languages,
      title: t(sections.bgLang.en, sections.bgLang.es),
      description: t(sections.bgLangDesc.en, sections.bgLangDesc.es),
    },
    {
      icon: MapPin,
      title: t(sections.bgLocation.en, sections.bgLocation.es),
      description: t(sections.bgLocationDesc.en, sections.bgLocationDesc.es),
    },
  ]

  return (
    <section id="about" className="px-4 py-20 border-t border-border scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-foreground"
        >
          Background
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {items.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex flex-col items-center text-center gap-3 rounded-xl border border-border bg-card px-5 py-6 ring-1 ring-foreground/5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted ring-1 ring-border">
                <Icon className="size-5 text-foreground" />
              </div>
              <p className="font-semibold text-sm text-foreground leading-snug">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
