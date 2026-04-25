import { useRef, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { projectsData, DesignProjectDetails, DesignScreen } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Target, Layers, CheckCircle2, Sparkles, ExternalLink, X, ArrowRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

const BK = "#D62300";

// ─── Reading Progress ──────────────────────────────────────────────────────────
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
      <div className="h-full transition-none" style={{ width: `${pct}%`, background: BK }} />
    </div>
  );
}

// ─── Editorial Label Column (mirrors ProjectDetailPage) ──────────────────────
function EditorialLabel({ icon: Icon, title, index, isEven }: { icon: any; title: string; index: number; isEven: boolean }) {
  return (
    <div className={`relative flex flex-col items-center justify-center gap-4 py-6 ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
      {/* Giant watermark number */}
      <div className={`absolute top-1/2 -translate-y-1/2 text-[100px] md:text-[140px] font-display font-black select-none pointer-events-none z-0 text-white/[0.03] ${isEven ? "md:right-0 md:translate-x-1/4" : "md:left-0 md:-translate-x-1/4"}`}>
        {String(index + 1).padStart(2, "0")}
      </div>
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl border z-10"
        style={{ background: `${BK}12`, borderColor: `${BK}25` }}
      >
        <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: `${BK}10` }} />
        <Icon className="h-7 w-7 md:h-9 md:w-9 relative z-10" style={{ color: BK }} />
      </motion.div>
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-[0.12em] leading-tight max-w-[200px] z-10">{title}</h2>
      {/* Badge */}
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] z-10 px-2 py-0.5 rounded-full border"
        style={{ color: BK, background: `${BK}12`, borderColor: `${BK}25` }}>
        Section {String(index + 1).padStart(2, "0")}
      </span>
      {/* Rule */}
      <div className={`h-px w-16 z-10 mt-1 bg-gradient-to-r ${isEven ? "from-transparent to-[#D62300]/50" : "from-[#D62300]/50 to-transparent"}`} />
    </div>
  );
}

// ─── Reusable: Body Text ───────────────────────────────────────────────────────
const bodyText = "text-base text-foreground/75 leading-[1.85] font-light";
const leadText = "text-lg md:text-xl text-foreground/90 font-medium leading-relaxed";

// ─── Phone Frame ───────────────────────────────────────────────────────────────
function PhoneFrame({ src, label, dim = false, onClick, size = "md" }: { src: string; label?: string; dim?: boolean; onClick?: () => void; size?: "sm" | "md" | "lg" }) {
  let sizeClasses = "w-[240px] h-[520px]"; // ~2.16 screen ratio
  let radiusClasses = "rounded-[3rem]";
  let notchClasses = "w-24 h-5 rounded-b-[1.25rem]";
  let rightBtn = "right-[-6px] top-28 w-1.5 h-10";
  let leftBtn1 = "left-[-6px] top-20 w-1.5 h-6";
  let leftBtn2 = "left-[-6px] top-32 w-1.5 h-10";

  if (size === "sm") {
    sizeClasses = "w-[160px] h-[345px]";
    radiusClasses = "rounded-[2rem]";
    notchClasses = "w-16 h-3.5 rounded-b-xl";
    rightBtn = "right-[-4px] top-20 w-1 h-8";
    leftBtn1 = "left-[-4px] top-14 w-1 h-5";
    leftBtn2 = "left-[-4px] top-24 w-1 h-8";
  } else if (size === "lg") {
    sizeClasses = "w-[320px] h-[692px] md:w-[360px] md:h-[780px]";
    radiusClasses = "rounded-[3.5rem] md:rounded-[4rem]";
    notchClasses = "w-32 h-6 md:w-36 md:h-7 rounded-b-[1.5rem]";
    rightBtn = "right-[-6px] top-36 w-1.5 h-14 md:top-40 md:h-16";
    leftBtn1 = "left-[-6px] top-24 w-1.5 h-8 md:top-28 md:h-10";
    leftBtn2 = "left-[-6px] top-40 w-1.5 h-14 md:top-48 md:h-16";
  }

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.03 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      <div className={`relative mx-auto ${sizeClasses}`}>
        <div className={`absolute inset-0 ${radiusClasses} border-4 overflow-hidden shadow-2xl ${dim ? "opacity-70 grayscale-[60%]" : ""}`}
          style={{ borderColor: "rgba(255,255,255,0.12)", background: "#111" }}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 bg-black z-10 ${notchClasses}`} />
          <img src={src} alt={label || ""} className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const p = e.currentTarget.parentElement;
              if (p) p.innerHTML += `<div class="absolute inset-0 flex items-center justify-center bg-neutral-800 pt-4"><span class="text-white/20 text-xs">${label || "Screen"}</span></div>`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        </div>
        <div className={`absolute rounded-r-full bg-white/10 ${rightBtn}`} />
        <div className={`absolute rounded-l-full bg-white/10 ${leftBtn1}`} />
        <div className={`absolute rounded-l-full bg-white/10 ${leftBtn2}`} />
        {!dim && <div className="absolute inset-0 -z-10 rounded-[3rem] blur-2xl opacity-50" style={{ background: `${BK}22` }} />}
      </div>
      {label && <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-[0.15em]">{label}</p>}
    </motion.div>
  );
}

// ─── Key Improvements list ─────────────────────────────────────────────────────
function ImprovementsList({ items }: { items: string[] }) {
  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      <p className="text-sm font-mono uppercase tracking-[0.18em] mb-5 font-bold" style={{ color: BK }}>Key Improvements</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BK }} />
            <span className="text-base text-foreground/80 leading-relaxed font-light">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen Row: Before (left) | arrow | After (right) — fixed layout ──────────
function ScreenRow({ screen, index, onPreview }: { screen: DesignScreen; index: number; onPreview: (s: any) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Left column: Before phone + title + description
  const beforeCol = (
    <div className="relative flex flex-col justify-start w-full">
      {/* Watermark number */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[160px] font-display font-black select-none pointer-events-none z-0 text-white/[0.03]">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Before badge area - matches right card top padding */}
      <div className="flex items-center justify-center px-6 md:px-8 pt-6 md:pt-8 pb-4 relative z-10">
        <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-white/5 text-muted-foreground border border-white/8">
          Before
        </span>
      </div>

      {/* Before phone */}
      <div className="flex justify-center pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="z-10">
          {screen.before ? (
            <PhoneFrame src={screen.before} size="md" dim />
          ) : (
            <div className="w-[240px] h-[520px] rounded-[3rem] border-4 border-white/5 bg-neutral-900/40 flex flex-col items-center justify-center gap-3">
              <span className="text-white/15 text-xs font-mono">No image</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Title + description below the phone - aligns with ImprovementsList */}
      <div className="relative z-10 px-6 md:px-8 pb-6 md:pb-8 w-full text-left">
        <div className="mt-6 pt-6 border-t border-transparent">
          <span className="text-sm font-mono uppercase tracking-[0.18em] text-white/40">Original UI</span>
          <h3 className="text-xl md:text-2xl font-display font-bold mt-4 mb-2 leading-tight">{screen.label}</h3>
          <p className="text-base text-foreground/70 leading-relaxed font-light">{screen.description}</p>
          <button onClick={() => onPreview(screen)}
            className="inline-flex items-center gap-2 text-sm font-medium mt-4 transition-colors"
            style={{ color: `${BK}80` }}
            onMouseEnter={e => (e.currentTarget.style.color = BK)}
            onMouseLeave={e => (e.currentTarget.style.color = `${BK}80`)}
          >
            View full screen <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Right column: After phone + improvements
  const afterCol = (
    <div className="flex flex-col justify-start">
      <div className="relative rounded-2xl bg-surface-container-low border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#D62300]/20 group/card">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover/card:from-[#D62300]/4 transition-all duration-500 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-0 w-1 transition-all duration-500 opacity-50 group-hover/card:opacity-100 bg-gradient-to-b from-[#D62300]/60 via-[#D62300]/20 to-transparent" />

        {/* After badge + screen number */}
        <div className="flex items-center justify-between px-6 md:px-8 pt-6 md:pt-8 pb-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border" style={{ background: `${BK}15`, color: BK, borderColor: `${BK}30` }}>
            After
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border" style={{ color: BK, background: `${BK}12`, borderColor: `${BK}25` }}>
            Screen {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* After phone */}
        <div className="flex justify-center pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <PhoneFrame src={screen.src} size="md" onClick={() => onPreview(screen)} />
          </motion.div>
        </div>

        {/* Key improvements */}
        <div className="relative z-10 px-6 md:px-8 pb-6 md:pb-8">
          <ImprovementsList items={screen.improved} />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <div className="w-full h-px bg-white/5 mb-10" />
      {/* Row wrapper with subtle per-screen background */}
      <div className="relative rounded-3xl px-4 md:px-8 py-6 overflow-hidden">
        {/* Ambient glow — alternates side per row */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? "left-[-8%]" : "right-[-8%]"} w-[55%] h-full rounded-full blur-[90px] pointer-events-none`}
          style={{ background: `radial-gradient(ellipse, ${BK}12 0%, transparent 70%)` }}
        />
        {/* Faint outlined screen number watermark behind phones */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[220px] font-display font-black select-none pointer-events-none leading-none"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.025)", color: "transparent" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {/* Subtle horizontal scan lines across the row */}
        <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 28px)" }} />
        {/* Edge vignette */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: `inset 0 0 60px 10px rgba(0,0,0,0.25)` }} />
        {/* Always: Before on left, arrow in center, After on right */}
        <div className="relative z-10 grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-start">
          {beforeCol}
          {/* Arrow divider */}
          <div className="hidden md:flex flex-col items-center self-stretch gap-2 py-16">
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-[#D62300]/20 to-transparent" />
            <div className="grid h-8 w-8 place-items-center rounded-full border shrink-0" style={{ background: `${BK}18`, borderColor: `${BK}40` }}>
              <ArrowRight className="h-4 w-4" style={{ color: BK }} />
            </div>
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-[#D62300]/20 to-transparent" />
          </div>
          {afterCol}
        </div>
      </div>
    </motion.div>
  );
}



// ─── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
        onClick={e => e.stopPropagation()} className="relative flex justify-center w-full">
        <div className="relative">
          <button onClick={onClose} className="absolute -top-12 md:-top-10 -right-6 md:-right-12 text-white/60 hover:text-white transition-colors">
            <X className="h-8 w-8" />
          </button>
          <PhoneFrame src={src} label={label} size="lg" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Process Step (Vertical Timeline) ──────────────────────────────────────────
function ProcessStep({ step, label, description, index, total }: { step: number; label: string; description: string; index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative flex items-start gap-6">
      {/* Vertical connector line */}
      {index < total - 1 && (
        <div className="absolute left-6 top-12 bottom-[-24px] w-px"
          style={{ background: `linear-gradient(to bottom, ${BK}50, ${BK}10)` }} />
      )}
      <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border z-10 bg-[#111]"
        style={{ background: `${BK}18`, borderColor: `${BK}40` }}>
        <span className="font-mono text-sm font-bold" style={{ color: BK }}>{String(step).padStart(2, "0")}</span>
      </div>
      <div className="pt-2 pb-8">
        <h4 className="text-sm md:text-base font-bold text-foreground uppercase tracking-[0.15em] mb-3">{label}</h4>
        <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-lg">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
const BKCaseStudyPage = () => {
  const project = projectsData.find(p => p.id === "burger-king-redesign");
  const [lightbox, setLightbox] = useState<any>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  if (!project) return <Navigate to="/projects" replace />;
  const d = project.details as DesignProjectDetails;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ReadingProgress />
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(10 85% 45%) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <motion.div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(10 85% 45% / 0.07) 0%, transparent 70%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/3 -left-32 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(10 85% 45% / 0.05) 0%, transparent 70%)" }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
      </div>

      <main className="pb-32">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-12 md:pt-44 md:pb-20">
          <div className="container max-w-7xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Projects
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border"
                    style={{ background: `${BK}20`, color: BK, borderColor: `${BK}30` }}>UI/UX Case Study</span>
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-muted-foreground text-xs">Figma</span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] mb-6 tracking-tight">
                  Burger King<br />
                  <span style={{ color: BK }}>App Redesign</span>
                </h1>
                <p className={`${leadText} mb-8 max-w-lg`}>
                  A complete UX overhaul — simpler ordering, cleaner navigation, and a bolder visual identity for one of the world's biggest QSR brands.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map(t => (
                    <span key={t} className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-surface-container-high/60 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
                {d.figma && (
                  <Button asChild size="lg" className="hover:-translate-y-1 transition-all rounded-full px-8 h-12 text-white"
                    style={{ background: BK }}>
                    <a href={d.figma} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> View in Figma</a>
                  </Button>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="flex justify-center">
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <PhoneFrame
                    src="/images/bk/screen_landing.png"
                    label="Landing Screen"
                    onClick={() => setLightbox({ src: "/images/bk/screen_landing.png", label: "Landing Screen", description: "", improved: [] })}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container max-w-7xl space-y-24 pt-4">

          {/* ── Overview ───────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-10" />
            <div className="grid md:grid-cols-[1fr_2px_3fr] gap-8 md:gap-16 items-start">
              <EditorialLabel icon={Layers} title="Overview" index={0} isEven={true} />
              <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#D62300]/15 to-transparent" />
              <div className="relative rounded-2xl bg-surface-container-low border border-white/5 p-6 md:p-8 overflow-hidden hover:border-[#D62300]/20 transition-all duration-500 group/card">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover/card:from-[#D62300]/4 transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#D62300]/60 via-[#D62300]/20 to-transparent opacity-50 group-hover/card:opacity-100 transition-all duration-500" />
                <p className={leadText}>{d.overview}</p>
              </div>
            </div>
          </motion.section>

          {/* ── Problem ────────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-10" />
            <div className="grid md:grid-cols-[3fr_2px_1fr] gap-8 md:gap-16 items-start">
              <div className="relative rounded-2xl bg-surface-container-low border border-white/5 p-6 md:p-8 overflow-hidden hover:border-[#D62300]/20 transition-all duration-500 group/card md:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover/card:from-[#D62300]/4 transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-[#D62300]/60 via-[#D62300]/20 to-transparent opacity-50 group-hover/card:opacity-100 transition-all duration-500" />
                <ul className="space-y-4">
                  {d.problem.map((p, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BK }} />
                      <span className={bodyText}>{p}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#D62300]/15 to-transparent md:order-2" />
              <div className="md:order-3"><EditorialLabel icon={Target} title="The Problem" index={1} isEven={false} /></div>
            </div>
          </motion.section>

          {/* ── Design Process ─────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-10" />
            <div className="grid md:grid-cols-[1fr_2px_3fr] gap-8 md:gap-16 items-start">
              <EditorialLabel icon={Palette} title="Design Process" index={2} isEven={true} />
              <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#D62300]/15 to-transparent" />
              <div className="relative rounded-2xl bg-surface-container-low border border-white/5 p-6 md:p-8 overflow-hidden hover:border-[#D62300]/20 transition-all duration-500 group/card">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover/card:from-[#D62300]/4 transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#D62300]/60 via-[#D62300]/20 to-transparent opacity-50 group-hover/card:opacity-100 transition-all duration-500" />
                <div className="flex flex-col">
                  {d.designProcess.map((step, i) => (
                    <ProcessStep key={step.label} step={i + 1} label={step.label} description={step.description} index={i} total={d.designProcess.length} />
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── Screen Showcase ────────────────────────────────────────── */}
          <section className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 -mx-6 md:-mx-12 rounded-3xl overflow-hidden pointer-events-none flex items-center justify-center" aria-hidden="true">
              {/* Huge subtle typography watermark pattern */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] w-[200%] flex flex-col gap-12 md:gap-24 text-[12vw] md:text-[130px] font-display font-black whitespace-nowrap text-white/[0.015] select-none pointer-events-none leading-none">
                <div className="ml-[-5%]">BURGER KING •   • BURGER KING •   • BURGER KING •   • BURGER KING</div>
                <div className="ml-[-15%] text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}>UI/UX CASE STUDY • APP REDESIGN • UI/UX CASE STUDY • APP REDESIGN • UI/UX CASE STUDY</div>
                <div className="ml-[-2%]">BURGER KING •   • BURGER KING •   • BURGER KING •   • BURGER KING</div>
                <div className="ml-[-20%] text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}>UI/UX CASE STUDY • APP REDESIGN • UI/UX CASE STUDY • APP REDESIGN • UI/UX CASE STUDY</div>
                <div className="ml-[-8%]">BURGER KING •   • BURGER KING •   • BURGER KING •   • BURGER KING</div>
                <div className="ml-[-12%] text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}>UI/UX CASE STUDY • APP REDESIGN • UI/UX CASE STUDY • APP REDESIGN • UI/UX CASE STUDY</div>
                <div className="ml-[-4%]">BURGER KING •   • BURGER KING •   • BURGER KING •   • BURGER KING</div>
              </div>
              {/* Ambient glowing orbs */}
              <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: BK }} />
              <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-10" style={{ background: BK }} />
              <div className="absolute top-[60%] left-[20%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.15]" style={{ background: "#FF8732" }} />
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(${BK}80 1px, transparent 1px), linear-gradient(90deg, ${BK}80 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
              {/* Fade out edges of grid */}
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>
            <div className="w-full h-px bg-white/5 mb-10" />
            <div className="relative z-10 flex items-center gap-3 mb-12">
              <div className="grid h-10 w-10 place-items-center rounded-xl border shrink-0" style={{ background: `${BK}12`, borderColor: `${BK}25` }}>
                <Sparkles className="h-5 w-5" style={{ color: BK }} />
              </div>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-[0.12em]" style={{ color: "whitesmoke" }}>Screen Showcase</span>
              <span className="text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full border" style={{ color: BK, background: `${BK}12`, borderColor: `${BK}25` }}>Section 04</span>
            </div>
            <div className="space-y-16 relative z-10">
              {d.screens.map((screen, i) => (
                <ScreenRow key={screen.src} screen={screen} index={i} onPreview={setLightbox} />
              ))}
            </div>
          </section>

          {/* ── Solution ───────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-10" />
            <div className="grid md:grid-cols-[3fr_2px_1fr] gap-8 md:gap-16 items-start">
              <div className="relative rounded-2xl bg-surface-container-low border border-white/5 p-6 md:p-8 overflow-hidden hover:border-[#D62300]/20 transition-all duration-500 group/card md:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover/card:from-[#D62300]/4 transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-[#D62300]/60 via-[#D62300]/20 to-transparent opacity-50 group-hover/card:opacity-100 transition-all duration-500" />
                <div className="grid sm:grid-cols-2 gap-4">
                  {d.solution.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-surface-container-high/40 p-4 hover:border-[#D62300]/20 transition-colors">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: BK }} />
                      <span className={bodyText}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#D62300]/15 to-transparent md:order-2" />
              <div className="md:order-3"><EditorialLabel icon={CheckCircle2} title="The Solution" index={4} isEven={false} /></div>
            </div>
          </motion.section>

          {/* ── Design Highlights ──────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-full h-px bg-white/5 mb-10" />
            <div className="grid md:grid-cols-[1fr_2px_3fr] gap-8 md:gap-16 items-start">
              <EditorialLabel icon={Sparkles} title="Highlights" index={5} isEven={true} />
              <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#D62300]/15 to-transparent" />
              <div className="flex flex-wrap gap-3 py-4">
                {d.designHighlights.map((h, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="px-5 py-2.5 rounded-full bg-surface-container-low border border-white/8 text-sm font-medium text-foreground/75 hover:border-[#D62300]/30 hover:text-foreground transition-all cursor-default">
                    {h}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Footer CTA ───────────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="relative rounded-3xl bg-surface-container-low border border-white/5 px-10 py-14 overflow-hidden text-center">
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse at top, ${BK}0c 0%, transparent 70%)` }} />
              <div className="w-px h-12 mx-auto mb-8" style={{ background: `linear-gradient(to bottom, ${BK}90, transparent)` }} />
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Explore More Projects</h2>
              <p className={`${bodyText} mb-8 max-w-sm mx-auto`}>Check out my other work — from AI systems to full-stack platforms.</p>
              <Button asChild size="lg" className="hover:-translate-y-1 transition-all rounded-full px-8 text-white" style={{ background: BK }}>
                <Link to="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> All Projects</Link>
              </Button>
            </div>
          </motion.section>
        </div>
      </main>

      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default BKCaseStudyPage;
