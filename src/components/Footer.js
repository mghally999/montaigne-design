"use client";
import Link from "next/link";
import styled from "styled-components";
import { company } from "@/data/company";

const Foot = styled.footer`padding: clamp(80px,10vw,140px) 40px 24px;`;
const Links = styled.div`display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 60px;`;
const FLink = styled(Link)`
  font-size: clamp(34px,6vw,64px); font-weight: 300; font-style: italic;
  color: ${p => p.theme.fgDim}; transition: color 0.5s; text-decoration: none;
  &:hover { color: ${p => p.theme.fg}; }
`;
const Bottom = styled.div`
  border-top: 1px solid ${p => p.theme.border}; padding-top: 16px;
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;
  font-size: 12px; color: ${p => p.theme.fgDim};
`;

export default function Footer() {
  return (
    <Foot>
      <Links>
        {[["Projects","/projects"],["About","/about"],["Journal","/journal"],["Contact","/contact"]].map(([l,h]) => (
          <FLink key={h} href={h}>{l}</FLink>
        ))}
      </Links>
      <Bottom>
        <span>&copy; {new Date().getFullYear()} {company.legal}</span>
        <span style={{ fontStyle: "italic" }}>{company.offices.map(o => o.city).join(" · ")}</span>
      </Bottom>
    </Foot>
  );
}
