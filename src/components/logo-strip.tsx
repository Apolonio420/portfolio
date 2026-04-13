"use client";

import { motion } from "framer-motion";

const logos = [
  // Enterprise / Employment
  { name: "EY", label: "Ernst & Young" },
  { name: "OSPRERA", label: "OSPRERA" },
  // Cloud & Infrastructure
  { name: "Google Cloud", label: "Google Cloud" },
  { name: "AWS", label: "Amazon Web Services" },
  { name: "Vercel", label: "Vercel" },
  { name: "Cloudflare", label: "Cloudflare" },
  { name: "Docker", label: "Docker" },
  // AI & LLM
  { name: "Anthropic", label: "Anthropic" },
  { name: "OpenAI", label: "OpenAI" },
  { name: "Google Gemini", label: "Google Gemini" },
  { name: "Meta AI", label: "Meta AI" },
  { name: "Cursor", label: "Cursor" },
  { name: "Midjourney", label: "Midjourney" },
  // Platforms & APIs
  { name: "Supabase", label: "Supabase" },
  { name: "PostgreSQL", label: "PostgreSQL" },
  { name: "WhatsApp API", label: "WhatsApp Cloud API" },
  { name: "MercadoPago", label: "MercadoPago" },
  { name: "Stripe", label: "Stripe" },
  { name: "GitHub", label: "GitHub" },
  // Frameworks
  { name: "Next.js", label: "Next.js" },
  { name: "React", label: "React" },
  { name: "Tailwind CSS", label: "Tailwind CSS" },
  { name: "Node.js", label: "Node.js" },
  { name: "Python", label: "Python" },
  // Shipping
  { name: "Andreani", label: "Andreani" },
];

const stats = [
  { value: "3+", unit: "years", label: "Enterprise Experience" },
  { value: "9", unit: "projects", label: "Shipped to Production" },
  { value: "< 24h", unit: "", label: "Average Response Time" },
];

export default function LogoStrip() {
  return (
    <section className="py-14 bg-background overflow-hidden">
      {/* Muted label */}
      <p className="text-center text-xs font-medium tracking-widest uppercase text-muted-foreground/50 mb-8 select-none">
        Technologies &amp; Experience
      </p>

      {/* Marquee wrapper */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling track */}
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-12 pr-12">
            {logos.map((logo) => (
              <LogoItem key={logo.name} name={logo.name} />
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div
            className="flex shrink-0 animate-marquee gap-12 pr-12"
            aria-hidden="true"
          >
            {logos.map((logo) => (
              <LogoItem key={logo.name + "-dup"} name={logo.name} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-12 flex items-center justify-center gap-10 md:gap-16 flex-wrap px-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center gap-0.5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
          >
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-sm font-medium text-muted-foreground/70">
                  {stat.unit}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground/50 text-center">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Marquee keyframes injected via style tag */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </section>
  );
}

function LogoItem({ name }: { name: string }) {
  return (
    <span className="shrink-0 text-lg font-bold text-white/30 hover:text-white/80 transition-colors duration-300 cursor-default select-none whitespace-nowrap">
      {name}
    </span>
  );
}
