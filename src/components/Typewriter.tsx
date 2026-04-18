import { useEffect, useState } from "react";

export const Typewriter = ({ words, speed = 70, pause = 1400 }: { words: string[]; speed?: number; pause?: number }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const t = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDeleting(true), pause);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setIndex((i) => i + 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return (
    <span className="inline-flex items-center">
      <span>{text}</span>
      <span className="ml-1 inline-block h-5 w-[2px] bg-primary animate-blink" />
    </span>
  );
};
