import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/About";
import { portfolio } from "@/data/portfolio";
import { GraduationCap, Users } from "lucide-react";

export const Education = () => {
  const { education, leadership } = portfolio;
  return (
    <section id="education" className="container py-16 md:py-24">
      <SectionHeader
        eyebrow="Background"
        title="Education & Leadership"
        description="Where I'm learning the fundamentals — and how I show up beyond the classroom."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="bg-surface-container-low rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-surface-container">
            <div className="flex items-start gap-4 mb-5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface-container-high">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{education.school}</h3>
                <p className="text-sm text-muted-foreground">{education.degree}</p>
                <p className="text-xs text-primary mt-1">{education.duration}</p>
              </div>
            </div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Coursework</p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <span key={c} className="bg-surface-container-high px-3 py-1.5 text-xs text-foreground/90 rounded-md">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="bg-surface-container-low rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-surface-container">
            <div className="flex items-start gap-4 mb-5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface-container-high">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Leadership & Community</h3>
                <p className="text-sm text-muted-foreground">Beyond the classroom</p>
              </div>
            </div>

            <ul className="space-y-4">
              {leadership.map((l) => (
                <li key={l.title} className="bg-surface-container-high p-4 rounded-xl">
                  <p className="font-medium text-sm mb-0.5">{l.title}</p>
                  <p className="text-xs text-primary mb-1.5">{l.org}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{l.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
