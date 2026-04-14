"use client";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   STRING ENGINE — React hooks replicating Obsidian Assembly's
   "StringTune" animation framework by Fiddle.Digital
   ═══════════════════════════════════════════════════════════════ */

// ── SHARED SCROLL STATE ──
let scrollY = 0;
let scrollListeners: Set<() => void> = new Set();
let scrollInited = false;

function initGlobalScroll() {
  if (scrollInited || typeof window === "undefined") return;
  scrollInited = true;
  const onScroll = () => {
    scrollY = window.scrollY;
    scrollListeners.forEach(fn => fn());
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  scrollY = window.scrollY;
}

export function useGlobalScroll(cb: () => void) {
  useEffect(() => {
    initGlobalScroll();
    scrollListeners.add(cb);
    return () => { scrollListeners.delete(cb); };
  }, [cb]);
}

// ── useInView — IntersectionObserver with -inview class toggle ──
export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  opts: { threshold?: number; rootMargin?: string; once?: boolean } = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          el.classList.add("-inview");
          if (opts.once !== false) obs.unobserve(el);
        } else if (opts.once === false) {
          setInView(false);
          el.classList.remove("-inview");
        }
      },
      { threshold: opts.threshold ?? 0.08, rootMargin: opts.rootMargin ?? "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return inView;
}

// ── useScrollProgress — maps scroll position to --progress CSS var (0→1) ──
export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  opts: { key?: string; enterEl?: string; enterVp?: string; exitEl?: string; exitVp?: string; easing?: (t: number) => number } = {}
) {
  const progressRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    initGlobalScroll();

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // Default: enter when top hits bottom of viewport, exit when bottom hits top
      const start = rect.top + scrollY - wh; // element top enters viewport bottom
      const end = rect.top + scrollY + rect.height; // element bottom exits viewport top
      const diff = end - start;
      if (diff === 0) return;
      let raw = (scrollY - start) / diff;
      raw = Math.max(0, Math.min(1, raw));
      const eased = opts.easing ? opts.easing(raw) : raw;
      if (Math.abs(eased - progressRef.current) > 0.0001) {
        progressRef.current = eased;
        el.style.setProperty(opts.key || "--progress", eased.toFixed(5));
      }
    };

    compute();
    scrollListeners.add(compute);
    window.addEventListener("resize", compute);
    return () => { scrollListeners.delete(compute); window.removeEventListener("resize", compute); };
  }, []);

  return progressRef;
}

// ── useParallax — scroll-based translateY with configurable intensity ──
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  intensity: number = 0.15
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 1024) return;
    initGlobalScroll();

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const offset = (center - wh / 2) * intensity;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    compute();
    scrollListeners.add(compute);
    return () => { scrollListeners.delete(compute); };
  }, [intensity]);
}

// ── useSpotlight — cursor position → angle/distance CSS vars ──
export function useSpotlight(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 1024) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;
      el.style.setProperty("--spotlight-angle", angle.toFixed(1));
      el.style.setProperty("--spotlight-distance", dist.toFixed(1));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}

// ── useCursorTrack — mouse position relative to element (for cursor module) ──
export function useCursorTrack(
  ref: React.RefObject<HTMLElement | null>,
  opts: { lerp?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 1024) return;

    let mx = 0, my = 0, cx = 0, cy = 0;
    let raf: number;
    const lerpFactor = opts.lerp ?? 0.12;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const animate = () => {
      cx += (mx - cx) * lerpFactor;
      cy += (my - cy) * lerpFactor;
      el.style.setProperty("--x", cx.toFixed(3));
      el.style.setProperty("--y", cy.toFixed(3));
      raf = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", () => { mx = 0; my = 0; });
    raf = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}

// ── useCursorTrail — canvas-based cursor trail (Obsidian's cursor-trail plugin) ──
export function useCursorTrail() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999";
    document.body.appendChild(canvas);

    let w = window.innerWidth, h = window.innerHeight;
    const dpr = 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const LEN = 50;
    const points = Array.from({ length: LEN }, () => ({ x: w / 2, y: h / 2 }));
    let targetX = w / 2, targetY = h / 2;
    let raf: number;

    const onMove = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY; };
    const onResize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Update points with spring physics
      points[0].x += (targetX - points[0].x) * 0.35;
      points[0].y += (targetY - points[0].y) * 0.35;
      for (let i = 1; i < LEN; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.28;
        points[i].y += (points[i - 1].y - points[i].y) * 0.28;
      }

      // Draw trail
      for (let i = 1; i < LEN - 1; i++) {
        const t = i / LEN;
        const alpha = (1 - t) * 0.5;
        const width = (1 - t) * 1.2;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.strokeStyle = `rgba(159, 175, 155, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      canvas.remove();
    };
  }, []);
}

// ── useStickyProgress — for sticky scroll sections with progress ──
export function useStickyProgress(
  containerRef: React.RefObject<HTMLElement | null>,
  opts: { key?: string } = {}
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    initGlobalScroll();

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // Progress from when container top hits viewport top to when bottom hits viewport bottom
      const totalScroll = rect.height - wh;
      if (totalScroll <= 0) return;
      const scrolled = -rect.top;
      let progress = scrolled / totalScroll;
      progress = Math.max(0, Math.min(1, progress));
      el.style.setProperty(opts.key || "--progress", progress.toFixed(5));
    };

    compute();
    scrollListeners.add(compute);
    return () => { scrollListeners.delete(compute); };
  }, []);
}

// ── PAGE READY — adds -loaded -ready classes like Obsidian ──
export function usePageReady() {
  useEffect(() => {
    const html = document.documentElement;
    // Obsidian adds these classes to enable animations
    requestAnimationFrame(() => {
      html.classList.add("-loaded");
      setTimeout(() => html.classList.add("-ready"), 100);
    });
    return () => {
      html.classList.remove("-loaded", "-ready");
    };
  }, []);
}
