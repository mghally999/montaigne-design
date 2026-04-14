import StyledComponentsRegistry from "@/lib/registry";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "Montaigne Design | Luxury Interior Design — Dubai · Shanghai · Paris",
  description: "Montaigne Design is an independent luxury interior design studio with offices in Dubai, Shanghai, and Paris. Over 150 projects completed across private residences, hospitality, and commercial spaces.",
  keywords: "interior design, luxury design, Dubai interior designer, Shanghai designer, Paris design studio, residential design, hospitality interiors",
  openGraph: {
    title: "Montaigne Design | Luxury Interior Design",
    description: "Independent interior design studio — Dubai · Shanghai · Paris. Over 150 projects, 12 awards, 20+ years of excellence.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <LayoutClient>{children}</LayoutClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
