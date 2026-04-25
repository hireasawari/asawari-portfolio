import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/About";
import { portfolio } from "@/data/portfolio";
import { Award, Medal, Trophy } from "lucide-react";

const icons = [Trophy, Medal, Award];

export const Achievements = () => {
  return (
    <section id="achievements" className="container py-16 md:py-24">
      <SectionHeader
        eyebrow="Highlights"
        title="Wins &amp; Recognitions"
        description="Competitions entered, trophies earned, certifications completed."
      />

      <div className="relative">
        {/* Vertical connector line on md+ */}
        <div className="hidden md:block absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

        <ul className="space-y-5">
          {portfolio.achievements.map((a, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={a.event} as="li" delay={i * 100}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 grid h-14 w-14 place-items-center rounded-2xl bg-surface-container-high">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="bg-surface-container-low rounded-2xl p-5 flex-1 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-container">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {a.rank}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{a.year}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-1">{a.event}</h3>
                    <p className="text-sm text-muted-foreground">{a.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
