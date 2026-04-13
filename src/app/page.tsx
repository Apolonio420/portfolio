import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import LogoStrip from "@/components/logo-strip";
import { RagChat } from "@/components/rag-chat";
import ImageGenerator from "@/components/image-generator";
import CaseStudies from "@/components/case-studies";
import ToolsGallery from "@/components/tools-gallery";
import TechStack from "@/components/tech-stack";
import HowIWork from "@/components/how-i-work";
import Metrics from "@/components/metrics";
import Background from "@/components/background";
import Cta from "@/components/cta";
import EasterEgg from "@/components/easter-egg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Valentin Nunez",
  jobTitle: "AI Agent & Full-Stack Engineer",
  url: "https://portfoliovnunez.vercel.app",
  sameAs: [
    "https://github.com/Apolonio420",
    "https://wa.me/541161759011",
  ],
  knowsAbout: [
    "Artificial Intelligence", "RAG Systems", "AI Agents", "WhatsApp Automation",
    "Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Supabase",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
};

export default function Home() {
  return (
    <main className="flex flex-col pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <Hero />

      <LogoStrip />

      <RagChat />

      <ImageGenerator />

      <CaseStudies />

      <ToolsGallery />

      <TechStack />

      <HowIWork />

      <Metrics />

      <Background />

      <Cta />

      <EasterEgg />
    </main>
  );
}
