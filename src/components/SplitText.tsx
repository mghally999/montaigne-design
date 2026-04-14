"use client";
import { useRef, useEffect } from "react";
import { useInView } from "@/hooks/useStringEngine";

interface Props { children: string; className?: string; as?: keyof JSX.IntrinsicElements; }

export default function SplitText({ children, className = "", as: Tag = "span" }: Props) {
  const ref = useRef<HTMLElement>(null);
  useInView(ref, { threshold: 0.15 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const text = children;
    const words = text.split(" ");
    el.innerHTML = "";
    el.classList.add("-splitted");
    el.setAttribute("aria-label", text);

    let globalIdx = 0;
    const lineEl = document.createElement("span");
    lineEl.classList.add("-s-line");
    lineEl.style.setProperty("--line-index", "0");

    words.forEach((word, wi) => {
      const chars = word.split("");
      chars.forEach((ch) => {
        const span = document.createElement("span");
        span.classList.add("-s-char");
        span.textContent = ch;
        span.setAttribute("data-split-content", ch);
        span.style.setProperty("--char-index", String(globalIdx));
        span.style.setProperty("--char-random", String(Math.random() * 10));
        lineEl.appendChild(span);
        globalIdx++;
      });
      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.classList.add("-s-char");
        space.innerHTML = "&nbsp;";
        space.style.setProperty("--char-index", String(globalIdx));
        space.style.setProperty("--char-random", String(Math.random() * 10));
        lineEl.appendChild(space);
        globalIdx++;
      }
    });

    el.appendChild(lineEl);
  }, [children]);

  return <Tag ref={ref as any} className={className} aria-hidden="true" />;
}
