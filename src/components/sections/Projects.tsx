import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/About";
import { projectsData } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
};

export const Projects = () => {
  const featuredProjects = projectsData.filter(p => p.featured && p.visible);

  return (
    <section id="projects" className="container py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects I'm proud of"
          description="A few things I've shipped — from AI agents to civic-tech platforms."
        />
        <Reveal delay={200}>
          <Button asChild variant="ghost" className="text-foreground hover:text-primary hover:bg-transparent transition-all group px-0">
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, i) => {
          const displayedTech = project.techStack.slice(0, 3);
          const remainingTechCount = project.techStack.length - 3;

          return (
            <Reveal key={project.id} delay={i * 100}>
              <Link to={`/projects/${project.id}`} className="block group">
                <TiltCard>
                  <motion.article
                    className="bg-surface-container-low rounded-2xl p-6 h-[280px] flex flex-col transition-all duration-500 hover:bg-surface-container hover:shadow-glow-soft"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="pr-4">
                        <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                      </div>
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-container-highest group-hover:bg-primary/20 transition-colors">
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-auto leading-relaxed line-clamp-3">{project.shortDescription}</p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {displayedTech.map((tech) => (
                        <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-surface-container-high text-muted-foreground border-none">
                          {tech}
                        </span>
                      ))}
                      {remainingTechCount > 0 && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                          +{remainingTechCount}
                        </span>
                      )}
                    </div>
                  </motion.article>
                </TiltCard>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
