import { ArrowUp } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export const Footer = () => {
  return (
    <footer className="container py-10 mt-12 bg-surface-container-lowest rounded-t-[3rem]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {portfolio.name}. Crafted with care.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="grid h-10 w-10 place-items-center rounded-xl bg-surface-container-high hover:bg-surface-container-highest hover:-translate-y-0.5 hover:text-primary transition-all text-muted-foreground"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
};
