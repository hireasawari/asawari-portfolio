import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";

export const SectionHeader = ({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) => (
  <Reveal className="mb-12 max-w-2xl">
    <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-medium">{eyebrow}</p>
    <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">{title}</h2>
    {description && <p className="text-muted-foreground text-base md:text-lg">{description}</p>}
  </Reveal>
);

export const About = () => {
  return (
    <section id="about" className="container py-16 md:py-24">
      <SectionHeader
        eyebrow="Who I Am"
        title="Engineer. Analyst. Relentlessly curious."
        description={portfolio.about}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {portfolio.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <div className="bg-surface-container-low rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-surface-container group">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
