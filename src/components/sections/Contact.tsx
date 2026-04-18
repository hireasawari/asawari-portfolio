import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/About";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";

const items = [
  { icon: Mail, label: "Email", value: portfolio.email, href: `mailto:${portfolio.email}` },
  { icon: Phone, label: "Phone", value: portfolio.phone, href: `tel:${portfolio.phone.replace(/\s/g, "")}` },
  { icon: Linkedin, label: "LinkedIn", value: "in/sahilgupta", href: portfolio.linkedin, external: true },
  { icon: Github, label: "GitHub", value: "@sahilgupta", href: portfolio.github, external: true },
];

export const Contact = () => {
  return (
    <section id="contact" className="container py-16 md:py-24">
      <SectionHeader
        eyebrow="Get in touch"
        title="Let's build something together"
        description="I'm always open to interesting problems, internships, and collaborations."
      />

      <Reveal>
        <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/30 blur-[100px] animate-glow-pulse" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/20 blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

          <div className="relative grid sm:grid-cols-2 gap-3 mb-8">
            {items.map(({ icon: Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group flex items-center gap-4 clay-sm p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-clay-sm group-hover:scale-110 transition-transform">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="relative flex flex-wrap gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-primary-foreground border-0 shadow-clay-sm hover:shadow-glow hover:-translate-y-0.5 transition-all"
            >
              <a href={portfolio.resume} download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="clay-sm border-border/40 bg-transparent hover:-translate-y-0.5 transition-all"
            >
              <a href={`mailto:${portfolio.email}`}>
                <Mail className="h-4 w-4" />
                Send a message
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
