"use client";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme, lightTheme } from "@/lib/theme";
import Nav from "@/components/Nav";
import NavOverlay from "@/components/NavOverlay";
import CursorTrail from "@/components/CursorTrail";

export default function LayoutClient({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CursorTrail />
      <Nav onOpenMenu={() => setMenuOpen(true)} onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>{children}</main>
    </ThemeProvider>
  );
}
