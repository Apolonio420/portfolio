"use client"

import { motion, type Variants } from "framer-motion"
import { Clock, Zap, ShieldCheck } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { sections } from "@/lib/translations"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export default function HowIWork() {
  const { t } = useLanguage()

  const items = [
    {
      icon: Clock,
      title: t(sections.hiwAsync.en, sections.hiwAsync.es),
      body: t(sections.hiwAsyncDesc.en, sections.hiwAsyncDesc.es),
    },
    {
      icon: Zap,
      title: t(sections.hiwFast.en, sections.hiwFast.es),
      body: t(sections.hiwFastDesc.en, sections.hiwFastDesc.es),
    },
    {
      icon: ShieldCheck,
      title: t(sections.hiwProd.en, sections.hiwProd.es),
      body: t(sections.hiwProdDesc.en, sections.hiwProdDesc.es),
    },
  ]

  return (
    <section id="how-i-work" className="px-4 py-20 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-foreground"
        >
          {t(sections.hiwTitle.en, sections.hiwTitle.es)}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {items.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={cardVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted ring-1 ring-border">
                      <Icon className="size-4 text-foreground" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {body}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
