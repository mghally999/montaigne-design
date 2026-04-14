"use client";
import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  mode: "dark",
  bg: "#151415",
  bgAlt: "#1e1d1e",
  fg: "#F1EADE",
  fgMuted: "rgba(241,234,222,0.45)",
  fgDim: "rgba(241,234,222,0.15)",
  gold: "#C9A96E",
  brown: "#7B5136",
  cream: "#F1EADE",
  green: "#9FAF9B",
  border: "rgba(241,234,222,0.08)",
  cardBg: "rgba(241,234,222,0.03)",
  navGrad: "rgba(123,81,54,0.4)",
};

export const lightTheme = {
  mode: "light",
  bg: "#F5F2EC",
  bgAlt: "#FFFDF8",
  fg: "#151415",
  fgMuted: "rgba(21,20,21,0.5)",
  fgDim: "rgba(21,20,21,0.12)",
  gold: "#C9A96E",
  brown: "#7B5136",
  cream: "#F1EADE",
  green: "#6B8068",
  border: "rgba(21,20,21,0.08)",
  cardBg: "rgba(255,255,255,0.6)",
  navGrad: "rgba(241,234,222,0.7)",
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --f-heading: 'Cormorant Garamond', Georgia, serif;
    --f-body: 'Cormorant Garamond', Georgia, serif;
    --ease: cubic-bezier(0.35,0.35,0,1);
    --ease-in: cubic-bezier(0.69,0,0,1);
  }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--f-body);
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.fg};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
  button { background: none; border: none; font-family: inherit; color: inherit; cursor: pointer; }
  img { max-width: 100%; display: block; }
  input, textarea { font-family: inherit; }
  ::selection { background: ${({ theme }) => theme.gold}40; }
`;
