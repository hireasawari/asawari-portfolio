import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/About";
import { portfolio } from "@/data/portfolio";

export const Skills = () => {
  return (
    <section id="skills" className="container py-16 md:py-24">
      <SectionHeader
        eyebrow="My Arsenal"
        title="Skills & Tech Stack"
        description="Technologies and frameworks I use to take ideas from concept to deployment."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolio.skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 80}>
            <div className="bg-surface-container-low rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-surface-container">
              <h3 className="font-display text-sm uppercase tracking-wider text-primary mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="bg-surface-container-high px-3 py-1.5 text-xs font-medium text-foreground/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary rounded-md cursor-default"
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
