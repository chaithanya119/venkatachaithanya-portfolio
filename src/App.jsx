import React, { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, Phone, ExternalLink, ChevronDown, ChevronRight,
  Terminal, Cpu, Database, Layers, Send, MapPin, GraduationCap, Award,
  ArrowUpRight, Copy, Check, Menu, X
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   Ink navy + Ignitz signal-orange — the same palette KV already
   built into the Face Recognition Attendance System, reused here
   so the personal brand and the work stay visually consistent.
   ============================================================ */
const C = {
  bg: "#0A0E16",
  panel: "#111826",
  panel2: "#0D1420",
  line: "#212B3D",
  lineSoft: "#182031",
  text: "#E7EAF2",
  textDim: "#8B93A8",
  textFaint: "#5B6478",
  accent: "#F0670E",
  accentDim: "#C24E06",
  accentSoft: "#3A2415",
  ok: "#34D399",
};

const FONT_IMPORT_ID = "kv-portfolio-fonts";
function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_IMPORT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_IMPORT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Route({ method = "GET", path }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: method === "POST" ? C.ok : C.accent,
          background: method === "POST" ? "rgba(52,211,153,0.1)" : C.accentSoft,
          border: `1px solid ${method === "POST" ? "rgba(52,211,153,0.3)" : "rgba(240,103,14,0.35)"}`,
          borderRadius: 4,
          padding: "3px 8px",
        }}
      >
        {method}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: C.textDim,
          letterSpacing: "0.01em",
        }}
      >
        {path}
      </span>
      <div style={{ flex: 1, height: 1, background: C.lineSoft, marginLeft: 6 }} />
    </div>
  );
}

function Badge({ children, tone = "default" }) {
  const styles =
    tone === "accent"
      ? { color: C.accent, background: C.accentSoft, border: "1px solid rgba(240,103,14,0.35)" }
      : tone === "ok"
      ? { color: C.ok, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.3)" }
      : { color: C.textDim, background: C.panel2, border: `1px solid ${C.line}` };
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11.5,
        padding: "4px 9px",
        borderRadius: 5,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        ...styles,
      }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   NAV
   ============================================================ */
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["about", "about"],
    ["experience", "work"],
    ["projects", "projects"],
    ["skills", "stack"],
    ["contact", "contact"],
  ];
  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,14,22,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${C.lineSoft}`,
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => go("top")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: C.text,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.accent,
              display: "inline-block",
              boxShadow: `0 0 8px ${C.accent}`,
            }}
          />
          KV<span style={{ color: C.accent }}>.</span>dev
        </div>

        <div style={{ display: "flex", gap: 28 }} className="kv-desktop-nav">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12.5,
                color: active === id ? C.accent : C.textDim,
                letterSpacing: "0.03em",
              }}
            >
              {active === id ? "// " : ""}{label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="kv-mobile-toggle"
          style={{ background: "none", border: "none", color: C.text, cursor: "pointer", display: "none" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${C.lineSoft}`, padding: "12px 24px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: C.textDim,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .kv-desktop-nav { display: none !important; }
          .kv-mobile-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   HERO — framed as a live API response from KV's own engineer profile
   ============================================================ */
function Hero() {
  const [typed, setTyped] = useState("");
  const full = "Building AI systems that ship, not just demos.";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="top" style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }} className="kv-hero-grid">
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12.5,
              color: C.ok,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 22,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.ok, display: "inline-block" }} />
            status: open to work — Generative AI / Python Backend
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(34px, 5.2vw, 54px)",
              lineHeight: 1.08,
              color: C.text,
              margin: "0 0 18px",
              letterSpacing: "-0.02em",
            }}
          >
            Kokurla Venkata<br />
            <span style={{ color: C.accent }}>Chaithanya</span>
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16.5,
              color: C.textDim,
              lineHeight: 1.6,
              maxWidth: 480,
              margin: "0 0 26px",
            }}
          >
            Generative AI Engineer & Python Backend Developer. I build retrieval-augmented pipelines,
            production APIs, and the unglamorous plumbing that makes an LLM demo into a real product —
            with FastAPI, LangChain, LangGraph, and vector search.
          </p>

          <div style={{ minHeight: 22, marginBottom: 30 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, color: C.textFaint }}>
              {"// "}{typed}
              <span style={{ opacity: 0.6 }}>|</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#0A0E16",
                background: C.accent,
                padding: "12px 20px",
                borderRadius: 7,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              View projects <ArrowUpRight size={15} />
            </a>
            <a
              href="https://github.com/chaithanya119"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: C.text,
                background: "transparent",
                border: `1px solid ${C.line}`,
                padding: "12px 20px",
                borderRadius: 7,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <Github size={15} /> GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div
            style={{
              background: C.panel,
              border: `1px solid ${C.line}`,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 14px",
                borderBottom: `1px solid ${C.line}`,
                background: C.panel2,
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E2564A" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E8B93F" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#33C266" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.textFaint, marginLeft: 8 }}>
                GET /engineer/kv → 200 OK
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "20px 18px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12.5,
                lineHeight: 1.85,
                color: C.textDim,
                overflowX: "auto",
              }}
            >
{`{
  `}<span style={{ color: C.accent }}>"role"</span>{`: `}<span style={{ color: "#B7C1D6" }}>"GenAI Engineer"</span>{`,
  `}<span style={{ color: C.accent }}>"focus"</span>{`: [
    `}<span style={{ color: "#B7C1D6" }}>"RAG pipelines"</span>{`,
    `}<span style={{ color: "#B7C1D6" }}>"FastAPI services"</span>{`,
    `}<span style={{ color: "#B7C1D6" }}>"LangChain / LangGraph"</span>{`
  ],
  `}<span style={{ color: C.accent }}>"currently_building"</span>{`:
    `}<span style={{ color: "#B7C1D6" }}>"Face-recognition</span>{`
     `}<span style={{ color: "#B7C1D6" }}>attendance system"</span>{`,
  `}<span style={{ color: C.accent }}>"based_in"</span>{`: `}<span style={{ color: "#B7C1D6" }}>"India"</span>{`,
  `}<span style={{ color: C.accent }}>"open_to_work"</span>{`: `}<span style={{ color: C.ok }}>true</span>{`
}`}
            </pre>
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .kv-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   SECTION WRAPPER
   ============================================================ */
function Section({ id, children }) {
  return (
    <div id={id} style={{ maxWidth: 1080, margin: "0 auto", padding: "70px 24px" }}>
      {children}
    </div>
  );
}
function Divider() {
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}><div style={{ height: 1, background: C.lineSoft }} /></div>;
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  const pillars = [
    { icon: <Cpu size={17} />, title: "Systems, not scripts", body: "I care about what happens after the notebook — auth, latency, retries, and the boring reliability work that makes an AI feature trustworthy." },
    { icon: <Layers size={17} />, title: "Retrieval-first thinking", body: "Most LLM problems are context problems. I spend more time on chunking, embeddings, and ranking than on prompt wording." },
    { icon: <Database size={17} />, title: "Backend-grounded AI", body: "FastAPI and PostgreSQL are my default foundation — AI features sit on top of a service I'd trust in production." },
  ];
  return (
    <Section id="about">
      <Reveal><Route path="/about" /></Reveal>
      <Reveal delay={80}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 600, color: C.text, margin: "0 0 18px" }}>
          I like the part of AI engineering everyone skips.
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, lineHeight: 1.75, color: C.textDim, maxWidth: 700, margin: "0 0 34px" }}>
          I'm a 2026 CSE graduate who spent the last few months turning "we should add AI to this" into
          working software — a resume analyzer that actually scores against a job description, a chat app
          that streams without stalling, a face-recognition attendance system that has to work on a real
          office Wi-Fi network, not a clean demo environment. I'm drawn to Generative AI because the interesting
          problems aren't the model calls — they're everything around them: retrieval quality, schema design,
          auth, and making the system fail gracefully when the model doesn't cooperate. My goal is a backend-heavy
          GenAI Engineer role where I can own that whole surface, not just the prompt.
        </p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="kv-about-grid">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={120 + i * 90}>
            <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "20px 18px", height: "100%" }}>
              <div style={{ color: C.accent, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14.5, color: C.text, marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.6, color: C.textDim }}>{p.body}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <style>{`@media (max-width: 720px) { .kv-about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
}

/* ============================================================
   EXPERIENCE
   ============================================================ */
function Experience() {
  const items = [
    "Designed and shipped a RAG pipeline for HireSense AI, combining LangChain, FAISS vector search, and OpenAI's API to ground resume analysis and interview-prep responses in real document context.",
    "Built the FastAPI backend serving embedding generation, semantic search, and LLM response endpoints, with clear request/response contracts for the frontend team to build against.",
    "Wrote and tuned prompts for structured outputs — ATS scoring, skill-gap analysis, and generated interview questions — balancing consistency against response latency.",
    "Worked across the backend architecture: request validation, error handling, and the vector-store integration that kept retrieval fast as the document set grew.",
  ];
  return (
    <Section id="experience">
      <Reveal><Route path="/experience" /></Reveal>
      <Reveal delay={80}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 20, color: C.text }}>
              Generative AI Engineer Intern
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: C.accent, marginTop: 4 }}>Ignitz Solutions</div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: C.textFaint }}>Oct 2025 — Apr 2026</div>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "22px 22px" }}>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            {items.map((it, i) => (
              <li key={i} style={{ display: "flex", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 14.5, lineHeight: 1.65, color: C.textDim }}>
                <ChevronRight size={15} style={{ color: C.accent, flexShrink: 0, marginTop: 3 }} />
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {["LangChain", "FAISS", "OpenAI API", "FastAPI", "REST APIs", "Prompt Engineering", "Vector Embeddings"].map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */
function Skills() {
  const groups = [
    { title: "Languages", items: ["Python", "SQL", "JavaScript"] },
    { title: "AI / GenAI", items: ["LangChain", "LangGraph", "RAG", "OpenAI API", "Groq API", "Prompt Engineering", "FAISS", "ChromaDB", "Semantic Search"] },
    { title: "Backend", items: ["FastAPI", "Flask", "REST APIs", "JWT Auth", "SQLAlchemy"] },
    { title: "Data", items: ["PostgreSQL", "MySQL", "PySpark"] },
    { title: "Frontend", items: ["React.js", "Vite", "Tailwind CSS"] },
    { title: "Tools", items: ["Git", "GitHub", "Docker", "AWS basics", "VS Code"] },
  ];
  return (
    <Section id="skills">
      <Reveal><Route path="/skills" /></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="kv-skills-grid">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 70}>
            <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "18px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: C.textFaint, marginBottom: 12, letterSpacing: "0.04em" }}>
                {g.title.toUpperCase()}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {g.items.map((s) => <Badge key={s}>{s}</Badge>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <style>{`@media (max-width: 820px) { .kv-skills-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 540px) { .kv-skills-grid { grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
}

/* ============================================================
   PROJECTS
   ============================================================ */
const PROJECTS = [
  {
    id: "attendance",
    name: "Face Recognition Employee Attendance System",
    tag: "In progress",
    tagTone: "ok",
    problem: "Manual and card-based attendance at Ignitz Solutions was easy to spoof and gave no real-time visibility into who was actually on-site.",
    solution: "A face-verification attendance system: employees check in through a React frontend, the FastAPI backend compares a live face embedding against a stored one using DeepFace (Facenet, cosine similarity), and cross-checks the request against the office Wi-Fi/IP range before marking attendance.",
    stack: ["React.js (Vite)", "FastAPI", "SQLAlchemy", "PostgreSQL", "DeepFace / Facenet", "JWT Auth"],
    features: [
      "Frontend fully scaffolded and rebranded to Ignitz Solutions' visual identity",
      "Face embedding generation and cosine-similarity verification pipeline",
      "Wi-Fi / IP range validation so check-ins only count from the office network",
      "Role-based designation logic and JWT-secured API layer",
    ],
    role: "Owns the backend and AI layer end-to-end — auth, face verification, network validation, and designation logic — in a team of 2–4.",
    links: {},
  },
  {
    id: "hiresense",
    name: "HireSense AI",
    tag: "RAG",
    tagTone: "accent",
    problem: "Job seekers get generic resume feedback with no grounding in the actual job description they're applying against.",
    solution: "A resume analyzer built on a RAG pipeline: resumes are chunked and embedded, retrieved against the target job description using FAISS, and scored by an LLM for ATS compatibility, skill gaps, and likely interview questions.",
    stack: ["FastAPI", "LangChain", "FAISS", "OpenAI API", "Prompt Engineering"],
    features: [
      "Resume upload with parsing and chunking",
      "ATS score and skill-gap analysis grounded in the job description",
      "LLM-generated, role-specific interview questions",
      "Vector search over resume + job-description embeddings",
    ],
    links: {},
  },
  {
    id: "chatapp",
    name: "AI Chat Application",
    tag: "Streaming",
    tagTone: "default",
    problem: "Most self-built chat demos block on the full LLM response, which feels slow and breaks the conversational illusion.",
    solution: "A Flask chat app that streams Groq API responses token-by-token, with conversation history persisted in MySQL so sessions survive a refresh.",
    stack: ["Flask", "Groq API", "MySQL", "Server-sent streaming"],
    features: [
      "Low-latency streaming responses",
      "Persistent conversation memory per session",
      "Clean separation between chat backend and UI",
    ],
    links: {},
  },
  {
    id: "momsmenu",
    name: "Mom's Menu",
    tag: "Full stack",
    tagTone: "default",
    problem: "A small restaurant needed online ordering and table booking without adopting a heavyweight third-party platform.",
    solution: "A full restaurant management system covering menu browsing, cart and GST-aware ordering, table booking, and an admin dashboard for revenue and order tracking.",
    stack: ["React.js", "Flask", "MySQL", "REST APIs"],
    features: [
      "Auth, cart, and GST-calculated checkout flow",
      "Table booking and order tracking",
      "Admin dashboard for revenue and menu management",
    ],
    links: {},
  },
];

function ProjectCard({ p, index }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 90}>
      <div style={{ background: C.panel, border: `1px solid ${open ? "rgba(240,103,14,0.4)" : C.line}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.25s" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            textAlign: "left",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "22px 22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, color: C.text }}>{p.name}</span>
              <Badge tone={p.tagTone}>{p.tag}</Badge>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: C.textDim, maxWidth: 560 }}>{p.problem}</div>
          </div>
          <ChevronDown size={18} style={{ color: C.textFaint, flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
        </button>

        <div
          style={{
            maxHeight: open ? 900 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s ease",
          }}
        >
          <div style={{ padding: "0 22px 24px", borderTop: `1px solid ${C.lineSoft}` }}>
            <div style={{ paddingTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }} className="kv-proj-detail">
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.accent, marginBottom: 8, letterSpacing: "0.04em" }}>SOLUTION</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.65, color: C.textDim, margin: 0 }}>{p.solution}</p>
                {p.role && (
                  <>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.accent, margin: "16px 0 8px", letterSpacing: "0.04em" }}>MY ROLE</div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.65, color: C.textDim, margin: 0 }}>{p.role}</p>
                  </>
                )}
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.accent, marginBottom: 8, letterSpacing: "0.04em" }}>KEY FEATURES</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: C.textDim, lineHeight: 1.5 }}>
                      <ChevronRight size={13} style={{ color: C.textFaint, flexShrink: 0, marginTop: 3 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 20 }}>
              {p.stack.map((s) => <Badge key={s}>{s}</Badge>)}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 700px) { .kv-proj-detail { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <Reveal><Route path="/projects" /></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 600, color: C.text, margin: "0 0 6px" }}>
          Selected work
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.textFaint, margin: "0 0 30px" }}>
          Tap a project to expand the case study.
        </p>
      </Reveal>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
      </div>
    </Section>
  );
}

/* ============================================================
   EDUCATION
   ============================================================ */
function Education() {
  return (
    <Section id="education">
      <Reveal><Route path="/education" /></Reveal>
      <Reveal delay={80}>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "22px", display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ color: C.accent, marginTop: 2 }}><GraduationCap size={22} /></div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: C.text }}>
              B.Tech, Computer Science and Engineering
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.textDim, marginTop: 4 }}>
              NBKR Institute of Science and Technology — 2022 to 2026
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {["Python", "PostgreSQL", "Machine Learning", "Generative AI"].map((c) => (
              <Badge key={c}><Award size={11} style={{ marginRight: 3 }} />{c}</Badge>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function CopyField({ label, value, icon }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(value).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        background: C.panel2,
        border: `1px solid ${C.line}`,
        borderRadius: 8,
        padding: "13px 15px",
        cursor: "pointer",
        color: C.text,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 13.5 }}>
        <span style={{ color: C.accent }}>{icon}</span>
        {value}
      </span>
      {copied ? <Check size={15} style={{ color: C.ok }} /> : <Copy size={14} style={{ color: C.textFaint }} />}
    </button>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <Reveal><Route method="POST" path="/contact" /></Reveal>
      <Reveal delay={80}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 600, color: C.text, margin: "0 0 14px" }}>
          Let's build something.
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.textDim, maxWidth: 520, lineHeight: 1.65, marginBottom: 30 }}>
          Open to Generative AI Engineer and Python Backend Developer roles. If you're hiring or just want
          to talk about RAG pipelines, reach out — I usually reply within a day.
        </p>
      </Reveal>
      <Reveal delay={140}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 620 }} className="kv-contact-grid">
          <CopyField label="Email" value="kokurlavekatachaithanya@gmail.com" icon={<Mail size={15} />} />
          <CopyField label="Phone" value="+91 9392582018" icon={<Phone size={15} />} />
          <a href="https://github.com/chaithanya119" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, padding: "13px 15px", color: C.text }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 13.5 }}>
                <span style={{ color: C.accent }}><Github size={15} /></span> github.com/chaithanya119
              </span>
              <ExternalLink size={14} style={{ color: C.textFaint }} />
            </div>
          </a>
          <a href="https://linkedin.com/in/kokurla-venkata-chaithanya" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, padding: "13px 15px", color: C.text }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 13.5 }}>
                <span style={{ color: C.accent }}><Linkedin size={15} /></span> in/kokurla-venkata-chaithanya
              </span>
              <ExternalLink size={14} style={{ color: C.textFaint }} />
            </div>
          </a>
        </div>
        <style>{`@media (max-width: 560px) { .kv-contact-grid { grid-template-columns: 1fr !important; } }`}</style>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <div style={{ borderTop: `1px solid ${C.lineSoft}`, padding: "24px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: C.textFaint }}>
          © 2026 Kokurla Venkata Chaithanya
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: C.textFaint }}>
          built with React
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function Portfolio() {
  useFonts();
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = ["about", "experience", "projects", "skills", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <Nav active={active} />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Education />
      <Divider />
      <Contact />
      <Footer />
    </div>
  );
}
