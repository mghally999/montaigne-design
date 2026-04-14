"use client";
import React from "react";
import { ThemeProvider as SCP, createGlobalStyle } from "styled-components";

export const theme = {
  black: "#151415",
  blackRgb: "21,20,21",
  cream: "#F1EADE",
  creamRgb: "241,234,222",
  brown: "#7B5136",
  brownRgb: "123,81,54",
  gold: "#C9A96E",
  goldRgb: "201,169,110",
  stone: "#242324",
  stoneRgb: "36,35,36",
  grey: "#3F383C",
  greyRgb: "63,56,60",
  white: "#FFFFFF",
  whiteRgb: "255,255,255",
  stroke: "#9FAF9B",
  strokeRgb: "159,175,155",
  /* Obsidian's exact cubic-bezier curves */
  cubic: "cubic-bezier(0.35,0.35,0,1)",
  cubicIn: "cubic-bezier(0.69,0,0,1)",
  fast: "cubic-bezier(0.2,0.75,0.35,1)",
  smooth: "cubic-bezier(0.5,0,0.3,1)",
  /* Obsidian's modular type step */
  typeStep: 1.25,
  fontT1: "'Cormorant Garamond','Georgia',serif",
  fontT2: "'Cormorant Garamond','Georgia',serif",
  fontB: "'Cormorant Garamond','Georgia',serif",
};

export type Theme = typeof theme;

const G = createGlobalStyle<{ theme: Theme }>`
  @property --progress { syntax: "<number>"; inherits: true; initial-value: 0; }
  @property --spotlight-angle { syntax: "<number>"; inherits: true; initial-value: 0; }
  @property --spotlight-distance { syntax: "<number>"; inherits: true; initial-value: 0; }

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  :root {
    --type-step: 1.25;
    --p: 1rem;
    --m: calc(var(--p) / var(--type-step));
    --mm: calc(var(--m) / var(--type-step));
    --h6: calc(var(--p) * var(--type-step));
    --h5: calc(var(--h6) * var(--type-step));
    --h4: calc(var(--h5) * var(--type-step));
    --h3: calc(var(--h4) * var(--type-step));
    --h2: calc(var(--h3) * var(--type-step));
    --h1: calc(var(--h2) * var(--type-step));
    --large: max(calc(var(--h1) * var(--type-step) * var(--type-step)), 12.5vw);
    --g-columns: 12;
    --g-gap: var(--p);
    --g-margin: calc(var(--g-gap) * 2);
    --c-black: ${(p) => p.theme.black};
    --c-black-rgb: ${(p) => p.theme.blackRgb};
    --c-cream: ${(p) => p.theme.cream};
    --c-cream-rgb: ${(p) => p.theme.creamRgb};
    --c-brown: ${(p) => p.theme.brown};
    --c-brown-rgb: ${(p) => p.theme.brownRgb};
    --c-gold: ${(p) => p.theme.gold};
    --c-stroke: ${(p) => p.theme.stroke};
    --f-cubic: ${(p) => p.theme.cubic};
    --f-cubicIn: ${(p) => p.theme.cubicIn};
    --f-fast: ${(p) => p.theme.fast};
    @media (max-width: 1024px) { --g-columns: 6; --g-margin: var(--g-gap); --large: var(--h1); }
  }

  html {
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-anchor: none;
    scroll-behavior: auto;
    @media (min-width: 1024px) and (min-height: 512px) { font-size: 20px; }
    @media (min-width: 1600px) and (min-height: 800px) { font-size: 22px; }
    @media (min-width: 1920px) and (min-height: 960px) { font-size: 24px; }
  }

  body {
    background: var(--c-black);
    color: var(--c-cream);
    font-family: ${(p) => p.theme.fontB};
    font-weight: 400;
    line-height: 1.3;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 2px; }
  ::-webkit-scrollbar-thumb { background: rgba(${(p) =>
    p.theme.goldRgb}, 0.2); }
  img { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  button { background: transparent; border: none; cursor: pointer; font-family: inherit; color: inherit; }

  /* ═══ GRID (Obsidian's .-w grid system) ═══ */
  .grid-w {
    column-gap: var(--g-gap);
    display: grid;
    grid-template-columns: repeat(var(--g-columns), 1fr);
    margin: 0 var(--g-margin);
    position: relative;
  }
  .grid-w > * {
    grid-column-start: var(--left, 1);
    grid-column-end: calc(var(--left, 1) + var(--width, 1));
    grid-row-start: var(--top, auto);
  }

  /* ═══ TYPOGRAPHY ═══ */
  .t-large { font-family: ${(p) =>
    p.theme
      .fontT2}; font-size: var(--large); line-height: 0.85; font-weight: 300; font-style: italic; }
  .t-h0 { font-family: ${(p) =>
    p.theme.fontT1}; font-size: var(--h1); line-height: 0.9; font-weight: 300; }
  .t-h1 { font-family: ${(p) =>
    p.theme
      .fontT1}; font-size: var(--h2); line-height: 0.95; font-weight: 300; }
  .t-h2 { font-family: ${(p) =>
    p.theme
      .fontT1}; font-size: var(--h3); line-height: 1.05; font-weight: 300; }
  .t-h3 { font-family: ${(p) =>
    p.theme
      .fontT1}; font-size: var(--h4); line-height: 1.15; font-weight: 300; }
  .t-p { font-size: var(--p); line-height: 1.5; }
  .t-m { font-size: var(--m); line-height: 1.5; }
  .t-mm { font-size: var(--mm); line-height: 1.5; letter-spacing: 0.15em; text-transform: uppercase; }
  .t-up { text-transform: uppercase; letter-spacing: 0.2em; }

  /* ═══ SPLIT TEXT ANIMATIONS (Obsidian's .-splitted system) ═══ */
  .-splitted { display: flex; flex-wrap: wrap; }
  .-s-line {
    display: flex;
    clip-path: inset(0 0 100% 0);
    transform: translateY(3em);
    will-change: transform, clip-path;
  }
  .-s-char {
    display: inline-block;
    opacity: 0;
    transform: translateY(1.2em) scale(1.4) skew(12deg, 25deg);
    filter: blur(0.04em);
    will-change: transform, opacity, filter;
  }

  /* When in view, animate chars */
  html.-loaded .-splitted.-inview .-s-line {
    clip-path: inset(-10% 0 -10% 0);
    transform: translateY(0);
    transition: transform 1.5s var(--f-cubic), clip-path 1.5s var(--f-cubic);
    transition-delay: calc(var(--line-index, 0) * 75ms);
  }
  html.-loaded .t-large .-splitted.-inview .-s-char,
  html.-loaded .-splitted.-inview .-s-char {
    opacity: 1;
    transform: translateY(0) scale(1) skew(0, 0);
    filter: blur(0);
    transition: opacity 1.2s var(--f-fast), transform 1.2s var(--f-fast), filter 1.2s var(--f-fast);
    transition-delay: calc(var(--char-random, 0) * 65ms);
  }

  /* ═══ SCROLL REVEAL ANIMATIONS ═══ */
  .-a-to-top {
    opacity: 0;
    transform: translateY(var(--h5)) skewY(1.5deg);
    transition: transform 1.5s var(--f-cubic), opacity 1.5s var(--f-cubic);
    transition-delay: calc(var(--l-delay, 0) * 0.15s);
  }
  html.-loaded .-a-to-top.-inview {
    opacity: 1;
    transform: translateY(0) skewY(0);
  }

  /* ═══ BUTTON (Obsidian's .button component) ═══ */
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.7em 1.8em;
    border: 1px solid rgba(${(p) => p.theme.creamRgb}, 0.15);
    border-radius: 0.3rem;
    font-size: var(--mm);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--c-cream);
    transition: all 0.6s var(--f-cubic);
    cursor: pointer;
    width: 100%;
    text-align: center;
    &:hover {
      background: rgba(${(p) => p.theme.creamRgb}, 0.06);
      border-color: rgba(${(p) => p.theme.creamRgb}, 0.3);
    }
    &.-big { padding: 1em 2em; }
    &.-reverse { border-color: rgba(${(p) => p.theme.creamRgb}, 0.08); }
  }
  .button.-dark {
    border-color: rgba(${(p) => p.theme.blackRgb}, 0.15);
    color: var(--c-black);
    &:hover {
      background: var(--c-black);
      color: var(--c-cream);
    }
  }

  /* ═══ LAZY LOAD ═══ */
  .lazyLoad { opacity: 0; transition: opacity 1.2s var(--f-cubic); }
  .lazyLoad.-loaded { opacity: 1; }

  /* ═══ FIT IMAGE ═══ */
  .-fit { overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center; }
  .-fit img { height: 100%; object-fit: cover; position: absolute; width: 100%; }
`;

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SCP theme={theme}>
      <G theme={theme} />
      {children}
    </SCP>
  );
}
