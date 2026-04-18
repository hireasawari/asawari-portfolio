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
          <div className="glass rounded-2xl p-6 h-full">
            <div className="flex items-start gap-4 mb-5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary clay-sm">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
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
                <span key={c} className="clay-sm px-3 py-1.5 text-xs text-foreground/90">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass rounded-2xl p-6 h-full">
            <div className="flex items-start gap-4 mb-5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-accent clay-sm">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Leadership & Community</h3>
                <p className="text-sm text-muted-foreground">Beyond the classroom</p>
              </div>
            </div>

            <ul className="space-y-4">
              {leadership.map((l) => (
                <li key={l.title} className="clay-sm p-4 rounded-xl">
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
