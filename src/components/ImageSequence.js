"use client";
import { useState, useEffect, useRef } from "react";

const cl = (v, a, b) => Math.max(a, Math.min(b, v));

export default function ImageSequence({ images, names }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    const track = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.scrollHeight - innerHeight;
        if (total > 0) setProgress(cl(-rect.top / total, 0, 1));
      }
      raf = requestAnimationFrame(track);
    };
    raf = requestAnimationFrame(track);
    return () => cancelAnimationFrame(raf);
  }, []);

  const expandP = cl(progress * 5, 0, 1);
  const cycleP = cl((progress - 0.2) / 0.65, 0, 1);
  const shrinkP = cl((progress - 0.85) / 0.15, 0, 1);
  const insetY = 28 * (1 - expandP) + shrinkP * 38;
  const insetX = 22 * (1 - expandP) + shrinkP * 30;
  const borderR = expandP < 1 ? `${Math.round(16 - expandP * 12)}px` : `${Math.round(shrinkP * 24)}px`;
  const scale = 0.75 + expandP * 0.25 - shrinkP * 0.2;
  const rawIdx = Math.floor(cycleP * images.length);
  const activeIdx = cl(rawIdx, 0, images.length - 1);
  const localP = (cycleP * images.length) - activeIdx;
  const scatter = expandP * 180;
  const sideOp = cl(1 - expandP * 2 + shrinkP, 0, 0.85);
  const uiOp = expandP > 0.7 && shrinkP < 0.5 ? cl((expandP - 0.7) / 0.3 - shrinkP * 2, 0, 1) : 0;

  const sideL = images.slice(0, 3);
  const sideR = images.slice(-3).reverse();

  return (
    <div ref={ref} style={{ height: `${images.length * 130 + 250}vh`, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {sideL.map((img, i) => (
          <div key={`L${i}`} style={{
            position: "absolute", left: 0, top: `${6 + i * 30}%`, width: "17%", zIndex: 5,
            borderRadius: 6, overflow: "hidden",
            transform: `translate(${-scatter * (i + 1) * 0.7}px, ${scatter * (i % 2 ? -0.4 : 0.6) * (i + 1)}px) rotate(${scatter * 0.04 * (i - 1)}deg)`,
            opacity: sideOp,
          }}><img src={img} alt="" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} /></div>
        ))}
        {sideR.map((img, i) => (
          <div key={`R${i}`} style={{
            position: "absolute", right: 0, top: `${4 + i * 32}%`, width: "17%", zIndex: 5,
            borderRadius: 6, overflow: "hidden",
            transform: `translate(${scatter * (i + 1) * 0.7}px, ${scatter * (i % 2 ? 0.5 : -0.3) * (i + 1)}px) rotate(${-scatter * 0.03 * (i - 1)}deg)`,
            opacity: sideOp,
          }}><img src={img} alt="" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover" }} /></div>
        ))}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          clipPath: `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${borderR})`,
          transform: `scale(${scale})`, willChange: "clip-path, transform",
        }}>
          {images.map((img, i) => {
            const isActive = i === activeIdx;
            const isNext = i === activeIdx + 1;
            const clipAmt = isActive ? 0 : isNext ? cl((1 - localP) * 100, 0, 100) : 100;
            return (
              <div key={i} style={{
                position: "absolute", inset: 0, zIndex: isActive ? 3 : isNext ? 2 : 1,
                visibility: (isActive || isNext) ? "visible" : "hidden",
                clipPath: `inset(0 ${clipAmt}% 0 0)`,
              }}>
                <img src={img} alt={names?.[i] || ""} loading={i < 3 ? "eager" : "lazy"}
                  style={{ width: "100%", height: "100%", objectFit: "cover",
                    transform: isActive ? `scale(${1 + localP * 0.04})` : "scale(1.1)",
                    transition: "transform 1s cubic-bezier(0.35,0.35,0,1)" }} />
              </div>
            );
          })}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(transparent, rgba(21,20,21,0.92))", zIndex: 15, opacity: uiOp }} />
          <div style={{ position: "absolute", bottom: 75, left: 50, zIndex: 20, opacity: uiOp, fontFamily: "var(--f-heading)", transform: `translateY(${uiOp > 0.5 ? 0 : 30}px)`, transition: "transform 0.8s var(--ease)" }}>
            <div style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 300, fontStyle: "italic", color: "#F1EADE" }}>{names?.[activeIdx] || ""}</div>
          </div>
          <div style={{ position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", gap: 16, opacity: uiOp }}>
            {["M15 19l-7-7 7-7", "M9 5l7 7-7 7"].map((d, i) => (
              <button key={i} style={{ width: 60, height: 60, borderRadius: "50%", border: "1.5px solid rgba(241,234,222,0.2)", background: "rgba(21,20,21,0.45)", backdropFilter: "blur(10px)", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F1EADE" strokeWidth="1.5"><path d={d} /></svg>
              </button>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 58, right: 60, zIndex: 20, opacity: uiOp }}>
            <div style={{ width: 74, height: 74, borderRadius: "50%", position: "relative", display: "grid", placeItems: "center" }}>
              <svg viewBox="0 0 74 74" style={{ position: "absolute", inset: 0 }}>
                <circle cx="37" cy="37" r="35" fill="none" stroke="rgba(241,234,222,0.08)" strokeWidth="1" />
                <circle cx="37" cy="37" r="35" fill="none" stroke="rgba(241,234,222,0.3)" strokeWidth="1" strokeDasharray={`${(activeIdx + 1) / images.length * 220} 220`} strokeLinecap="round" transform="rotate(-90 37 37)" style={{ transition: "stroke-dasharray 0.8s" }} />
              </svg>
              <span style={{ fontSize: 20, fontWeight: 300, color: "rgba(241,234,222,0.45)", position: "relative", zIndex: 2, fontFamily: "var(--f-heading)" }}>
                <span style={{ color: "#F1EADE" }}>{activeIdx + 1}</span>/{images.length}
              </span>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 36, top: "50%", transform: "translateY(-50%)", zIndex: 25, display: "flex", flexDirection: "column", gap: 10, opacity: uiOp }}>
          {images.map((_, i) => (
            <div key={i} style={{ width: i === activeIdx ? 10 : 5, height: i === activeIdx ? 10 : 5, borderRadius: "50%", background: i === activeIdx ? "rgba(241,234,222,0.8)" : "rgba(241,234,222,0.15)", transition: "all 0.6s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
