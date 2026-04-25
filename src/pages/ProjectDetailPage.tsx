import { useRef, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { projectsData } from "@/data/projects";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Github, ExternalLink,
  Lightbulb, Target, Layers, CheckCircle2,
  TrendingUp, AlertTriangle, Rocket, BookOpen,
} from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

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
      <div className="h-full bg-primary transition-none" style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Editorial Section (newspaper alternating) ────────────────────────────────
function EditorialSection({
  title, content, icon: Icon, index,
}: {
  title: string; content: string; icon: any; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  const labelCol = (
    <div className={`relative flex flex-col items-center justify-center gap-4 py-6 ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
      {/* Giant background number watermark */}
      <div className={`absolute top-1/2 -translate-y-1/2 text-[100px] md:text-[140px] font-display font-black text-white/[0.03] select-none pointer-events-none z-0 ${isEven ? "md:right-0 md:translate-x-1/4" : "md:left-0 md:-translate-x-1/4"}`}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Large icon circle */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl bg-primary/10 border border-primary/15 z-10"
      >
        <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl" />
        <Icon className="h-7 w-7 md:h-9 md:w-9 text-primary relative z-10" />
      </motion.div>
      
      {/* Section title */}
      <h2 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-[0.12em] leading-tight max-w-[200px] z-10">
        {title}
      </h2>
      {/* Section Sub-label */}
      <span className="text-[10px] text-primary/80 font-mono uppercase tracking-[0.2em] z-10 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
        Section {String(index + 1).padStart(2, "0")}
      </span>
      {/* Decorative rule */}
      <div className={`h-px w-16 bg-gradient-to-r ${isEven ? "from-transparent to-primary/50" : "from-primary/50 to-transparent"} z-10 mt-2`} />
    </div>
  );

  const contentCol = (
    <div className="flex flex-col justify-center">
      <div className="relative rounded-2xl bg-surface-container-low border border-white/5 p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-glow-soft group/card">
        {/* Glow behind the card */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-transparent group-hover/card:from-primary/5 transition-all duration-500 pointer-events-none" />
        
        {/* Left/Right accent bar - made thicker and full height on hover */}
        <div className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent transition-all duration-500 opacity-50 group-hover/card:opacity-100 ${!isEven ? "right-0" : "left-0"}`} />
        
        {/* Subtle Watermark Icon inside card */}
        <div className={`absolute -bottom-12 opacity-[0.02] pointer-events-none transition-transform duration-700 group-hover/card:scale-110 group-hover/card:opacity-[0.04] ${!isEven ? "-left-12" : "-right-12"}`}>
          <Icon className="w-64 h-64" />
        </div>

        <div className="relative z-10">
          {content.split("\n").map((p, i) => (
            <p key={i} className={`leading-[1.85] font-light ${i === 0 ? "text-lg md:text-xl text-foreground/90 mb-6 font-medium tracking-tight" : "text-base md:text-[1.05rem] text-muted-foreground/80 mb-4"}`}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Top rule */}
      <div className="w-full h-px bg-white/5 mb-10" />

      <div className={`grid md:grid-cols-[1fr_2px_3fr] gap-8 md:gap-16 items-start ${!isEven ? "md:grid-cols-[3fr_2px_1fr] md:[&>*:nth-child(1)]:order-3 md:[&>*:nth-child(2)]:order-2 md:[&>*:nth-child(3)]:order-1" : ""}`}>
        {/* Label column */}
        {labelCol}
        {/* Vertical divider */}
        <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        {/* Content column */}
        {contentCol}
      </div>
    </motion.div>
  );
}

// ─── Image Gallery ────────────────────────────────────────────────────────────
function ImageGallery({ images, projectTitle, index }: { images: string[]; projectTitle: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  const labelCol = (
    <div className={`relative flex flex-col items-center justify-center gap-4 py-6 ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
      {/* Giant background number watermark */}
      <div className={`absolute top-1/2 -translate-y-1/2 text-[100px] md:text-[140px] font-display font-black text-white/[0.03] select-none pointer-events-none z-0 ${isEven ? "md:right-0 md:translate-x-1/4" : "md:left-0 md:-translate-x-1/4"}`}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl bg-primary/10 border border-primary/15 z-10"
      >
        <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl" />
        <BookOpen className="h-7 w-7 md:h-9 md:w-9 text-primary relative z-10" />
      </motion.div>
      
      <h2 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-[0.12em] leading-tight max-w-[200px] z-10">
        Gallery
      </h2>
      <span className="text-[10px] text-primary/80 font-mono uppercase tracking-[0.2em] z-10 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
        Section {String(index + 1).padStart(2, "0")}
      </span>
      <div className={`h-px w-16 bg-gradient-to-r ${isEven ? "from-transparent to-primary/50" : "from-primary/50 to-transparent"} z-10 mt-2`} />
    </div>
  );

  const contentCol = (
    <div className="flex flex-col justify-center">
      <div className="relative rounded-2xl bg-surface-container-low border border-white/5 p-5 md:p-7 overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-glow-soft group/card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-transparent group-hover/card:from-primary/5 transition-all duration-500 pointer-events-none" />
        <div className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent transition-all duration-500 opacity-50 group-hover/card:opacity-100 ${!isEven ? "right-0" : "left-0"}`} />
        
        <div className="relative z-10">
          {!images || images.length === 0 ? (
            <div className="py-12 text-center">
              <Layers className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Visual assets coming soon</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  className={`group/img relative rounded-xl overflow-hidden bg-surface-container-high border border-white/5 h-48 ${i === 0 ? "sm:col-span-2 h-64" : ""}`}
                  whileHover={{ scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity z-10 flex items-center justify-center pointer-events-none">
                    <span className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">View Full</span>
                  </div>
                  <img
                    src={img}
                    alt={`${projectTitle} ${i + 1}`}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const p = e.currentTarget.parentElement;
                      if (p) p.innerHTML = `<div class="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-high"><span class="text-muted-foreground text-sm">Image ${i + 1}</span></div>`;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65 }}
      className="group"
    >
      <div className="w-full h-px bg-white/5 mb-10" />
      <div className={`grid md:grid-cols-[1fr_2px_3fr] gap-8 md:gap-16 items-start ${!isEven ? "md:grid-cols-[3fr_2px_1fr] md:[&>*:nth-child(1)]:order-3 md:[&>*:nth-child(2)]:order-2 md:[&>*:nth-child(3)]:order-1" : ""}`}>
        {/* Label column */}
        {labelCol}
        {/* Vertical divider */}
        <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        {/* Content column */}
        {contentCol}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  if (!project) return <Navigate to="/projects" replace />;
  const { details } = project;

  // Unified sequence of sections
  const allSections = [
    { type: "text",    title: "Overview",            content: details.overview,      icon: Layers },
    { type: "text",    title: "Motivation",          content: details.motivation,    icon: Lightbulb },
    { type: "text",    title: "The Problem",         content: details.problem,       icon: Target },
    { type: "text",    title: "The Solution",        content: details.solution,      icon: CheckCircle2 },
    { type: "text",    title: "Technical Deep Dive", content: details.architecture,  icon: Layers },
    { type: "gallery", title: "Gallery",             images: details.images,         icon: BookOpen },
    { type: "text",    title: "Results & Impact",    content: details.results,       icon: TrendingUp },
    { type: "text",    title: "Challenges Faced",    content: details.challenges,    icon: AlertTriangle },
    { type: "text",    title: "Future Scope",        content: details.futureScope,   icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ReadingProgress />
      <Navbar />

      {/* Fixed background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(186 100% 50%) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <motion.div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.07) 0%, transparent 70%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/3 -left-32 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.05) 0%, transparent 70%)" }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
      </div>

      <main className="pb-32">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container max-w-6xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Projects
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl bg-surface-container-low/80 border border-white/5 p-8 md:p-12 overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">Case Study</span>
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-muted-foreground text-xs">{project.techStack.length} Technologies</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
                  {project.title}
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
                  {project.shortDescription}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
                  className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-surface-container-high/60 border border-white/5 text-foreground">
                      {tech}
                    </span>
                  ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
                  className="flex flex-wrap gap-3">
                  {details.github && (
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-glow hover:-translate-y-1 transition-all rounded-full px-8 h-12">
                      <a href={details.github} target="_blank" rel="noreferrer"><Github className="mr-2 h-4 w-4" /> View Source</a>
                    </Button>
                  )}
                  {details.demo && (
                    <Button asChild size="lg" variant="outline" className="bg-surface-container-high/50 border-white/10 hover:bg-surface-container-highest hover:-translate-y-1 transition-all rounded-full px-8 h-12 text-foreground">
                      <a href={details.demo} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a>
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Editorial Content ──────────────────────────────────────────── */}
        <div className="container max-w-6xl space-y-16 pt-8">
          {allSections.map((s, i) => {
            if (s.type === "gallery") {
              return <ImageGallery key={s.title} images={s.images!} projectTitle={project.title} index={i} />;
            }
            return <EditorialSection key={s.title} title={s.title} content={s.content || "Coming soon."} icon={s.icon} index={i} />;
          })}

          {/* Final rule */}
          <div className="w-full h-px bg-white/5" />
        </div>

        {/* ── Footer CTA ─────────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="container max-w-6xl pt-20 text-center"
        >
          <div className="relative rounded-3xl bg-surface-container-low border border-white/5 px-10 py-14 overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent mx-auto mb-8" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Explore More Projects</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Dive into the rest of my work — from deep learning systems to full-stack platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-glow hover:-translate-y-1 transition-all rounded-full px-8">
                <Link to="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> All Projects</Link>
              </Button>
              {details.github && (
                <Button asChild size="lg" variant="secondary" className="bg-surface-container border-white/10 hover:bg-surface-container-high hover:-translate-y-1 transition-all rounded-full px-8 text-foreground">
                  <a href={details.github} target="_blank" rel="noreferrer">View Repository</a>
                </Button>
              )}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProjectDetailPage;