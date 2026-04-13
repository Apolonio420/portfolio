// ── Tool name translations (Spanish filename → English display name) ──
export const toolNameTranslations: Record<string, string> = {
  "comandas-cocina": "Kitchen Orders",
  "control-mesas": "Table Management",
  "lista-espera": "Waitlist",
  "fichas-tecnicas-platos": "Dish Technical Specs",
  "mermas-desperdicios": "Waste Tracker",
  "control-temperaturas": "Temperature Control",
  "control-proveedores": "Supplier Management",
  "recepcion-mercaderia": "Goods Receipt",
  "control-vencimientos": "Expiration Tracker",
  "analisis-ventas": "Sales Analysis",
  "control-costos-plato": "Dish Cost Control",
  "control-propinas": "Tip Tracker",
  "bitacora-sanitaria": "Sanitation Log",
  "planificador-menu-semanal": "Weekly Menu Planner",
  "recetario-digital": "Digital Recipe Book",
  "reservas-premium": "Reservations",
  "menu-qr-premium": "QR Menu",
  "pos-punto-venta-premium": "Point of Sale (POS)",
  "pedidos-delivery-premium": "Delivery Orders",
  "generador-facturas": "Invoice Generator",
  "cotizador-premium": "Quote Generator",
  "inventario-premium": "Inventory Management",
  "inventario": "Basic Inventory",
  "directorio-empleados": "Employee Directory",
  "turnos-empleados": "Employee Shifts",
  "turnera-premium": "Shift Scheduler",
  "checklist-limpieza": "Cleaning Checklist",
  "horario-clases-premium": "Class Schedule",
  "asistencia-qr": "QR Attendance",
  "crm-kanban-premium": "CRM Kanban",
  "clientes-vip": "VIP Clients",
  "programa-lealtad": "Loyalty Program",
  "encuestas-satisfaccion": "Satisfaction Surveys",
  "control-caja-chica": "Petty Cash Control",
  "generador-contratos": "Contract Generator",
  "valuacion-propiedades": "Property Valuation",
  "ficha-paciente-premium": "Patient Records",
  "patient-records": "Patient Records",
  "membresias-gym": "Gym Memberships",
  "gym-membership": "Gym Membership",
  "orden-trabajo-mecanico": "Mechanic Work Orders",
  "taller-mecanico": "Mechanic Workshop",
  "agenda-servicios-premium": "Service Scheduler",
  "sistema-garantias": "Warranty System",
  "mantenimiento-equipos": "Equipment Maintenance",
  "control-alumnos-premium": "Student Management",
}

// ── Category translations ──
export const categoryTranslations: Record<string, string> = {
  "Restaurant & Kitchen": "Restaurante y Cocina",
  "Point of Sale & Delivery": "Punto de Venta y Delivery",
  "Inventory & Warehouse": "Inventario y Almacén",
  "HR & Scheduling": "RRHH y Turnos",
  "CRM & Customers": "CRM y Clientes",
  "Finance & Admin": "Finanzas y Admin",
  "Health & Wellness": "Salud y Bienestar",
  "Auto & Services": "Autos y Servicios",
  "Education": "Educación",
}

// ── Section translations ──
export const sections = {
  // Navbar
  navProjects: { en: "Projects", es: "Proyectos" },
  navTools: { en: "Tools", es: "Herramientas" },
  navStack: { en: "Stack", es: "Stack" },
  navAbout: { en: "About", es: "Sobre mí" },
  navContact: { en: "Contact", es: "Contacto" },
  navAvailable: { en: "Available for hire", es: "Disponible" },

  // Hero
  heroTitle: { en: "AI Agent & Full-Stack Engineer", es: "Ingeniero AI & Full-Stack" },
  heroStats: {
    en: "300+ tools built · 7.4B tokens processed · 201 API endpoints shipped",
    es: "300+ herramientas · 7.4B tokens procesados · 201 endpoints de API",
  },
  heroSeeWork: { en: "See my work", es: "Ver mi trabajo" },
  heroTalkAI: { en: "Talk to my AI", es: "Hablar con mi IA" },

  // Logo strip
  logoTrusted: { en: "Technologies & Experience", es: "Tecnologías y Experiencia" },
  logoExp: { en: "Enterprise Experience", es: "Experiencia Enterprise" },
  logoShipped: { en: "Shipped to Production", es: "En producción" },
  logoResponse: { en: "Average Response Time", es: "Tiempo de respuesta" },

  // Chat
  chatTitle: { en: "Talk to my AI", es: "Hablá con mi IA" },
  chatSubtitle: {
    en: "Ask me anything about Valentin's projects, skills, or experience",
    es: "Preguntame lo que quieras sobre los proyectos, skills o experiencia de Valentin",
  },
  chatPlaceholder: { en: "Ask anything about Valentin...", es: "Preguntá lo que quieras..." },
  chatGreeting: {
    en: "Hey! I'm Nova, Valentin's AI assistant. Ask me anything about his projects, skills, or what he can build for you. 💬",
    es: "¡Hola! Soy Nova, la asistente IA de Valentin. Preguntame lo que quieras sobre sus proyectos, skills, o qué puede construir para vos. 💬",
  },

  // Case Studies
  csTitle: { en: "What I've Built", es: "Lo que construí" },
  csSubtitle: {
    en: "Real systems. Real production. Click any card to see the full story.",
    es: "Sistemas reales. En producción. Clickeá cualquier card para ver la historia completa.",
  },
  csProblem: { en: "The Problem", es: "El Problema" },
  csSolution: { en: "The Solution", es: "La Solución" },

  // Tools
  toolsTitle: { en: "Tools Built", es: "Herramientas" },
  toolsSubtitle: {
    en: "Self-contained business tools — no backend, no setup, just open and use",
    es: "Herramientas de negocio autocontenidas — sin backend, sin setup, abrir y usar",
  },
  toolsOpenDemo: { en: "Open Live Demo", es: "Abrir Demo" },
  toolsFooter: {
    en: "Each tool is self-contained HTML — zero dependencies, zero backend, instant deployment",
    es: "Cada herramienta es HTML autocontenido — sin dependencias, sin backend, deploy instantáneo",
  },

  // Tech Stack
  stackLabel: { en: "What I Build With", es: "Con qué construyo" },
  stackTitle: { en: "Tech Stack", es: "Stack Tecnológico" },

  // How I Work
  hiwTitle: { en: "How I Work", es: "Cómo trabajo" },
  hiwAsync: { en: "Async-First", es: "Asincrónico" },
  hiwAsyncDesc: {
    en: "UTC-3, 4+ hours overlap with US East Coast. Clear English communication, written updates, no meetings needed.",
    es: "UTC-3, 4+ horas de overlap con US East Coast. Comunicación clara en inglés, updates escritos, sin reuniones innecesarias.",
  },
  hiwFast: { en: "Ship Fast", es: "Entrega Rápida" },
  hiwFastDesc: {
    en: "Multi-agent AI orchestration = 3-5x development speed. From idea to deployed product in days, not months.",
    es: "Orquestación multi-agente de IA = 3-5x velocidad de desarrollo. De idea a producto deployeado en días, no meses.",
  },
  hiwProd: { en: "Production-Grade", es: "Calidad Producción" },
  hiwProdDesc: {
    en: "Tests, types, CI/CD, monitoring, security-first. Every project comes with clean code and documentation.",
    es: "Tests, tipos, CI/CD, monitoreo, security-first. Cada proyecto viene con código limpio y documentación.",
  },

  // Metrics
  metricsTokens: { en: "Tokens Processed", es: "Tokens Procesados" },
  metricsTokensSub: { en: "in Claude Code", es: "en Claude Code" },
  metricsSessions: { en: "AI Sessions", es: "Sesiones de IA" },
  metricsSessionsSub: { en: "in 47 days", es: "en 47 días" },
  metricsTools: { en: "Tools Built", es: "Herramientas" },
  metricsToolsSub: { en: "across 9 projects", es: "en 9 proyectos" },
  metricsLOC: { en: "Lines of Code", es: "Líneas de Código" },
  metricsLOCSub: { en: "AI-assisted", es: "asistidas por IA" },
  metricsCommits: { en: "Git Commits", es: "Commits" },
  metricsCommitsSub: { en: "in 6 months", es: "en 6 meses" },
  metricsHours: { en: "Hours", es: "Horas" },
  metricsHoursSub: { en: "of AI-assisted development", es: "de desarrollo con IA" },

  // Background
  bgEY: { en: "3 Years at EY", es: "3 Años en EY" },
  bgEYDesc: {
    en: "Tax Analyst — enterprise clients, compliance, financial analysis",
    es: "Tax Analyst — clientes enterprise, compliance, análisis financiero",
  },
  bgOsprera: { en: "Head of Development", es: "Jefe de Desarrollo" },
  bgOspreraDesc: {
    en: "OSPRERA — Developer → promoted to Head of Dev in 3 months",
    es: "OSPRERA — Desarrollador → ascendido a Jefe de Desarrollo en 3 meses",
  },
  bgEng: { en: "Systems Engineering", es: "Ingeniería en Sistemas" },
  bgEngDesc: { en: "UBA (Universidad de Buenos Aires), 2015-2020", es: "UBA (Universidad de Buenos Aires), 2015-2020" },
  bgLang: { en: "Bilingual EN/ES", es: "Bilingüe EN/ES" },
  bgLangDesc: {
    en: "Native Spanish, bilingual English. Clear async communication",
    es: "Español nativo, inglés bilingüe. Comunicación async clara",
  },
  bgLocation: { en: "Buenos Aires, Argentina", es: "Buenos Aires, Argentina" },
  bgLocationDesc: {
    en: "UTC-3. Perfect timezone for US East Coast overlap",
    es: "UTC-3. Timezone perfecto para overlap con US East Coast",
  },

  // CTA
  ctaTitle: { en: "Let's Build Something", es: "Construyamos algo" },
  ctaSubtitle: {
    en: "Currently available for freelance projects, contract roles, and fractional CTO engagements.",
    es: "Disponible para proyectos freelance, contratos, y CTO fraccional.",
  },
}

// ── Case study translations ──
export const caseStudyTranslations = {
  "whatsapp-bot": {
    title: { en: "WhatsApp Sales Bot", es: "Bot de Ventas WhatsApp" },
    tagline: {
      en: "50+ concurrent conversations, fully autonomous sales",
      es: "50+ conversaciones simultáneas, ventas autónomas",
    },
    problem: {
      en: "A custom apparel brand was losing sales because WhatsApp inquiries piled up faster than 2-3 staff could handle. Customers asked for custom designs, pricing, and mockups — all manually. Response times stretched to hours, and after-hours messages went unanswered entirely.",
      es: "Una marca de ropa personalizada perdía ventas porque las consultas de WhatsApp se acumulaban más rápido de lo que 2-3 empleados podían manejar. Los clientes pedían diseños custom, precios y mockups — todo manualmente. Los tiempos de respuesta se estiraban a horas, y los mensajes fuera de horario quedaban sin responder.",
    },
    solution: {
      en: "Built a stateful conversational bot on the WhatsApp Cloud API with a 7-state finite machine: greeting → qualification (what product, what size, what design idea) → AI design generation via Gemini API → automatic background removal and placement onto real garment mockups using Canvas API → pricing calculation → MercadoPago payment link generation — all inside the same WhatsApp thread. The bot handles audio transcription (OpenAI Whisper), image analysis, smart follow-ups after 24h of inactivity, and concurrent session management via Supabase. Each conversation state persists independently, so 50+ customers can be at different stages simultaneously without interference.",
      es: "Construí un bot conversacional stateful sobre WhatsApp Cloud API con una máquina de 7 estados: saludo → calificación (qué producto, qué talle, qué idea de diseño) → generación de diseño AI con Gemini API → remoción automática de fondo y colocación sobre mockups reales de prendas usando Canvas API → cálculo de precio → generación de link de pago de MercadoPago — todo dentro del mismo hilo de WhatsApp. El bot maneja transcripción de audio (OpenAI Whisper), análisis de imágenes, follow-ups inteligentes después de 24h de inactividad, y gestión de sesiones concurrentes vía Supabase. Cada estado de conversación persiste independientemente, así 50+ clientes pueden estar en etapas diferentes simultáneamente sin interferencia.",
    },
    results: {
      en: [
        "24/7 autonomous sales",
        "Replaced 2-3 staff",
        "50+ concurrent chats",
        "7 states: greeting → pay",
      ],
      es: [
        "Ventas 24/7 autónomas",
        "Reemplazó 2-3 empleados",
        "50+ chats simultáneos",
        "7 estados: saludo → pago",
      ],
    },
  },
  "ai-designer": {
    title: { en: "AI Design Engine", es: "Motor de Diseño AI" },
    tagline: {
      en: "Type a prompt, get a custom design in seconds",
      es: "Escribí un prompt, obtené un diseño en segundos",
    },
    problem: {
      en: "Customers wanted unique apparel designs but couldn't communicate their vision to a human designer. The traditional workflow — customer describes idea → designer interprets → sends draft → revisions — took days per design and required a full-time designer on payroll. Custom products were expensive to offer and impossible to scale.",
      es: "Los clientes querían diseños únicos pero no podían comunicar su visión a un diseñador humano. El workflow tradicional — el cliente describe la idea → el diseñador interpreta → manda borrador → revisiones — tomaba días por diseño y requería un diseñador full-time en nómina. Los productos custom eran caros de ofrecer e imposibles de escalar.",
    },
    solution: {
      en: "Built a full AI design pipeline: the user types a natural language prompt (e.g. 'a wolf howling at the moon in neon style'), the system sends it to Gemini's image generation model with one of 37 curated style prompts that control the artistic output (cyberpunk, watercolor, pixel art, manga, etc.). The generated image goes through automatic transparent background removal, then gets composited onto a real product photo (t-shirt, hoodie, tote bag) using the HTML Canvas API with proper scaling and positioning. Final mockups are stored on Cloudflare R2 for instant delivery. The whole pipeline runs in under 5 seconds, costs $0 per generation on Gemini's free tier, and produces print-ready designs that go straight to production.",
      es: "Construí un pipeline completo de diseño AI: el usuario escribe un prompt en lenguaje natural (ej: 'un lobo aullando a la luna en estilo neon'), el sistema lo envía al modelo de generación de imágenes de Gemini con uno de 37 prompts de estilo curados que controlan la salida artística (cyberpunk, acuarela, pixel art, manga, etc.). La imagen generada pasa por remoción automática de fondo transparente, y luego se compone sobre una foto real del producto (remera, buzo, tote bag) usando la Canvas API de HTML con escalado y posicionamiento correctos. Los mockups finales se guardan en Cloudflare R2 para entrega instantánea. Todo el pipeline corre en menos de 5 segundos, cuesta $0 por generación con el tier gratuito de Gemini, y produce diseños listos para impresión que van directo a producción.",
    },
    results: {
      en: [
        "Days → 5 seconds",
        "37 artistic styles",
        "Zero designer needed",
        "$0 per design",
      ],
      es: [
        "Días → 5 segundos",
        "37 estilos artísticos",
        "Cero diseñador necesario",
        "$0 por diseño",
      ],
    },
  },
  "nova-rag": {
    title: { en: "Nova — RAG AI Assistant", es: "Nova — Asistente RAG AI" },
    tagline: {
      en: "AI that generates designs, answers questions, and helps everyone",
      es: "IA que genera diseños, responde preguntas y ayuda a todos",
    },
    problem: {
      en: "The brand serves two distinct audiences — end customers and B2B wholesale partners — each with different questions, workflows, and needs. Customers ask about sizes, colors, pricing, and custom designs. Partners need bulk pricing, order tracking, catalog browsing, and account management. A single FAQ page couldn't cover it, and human support couldn't scale.",
      es: "La marca sirve a dos audiencias distintas — clientes finales y partners mayoristas B2B — cada uno con preguntas, workflows y necesidades diferentes. Los clientes preguntan por talles, colores, precios y diseños custom. Los partners necesitan precios mayoristas, tracking de pedidos, navegación del catálogo y gestión de cuenta. Una página de FAQ no alcanzaba, y el soporte humano no escalaba.",
    },
    solution: {
      en: "Built a RAG (Retrieval-Augmented Generation) assistant using pgvector embeddings over the full product catalog (500+ products with descriptions, sizing charts, materials, stock levels, and pricing tiers). Nova uses Gemini API for conversational responses grounded in retrieved context — no hallucinations because every answer is backed by real database records. The assistant can generate AI designs on demand inside the chat (same pipeline as the design engine), show real garment mockups, check order status via Supabase queries, and route complex inquiries to a human when needed. Built with streaming responses for instant feedback, conversation history for context continuity, and automatic language detection (EN/ES).",
      es: "Construí un asistente RAG (Retrieval-Augmented Generation) usando embeddings de pgvector sobre todo el catálogo de productos (500+ productos con descripciones, tablas de talles, materiales, niveles de stock y precios por tier). Nova usa Gemini API para respuestas conversacionales fundamentadas en contexto recuperado — cero alucinaciones porque cada respuesta está respaldada por registros reales de la base de datos. El asistente puede generar diseños AI on demand dentro del chat (mismo pipeline del motor de diseño), mostrar mockups reales de prendas, consultar estado de pedidos vía queries a Supabase, y derivar consultas complejas a un humano. Construido con streaming para feedback instantáneo, historial de conversación para continuidad, y detección automática de idioma (EN/ES).",
    },
    results: {
      en: [
        "Serves B2C + B2B",
        "AI designs in chat",
        "500+ products indexed",
        "Zero hallucinations",
      ],
      es: [
        "Sirve B2C + B2B",
        "Diseños AI en el chat",
        "500+ productos indexados",
        "Cero alucinaciones",
      ],
    },
  },
  "restaurant-os": {
    title: { en: "Restaurant OS", es: "Restaurant OS" },
    tagline: {
      en: "Full SaaS with 6 modules, built in one session",
      es: "SaaS completo con 6 módulos, construido en una sesión",
    },
    problem: {
      en: "Restaurants in LATAM typically pay for 6+ separate SaaS tools — one for POS, another for inventory, another for reservations, another for kitchen display, another for menu management, another for analytics. Total cost: $200+/mo, with zero integration between them. Data lives in silos, nothing syncs, and the owner needs to check 6 different dashboards.",
      es: "Los restaurantes en LATAM típicamente pagan por 6+ herramientas SaaS separadas — una para POS, otra para inventario, otra para reservas, otra para display de cocina, otra para gestión de menú, otra para analytics. Costo total: $200+/mes, con cero integración entre ellas. Los datos viven en silos, nada se sincroniza, y el dueño necesita revisar 6 dashboards diferentes.",
    },
    solution: {
      en: "Built a complete restaurant management platform with 6 integrated modules sharing one Supabase database: (1) POS system with product search, cart, payment processing, and receipt generation; (2) Kitchen display with real-time Kanban board that shows orders as they come in and lets cooks drag them through prep → ready → served; (3) Inventory with automatic stock deduction when orders are placed, low-stock alerts, and supplier management; (4) Reservation system with interactive floor plan — drag tables, set capacity, manage waitlists; (5) Menu editor with food cost analysis — input ingredients and quantities, the system calculates cost per plate and suggested pricing; (6) Dashboard with daily/weekly/monthly KPIs, top-selling items, revenue trends, and staff performance. All modules sync in real-time via Supabase subscriptions, so the kitchen sees orders instantly, inventory updates on every sale, and the dashboard reflects live data.",
      es: "Construí una plataforma completa de gestión de restaurante con 6 módulos integrados compartiendo una base de datos Supabase: (1) Sistema POS con búsqueda de productos, carrito, procesamiento de pago y generación de tickets; (2) Display de cocina con tablero Kanban en tiempo real que muestra pedidos apenas llegan y permite a los cocineros arrastrarlos por preparación → listo → servido; (3) Inventario con deducción automática de stock cuando se realizan pedidos, alertas de stock bajo y gestión de proveedores; (4) Sistema de reservas con plano interactivo — arrastrar mesas, establecer capacidad, gestionar listas de espera; (5) Editor de menú con análisis de food cost — ingresás ingredientes y cantidades, el sistema calcula costo por plato y precio sugerido; (6) Dashboard con KPIs diarios/semanales/mensuales, items más vendidos, tendencias de revenue y performance del staff. Todos los módulos se sincronizan en tiempo real vía suscripciones de Supabase.",
    },
    results: {
      en: [
        "Replaces 6 paid tools",
        "Built in one session",
        "Realtime sync",
        "$200+/mo → one app",
      ],
      es: [
        "Reemplaza 6 tools pagas",
        "Construido en una sesión",
        "Sync en tiempo real",
        "$200+/mes → una app",
      ],
    },
  },
  "healthtech": {
    title: { en: "HealthTech Enterprise Platform", es: "Plataforma Enterprise HealthTech" },
    tagline: {
      en: "180+ pages, 49 modules, enterprise-grade security",
      es: "180+ páginas, 49 módulos, seguridad enterprise",
    },
    problem: {
      en: "A healthcare organization (gerenciadora) was running on 3+ disconnected legacy systems — one for clinical management, one for financial operations, one for provider credentialing. Patient data was fragmented, audit trails were incomplete, role-based access was ad-hoc, and compliance with healthcare regulations required manual processes that didn't scale.",
      es: "Una gerenciadora de salud operaba con 3+ sistemas legacy desconectados — uno para gestión clínica, otro para operaciones financieras, otro para acreditación de prestadores. Los datos de pacientes estaban fragmentados, las pistas de auditoría incompletas, el control de acceso por roles era ad-hoc, y el cumplimiento regulatorio requería procesos manuales que no escalaban.",
    },
    solution: {
      en: "Architected and built a full enterprise platform from scratch with 49 domain modules organized into 6 verticals: (1) Clinical — patient records, medical history, appointment scheduling, prescriptions, lab results; (2) Financial — billing, claims processing, payment reconciliation, budget planning, cost center management; (3) Compliance — audit trail logging every action with user/timestamp/IP, regulatory checklist tracking, document versioning; (4) Provider Network — credentialing workflows, contract management, performance scoring, geographic coverage mapping; (5) Patient Portal — self-service appointments, medical records access, secure messaging, payment history; (6) Admin — RBAC with 34 granular roles (from receptionist to system admin), organization hierarchy management, system configuration. Security includes AES-256-GCM encryption for sensitive data at rest, HTTPS everywhere, session management, and field-level access control. End-to-end tested with Playwright across all critical flows.",
      es: "Diseñé y construí una plataforma enterprise completa desde cero con 49 módulos de dominio organizados en 6 verticales: (1) Clínica — fichas de pacientes, historia clínica, agenda de turnos, recetas, resultados de laboratorio; (2) Financiera — facturación, procesamiento de prestaciones, conciliación de pagos, planificación presupuestaria, gestión de centros de costo; (3) Compliance — pista de auditoría registrando cada acción con usuario/timestamp/IP, seguimiento de checklists regulatorios, versionado de documentos; (4) Red de Prestadores — workflows de acreditación, gestión de contratos, scoring de performance, mapeo de cobertura geográfica; (5) Portal de Pacientes — turnos self-service, acceso a historia clínica, mensajería segura, historial de pagos; (6) Admin — RBAC con 34 roles granulares (desde recepcionista hasta admin de sistema), gestión de jerarquía organizacional, configuración del sistema. Seguridad incluye cifrado AES-256-GCM para datos sensibles en reposo, HTTPS en todo, gestión de sesiones, y control de acceso a nivel de campo. Testeado end-to-end con Playwright en todos los flujos críticos.",
    },
    results: {
      en: [
        "3+ systems → one",
        "180+ pages, 49 modules",
        "AES-256-GCM encryption",
        "34 roles, granular RBAC",
      ],
      es: [
        "3+ sistemas → uno",
        "180+ páginas, 49 módulos",
        "Cifrado AES-256-GCM",
        "34 roles, RBAC granular",
      ],
    },
  },
  "jarvis": {
    title: { en: "Jarvis — Hybrid AI Orchestrator", es: "Jarvis — Orquestador AI Híbrido" },
    tagline: {
      en: "Local GPU + Cloud AI, voice I/O, autonomous worker",
      es: "GPU local + AI en la nube, voz, worker autónomo",
    },
    problem: {
      en: "AI API costs explode when you use the best model for everything. Needed a system that uses the cheapest model capable of each task — from free local GPU to expensive cloud reasoning.",
      es: "Los costos de API de AI explotan cuando usás el mejor modelo para todo. Necesitaba un sistema que use el modelo más barato capaz de cada tarea — desde GPU local gratis hasta razonamiento cloud caro.",
    },
    solution: {
      en: "Built a 4-tier AI workforce: Gemma 4 (local GPU, free, 63 tok/s) for bulk tasks like tests and docs, Haiku for chat and triage, Sonnet for multi-file code and features, Opus only as advisor when stuck. Auto-routes by complexity. Voice I/O in Spanish, autonomous overnight worker, budget tracking, computer use.",
      es: "Construí un workforce AI de 4 niveles: Gemma 4 (GPU local, gratis, 63 tok/s) para tareas masivas como tests y docs, Haiku para chat y triage, Sonnet para código multi-archivo y features, Opus solo como advisor cuando se traba. Ruteo automático por complejidad. Voz en español, worker autónomo nocturno, tracking de presupuesto, computer use.",
    },
    results: {
      en: [
        "Local AI: $0 cost, 63 tok/s",
        "4-tier model routing system",
        "Autonomous overnight worker",
        "Voice I/O in Spanish + English",
      ],
      es: [
        "AI local: $0 costo, 63 tok/s",
        "Sistema de ruteo de 4 niveles",
        "Worker autónomo nocturno",
        "Voz en español e inglés",
      ],
    },
  },
}
