import { useRef, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { projectsData, DesignProjectDetails } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Target, Layers, CheckCircle2, Sparkles, ExternalLink, X } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Reading Progress ─────────────────────────────────────────────────────────
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      setPct(tot > 0 ? (window.scrollY / tot) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-white/5">
      <div className="h-full bg-[#D62300] transition-none" style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────
function PhoneFrame({ src, label, onClick }: { src: string; label: string; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateY: 4, rotateX: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onClick}
      className="cursor-pointer mx-auto"
      style={{ perspective: 800 }}
    >
      <div className="relative w-52 h-[420px] mx-auto">
        {/* Phone border */}
        <div className="absolute inset-0 rounded-[2.8rem] border-4 border-white/15 bg-neutral-900 shadow-2xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-10" />
          {/* Screen */}
          <img
            src={src}
            alt={label}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              if (t.parentElement) t.parentElement.innerHTML += `<div class="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 pt-5"><span class="text-white/30 text-xs">${label}</span></div>`;
            }}
          />
          {/* Screen overlay shimmer */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        </div>
        {/* Side buttons */}
        <div className="absolute right-[-6px] top-24 w-1.5 h-10 rounded-r-full bg-white/10" />
        <div className="absolute left-[-6px] top-20 w-1.5 h-7 rounded-l-full bg-white/10" />
        <div className="absolute left-[-6px] top-30 w-1.5 h-7 rounded-l-full bg-white/10" />
        {/* Glow */}
        <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[#D62300]/20 blur-2xl opacity-60" />
      </div>
      {label && (
        <p className="text-center text-xs text-muted-foreground mt-3 uppercase tracking-[0.15em]">{label}</p>
      )}
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm w-full"
      >
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors">
          <X className="h-6 w-6" />
        </button>
        <PhoneFrame src={src} label={label} />
      </motion.div>
    </motion.div>
  );
}

// ─── Process Step ─────────────────────────────────────────────────────────────
function ProcessStep({ step, label, description, index, total }: { step: number; label: string; description: string; index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div className="hidden md:block absolute left-[calc(50%+32px)] top-6 w-[calc(100%-64px)] h-px bg-gradient-to-r from-[#D62300]/40 to-[#D62300]/10" />
      )}
      <div className="relative grid h-12 w-12 place-items-center rounded-full bg-[#D62300]/15 border border-[#D62300]/30 mb-3 z-10">
        <span className="font-mono text-sm font-bold text-[#D62300]">{String(step).padStart(2, "0")}</span>
      </div>
      <h4 className="text-sm font-bold text-foreground uppercase tracking-[0.15em] mb-2">{label}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-[160px]">{description}</p>
    </motion.div>
  );
}

// ─── Screen Row (alternating) ─────────────────────────────────────────────────
function ScreenRow({ screen, index, onPreview }: { screen: any; index: number; onPreview: (s: any) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16`}
    >
      {/* Phone */}
      <div className="w-full md:w-auto shrink-0">
        <PhoneFrame src={screen.src} label="" onClick={() => onPreview(screen)} />
      </div>
      {/* Text */}
      <div className="flex-1">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-8 bg-[#D62300]/60" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D62300]/80">
            Screen {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 leading-tight">{screen.label}</h3>
        <p className="text-muted-foreground leading-[1.8] text-base">{screen.description}</p>
        <button
          onClick={() => onPreview(screen)}
          className="mt-5 inline-flex items-center gap-2 text-sm text-[#D62300]/70 hover:text-[#D62300] transition-colors group"
        >
          View full screen <ExternalLink className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const BKCaseStudyPage = () => {
  const project = projectsData.find((p) => p.id === "burger-king-redesign");
  const [lightbox, setLightbox] = useState<any>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!project) return <Navigate to="/projects" replace />;
  const d = project.details as DesignProjectDetails;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ReadingProgress />
      <Navbar />

      {/* Fixed bg */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(10 85% 45%) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <motion.div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(10 85% 45% / 0.08) 0%, transparent 70%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/3 -left-32 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(10 85% 45% / 0.05) 0%, transparent 70%)" }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
      </div>

      <main className="pb-32">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-12 md:pt-44 md:pb-20 overflow-hidden">
          <div className="container max-w-6xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Projects
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Left: text */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#D62300]/15 text-[#D62300] text-xs font-bold uppercase tracking-widest border border-[#D62300]/20">
                    UI/UX Case Study
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-muted-foreground text-xs">Figma</span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] mb-6 tracking-tight">
                  Burger King<br />
                  <span className="text-[#D62300]">App Redesign</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  A complete UX overhaul — simpler ordering, cleaner navigation, and a bolder visual identity for one of the world's biggest QSR brands.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((t) => (
                    <span key={t} className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-surface-container-high/60 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
                {d.figma && (
                  <Button asChild size="lg" className="bg-[#D62300] text-white hover:bg-[#b51e00] hover:-translate-y-1 transition-all rounded-full px-8 h-12">
                    <a href={d.figma} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> View in Figma</a>
                  </Button>
                )}
              </motion.div>

              {/* Right: floating phone */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center"
              >
                <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <PhoneFrame src={d.screens[0]?.src || ""} label={d.screens[0]?.label || ""} onClick={() => setLightbox(d.screens[0])} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container max-w-6xl space-y-24 pt-8">
          {/* ── Overview ──────────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-12" />
            <div className="grid md:grid-cols-[1fr_2px_3fr] gap-8 md:gap-16 items-start">
              <div className="flex flex-col gap-4 md:items-end md:text-right">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#D62300]/10 border border-[#D62300]/20 md:ml-auto">
                  <Layers className="h-7 w-7 text-[#D62300]" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-[0.12em]">Overview</h2>
                <span className="text-[10px] text-[#D62300]/80 font-mono uppercase tracking-[0.2em] bg-[#D62300]/10 px-2 py-0.5 rounded-full border border-[#D62300]/20">Section 01</span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D62300]/50" />
              </div>
              <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#D62300]/15 to-transparent" />
              <div className="rounded-2xl bg-surface-container-low border border-white/5 p-7 md:p-8">
                <div className="absolute inset-0" />
                <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed mb-4">{d.overview}</p>
              </div>
            </div>
          </motion.section>

          {/* ── Problem ───────────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-12" />
            <div className="grid md:grid-cols-[3fr_2px_1fr] gap-8 md:gap-16 items-start">
              <div className="rounded-2xl bg-surface-container-low border border-white/5 p-7 md:p-8 md:order-1">
                <ul className="space-y-4">
                  {d.problem.map((p, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#D62300]/15 border border-[#D62300]/25">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D62300]" />
                      </span>
                      <span className="text-foreground/80 leading-relaxed">{p}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#D62300]/15 to-transparent md:order-2" />
              <div className="flex flex-col gap-4 md:items-start md:text-left md:order-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#D62300]/10 border border-[#D62300]/20">
                  <Target className="h-7 w-7 text-[#D62300]" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-[0.12em]">The Problem</h2>
                <span className="text-[10px] text-[#D62300]/80 font-mono uppercase tracking-[0.2em] bg-[#D62300]/10 px-2 py-0.5 rounded-full border border-[#D62300]/20">Section 02</span>
                <div className="h-px w-12 bg-gradient-to-r from-[#D62300]/50 to-transparent" />
              </div>
            </div>
          </motion.section>

          {/* ── Design Process ────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-12" />
            <div className="mb-10 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#D62300]/10 border border-[#D62300]/20">
                <Palette className="h-5 w-5 text-[#D62300]" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-[0.12em]">Design Process</h2>
              <span className="text-[10px] text-[#D62300]/80 font-mono uppercase tracking-[0.2em] bg-[#D62300]/10 px-2 py-0.5 rounded-full border border-[#D62300]/20">Section 03</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {d.designProcess.map((step, i) => (
                <ProcessStep key={step.label} step={i + 1} label={step.label} description={step.description} index={i} total={d.designProcess.length} />
              ))}
            </div>
          </motion.section>

          {/* ── Screen Showcase ───────────────────────────────────────────── */}
          <section>
            <div className="w-full h-px bg-white/5 mb-12" />
            <div className="mb-12 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#D62300]/10 border border-[#D62300]/20">
                <Sparkles className="h-5 w-5 text-[#D62300]" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-[0.12em]">Screen Showcase</h2>
              <span className="text-[10px] text-[#D62300]/80 font-mono uppercase tracking-[0.2em] bg-[#D62300]/10 px-2 py-0.5 rounded-full border border-[#D62300]/20">Section 04</span>
            </div>
            <div className="space-y-24">
              {d.screens.map((screen, i) => (
                <ScreenRow key={screen.src} screen={screen} index={i} onPreview={setLightbox} />
              ))}
            </div>
          </section>

          {/* ── Solution ──────────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-12" />
            <div className="grid md:grid-cols-[1fr_2px_3fr] gap-8 md:gap-16 items-start">
              <div className="flex flex-col gap-4 md:items-end md:text-right">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#D62300]/10 border border-[#D62300]/20 md:ml-auto">
                  <CheckCircle2 className="h-7 w-7 text-[#D62300]" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-[0.12em]">The Solution</h2>
                <span className="text-[10px] text-[#D62300]/80 font-mono uppercase tracking-[0.2em] bg-[#D62300]/10 px-2 py-0.5 rounded-full border border-[#D62300]/20">Section 05</span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D62300]/50" />
              </div>
              <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#D62300]/15 to-transparent" />
              <div className="grid sm:grid-cols-2 gap-4">
                {d.solution.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-xl bg-surface-container-low border border-white/5 p-4 flex items-start gap-3 hover:border-[#D62300]/20 transition-colors"
                  >
                    <div className="mt-0.5 h-5 w-5 shrink-0 grid place-items-center rounded-full bg-[#D62300]/15">
                      <CheckCircle2 className="h-3 w-3 text-[#D62300]" />
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Design Highlights ─────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-12" />
            <div className="text-center mb-10">
              <span className="text-[10px] text-[#D62300]/80 font-mono uppercase tracking-[0.2em] bg-[#D62300]/10 px-3 py-1 rounded-full border border-[#D62300]/20">Design Highlights</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold mt-4">What makes this redesign stand out</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {d.designHighlights.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="px-5 py-2.5 rounded-full bg-surface-container-low border border-white/8 text-sm font-medium text-foreground/80 hover:border-[#D62300]/30 hover:text-foreground transition-all"
                >
                  {h}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* ── Footer CTA ────────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="relative rounded-3xl bg-surface-container-low border border-white/5 px-10 py-14 overflow-hidden text-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D62300]/5 to-transparent pointer-events-none" />
              <div className="w-px h-12 bg-gradient-to-b from-[#D62300]/60 to-transparent mx-auto mb-8" />
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Explore More Projects</h2>
              <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                Check out my other work — from AI systems to full-stack platforms.
              </p>
              <Button asChild size="lg" className="bg-[#D62300] text-white hover:bg-[#b51e00] hover:-translate-y-1 transition-all rounded-full px-8">
                <Link to="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> All Projects</Link>
              </Button>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default BKCaseStudyPage;
