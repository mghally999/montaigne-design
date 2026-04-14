"use client";
import { useRef, useEffect, ReactNode } from "react";
import { useInView } from "@/hooks/useStringEngine";

export default function SR({ children, delay = 0, className = "", style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { threshold: 0.06 });

  return (
    <div
      ref={ref}
      className={`-a-to-top ${className}`}
      style={{ "--l-delay": delay / 150, ...style } as any}
    >
      {children}
    </div>
  );
}
