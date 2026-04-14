"use client";
import { useState, useEffect, useRef } from "react";

export default function SplitText({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); o.disconnect(); } }, { threshold: 0.05 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <span ref={ref} style={{ display: "inline-flex", flexWrap: "wrap", ...style }} aria-label={children}>
      {children.split("").map((ch, i) => (
        <span key={i} style={{
          display: "inline-block", opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0) scale(1) skew(0,0)" : "translateY(1em) scale(1.4) skew(12deg,25deg)",
          filter: vis ? "blur(0)" : "blur(4px)",
          transition: `all 1.4s cubic-bezier(0.35,0.35,0,1) ${delay + Math.random() * 0.5 + i * 0.025}s`,
        }}>{ch === " " ? "\u00A0" : ch}</span>
      ))}
    </span>
  );
}
