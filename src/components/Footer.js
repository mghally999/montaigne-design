"use client";
import Link from "next/link";
import styled from "styled-components";
import { company } from "@/data/company";

const Foot = styled.footer`
  position: relative; overflow: hidden;
  padding: clamp(80px,12vw,160px) 40px 32px;
  background: ${p => p.theme.mode === "dark" ? p.theme.bg : "#F1EADE"};
`;
const SvgPath = styled.svg`
  position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.12;
`;
const Content = styled.div`position: relative; z-index: 2;`;
const TopRow = styled.div`
  display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 40px;
  margin-bottom: 80px;
`;
const LeftCol = styled.div`max-width: 280px;`;
const TagLine = styled.p`font-size: 16px; line-height: 1.6; color: ${p => p.theme.fgMuted}; font-style: italic;`;
const NavCol = styled.div`display: flex; flex-direction: column; gap: 8px;`;
const FLink = styled(Link)`
  display: flex; align-items: baseline; gap: 8px;
  font-size: clamp(40px,6vw,72px); font-weight: 300; font-style: italic;
  color: ${p => p.theme.fg}; transition: all 0.5s var(--ease); text-decoration: none;
  &::before { content: "+"; font-size: 14px; font-style: normal; color: ${p => p.theme.gold}; opacity: 0.5; }
  &:hover { letter-spacing: 0.02em; color: ${p => p.theme.gold}; }
`;
const RightCol = styled.div`text-align: right;`;
const NoSocial = styled.div`font-size: 13px; color: ${p => p.theme.fgMuted}; font-style: italic;`;
const Bottom = styled.div`
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px;
  padding-top: 24px; border-top: 1px solid ${p => p.theme.border};
  font-size: 13px; color: ${p => p.theme.fgMuted};
`;
const Credit = styled.div`max-width: 340px; font-size: 13px; line-height: 1.6; color: ${p => p.theme.fgMuted};`;

export default function Footer() {
  return (
    <Foot>
      <SvgPath viewBox="0 0 1440 800" preserveAspectRatio="none">
        <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C9A96E" /><stop offset="1" stopColor="#7B5136" stopOpacity="0.3" /></linearGradient></defs>
        <path fill="none" stroke="url(#fg)" strokeWidth="1" d="M100,700C300,200,500,600,700,300S1100,500,1300,100" vectorEffect="non-scaling-stroke" />
        <path fill="none" stroke="url(#fg)" strokeWidth="0.5" d="M200,750C500,400,800,650,1100,200" vectorEffect="non-scaling-stroke" />
      </SvgPath>
      <Content>
        <TopRow>
          <LeftCol>
            <img src="/logo.jpg" alt="Montaigne Design" style={{ width: 60, borderRadius: 6, marginBottom: 16, opacity: 0.7 }} />
            <TagLine>Independent practice operating across locations.</TagLine>
          </LeftCol>
          <NavCol>
            {[["Projects","/projects"],["About","/about"],["Journal","/journal"],["Contact","/contact"]].map(([l,h]) => (
              <FLink key={h} href={h}>{l}</FLink>
            ))}
          </NavCol>
          <RightCol>
            <div style={{ marginBottom: 16 }}>
              <TagLine>Operating<br/>Across<br/>Locations.</TagLine>
            </div>
            <NoSocial>No Social Media</NoSocial>
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
