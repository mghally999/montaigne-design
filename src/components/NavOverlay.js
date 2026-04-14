"use client";
import Link from "next/link";
import styled from "styled-components";

const Wrap = styled.div`
  position: fixed; inset: 0; z-index: 200;
  opacity: ${p => p.$open ? 1 : 0}; pointer-events: ${p => p.$open ? "auto" : "none"};
  transition: opacity 0.9s var(--ease);
`;
const Bg = styled.div`position: absolute; inset: 0; background: rgba(63,56,60,0.88); backdrop-filter: blur(24px);`;
const Circle = styled.div`
  position: absolute; left: 50%; top: 50%; width: min(720px,85vw); aspect-ratio: 1; border-radius: 50%;
  background: radial-gradient(rgba(21,20,21,0.8), rgba(21,20,21,0.95));
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  opacity: ${p => p.$open ? 1 : 0};
  transform: ${p => p.$open ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.2)"};
  transition: all 1.2s var(--ease);
`;
const NavLink = styled(Link)`
  display: block; font-size: clamp(38px,7vw,76px); font-weight: 300; font-style: italic;
  color: rgba(241,234,222,0.55); padding: 2px 24px; text-decoration: none;
  transition: all 0.5s var(--ease); opacity: ${p => p.$open ? 1 : 0};
  transform: ${p => p.$open ? "translateY(0)" : "translateY(50px)"};
  transition-delay: ${p => p.$d}s;
  &:hover { color: #F1EADE; letter-spacing: 0.06em; }
`;
const Close = styled.button`position: absolute; top: 36px; right: 40px; z-index: 210; width: 44px; height: 44px; display: grid; place-items: center;`;
const Bar = styled.span`position: absolute; width: 28px; height: 1px; background: #F1EADE; transform: rotate(${p => p.$r}deg);`;

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function NavOverlay({ open, onClose }) {
  return (
    <Wrap $open={open}>
      <Bg onClick={onClose} />
      <Circle $open={open}>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div style={{ fontSize: 14, color: "rgba(241,234,222,0.25)", letterSpacing: "0.2em", marginBottom: 28, fontStyle: "italic" }}>Navigation</div>
          {links.map((l, i) => (
            <NavLink key={l.href} href={l.href} onClick={onClose} $open={open} $d={0.25 + i * 0.1}
              style={{ marginLeft: i % 2 === 0 ? "-12%" : "12%" }}>{l.label}</NavLink>
          ))}
        </div>
      </Circle>
      <Close onClick={onClose}><Bar $r={45} /><Bar $r={-45} /></Close>
    </Wrap>
  );
}
