"use client";
import Link from "next/link";
import styled from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const Hero = styled.section`padding: clamp(140px,18vw,240px) 40px clamp(60px,8vw,120px); text-align: center;`;
const Big = styled.div`font-size: clamp(60px,12vw,160px); font-weight: 300; font-style: italic; line-height: 0.82;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(12, 1fr); gap: 12px; padding: 0 40px 100px;`;
const layouts = [{c:"1/6",ar:"16/10"},{c:"6/10",ar:"4/5"},{c:"10/13",ar:"3/4"},{c:"1/5",ar:"3/4"},{c:"5/9",ar:"16/10"},{c:"9/13",ar:"4/5"}];
const Card = styled(Link)`
  grid-column: ${p=>p.$c}; position: relative; overflow: hidden; border-radius: 6px; text-decoration: none; color: inherit;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); }
  &:hover img { transform: scale(1.06); }
`;
const Ov = styled.div`position: absolute; inset: 0; background: linear-gradient(transparent 40%, ${p=>p.theme.bg}d9 100%);`;
const Info = styled.div`position: absolute; bottom: 16px; left: 20px; z-index: 2;`;

export default function ProjectsClient() {
  return <>
    <Hero>
      <ScrollReveal><Big><SplitText>All</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.15}><Big><SplitText delay={0.2}>Projects</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.3}><p style={{ marginTop: 24, fontSize: 16, opacity: 0.4, maxWidth: 500, margin: "24px auto 0" }}>Over 150 projects completed across three continents. Here is a selection of our most recent work.</p></ScrollReveal>
    </Hero>
    <Grid>
      {projects.map((p, i) => {
        const l = layouts[i % layouts.length];
        return (
          <ScrollReveal key={p.slug} delay={i * 0.06} style={{ gridColumn: l.c }}>
            <Card href={`/projects/${p.slug}`} $c={l.c}>
              <div style={{ aspectRatio: l.ar, overflow: "hidden" }}>
                <img src={p.thumb} alt={p.title} />
              </div>
              <Ov />
              <Info>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4 }}>{p.category} · {p.year}</div>
                <div style={{ fontSize: 22, fontWeight: 300, marginTop: 2 }}>{p.title}</div>
                <div style={{ fontSize: 13, opacity: 0.35, marginTop: 2 }}>{p.subtitle}</div>
              </Info>
            </Card>
          </ScrollReveal>
        );
      })}
    </Grid>
    <Footer />
  </>;
}
