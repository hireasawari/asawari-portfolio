import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import config from "@/data/config.json";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

import { useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/project")) {
      setActive("projects");
      return;
    }
    if (location.pathname !== "/") {
      setActive("");
      return;
    }

    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleClick = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-3 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 w-[calc(100%-1.5rem)] max-w-5xl",
        scrolled ? "top-2" : "top-4",
      )}
    >
      <nav
        className={cn(
          "bg-surface-container-highest/80 backdrop-blur-[20px] rounded-2xl px-4 py-3 flex items-center justify-between transition-all duration-500",
          scrolled && "shadow-glow-soft",
        )}
      >
        <button
          onClick={() => handleClick("hero")}
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <span className="grid h-16 w-16 place-items-center rounded-xl bg-transparent shadow-none transition-transform group-hover:scale-105 overflow-hidden">
            <img src={config.logo} alt="Logo" className="w-full h-full object-cover" />
          </span>
          <span className="hidden sm:inline font-display font-semibold tracking-tight">
            Asawari Hire
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => handleClick(l.id)}
                className={cn(
                  "relative px-3 py-2 text-sm rounded-lg transition-colors text-muted-foreground hover:text-foreground",
                  active === l.id && "text-foreground",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-primary transition-all duration-300",
                    active === l.id ? "opacity-100 scale-100" : "opacity-0 scale-50",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden grid h-9 w-9 place-items-center rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-2 bg-surface-container-highest/80 backdrop-blur-[20px] rounded-2xl p-2 animate-fade-in">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => handleClick(l.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm transition-colors",
                    active === l.id
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted/40",
                  )}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
