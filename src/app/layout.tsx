import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://portfoliovnunez.vercel.app";

export const metadata: Metadata = {
  title: "Valentin Nunez — AI Agent & Full-Stack Engineer",
  description:
    "I build AI systems that run real businesses. WhatsApp bots, RAG chatbots, SaaS platforms, and enterprise software. Available for hire.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Valentin Nunez — AI Agent & Full-Stack Engineer",
    description:
      "Production AI systems: WhatsApp sales bots, RAG chatbots, enterprise SaaS. 7.4B tokens processed, 300+ tools built.",
    type: "website",
    url: SITE_URL,
    siteName: "Valentin Nunez Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Valentin Nunez — AI Agent & Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentin Nunez — AI Agent & Full-Stack Engineer",
    description:
      "Production AI systems: WhatsApp bots, RAG chatbots, 300+ tools. Talk to my AI assistant live.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
