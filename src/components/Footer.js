"use client";
import Link from "next/link";
import styled from "styled-components";
import { company } from "@/data/company";

const Foot = styled.footer`
  position: relative; overflow: hidden;
  padding: clamp(60px,10vw,160px) 40px 32px;
  background: ${p => p.theme.mode === "dark" ? p.theme.bg : "#F1EADE"};
  @media(max-width:768px) { padding: clamp(40px,8vw,80px) 20px 24px; }
`;
const SvgPath = styled.svg`position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.12;`;
const Content = styled.div`position: relative; z-index: 2;`;
const TopRow = styled.div`
  display: grid; grid-template-columns: 1fr auto 1fr; gap: 40px; margin-bottom: 60px; align-items: start;
  @media(max-width:900px) { grid-template-columns: 1fr; gap: 32px; }
`;
const LeftCol = styled.div``;
const TagLine = styled.p`font-size: 15px; line-height: 1.6; color: ${p => p.theme.fgMuted}; font-style: italic;
  @media(max-width:480px) { font-size: 14px; }
`;
const NavCol = styled.div`display: flex; flex-direction: column; gap: 4px;`;
const FLink = styled(Link)`
  display: flex; align-items: baseline; gap: 8px;
  font-size: clamp(32px,5vw,72px); font-weight: 300; font-style: italic;
  color: ${p => p.theme.fg}; transition: all 0.5s var(--ease); text-decoration: none;
  &::before { content: "+"; font-size: 12px; font-style: normal; color: ${p => p.theme.gold}; opacity: 0.5; }
  &:hover { letter-spacing: 0.02em; color: ${p => p.theme.gold}; }
`;
const RightCol = styled.div`text-align: right;
  @media(max-width:900px) { text-align: left; }
`;
const Bottom = styled.div`
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  padding-top: 20px; border-top: 1px solid ${p => p.theme.border};
  font-size: 12px; color: ${p => p.theme.fgMuted};
  @media(max-width:480px) { font-size: 11px; flex-direction: column; gap: 8px; }
`;
const Credit = styled.div`max-width: 340px; font-size: 12px; line-height: 1.6; color: ${p => p.theme.fgMuted};
  @media(max-width:480px) { max-width: 100%; }
`;

export default function Footer() {
  return (
    <Foot>
      <SvgPath viewBox="0 0 1440 800" preserveAspectRatio="none">
        <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C9A96E" /><stop offset="1" stopColor="#7B5136" stopOpacity="0.3" /></linearGradient></defs>
        <path fill="none" stroke="url(#fg)" strokeWidth="1" d="M100,700C300,200,500,600,700,300S1100,500,1300,100" vectorEffect="non-scaling-stroke" />
      </SvgPath>
      <Content>
        <TopRow>
          <LeftCol>
            <img src="/logo.jpg" alt="Montaigne Design" style={{ width: 50, borderRadius: 6, marginBottom: 14, opacity: 0.7 }} />
            <TagLine>Independent practice operating across locations.</TagLine>
          </LeftCol>
          <NavCol>
            {[["Projects","/projects"],["About","/about"],["Journal","/journal"],["Contact","/contact"]].map(([l,h]) => (
              <FLink key={h} href={h}>{l}</FLink>
            ))}
          </NavCol>
          <RightCol>
            <TagLine>Operating Across Locations.</TagLine>
            <div style={{ fontSize: 12, opacity: 0.3, marginTop: 8 }}>No Social Media</div>
          </RightCol>
        </TopRow>
        <Bottom>
          <span>&copy; {new Date().getFullYear()} {company.legal}</span>
          <Credit>This website is an expression of the Montaigne Design vision.</Credit>
          <span style={{ fontStyle: "italic" }}>{company.offices.map(o => o.city).join(" · ")}</span>
        </Bottom>
      </Content>
    </Foot>
  );
}
