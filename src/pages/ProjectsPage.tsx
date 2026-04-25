import { useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { projectsData } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowLeft, Cpu, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// ─── Single unified card (all same size) ────────────────────────────────────
function ProjectCard({
  project,
  index,
  flagship = false,
}: {
  project: any;
  index: number;
  flagship?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link to={`/projects/${project.id}`} className="block group h-full">
        <article
          className={`relative rounded-2xl p-6 h-full flex flex-col overflow-hidden transition-all duration-500
            ${flagship
              ? "bg-surface-container border border-primary/30 hover:border-primary/60 hover:-translate-y-2 hover:shadow-glow"
              : "bg-surface-container-low border border-white/5 hover:border-primary/15 hover:-translate-y-1 hover:shadow-glow-soft"
            }`}
        >
          {/* Flagship radial glow */}
          {flagship && (
            <>
              <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-primary/12 blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-primary/22" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-primary/7 blur-2xl pointer-events-none" />
            </>
          )}
          {/* Hover glow (non-flagship) */}
          {!flagship && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-transparent group-hover:from-primary/4 transition-all duration-500 pointer-events-none" />
          )}

          <div className="relative z-10 flex flex-col h-full">
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex flex-wrap items-center gap-2">
                {flagship && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                    <Star className="h-2.5 w-2.5 fill-primary" /> Flagship
                  </span>
                )}
                {project.featured && !flagship && (
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
              <div className={`grid h-8 w-8 place-items-center rounded-lg transition-colors duration-300 shrink-0 ${flagship ? "bg-primary/15 group-hover:bg-primary/25" : "bg-surface-container-high group-hover:bg-primary/15"}`}>
                <ArrowUpRight className="h-4 w-4 text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </div>

            {/* Title */}
            <h3 className={`font-display font-bold mb-2.5 group-hover:text-primary transition-colors leading-snug ${flagship ? "text-xl md:text-2xl" : "text-lg"}`}>
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-3">
              {project.shortDescription}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.techStack.slice(0, 3).map((tech: string) => (
                <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-surface-container-high text-muted-foreground">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProjects = projectsData.filter((p) => p.visible);
  // Sort: flagship (vegha) first, then featured, then rest
  const sorted = [
    ...allProjects.filter((p) => p.id === "vegha"),
    ...allProjects.filter((p) => p.id !== "vegha" && p.featured),
    ...allProjects.filter((p) => !p.featured),
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(186 100% 50%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <motion.div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.08) 0%, transparent 70%)" }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-2/3 -right-32 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.06) 0%, transparent 70%)" }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
        <motion.div className="absolute -bottom-32 left-1/3 w-96 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.05) 0%, transparent 70%)" }}
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 7 }} />
      </div>

      <Navbar />

      <main className="container pt-32 pb-24 md:pt-40 md:pb-32 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Home
          </Link>

          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Cpu className="h-3 w-3" />
              {allProjects.length} Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.0]"
            >
              All <span className="text-primary">Projects</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              A comprehensive showcase of my work in AI, systems engineering, and full-stack development.
            </motion.p>
          </div>
        </motion.div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent mb-16 origin-left"
        />

        {/* Flagship callout label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <h2 className="text-xs font-bold text-foreground/40 uppercase tracking-widest whitespace-nowrap">
            Flagship · Featured · All Work
          </h2>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* Uniform grid — all cards same size */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              flagship={project.id === "vegha"}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-24"
        >
          <div className="relative inline-block w-full max-w-lg mx-auto">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/8 to-transparent blur-xl pointer-events-none" />
            <div className="relative bg-surface-container-low border border-white/5 rounded-3xl px-10 py-12">
              <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent mx-auto mb-8" />
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Interested in collaboration?</h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed text-sm">
                Each project represents a unique challenge. Let's build something amazing together.
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-glow hover:-translate-y-1 transition-all rounded-full px-8">
                <Link to="/#contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProjectsPage;