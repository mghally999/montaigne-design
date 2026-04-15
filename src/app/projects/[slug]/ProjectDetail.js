"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSequence from "@/components/ImageSequence";
import Footer from "@/components/Footer";
import { getProject, projects } from "@/data/projects";

const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const Hero = styled.section`position: relative; min-height: 75vh; overflow: hidden; display: grid; place-items: end center; padding-bottom: 60px;
  @media(max-width:768px) { min-height: 60vh; padding-bottom: 40px; }`;
const HeroBg = styled.div`position: absolute; inset: -10%; background: url(${p => p.$src}) center/cover;`;
const Ov = styled.div`position: absolute; inset: 0; z-index: 1; background: linear-gradient(transparent 30%, ${p => p.theme.bg} 100%);`;
const Title = styled.div`font-size: clamp(32px,7vw,100px); font-weight: 300; font-style: italic; line-height: 0.85;`;
const Meta = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 20px; padding: 48px 40px; max-width: 900px; margin: 0 auto;
  @media(max-width:768px) { padding: 32px 20px; grid-template-columns: repeat(2, 1fr); }`;
const MetaItem = styled.div`& span:first-child { display: block; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: ${p => p.theme.fgMuted}; margin-bottom: 4px; }
  & span:last-child { font-size: 17px; font-weight: 300; }
  @media(max-width:480px) { & span:last-child { font-size: 15px; } }`;
const Body = styled.div`max-width: 700px; margin: 0 auto; padding: 0 40px 60px; font-size: 17px; line-height: 1.8; color: ${p => p.theme.fgMuted};
  & p { margin-bottom: 1.5em; } & p:first-child::first-letter { font-size: 3em; float: left; line-height: 0.8; margin-right: 8px; font-weight: 300; color: ${p => p.theme.fg}; }
  @media(max-width:768px) { padding: 0 20px 40px; font-size: 16px; }`;
const Gallery = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 8px; padding: 0 40px 60px;
  @media(max-width:768px) { padding: 0 16px 40px; grid-template-columns: 1fr 1fr; gap: 6px; }
  @media(max-width:480px) { grid-template-columns: 1fr; }`;
const GalleryImg = styled.div`overflow: hidden; border-radius: 6px; aspect-ratio: ${p => p.$ar};
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); &:hover { transform: scale(1.04); } }`;
const BackLink = styled(Link)`display: inline-block; padding: 32px 40px; font-size: 14px; color: ${p => p.theme.fgMuted}; letter-spacing: 0.15em; text-decoration: none;
  &:hover { color: ${p => p.theme.fg}; }
  @media(max-width:768px) { padding: 24px 20px; font-size: 13px; }`;
const NextProject = styled.section`text-align: center; padding: clamp(60px,10vw,160px) 40px;
  @media(max-width:768px) { padding: clamp(40px,8vw,80px) 20px; }`;
const NextLink = styled(Link)`font-size: clamp(28px,5vw,72px); font-weight: 300; font-style: italic; color: ${p => p.theme.fgMuted}; text-decoration: none; transition: color 0.5s;
  &:hover { color: ${p => p.theme.fg}; }`;

export default function ProjectDetail({ slug }) {
  const p = getProject(slug);
  const [heroP, setHeroP] = useState(0);
  useEffect(() => { let raf; const t = () => { setHeroP(cl(scrollY / (innerHeight || 900), 0, 1)); raf = requestAnimationFrame(t); }; raf = requestAnimationFrame(t); return () => cancelAnimationFrame(raf); }, []);
  if (!p) return <div style={{ padding: "200px 40px", textAlign: "center" }}>Project not found. <Link href="/projects">Back</Link></div>;
  const nextIdx = (projects.findIndex(x => x.slug === slug) + 1) % projects.length;
  const next = projects[nextIdx];
  return <>
    <Hero><HeroBg $src={p.hero} style={{ transform: `scale(${1 + heroP * 0.15})` }} /><Ov />
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", transform: `translateY(${heroP * -40}px)`, opacity: 1 - heroP * 0.5, padding: "0 20px" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.35, marginBottom: 14 }}>{p.category} · {p.year}</div>
        <Title><SplitText delay={0.2}>{p.title}</SplitText></Title>
        <div style={{ fontSize: 16, fontStyle: "italic", opacity: 0.4, marginTop: 10 }}>{p.subtitle}</div>
      </div>
    </Hero>
    <BackLink href="/projects">← ALL PROJECTS</BackLink>
    <Meta>{[["Location",p.location],["Area",p.area],["Duration",p.duration],["Year",p.year]].map(([l,v])=>(
      <ScrollReveal key={l}><MetaItem><span>{l}</span><span>{v}</span></MetaItem></ScrollReveal>
    ))}</Meta>
    <ScrollReveal><Body><p>{p.longDescription}</p></Body></ScrollReveal>
    <ImageSequence images={p.images} names={p.images.map((_,i)=>`${p.title} — View ${i+1}`)} />
    <Gallery>{p.images.map((img,i)=>(
      <ScrollReveal key={i} delay={i*0.05}><GalleryImg $ar={i%3===0?"16/10":i%3===1?"1/1":"3/4"}>
        <img src={img} alt={`${p.title} — ${i+1}`} loading="lazy" />
      </GalleryImg></ScrollReveal>
    ))}</Gallery>
    <NextProject>
      <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.25, marginBottom: 14 }}>NEXT PROJECT</div>
      <NextLink href={`/projects/${next.slug}`}>{next.title}</NextLink>
    </NextProject>
    <Footer />
  </>;
}
