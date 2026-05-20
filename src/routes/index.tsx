import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, Download, Mail, Phone, Github, Linkedin, MapPin,
  Code2, Wrench, Brain, Sparkles, GraduationCap, Award, ExternalLink, Send, Menu, X, Sun, Moon,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const RESUME_URL = "https://drive.google.com/drive/folders/1nLW08IEUPiWXkW13MPI_ClVXV4O85oQz";
const CERT_URL = "https://drive.google.com/drive/folders/1nLW08IEUPiWXkW13MPI_ClVXV4O85oQz";
const GITHUB = "https://github.com/Parvez2003-cell";
const LINKEDIN = "https://linkedin.com/in/parvez-ansari-521704377";
const EMAIL = "work.seek2003@gmail.com";
const PHONE = "+91 9693190035";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${i <= value ? "fill-foreground" : "fill-border"}`}>
          <path d="M10 1.5l2.6 5.27 5.82.84-4.21 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79L1.58 7.61l5.82-.84z" />
        </svg>
      ))}
    </div>
  );
}

type Skill = { name: string; rating: number };
const SKILL_GROUPS: { title: string; icon: React.ReactNode; items: Skill[] }[] = [
  {
    title: "Programming Languages", icon: <Code2 className="h-4 w-4" />,
    items: [
      { name: "Java", rating: 5 }, { name: "Python", rating: 4 }, { name: "SQL", rating: 4 },
      { name: "HTML", rating: 5 }, { name: "CSS", rating: 5 }, { name: "JavaScript", rating: 4 },
    ],
  },
  {
    title: "Concepts", icon: <Brain className="h-4 w-4" />,
    items: [
      { name: "OOPs", rating: 5 }, { name: "DSA", rating: 4 }, { name: "Problem Solving", rating: 4 },
    ],
  },
  {
    title: "Tools", icon: <Wrench className="h-4 w-4" />,
    items: [
      { name: "GitHub", rating: 5 }, { name: "Linux", rating: 4 }, { name: "AWS", rating: 3 },
      { name: "Jupyter Notebook", rating: 4 }, { name: "VS Code", rating: 5 },
    ],
  },
  {
    title: "Soft Skills", icon: <Sparkles className="h-4 w-4" />,
    items: [
      { name: "Adaptability", rating: 5 }, { name: "Critical Thinking", rating: 4 }, { name: "Teamwork", rating: 5 },
    ],
  },
];

type Project = {
  title: string; description: string; tech: string[]; live?: string; github?: string;
};
const PROJECTS: Project[] = [
  {
    title: "Bully-Free Social Media Platform",
    description: "Responsive social platform with moderation tools, reporting system, and content filtering. Dynamic interface for user interaction and flagged content handling.",
    tech: ["HTML", "CSS", "JavaScript", "Streamlit"],
    github: GITHUB,
  },
  {
    title: "Resume Parser + Job Matcher",
    description: "Parses PDF/DOCX resumes using spaCy, extracts skills, and matches jobs with cosine similarity. Built with React, Flask, and scikit-learn.",
    tech: ["React", "Flask", "NLP", "Scikit-learn"],
    github: GITHUB,
  },
  {
    title: "FlexBox Design",
    description: "Interactive showcase exploring modern CSS Flexbox layouts and responsive design patterns.",
    tech: ["HTML", "CSS", "Flexbox"],
    live: "https://parvez2003-cell.github.io/FlexBoxDesign/",
    github: GITHUB,
  },
  {
    title: "Fast News",
    description: "Lightweight news reader that aggregates headlines with a clean, distraction-free reading experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://parvez2003-cell.github.io/Fast-news/",
    github: GITHUB,
  },
  {
    title: "Movie Landing Page",
    description: "Cinematic landing page with smooth animations and modern responsive design deployed on Vercel.",
    tech: ["React", "Tailwind", "Vercel"],
    live: "https://movie-landing-pym38dhz5-parvez-ansaris-projects-ce91d659.vercel.app",
    github: GITHUB,
  },
];

const EDUCATION = [
  { school: "K.S Institute Of Technology", detail: "BE", year: "2022 – Present", score: "CGPA: 7.94" },
  { school: "Dayananda PU College", detail: "PCMB", year: "2021", score: "94.5%" },
  { school: "Jawahar English High School", detail: "Secondary", year: "2019", score: "97.12%" },
];

const CERTIFICATIONS = [
  "Fundamentals of Java Programming",
  "Introduction to Python",
  "Azure SQL",
  "Introduction to AI",
  "Cloud Computing",
];

function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}`);
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
        <div className={`mx-auto max-w-6xl px-4 ${scrolled ? "glass rounded-full mx-4 md:mx-auto md:max-w-4xl shadow-soft" : ""}`}>
          <div className="flex items-center justify-between px-2">
            <a href="#top" className="font-display text-xl tracking-tight">Parvez<span className="text-muted-foreground">.</span></a>
            <nav className="hidden md:flex items-center gap-7 text-sm">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card hover:bg-accent transition"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <a href="#contact" className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition">
                Let's talk <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <button className="md:hidden p-2" onClick={() => setNavOpen((o) => !o)} aria-label="Menu">
                {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {navOpen && (
            <div className="md:hidden mt-3 glass rounded-2xl p-4 flex flex-col gap-3">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setNavOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                  {n.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="bg-hero relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Open to opportunities
              </div>
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight">
                Hi, I'm <span className="italic">Parvez Ansari</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl">
                Full Stack Developer & Software Engineering Enthusiast — building clean web experiences, scalable software solutions, and intelligent applications.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition hover-lift">
                  View Projects <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href={RESUME_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-medium hover:bg-accent transition hover-lift">
                  <Download className="h-4 w-4" /> Download Resume
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-medium hover:bg-accent transition hover-lift">
                  Contact Me
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Bengaluru, India</span>
                <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-foreground transition inline-flex items-center gap-1.5"><Github className="h-4 w-4" /> GitHub</a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-foreground transition inline-flex items-center gap-1.5"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              </div>
            </div>
            <div className="fade-up">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-4 rounded-3xl bg-foreground/5 blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border shadow-card bg-card">
                  <img src={profileImg} alt="Parvez Ansari" width={768} height={768} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-4 py-3 shadow-soft">
                  <div className="text-xs text-muted-foreground">Currently</div>
                  <div className="text-sm font-medium">BE @ KSIT • CGPA 7.94</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" eyebrow="About" title="A developer who ships clean, thoughtful work.">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Aspiring software developer with a strong foundation in full-stack web development and machine learning, seeking opportunities to contribute and grow in dynamic tech environments.
              </p>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition hover-lift">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "BE Student", "CGPA: 7.94", "Full Stack Dev", "Machine Learning",
                "Problem Solving", "Open to Opportunities",
              ].map((f) => (
                <div key={f} className="rounded-2xl border bg-card p-4 text-sm hover-lift">
                  <div className="text-muted-foreground text-xs">•</div>
                  <div className="font-medium mt-1">{f}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" eyebrow="Skills" title="Tools & technologies I work with." tone="muted">
          <div className="grid sm:grid-cols-2 gap-5">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title} className="rounded-3xl border bg-card p-6 hover-lift">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent">{g.icon}</span>
                  {g.title}
                </div>
                <div className="mt-5 space-y-3">
                  {g.items.map((s) => (
                    <div key={s.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{s.name}</span>
                      <Stars value={s.rating} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" eyebrow="Selected Work" title="Projects.">
          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => (
              <article key={p.title} className="group rounded-3xl border bg-card p-6 flex flex-col hover-lift">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>
                  {p.live && (
                    <span className="text-[10px] uppercase tracking-wider rounded-full bg-foreground text-background px-2 py-1">Live</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs rounded-full border bg-background px-2.5 py-1 text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium hover:opacity-90 transition">
                      Live Demo <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-xs font-medium hover:bg-accent transition">
                      <Github className="h-3 w-3" /> GitHub
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" eyebrow="Education" title="Academic journey.">
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border md:left-1/2" />
            <div className="space-y-6">
              {EDUCATION.map((e, i) => (
                <div key={e.school} className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="pl-10 md:pl-0 md:pr-10 md:text-right">
                    <div className="absolute left-2 md:left-1/2 -translate-x-1/2 mt-2 h-3 w-3 rounded-full bg-foreground ring-4 ring-background" />
                    <div className="rounded-2xl border bg-card p-5 hover-lift">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-start md:justify-end">
                        <GraduationCap className="h-3.5 w-3.5" /> {e.year}
                      </div>
                      <h3 className="mt-2 font-display text-xl">{e.school}</h3>
                      <p className="text-sm text-muted-foreground">{e.detail}</p>
                      <p className="mt-2 text-sm font-medium">{e.score}</p>
                    </div>
                  </div>
                  <div />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* CERTIFICATIONS */}
        <Section id="certifications" eyebrow="Certifications" title="Continuous learning.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c} className="rounded-2xl border bg-card p-5 hover-lift">
                <Award className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-3 font-medium">{c}</h3>
              </div>
            ))}
          </div>
          <a href={CERT_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            View all certificates <ArrowUpRight className="h-4 w-4" />
          </a>
        </Section>

        {/* CONTACT */}
        <Section id="contact" eyebrow="Contact" title="Let's build something great.">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
            <div className="space-y-3">
              <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value={PHONE} href={`tel:${PHONE.replace(/\s/g, "")}`} />
              <ContactRow icon={<Github className="h-4 w-4" />} label="GitHub" value="Parvez2003-cell" href={GITHUB} />
              <ContactRow icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="parvez-ansari" href={LINKEDIN} />
            </div>
            <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-6 space-y-4 shadow-soft">
              <div>
                <label className="text-xs text-muted-foreground">Name</label>
                <input required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <input type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Message</label>
                <textarea required maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition w-full justify-center hover-lift">
                <Send className="h-4 w-4" /> {sent ? "Opening your mail app…" : "Send Message"}
              </button>
            </form>
          </div>
        </Section>
      </main>

      <footer className="border-t mt-10">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© 2026 Parvez Ansari — Built with passion for software development.</p>
          <div className="flex items-center gap-4">
            <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
            <a href={`mailto:${EMAIL}`} className="hover:text-foreground"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, eyebrow, title, children, tone = "default" }: { id: string; eyebrow: string; title: string; children: React.ReactNode; tone?: "default" | "muted" }) {
  return (
    <section id={id} className={`py-20 md:py-28 scroll-mt-24 ${tone === "muted" ? "bg-muted/40 border-y" : ""}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 md:mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl tracking-tight max-w-2xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      className="flex items-center gap-4 rounded-2xl border bg-card p-4 hover-lift group">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent">{icon}</span>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
    </a>
  );
}
