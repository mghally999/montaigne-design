"use client";
import { useState, useEffect, useRef } from "react";

export default function ScrollReveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); o.disconnect(); } }, { threshold: 0.03 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(50px) skewY(2deg)", transition: `all 1.4s cubic-bezier(0.69,0,0,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}
