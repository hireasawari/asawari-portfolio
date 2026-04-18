import { useEffect, useState } from "react";

/**
 * Soft glowing cursor follower (desktop only). Disabled on touch devices.
 */
export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[55] h-[420px] w-[420px] rounded-full opacity-50 mix-blend-screen blur-3xl transition-transform duration-300 ease-out"
      style={{
        transform: `translate(${pos.x - 210}px, ${pos.y - 210}px)`,
        background:
          "radial-gradient(circle, hsl(240 90% 70% / 0.25), hsl(280 80% 65% / 0.1) 40%, transparent 70%)",
      }}
    />
  );
};
