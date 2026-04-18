import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/About";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef, MouseEvent } from "react";

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
    <section id="projects" className="container py-24 md:py-32">
      <SectionHeader
        eyebrow="Selected Work"
        title="Projects I'm proud of"
        description="A few things I've shipped — from AI agents to civic-tech platforms."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <TiltCard>
              <article className="glass rounded-2xl p-6 h-full flex flex-col hover:shadow-glow-soft transition-shadow duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-1">{p.title}</h3>
                    <p className="text-xs text-primary uppercase tracking-wider">{p.role}</p>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary/20 clay-sm">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>

                <ul className="space-y-2 mb-5 flex-1">
                  {p.impact.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-foreground/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-muted/60 text-muted-foreground border border-border/50">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="clay-sm border-border/40 bg-transparent flex-1">
                    <a href={p.links.github} target="_blank" rel="noreferrer">
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  </Button>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
