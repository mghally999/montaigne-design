"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

const Header = styled.header`
  position: fixed; top: 0; left: 0; width: 100%; z-index: 102; pointer-events: none;
  padding: 18px 40px 80px;
  background: linear-gradient(180deg, 
    ${p => p.theme.mode === "dark" ? "rgba(21,20,21,0.7)" : "rgba(241,234,222,0.85)"} 0%, 
    ${p => p.theme.mode === "dark" ? "rgba(21,20,21,0.3)" : "rgba(241,234,222,0.4)"} 50%, 
    transparent 100%);
  transition: all 0.9s var(--ease);
  @media(max-width:768px) { padding: 12px 16px 50px; }
`;
const Inner = styled.div`display: flex; align-items: center; justify-content: space-between; pointer-events: auto;`;
const Logo = styled(Link)`display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0;
  img { height: 36px; width: auto; opacity: 0.85; border-radius: 4px; }
  @media(max-width:480px) { img { height: 30px; } }
`;
const LogoText = styled.div`display: flex; flex-direction: column; font-size: 18px; line-height: 0.9; font-weight: 400; letter-spacing: 0.02em;
  @media(max-width:640px) { font-size: 15px; }
`;
const LogoSub = styled.span`font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.5; margin-top: 3px;
  @media(max-width:640px) { font-size: 9px; }
`;
const NavBtn = styled(Link)`
  padding: 10px 28px; border: 1px solid ${p => p.theme.navBorder}; border-radius: 4px;
  font-size: 12px; letter-spacing: 0.18em; font-weight: 400;
  color: ${p => p.theme.navText}; text-decoration: none; white-space: nowrap;
  transition: all 0.5s var(--ease);
  &:hover { border-color: ${p => p.theme.navTextHover}; color: ${p => p.theme.navTextHover};
    background: ${p => p.theme.mode === "dark" ? "rgba(241,234,222,0.06)" : "rgba(21,20,21,0.04)"}; }
  @media(max-width:768px) { display: none; }
`;
const MenuBtn = styled.button`
  padding: 10px 20px; border: 1px solid ${p => p.theme.navBorder}; border-radius: 4px;
  display: flex; align-items: center; gap: 10px; font-size: 12px; letter-spacing: 0.18em;
  color: ${p => p.theme.navText}; font-weight: 400;
  transition: all 0.5s; &:hover { border-color: ${p => p.theme.navTextHover}; color: ${p => p.theme.navTextHover}; }
  @media(max-width:480px) { padding: 8px 14px; font-size: 11px; gap: 8px; }
`;
const BtnRow = styled.div`display: flex; gap: 10px; align-items: center;
  @media(max-width:768px) { gap: 6px; }
`;
const Sep = styled.div`width: 1px; height: 28px; background: ${p => p.theme.border}; margin: 0 6px;
  @media(max-width:768px) { display: none; }
`;
const ThemeBtn = styled.button`
  padding: 8px 14px; font-size: 11px; letter-spacing: 0.15em;
  color: ${p => p.theme.navText}; border: 1px solid ${p => p.theme.border}; border-radius: 4px;
  transition: all 0.4s; &:hover { color: ${p => p.theme.navTextHover}; border-color: ${p => p.theme.navBorder}; }
  @media(max-width:480px) { padding: 6px 10px; font-size: 10px; }
`;

export default function Nav({ onOpenMenu, onToggleTheme, isDark }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(scrollY > 100);
    addEventListener("scroll", h, { passive: true }); h();
    return () => removeEventListener("scroll", h);
  }, []);
  return (
    <Header $scrolled={scrolled}>
      <Inner>
        <Logo href="/">
          <img src="/logo.jpg" alt="Montaigne Design" />
          <LogoText>
            <span>Montaigne</span>
            <LogoSub>Design</LogoSub>
          </LogoText>
        </Logo>
        <BtnRow>
          <NavBtn href="/projects">PROJECTS</NavBtn>
          <NavBtn href="/about">ABOUT</NavBtn>
          {scrolled && <NavBtn href="/contact">SEND REQUEST</NavBtn>}
          <Sep />
          <ThemeBtn onClick={onToggleTheme}>{isDark ? "LIGHT" : "DARK"}</ThemeBtn>
          <MenuBtn onClick={onOpenMenu}>
            <span style={{ display: "flex", flexDirection: "column", gap: 5, width: 20 }}>
              <span style={{ height: 1.5, background: "currentColor", width: "100%", borderRadius: 1 }} />
              <span style={{ height: 1.5, background: "currentColor", width: "65%", borderRadius: 1 }} />
            </span>MENU
          </MenuBtn>
        </BtnRow>
      </Inner>
    </Header>
  );
}
