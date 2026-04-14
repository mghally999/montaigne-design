"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

const Header = styled.header`
  position: fixed; top: 0; left: 0; width: 100%; z-index: 102; pointer-events: none;
  padding: 14px 40px 70px;
  background: linear-gradient(180deg, ${p => p.$scrolled ? p.theme.navGrad : `${p.theme.navGrad}80`} 0%, transparent 100%);
  transition: background 0.9s var(--ease);
`;
const Inner = styled.div`display: flex; align-items: center; justify-content: space-between; pointer-events: auto;`;
const Logo = styled(Link)`display: flex; flex-direction: column; font-size: 21px; line-height: 0.85; font-weight: 300; text-decoration: none;`;
const LogoSub = styled.span`margin-left: 0.85em; font-style: italic; opacity: 0.5; font-size: 18px;`;
const NavBtn = styled(Link)`
  padding: 7px 22px; border: 1px solid ${p => p.theme.border}; border-radius: 4px;
  font-size: 10px; letter-spacing: 0.22em; color: ${p => p.theme.fgMuted};
  transition: all 0.5s var(--ease); text-decoration: none;
  &:hover { border-color: ${p => p.theme.fgMuted}; color: ${p => p.theme.fg}; }
`;
const MenuBtn = styled.button`
  padding: 7px 22px; border: 1px solid ${p => p.theme.border}; border-radius: 4px;
  display: flex; align-items: center; gap: 10px; font-size: 10px; letter-spacing: 0.22em; color: ${p => p.theme.fgMuted};
  transition: all 0.5s; &:hover { border-color: ${p => p.theme.fgMuted}; }
`;
const Tag = styled.span`font-size: 10px; letter-spacing: 0.15em; color: ${p => p.theme.fgDim};`;
const BtnRow = styled.div`display: flex; gap: 8px; align-items: center;`;
const Sep = styled.div`width: 1px; height: 24px; background: ${p => p.theme.border}; margin: 0 4px;`;

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
        <Logo href="/"><span>Montaigne</span><LogoSub>Design</LogoSub></Logo>
        <Tag>Imagine Possible</Tag>
        <BtnRow>
          <NavBtn href="/projects">PROJECTS</NavBtn>
          <NavBtn href="/about">ABOUT</NavBtn>
          {scrolled && <NavBtn href="/contact">SEND REQUEST</NavBtn>}
          <Sep />
          <button onClick={onToggleTheme} style={{ fontSize: 10, letterSpacing: "0.15em", opacity: 0.4, padding: "6px 10px" }}>{isDark ? "LIGHT" : "DARK"}</button>
          <MenuBtn onClick={onOpenMenu}>
            <span style={{ display: "flex", flexDirection: "column", gap: 4, width: 18 }}>
              <span style={{ height: 1, background: "currentColor", width: "100%" }} />
              <span style={{ height: 1, background: "currentColor", width: "60%" }} />
            </span>MENU
          </MenuBtn>
        </BtnRow>
      </Inner>
    </Header>
  );
}
