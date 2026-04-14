"use client";
import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let w, h;
    const resize = () => { w = innerWidth; h = innerHeight; cv.width = w; cv.height = h; }; resize();
    const N = 50, pts = Array.from({ length: N }, () => ({ x: w / 2, y: h / 2 }));
    let mx = w / 2, my = h / 2, raf;
    const onM = (e) => { mx = e.clientX; my = e.clientY; };
    addEventListener("pointermove", onM, { passive: true }); addEventListener("resize", resize);
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      pts[0].x += (mx - pts[0].x) * 0.25; pts[0].y += (my - pts[0].y) * 0.25;
      for (let i = 1; i < N; i++) { pts[i].x += (pts[i - 1].x - pts[i].x) * 0.2; pts[i].y += (pts[i - 1].y - pts[i].y) * 0.2; }
      ctx.lineCap = "round";
      for (let i = 1; i < N - 1; i++) {
        const t = i / N; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
        ctx.strokeStyle = `rgba(159,175,155,${(1 - t) * 0.4})`; ctx.lineWidth = (1 - t) * 2; ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", onM); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }} />;
}
