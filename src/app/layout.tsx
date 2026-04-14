import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Registry from "@/lib/registry";
import ThemeProvider from "@/lib/theme";
import Nav from "@/components/Nav";

const font = Cormorant_Garamond({
  subsets: ["latin"], weight: ["300","400","500","600","700"],
  style: ["normal","italic"], display: "swap",
});

export const metadata: Metadata = {
  title: "Montaigne Design | Luxury Interior Design Dubai",
  description: "Award-winning luxury interior design studio in Dubai, Shanghai, and Paris. Hospitality, residential, and bespoke projects since 2004.",
  keywords: ["luxury interior design","Dubai","Montaigne Design","Cathy Wang","hospitality design"],
  openGraph: { title: "Montaigne Design", description: "Extraordinary environments since 2004.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.className}>
      <body><Registry><ThemeProvider><Nav />{children}</ThemeProvider></Registry></body>
    </html>
  );
}
