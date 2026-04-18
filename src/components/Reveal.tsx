import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}

export const Reveal = ({ children, className, delay = 0, as: Tag = "div" }: RevealProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};
