import { HeroScene } from "@/components/three/HeroScene";
import { Typewriter } from "@/components/Typewriter";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";
import { ArrowDown, Download, Github, Linkedin, MapPin } from "lucide-react";

export const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-[120px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 -z-10 opacity-90">
        <HeroScene />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1.5 text-xs text-muted-foreground mb-6">
              <MapPin className="h-3 w-3 text-primary" />
              {portfolio.location}
              <span className="mx-1 h-1 w-1 rounded-full bg-primary/60" />
              <span className="text-primary">Available for opportunities</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mb-4">
              <span className="text-gradient">Hi, I'm</span>{" "}
              <span className="text-gradient-primary">Asawari Hire</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              {portfolio.role}
            </p>

            <p className="text-base md:text-lg text-foreground/80 mb-8 min-h-[1.75rem]">
              <Typewriter
                words={[
                  "I turn raw data into insights.",
                  "I build AI-powered solutions.",
                  "I won Datathon 2025 at ARTIMAS.",
                  "I ship data-driven products.",
                ]}
              />
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo("projects")}
                className="bg-primary text-primary-foreground border-0 shadow-none hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                View Projects
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-surface-container-high border-0 hover:bg-surface-container-highest hover:-translate-y-0.5 transition-all text-foreground"
              >
                <a href={portfolio.resume} download>
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button
                asChild
                size="icon"
                variant="ghost"
                className="bg-surface-container-high h-11 w-11 hover:bg-surface-container-highest hover:-translate-y-0.5 hover:text-primary transition-all text-foreground"
              >
                <a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="icon"
                variant="ghost"
                className="bg-surface-container-high h-11 w-11 hover:bg-surface-container-highest hover:-translate-y-0.5 hover:text-primary transition-all text-foreground"
              >
                <a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </section>
  );
};
