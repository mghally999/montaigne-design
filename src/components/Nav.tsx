"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Header = styled.header<{ $s: boolean }>`
  position: fixed; top: 0; left: 0; width: 100%; z-index: 102;
  background: linear-gradient(180deg,
    rgba(var(--c-brown-rgb), ${p => p.$s ? 0.7 : 0.5}) 0%,
    rgba(var(--c-brown-rgb), ${p => p.$s ? 0.5 : 0.35}) 40%,
    rgba(var(--c-brown-rgb), 0) 100%);
  padding: var(--mm) var(--g-margin) var(--h1);
  pointer-events: none;
  transition: background 0.9s var(--f-cubic);
  @media (max-width: 1024px) { padding: var(--mm) var(--g-gap) var(--h5); }
`;
const W = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--g-columns), 1fr);
  column-gap: var(--g-gap);
  pointer-events: none;
  > * { pointer-events: auto; }
`;
const Logo = styled(Link)`
  grid-column: 1 / 3;
  display: flex; flex-direction: column;
  font-family: var(--font-t1); font-size: var(--h5); line-height: 0.85;
  color: var(--c-cream);
  .the { margin-left: 0.85em; }
  .design { margin-left: 1em; }
  transition: color 0.9s var(--f-cubic);
  &:hover { color: var(--c-white, #fff); }
  @media (max-width: 1024px) { grid-column: 1 / 4; font-size: var(--h6); }
`;
const Sep = styled.span`
  grid-column: 6 / 7; align-self: center; justify-self: center;
  background: var(--c-black); width: 1px; height: var(--h2);
  @media (max-width: 1024px) { display: none; }
`;
const NavBtn = styled(Link)`
  align-self: center;
  font-size: var(--mm); letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(var(--c-cream-rgb), 0.5);
  padding: 0.5em 1.2em; border: 1px solid rgba(var(--c-cream-rgb), 0.1);
  border-radius: 0.3rem; transition: all 0.6s var(--f-cubic);
  &:hover { color: var(--c-cream); border-color: rgba(var(--c-cream-rgb), 0.25); background: rgba(var(--c-cream-rgb),0.04); }
  @media (max-width: 1024px) { display: none; }
`;
const MenuBtn = styled.button`
  grid-column: 11 / 13; align-self: center;
  font-size: var(--mm); letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(var(--c-cream-rgb), 0.5);
  padding: 0.5em 1.2em; border: 1px solid rgba(var(--c-cream-rgb), 0.1);
  border-radius: 0.3rem; font-family: inherit;
  transition: all 0.6s var(--f-cubic);
  &:hover { color: var(--c-cream); border-color: rgba(var(--c-cream-rgb), 0.25); }
  @media (max-width: 1024px) { grid-column: 5 / 7; }
`;

export default function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true }); h();
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <Header $s={s}>
      <W>
        <Logo href="/">
          <span>Montaigne</span>
          <span className="the">Design</span>
        </Logo>
        <NavBtn href="/#projects" style={{ gridColumn: "5 / 7" }}>Projects</NavBtn>
        <Sep />
        <NavBtn href="/#journal" style={{ gridColumn: "7 / 9" }}>Journal</NavBtn>
        <MenuBtn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          Inquire
        </MenuBtn>
      </W>
    </Header>
  );
}
