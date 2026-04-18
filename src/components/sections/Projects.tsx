import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/About";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useRef, MouseEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  return (
    <section id="projects" className="container py-16 md:py-24">
      <SectionHeader
        eyebrow="Selected Work"
        title="Projects I'm proud of"
        description="A few things I've shipped — from AI agents to civic-tech platforms."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.projects.map((p, i) => {
          const displayedTech = p.tech.slice(0, 3);
          const remainingTechCount = p.tech.length - 3;
          
          return (
          <Reveal key={p.title} delay={i * 100}>
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <TiltCard>
                    <article className="bg-surface-container-low rounded-2xl p-6 h-[280px] flex flex-col transition-all duration-500 hover:bg-surface-container">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display text-xl font-semibold mb-1">{p.title}</h3>
                          <p className="text-xs text-primary uppercase tracking-wider">{p.role}</p>
                        </div>
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface-container-highest">
                          <ArrowUpRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-auto leading-relaxed line-clamp-3">{p.description}</p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {displayedTech.map((t) => (
                          <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-surface-container-high text-muted-foreground border-none">
                            {t}
                          </span>
                        ))}
                        {remainingTechCount > 0 && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                            +{remainingTechCount}
                          </span>
                        )}
                      </div>
                    </article>
                  </TiltCard>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-surface-container-low border-none">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl font-bold mb-1">{p.title}</DialogTitle>
                  <DialogDescription className="text-sm text-primary uppercase tracking-wider font-medium">
                    {p.role}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <p className="text-sm text-foreground/90 leading-relaxed mb-6">
                    {p.description}
                  </p>
                  
                  <h4 className="text-sm font-semibold mb-3">Key Impact</h4>
                  <ul className="space-y-2 mb-6">
                    {p.impact.map((line) => (
                      <li key={line} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-sm font-semibold mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-surface-container-high text-foreground border-none">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    {p.links.github && (
                      <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <a href={p.links.github} target="_blank" rel="noreferrer">
                          <Github className="h-4 w-4 mr-2" /> View Code
                        </a>
                      </Button>
                    )}
                    {/* Add more links if available, like live demo */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>
        )})}
      </div>
    </section>
  );
};
