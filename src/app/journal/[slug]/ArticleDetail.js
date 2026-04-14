"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { getArticle, articles } from "@/data/journal";

const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const Hero = styled.section`position: relative; min-height: 60vh; overflow: hidden; display: grid; place-items: end center; padding-bottom: 60px;`;
const HeroBg = styled.div`position: absolute; inset: -10%; background: url(${p => p.$src}) center/cover;`;
const Ov = styled.div`position: absolute; inset: 0; z-index: 1; background: linear-gradient(transparent 20%, ${p => p.theme.bg} 100%);`;
const Title = styled.div`font-size: clamp(36px,7vw,80px); font-weight: 300; font-style: italic; line-height: 0.9;`;
const Back = styled(Link)`display: inline-block; padding: 40px; font-size: 14px; color: ${p => p.theme.fgMuted}; letter-spacing: 0.15em; text-decoration: none; &:hover { color: ${p => p.theme.fg}; }`;
const Body = styled.article`
  max-width: 680px; margin: 0 auto; padding: 0 40px 80px;
  & p { font-size: 18px; line-height: 2; color: ${p => p.theme.fgMuted}; margin-bottom: 1.8em; }
  & p:first-child::first-letter { font-size: 3.5em; float: left; line-height: 0.78; margin-right: 10px; font-weight: 300; color: ${p => p.theme.fg}; }
`;
const NextArticle = styled.section`text-align: center; padding: clamp(60px,10vw,120px) 40px;`;
const NextLink = styled(Link)`font-size: clamp(28px,5vw,56px); font-weight: 300; font-style: italic; color: ${p => p.theme.fgMuted}; text-decoration: none; transition: color 0.5s; &:hover { color: ${p => p.theme.fg}; }`;

export default function ArticleDetail({ slug }) {
  const a = getArticle(slug);
  const [heroP, setHeroP] = useState(0);
  useEffect(() => { let raf; const t = () => { setHeroP(cl(scrollY / (innerHeight || 900), 0, 1)); raf = requestAnimationFrame(t); }; raf = requestAnimationFrame(t); return () => cancelAnimationFrame(raf); }, []);
  if (!a) return <div style={{ padding: "200px 40px", textAlign: "center" }}>Article not found. <Link href="/journal">Back to journal</Link></div>;

  const nextIdx = (articles.findIndex(x => x.slug === slug) + 1) % articles.length;
  const next = articles[nextIdx];

  return <>
    <Hero>
      <HeroBg $src={a.hero} style={{ transform: `scale(${1 + heroP * 0.15})` }} />
      <Ov />
      <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.35, marginBottom: 16 }}>{a.category} · {a.date} · {a.readTime}</div>
        <Title><SplitText delay={0.2}>{a.title}</SplitText></Title>
        <div style={{ fontSize: 16, fontStyle: "italic", opacity: 0.35, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>{a.subtitle}</div>
      </div>
    </Hero>
    <Back href="/journal">← ALL ARTICLES</Back>
    <Body>
      {a.body.map((p, i) => <ScrollReveal key={i} delay={i * 0.05}><p>{p}</p></ScrollReveal>)}
    </Body>
    <NextArticle>
      <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.25, marginBottom: 16 }}>NEXT ARTICLE</div>
      <NextLink href={`/journal/${next.slug}`}>{next.title}</NextLink>
    </NextArticle>
    <Footer />
  </>;
}
