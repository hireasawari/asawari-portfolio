import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/About";
import { portfolio } from "@/data/portfolio";

export const Skills = () => {
  return (
    <section id="skills" className="container py-16 md:py-24">
      <SectionHeader
        eyebrow="Toolkit"
        title="Skills & Stack"
        description="The tools I reach for when turning ideas into shipped products."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolio.skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 80}>
            <div className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-soft">
              <h3 className="font-display text-sm uppercase tracking-wider text-primary mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="clay-sm px-3 py-1.5 text-xs font-medium text-foreground/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
