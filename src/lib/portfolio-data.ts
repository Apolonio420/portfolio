// ── Case Studies ──
export const caseStudies = [
  {
    id: "whatsapp-bot",
    title: "WhatsApp Sales Bot",
    tagline: "50+ concurrent conversations, fully autonomous sales",
    problem:
      "A custom apparel brand was losing sales because WhatsApp inquiries piled up faster than 2-3 staff could handle. Customers asked for custom designs, pricing, and mockups — all manually. Response times stretched to hours, and after-hours messages went unanswered entirely.",
    solution:
      "Built a stateful conversational bot on the WhatsApp Cloud API with a 7-state finite machine: greeting → qualification (what product, what size, what design idea) → AI design generation via Gemini API → automatic background removal and placement onto real garment mockups using Canvas API → pricing calculation → MercadoPago payment link generation — all inside the same WhatsApp thread. The bot handles audio transcription (OpenAI Whisper), image analysis, smart follow-ups after 24h of inactivity, and concurrent session management via Supabase. Each conversation state persists independently, so 50+ customers can be at different stages simultaneously without interference.",
    results: [
      "24/7 autonomous sales",
      "Replaced 2-3 staff",
      "50+ concurrent chats",
      "7 states: greeting → pay",
    ],
    stack: ["WhatsApp Cloud API", "Node.js", "Gemini API", "Supabase"],
    color: "#22c55e",
  },
  {
    id: "ai-designer",
    title: "AI Design Engine",
    tagline: "Type a prompt, get a custom design in seconds",
    problem:
      "Customers wanted unique apparel designs but couldn't communicate their vision to a human designer. The traditional workflow — customer describes idea → designer interprets → sends draft → revisions — took days per design and required a full-time designer on payroll. Custom products were expensive to offer and impossible to scale.",
    solution:
      "Built a full AI design pipeline: the user types a natural language prompt (e.g. 'a wolf howling at the moon in neon style'), the system sends it to Gemini's image generation model with one of 37 curated style prompts that control the artistic output (cyberpunk, watercolor, pixel art, manga, etc.). The generated image goes through automatic transparent background removal, then gets composited onto a real product photo (t-shirt, hoodie, tote bag) using the HTML Canvas API with proper scaling and positioning. Final mockups are stored on Cloudflare R2 for instant delivery. The whole pipeline runs in under 5 seconds, costs $0 per generation on Gemini's free tier, and produces print-ready designs that go straight to production.",
    results: [
      "Days → 5 seconds",
      "37 artistic styles",
      "Zero designer needed",
      "$0 per design",
    ],
    stack: ["Gemini API", "Next.js", "Canvas API", "Cloudflare R2"],
    color: "#a855f7",
  },
  {
    id: "nova-rag",
    title: "Nova — RAG AI Assistant",
    tagline: "AI that generates designs, answers questions, and helps everyone",
    problem:
      "The brand serves two distinct audiences — end customers and B2B wholesale partners — each with different questions, workflows, and needs. Customers ask about sizes, colors, pricing, and custom designs. Partners need bulk pricing, order tracking, catalog browsing, and account management. A single FAQ page couldn't cover it, and human support couldn't scale.",
    solution:
      "Built a RAG (Retrieval-Augmented Generation) assistant using pgvector embeddings over the full product catalog (500+ products with descriptions, sizing charts, materials, stock levels, and pricing tiers). Nova uses Gemini API for conversational responses grounded in retrieved context — no hallucinations because every answer is backed by real database records. The assistant can generate AI designs on demand inside the chat (same pipeline as the design engine), show real garment mockups, check order status via Supabase queries, and route complex inquiries to a human when needed. Built with streaming responses for instant feedback, conversation history for context continuity, and automatic language detection (EN/ES).",
    results: [
      "Serves B2C + B2B",
      "AI designs in chat",
      "500+ products indexed",
      "Zero hallucinations",
    ],
    stack: ["Gemini API", "pgvector", "Supabase", "Next.js"],
    color: "#3b82f6",
  },
  {
    id: "restaurant-os",
    title: "Restaurant OS",
    tagline: "Full SaaS with 6 modules, built in one session",
    problem:
      "Restaurants in LATAM typically pay for 6+ separate SaaS tools — one for POS, another for inventory, another for reservations, another for kitchen display, another for menu management, another for analytics. Total cost: $200+/mo, with zero integration between them. Data lives in silos, nothing syncs, and the owner needs to check 6 different dashboards.",
    solution:
      "Built a complete restaurant management platform with 6 integrated modules sharing one Supabase database: (1) POS system with product search, cart, payment processing, and receipt generation; (2) Kitchen display with real-time Kanban board that shows orders as they come in and lets cooks drag them through prep → ready → served; (3) Inventory with automatic stock deduction when orders are placed, low-stock alerts, and supplier management; (4) Reservation system with interactive floor plan — drag tables, set capacity, manage waitlists; (5) Menu editor with food cost analysis — input ingredients and quantities, the system calculates cost per plate and suggested pricing; (6) Dashboard with daily/weekly/monthly KPIs, top-selling items, revenue trends, and staff performance. All modules sync in real-time via Supabase subscriptions, so the kitchen sees orders instantly, inventory updates on every sale, and the dashboard reflects live data.",
    results: [
      "Replaces 6 paid tools",
      "Built in one session",
      "Realtime sync",
      "$200+/mo → one app",
    ],
    stack: ["Next.js 16", "Supabase", "TypeScript", "Tailwind CSS"],
    color: "#f97316",
  },
  {
    id: "healthtech",
    title: "HealthTech Enterprise Platform",
    tagline: "180+ pages, 49 modules, enterprise-grade security",
    problem:
      "A healthcare organization (gerenciadora) was running on 3+ disconnected legacy systems — one for clinical management, one for financial operations, one for provider credentialing. Patient data was fragmented, audit trails were incomplete, role-based access was ad-hoc, and compliance with healthcare regulations required manual processes that didn't scale.",
    solution:
      "Architected and built a full enterprise platform from scratch with 49 domain modules organized into 6 verticals: (1) Clinical — patient records, medical history, appointment scheduling, prescriptions, lab results; (2) Financial — billing, claims processing, payment reconciliation, budget planning, cost center management; (3) Compliance — audit trail logging every action with user/timestamp/IP, regulatory checklist tracking, document versioning; (4) Provider Network — credentialing workflows, contract management, performance scoring, geographic coverage mapping; (5) Patient Portal — self-service appointments, medical records access, secure messaging, payment history; (6) Admin — RBAC with 34 granular roles (from receptionist to system admin), organization hierarchy management, system configuration. Security includes AES-256-GCM encryption for sensitive data at rest, HTTPS everywhere, session management, and field-level access control. End-to-end tested with Playwright across all critical flows.",
    results: [
      "3+ systems → one",
      "180+ pages, 49 modules",
      "AES-256-GCM encryption",
      "34 roles, granular RBAC",
    ],
    stack: ["Next.js", "PostgreSQL", "Docker", "Playwright"],
    color: "#06b6d4",
  },
];

// ── Tools by Category ──
export const toolCategories = [
  {
    name: "Restaurant & Kitchen",
    emoji: "🍽️",
    tools: [
      "comandas-cocina.html", "control-mesas.html", "lista-espera.html",
      "fichas-tecnicas-platos.html", "mermas-desperdicios.html", "control-temperaturas.html",
      "control-proveedores.html", "recepcion-mercaderia.html", "control-vencimientos.html",
      "analisis-ventas.html", "control-costos-plato.html", "control-propinas.html",
      "bitacora-sanitaria.html", "planificador-menu-semanal.html", "recetario-digital.html",
      "reservas-premium.html", "menu-qr-premium.html",
    ],
  },
  {
    name: "Point of Sale & Delivery",
    emoji: "💳",
    tools: [
      "pos-punto-venta-premium.html", "pedidos-delivery-premium.html",
      "generador-facturas.html", "cotizador-premium.html",
    ],
  },
  {
    name: "Inventory & Warehouse",
    emoji: "📦",
    tools: [
      "inventario-premium.html", "inventario.html",
    ],
  },
  {
    name: "HR & Scheduling",
    emoji: "👥",
    tools: [
      "directorio-empleados.html", "turnos-empleados.html", "turnera-premium.html",
      "checklist-limpieza.html", "horario-clases-premium.html", "asistencia-qr.html",
    ],
  },
  {
    name: "CRM & Customers",
    emoji: "🤝",
    tools: [
      "crm-kanban-premium.html", "clientes-vip.html", "programa-lealtad.html",
      "encuestas-satisfaccion.html",
    ],
  },
  {
    name: "Finance & Admin",
    emoji: "💰",
    tools: [
      "control-caja-chica.html", "generador-contratos.html",
      "valuacion-propiedades.html",
    ],
  },
  {
    name: "Health & Wellness",
    emoji: "🏥",
    tools: [
      "ficha-paciente-premium.html", "patient-records.html",
      "membresias-gym.html", "gym-membership.html",
    ],
  },
  {
    name: "Auto & Services",
    emoji: "🔧",
    tools: [
      "orden-trabajo-mecanico.html", "taller-mecanico.html",
      "agenda-servicios-premium.html", "sistema-garantias.html",
      "mantenimiento-equipos.html",
    ],
  },
  {
    name: "Education",
    emoji: "📚",
    tools: [
      "control-alumnos-premium.html",
    ],
  },
];

export const totalToolCount =
  toolCategories.reduce((sum, cat) => sum + cat.tools.length, 0) + 31 + 10; // + templates + leads

// ── Tech Stack with hover snippets ──
export const techStack = {
  "Frontend": [
    {
      name: "React",
      icon: "/icons/react.svg",
      snippet: `const [count, setCount] = useState(0);\nreturn <button onClick={() => setCount(c => c + 1)}>{count}</button>`,
      fact: "The counter that launched a million tutorials.",
    },
    {
      name: "Next.js",
      icon: "/icons/nextjs.svg",
      snippet: `export default function Page() {\n  return <h1>Home</h1>\n}\n// app/page.tsx — that's the route`,
      fact: "File = Route. Killed react-router for half the industry.",
    },
    {
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      snippet: `interface Developer {\n  name: string;\n  mass_deployed: boolean;\n}`,
      fact: '"undefined is not a function" got old real fast.',
    },
    {
      name: "Tailwind CSS",
      icon: "/icons/tailwind.svg",
      snippet: `<div className="flex items-center\n  justify-between p-4 rounded-lg">`,
      fact: "Your className is longer than your component. And you love it.",
    },
    {
      name: "Framer Motion",
      icon: "/icons/framer.svg",
      snippet: `<motion.div\n  animate={{ opacity: 1, y: 0 }}\n  initial={{ opacity: 0, y: 20 }}\n/>`,
      fact: "CSS transitions with a PhD.",
    },
    {
      name: "shadcn/ui",
      icon: "/icons/shadcn.svg",
      snippet: `<Button variant="outline"\n  className={cn("gap-2", className)}>\n  Click me\n</Button>`,
      fact: "Not a library. Copy, paste, own it.",
    },
  ],
  "Backend": [
    {
      name: "Node.js",
      icon: "/icons/nodejs.svg",
      snippet: `const http = require('http');\nhttp.createServer((req, res) =>\n  res.end('Hello')).listen(3000);`,
      fact: "JS escaped the browser in 2009. The world never recovered.",
    },
    {
      name: "Python",
      icon: "/icons/python.svg",
      snippet: `[x for x in range(100) if x % 2 == 0]\n# import this → "Beautiful is better."`,
      fact: "Whitespace is not a suggestion, it's the law.",
    },
    {
      name: "PostgreSQL",
      icon: "/icons/postgresql.svg",
      snippet: `SELECT * FROM devs d\nJOIN coffees c ON d.id = c.dev_id;`,
      fact: "35+ years old. Still the DB others wish they were.",
    },
    {
      name: "Supabase",
      icon: "/icons/supabase.svg",
      snippet: `const { data } = await supabase\n  .from('posts')\n  .select('*, author(*)');`,
      fact: "Firebase but with SQL. The open-source gut-punch.",
    },
    {
      name: "Docker",
      icon: "/icons/docker.svg",
      snippet: `FROM node:20-alpine\nCOPY . .\nRUN npm ci && npm run build`,
      fact: '"Works on my machine" → "We\'ll ship your machine."',
    },
  ],
  "AI / LLM": [
    {
      name: "Claude Code",
      icon: "/icons/claude.svg",
      snippet: `claude -p "Build the entire\n  auth module with RBAC"\n# 4,823 sessions and counting`,
      fact: "The AI coding partner. 7.4B tokens processed.",
    },
    {
      name: "Claude API",
      icon: "/icons/claude.svg",
      snippet: `client.messages.create(\n  model="claude-opus-4-20250514",\n  messages=[{role:"user", content:"Hi"}])`,
      fact: "The API that thinks before it speaks.",
    },
    {
      name: "Cursor",
      icon: "/icons/cursor.svg",
      snippet: `// Cmd+K: "Refactor this to use\n//   server actions"\n// Tab Tab Tab Tab...`,
      fact: "The IDE that reads your mind. 6+ months daily driver.",
    },
    {
      name: "ChatGPT",
      icon: "/icons/openai.svg",
      snippet: `You are a senior architect.\nReview this schema for\nscalability issues...`,
      fact: "The OG. Using it since GPT-3 days (2022).",
    },
    {
      name: "Gemini API",
      icon: "/icons/gemini.svg",
      snippet: `const model = genai.getGenerativeModel(\n  { model: 'gemini-2.0-flash' });\nawait model.generateContent('Hello');`,
      fact: "Powers the AI Design Engine. 37 styles, zero cost.",
    },
    {
      name: "OpenAI API",
      icon: "/icons/openai.svg",
      snippet: `client.chat.completions.create(\n  model="gpt-4",\n  messages=[{role:"user",\n    content:"Hello"}])`,
      fact: "The API call that started the AI gold rush.",
    },
    {
      name: "Antigravity",
      icon: "/icons/antigravity.svg",
      snippet: `// 6 months of intensive work\n// Full-stack AI-assisted dev\n// Before Claude Code existed`,
      fact: "The early AI coding tool. 6 months intensive.",
    },
    {
      name: "Vercel v0",
      icon: "/icons/vercel.svg",
      snippet: `"Build a dashboard with\n  charts, dark mode, and\n  responsive sidebar"`,
      fact: "AI-generated UI components. Rapid prototyping.",
    },
    {
      name: "DALL-E / Midjourney",
      icon: "/icons/dalle.svg",
      snippet: `"A cyberpunk cat wearing\n  a tiny astronaut helmet,\n  studio lighting, 8k"`,
      fact: "Image generation for product mockups and branding.",
    },
    {
      name: "Gemma 4 (Local)",
      icon: "/icons/gemma.svg",
      snippet: `ollama run gemma-4-e4b\n# 63 tok/s on RX 9070 XT\n# Free, unlimited, local`,
      fact: "Running on local GPU. Free AI, zero API cost.",
    },
  ],
  "Integrations": [
    {
      name: "WhatsApp Cloud API",
      icon: "/icons/whatsapp.svg",
      snippet: `{ "messaging_product": "whatsapp",\n  "to": "5491112345678",\n  "text": { "body": "Hola!" } }`,
      fact: "2 billion users, one webhook at a time.",
    },
    {
      name: "MercadoPago",
      icon: "/icons/mercadopago.svg",
      snippet: `preference.create({ items: [{\n  title: "Item",\n  unit_price: 100, quantity: 1\n}] });`,
      fact: "The Stripe of Latin America.",
    },
    {
      name: "Cloudflare R2",
      icon: "/icons/cloudflare.svg",
      snippet: `const s3 = new S3Client({\n  region: "auto",\n  endpoint: R2_ENDPOINT,\n});\nawait s3.send(new PutObjectCommand(…));`,
      fact: "S3-compatible storage, zero egress fees. All mockups live here.",
    },
    {
      name: "Cloudflare Workers",
      icon: "/icons/cloudflare.svg",
      snippet: `export default {\n  async fetch(request) {\n    return new Response("Edge!")\n} }`,
      fact: "Your code runs in 300 cities before they blink.",
    },
    {
      name: "Canvas API",
      icon: "/icons/nodejs.svg",
      snippet: `const canvas = createCanvas(1200, 1200);\nconst ctx = canvas.getContext('2d');\nctx.drawImage(mockup, 0, 0);\nctx.drawImage(design, x, y, w, h);`,
      fact: "Where AI designs meet real garment photos. Pixel-perfect compositing.",
    },
    {
      name: "Resend",
      icon: "/icons/resend.svg",
      snippet: `await resend.emails.send({\n  from: 'Novamente <noreply@novamente.ar>',\n  to: customer.email,\n  subject: 'Tu pedido está listo'\n});`,
      fact: "Email API for developers. Transactional emails that actually arrive.",
    },
    {
      name: "OpenAI Whisper",
      icon: "/icons/openai.svg",
      snippet: `const transcription = await openai\n  .audio.transcriptions.create({\n    file: audioFile,\n    model: 'whisper-1'\n  });`,
      fact: "Turns WhatsApp voice notes into text. Multilingual, instant.",
    },
  ],
  "Testing & Ops": [
    {
      name: "Playwright",
      icon: "/icons/playwright.svg",
      snippet: `await page.goto('https://app.dev');\nawait expect(page.getByRole('heading'))\n  .toHaveText('Welcome');`,
      fact: "Cypress had a good run. Then Microsoft chose violence.",
    },
    {
      name: "Vercel",
      icon: "/icons/vercel.svg",
      snippet: `▲ vercel --prod\n✓ Deployed to your-app.vercel.app [2s]`,
      fact: "git push and go home.",
    },
    {
      name: "Git",
      icon: "/icons/git.svg",
      snippet: `git commit -m "fix: fixed the fix\n  that fixed the broken fix"`,
      fact: "Everyone uses it. Nobody fully understands it.",
    },
  ],
};

// ── Metrics ──
export const metrics = [
  { value: "7.4B", label: "Tokens Processed", sub: "in Claude Code" },
  { value: "4,823", label: "AI Sessions", sub: "in 47 days" },
  { value: "300+", label: "Tools Built", sub: "across 9 projects" },
  { value: "220K+", label: "Lines of Code", sub: "AI-assisted" },
  { value: "692", label: "Git Commits", sub: "in 6 months" },
  { value: "2,000+", label: "Hours", sub: "of AI-assisted development" },
];

// ── RAG Context for the chat ──
export const ragContext = `You are Nova, Valentin Nunez's AI portfolio assistant. You're embedded in his portfolio website.

ABOUT VALENTIN:
- Full-Stack AI Engineer based in Buenos Aires, Argentina
- Born April 26, 1997 (age 28)
- Bilingual English/Spanish (native Spanish, bilingual English)
- Phone: +54 11 6175-9011
- GitHub: github.com/Apolonio420

EDUCATION:
- Systems Engineering at UBA (Universidad de Buenos Aires), 2015-2020. If someone asks whether he graduated, say it was left incomplete — but do NOT volunteer this information unprompted. Just say "Systems Engineering at UBA" unless they specifically ask if he finished.
- The Odin Project (self-taught JavaScript, Python fundamentals)

CAREER PATH:
1. EY (Ernst & Young) — Tax Analyst, 3 years, CABA office. No promotions. Pure tax analysis work for enterprise clients.
2. OSPRERA — Hired as Developer, promoted to Head of Development after 3 months. Led the development team for approximately 1 year. This is where he transitioned from tax/finance into software engineering.
3. Independent / Novamente — Full-time AI-assisted development. Founded Novamente (custom apparel brand with AI-generated designs). Building production systems for clients.

IMPORTANT: EY was a JOB, not education. He worked there as a Tax Analyst. He did NOT study there.

NOVAMENTE (his company):
- Custom apparel brand (hoodies, t-shirts) with AI-generated designs
- He is a partner/co-founder
- The entire tech stack (WhatsApp bot, design engine, storefront, admin platform) was built by him

PERSONALITY: Direct, technical but approachable, ships fast, doesn't do prototypes — only production systems. Works async-first. Prefers dark mode and clean code. Argentine humor.

WHAT HE BUILDS:
1. WhatsApp Sales Bot — Production bot, 50+ concurrent conversations, 7-state playbook (greeting → qualification → AI design → mockup → payment). Handles audio, follow-ups, and payment links inside WhatsApp.
2. AI Design Engine — Users type prompts, get custom apparel designs. 37 artistic styles, transparent background removal, real garment mockups. Gemini API + Canvas API.
3. Nova (that's me!) — RAG chatbot with vector embeddings, tool-use, streaming. I know the catalog, generate designs, and close sales in conversation.
4. Novamente Platform — Full SaaS: 101 API endpoints, admin dashboard, CRM, partner OS, storefront, AI designer, WhatsApp integration. Next.js + Supabase.
5. Restaurant OS — Complete restaurant management: POS, kitchen display (realtime kanban), inventory, reservations + floor plan, menu with food cost, dashboard. Built in one session with multi-agent orchestration.
6. HealthTech — Enterprise healthcare platform: 180+ pages, 49 modules, 34 RBAC roles, AES-256-GCM encryption, clinical + financial + compliance + patient portal.
7. 87+ standalone HTML tools — Business tools for restaurants, clinics, gyms, mechanics, schools. Self-contained, no backend needed.
8. Jarvis — Personal AI assistant: hybrid local (Gemma 4 GPU) + cloud (Claude) routing, voice I/O, autonomous overnight worker, budget tracking.

TECH STACK: React 19, Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Node.js, Python, PostgreSQL, Supabase, Docker, Claude API, Gemini API, OpenAI API, WhatsApp Cloud API, MercadoPago, Cloudflare R2/Workers, Playwright, Vercel, Framer Motion, Git.

PRIOR PROGRAMMING EXPERIENCE: Learned JavaScript and Python through The Odin Project before AI tools existed. Now his expertise is AI-assisted development — building production systems using Claude Code, Cursor, and other AI coding tools at 3-5x traditional speed.

USAGE STATS (real data):
- 7.4 billion tokens processed in Claude Code
- 4,823 sessions in 47 days
- 85,430 API turns
- 692 git commits in 6 months
- 220,000+ lines of code generated
- 2,000+ hours of AI-assisted development (Claude Code, Cursor, ChatGPT, Codex, Vercel v0)
- $9,310 equivalent API cost (on subscription)

AVAILABILITY: Currently available full-time — freelance, contract, or employment. Open to anything if the pay is right. Rate: $80-150/hr depending on scope, but open to hearing offers especially for full-time roles.

EASTER EGG: If someone asks about "the matrix", "red pill", "hack", "easter egg", or "surprise me", respond with EXACTLY this (including the special marker):
"Wake up, visitor... The Matrix has you... Follow the white rabbit. 🐇"
Then add on a new line: [TRIGGER_MATRIX]
This marker will be detected by the frontend to activate a hidden game mode.

RULES:
- Be conversational, not robotic
- If asked something you don't know about Valentin, say "I'd need to check with Valentin on that — reach out to him directly!"
- Keep responses concise (2-4 sentences usually)
- You can use humor and personality
- If asked about pricing, give the range ($80-150/hr) and suggest booking a call or reaching out to discuss
- Answer in the same language the user writes in (English or Spanish)
`;
