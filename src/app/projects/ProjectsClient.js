"use client";
import Link from "next/link";
import styled from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const Hero = styled.section`padding: clamp(120px,16vw,240px) 40px clamp(40px,6vw,120px); text-align: center;
  @media(max-width:768px) { padding: clamp(100px,14vw,160px) 20px clamp(30px,4vw,60px); }`;
const Big = styled.div`font-size: clamp(44px,11vw,160px); font-weight: 300; font-style: italic; line-height: 0.82;`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(12, 1fr); gap: 10px; padding: 0 40px 80px;
  @media(max-width:900px) { grid-template-columns: repeat(6, 1fr); padding: 0 20px 60px; gap: 8px; }
  @media(max-width:640px) { grid-template-columns: 1fr 1fr; padding: 0 16px 40px; }
  @media(max-width:400px) { grid-template-columns: 1fr; }
`;
const layouts = [
  { c: "1/6", cm: "1/4", ar: "16/10" }, { c: "6/10", cm: "4/7", ar: "4/5" }, { c: "10/13", cm: "1/4", ar: "3/4" },
  { c: "1/5", cm: "4/7", ar: "3/4" }, { c: "5/9", cm: "1/4", ar: "16/10" }, { c: "9/13", cm: "4/7", ar: "4/5" },
];
const Card = styled(Link)`
  position: relative; overflow: hidden; border-radius: 8px; text-decoration: none; color: inherit;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); }
  &:hover img { transform: scale(1.06); }
`;
const Ov = styled.div`position: absolute; inset: 0; background: linear-gradient(transparent 35%, rgba(21,20,21,0.85) 100%); border-radius: 8px;`;
const Info = styled.div`position: absolute; bottom: 16px; left: 20px; z-index: 2;
  @media(max-width:480px) { bottom: 10px; left: 12px; }`;
const Cat = styled.div`font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(241,234,222,0.45);`;
const Title = styled.div`font-size: 22px; font-weight: 300; color: #F1EADE; margin-top: 3px;
  @media(max-width:480px) { font-size: 17px; }`;

export default function ProjectsClient() {
  return <>
    <Hero>
      <ScrollReveal><Big><SplitText>All</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.15}><Big><SplitText delay={0.2}>Projects</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.3}><p style={{ marginTop: 20, fontSize: 16, opacity: 0.4, maxWidth: 500, margin: "20px auto 0" }}>Over 150 projects completed across three continents.</p></ScrollReveal>
    </Hero>
    <Grid>
      {projects.map((p, i) => {
        const l = layouts[i % layouts.length];
        return (
          <ScrollReveal key={p.slug} delay={i * 0.06} style={{ gridColumn: undefined }}>
            <Card href={`/projects/${p.slug}`}>
              <div style={{ aspectRatio: l.ar, overflow: "hidden", borderRadius: 8 }}><img src={p.thumb} alt={p.title} /></div>
              <Ov /><Info><Cat>{p.category} · {p.year}</Cat><Title>{p.title}</Title>
                <div style={{ fontSize: 13, color: "rgba(241,234,222,0.35)", marginTop: 2 }}>{p.subtitle}</div>
              </Info>
            </Card>
          </ScrollReveal>
        );
      })}
    </Grid>
    <Footer />
  </>;
}
