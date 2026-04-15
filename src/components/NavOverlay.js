"use client";
import Link from "next/link";
import styled from "styled-components";

const Wrap = styled.div`
  position: fixed; inset: 0; z-index: 200;
  opacity: ${p => p.$open ? 1 : 0}; pointer-events: ${p => p.$open ? "auto" : "none"};
  transition: opacity 0.9s var(--ease);
`;
const Bg = styled.div`position: absolute; inset: 0; background: rgba(21,20,21,0.92); backdrop-filter: blur(30px);`;
const Content = styled.div`position: absolute; inset: 0; display: flex; z-index: 2;
  @media(max-width:768px) { flex-direction: column; }
`;
const LeftCol = styled.div`
  flex: 0 0 30%; padding: 80px 40px; display: flex; flex-direction: column; justify-content: space-between;
  @media(max-width:768px) { flex: 0 0 auto; padding: 80px 24px 24px; flex-direction: row; justify-content: space-between; align-items: flex-start; }
  @media(max-width:480px) { padding: 70px 20px 16px; }
`;
const RightCol = styled.div`
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;
  @media(max-width:768px) { align-items: flex-start; padding: 0 24px 40px; justify-content: flex-start; }
`;
const NavLink = styled(Link)`
  display: flex; align-items: baseline; gap: 12px;
  font-size: clamp(36px,7vw,80px); font-weight: 300; font-style: italic;
  color: rgba(241,234,222,0.5); padding: 4px 0; text-decoration: none;
  transition: all 0.5s var(--ease);
  opacity: ${p => p.$open ? 1 : 0}; transform: ${p => p.$open ? "translateY(0)" : "translateY(40px)"};
  transition-delay: ${p => p.$d}s;
  &::before { content: "+"; font-size: 14px; font-style: normal; color: #C9A96E; opacity: 0; transition: opacity 0.3s; }
  &:hover { color: #F1EADE; letter-spacing: 0.03em; &::before { opacity: 0.6; } }
  @media(max-width:480px) { font-size: clamp(28px,8vw,44px); }
`;
const Close = styled.button`
  position: absolute; top: 24px; right: 40px; z-index: 10;
  font-size: 14px; letter-spacing: 0.2em; color: rgba(241,234,222,0.4);
  display: flex; align-items: center; gap: 12px;
  transition: color 0.4s; &:hover { color: #F1EADE; }
  @media(max-width:768px) { top: 16px; right: 20px; }
`;
const XMark = styled.span`width: 36px; height: 36px; display: grid; place-items: center; position: relative;
  span { position: absolute; width: 22px; height: 1px; background: #F1EADE; }`;
const SvgDecor = styled.svg`position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.08;`;
const TagLine = styled.div`font-size: 15px; color: rgba(241,234,222,0.3); font-style: italic; line-height: 1.6;
  @media(max-width:768px) { font-size: 13px; }
`;

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
      <SvgDecor viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs><linearGradient id="navg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C9A96E" /><stop offset="1" stopColor="#7B5136" stopOpacity="0.2" /></linearGradient></defs>
        <path fill="none" stroke="url(#navg)" strokeWidth="1" d="M200,800C400,300,600,600,900,200S1200,500,1400,100" vectorEffect="non-scaling-stroke" />
      </SvgDecor>
      <Content>
        <LeftCol>
          <div>
            <img src="/logo.jpg" alt="MD" style={{ width: 48, borderRadius: 6, opacity: 0.6, marginBottom: 14 }} />
            <TagLine>Independent practice<br/>operating across<br/>locations.</TagLine>
          </div>
          <TagLine style={{ marginTop: 16 }}>No Social Media</TagLine>
        </LeftCol>
        <RightCol>
          <div>
            {links.map((l, i) => (
              <NavLink key={l.href} href={l.href} onClick={onClose} $open={open} $d={0.15 + i * 0.08}
                style={{ marginLeft: i % 2 ? "clamp(20px,4vw,60px)" : "0" }}>{l.label}</NavLink>
            ))}
          </div>
        </RightCol>
      </Content>
      <Close onClick={onClose}>CLOSE<XMark><span style={{ transform: "rotate(45deg)" }} /><span style={{ transform: "rotate(-45deg)" }} /></XMark></Close>
    </Wrap>
  );
}
