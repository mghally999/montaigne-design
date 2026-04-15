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
`;
const Inner = styled.div`display: flex; align-items: center; justify-content: space-between; pointer-events: auto;`;
const Logo = styled(Link)`display: flex; align-items: center; gap: 14px; text-decoration: none;
  img { height: 38px; width: auto; opacity: 0.85; }
`;
const LogoText = styled.div`display: flex; flex-direction: column; font-size: 18px; line-height: 0.9; font-weight: 400; letter-spacing: 0.02em;`;
const LogoSub = styled.span`font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.5; margin-top: 3px;`;
const NavBtn = styled(Link)`
  padding: 10px 28px; border: 1px solid ${p => p.theme.navBorder}; border-radius: 4px;
  font-size: 12px; letter-spacing: 0.18em; font-weight: 400;
  color: ${p => p.theme.navText}; text-decoration: none;
  transition: all 0.5s var(--ease);
  &:hover { border-color: ${p => p.theme.navTextHover}; color: ${p => p.theme.navTextHover}; 
    background: ${p => p.theme.mode === "dark" ? "rgba(241,234,222,0.06)" : "rgba(21,20,21,0.04)"}; }
`;
const MenuBtn = styled.button`
  padding: 10px 28px; border: 1px solid ${p => p.theme.navBorder}; border-radius: 4px;
  display: flex; align-items: center; gap: 12px; font-size: 12px; letter-spacing: 0.18em;
  color: ${p => p.theme.navText}; font-weight: 400;
  transition: all 0.5s; &:hover { border-color: ${p => p.theme.navTextHover}; color: ${p => p.theme.navTextHover}; }
`;
const BtnRow = styled.div`display: flex; gap: 10px; align-items: center;`;
const Sep = styled.div`width: 1px; height: 28px; background: ${p => p.theme.border}; margin: 0 6px;`;
const ThemeBtn = styled.button`
  padding: 8px 14px; font-size: 11px; letter-spacing: 0.15em; 
  color: ${p => p.theme.navText}; border: 1px solid ${p => p.theme.border}; border-radius: 4px;
  transition: all 0.4s; &:hover { color: ${p => p.theme.navTextHover}; border-color: ${p => p.theme.navBorder}; }
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
          <img src="/logo.jpg" alt="Montaigne Design" style={{ borderRadius: 4 }} />
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
