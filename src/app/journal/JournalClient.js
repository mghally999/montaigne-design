"use client";
import Link from "next/link";
import styled from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { articles } from "@/data/journal";

const Hero = styled.section`padding: clamp(120px,18vw,280px) 40px clamp(40px,6vw,100px); text-align: center;
  @media(max-width:768px) { padding: clamp(100px,14vw,160px) 20px clamp(30px,4vw,60px); }`;
const Big = styled.div`font-size: clamp(44px,11vw,160px); font-weight: 300; font-style: italic; line-height: 0.82;`;
const Grid = styled.div`display: grid; grid-template-columns: 1fr; gap: 0; max-width: 900px; margin: 0 auto; padding: 0 40px 80px;
  @media(max-width:768px) { padding: 0 20px 60px; }`;
const Card = styled(Link)`
  display: grid; grid-template-columns: 1fr 1.5fr; gap: 28px; align-items: center;
  padding: 36px 0; border-bottom: 1px solid ${p => p.theme.border}; text-decoration: none; color: inherit;
  transition: opacity 0.5s; &:hover { opacity: 0.8; }
  @media(max-width:640px) { grid-template-columns: 1fr; gap: 16px; padding: 24px 0; }
`;
const ImgWrap = styled.div`overflow: hidden; border-radius: 6px; aspect-ratio: 16/10;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); }
  ${Card}:hover & img { transform: scale(1.04); }`;
const Cat = styled.div`font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: ${p => p.theme.fgMuted};`;
const Title = styled.div`font-size: clamp(20px,3vw,36px); font-weight: 300; margin: 8px 0;`;
const Excerpt = styled.p`font-size: 15px; color: ${p => p.theme.fgMuted}; line-height: 1.7;
  @media(max-width:768px) { font-size: 14px; }`;

export default function JournalClient() {
  return <>
    <Hero>
      <ScrollReveal><Big><SplitText>Design</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.15}><Big><SplitText delay={0.2}>Thinking</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.3}><p style={{ marginTop: 20, fontSize: 16, opacity: 0.4, maxWidth: 500, margin: "20px auto 0" }}>Essays on craft, philosophy, and the practice of making spaces that matter.</p></ScrollReveal>
    </Hero>
    <Grid>
      {articles.map((a, i) => (
        <ScrollReveal key={a.slug} delay={i * 0.08}>
          <Card href={`/journal/${a.slug}`}>
            <ImgWrap><img src={a.hero} alt={a.title} loading="lazy" /></ImgWrap>
            <div><Cat>{a.category} · {a.date}</Cat><Title>{a.title}</Title><Excerpt>{a.excerpt}</Excerpt>
              <span style={{ fontSize: 12, opacity: 0.3, fontStyle: "italic" }}>{a.readTime}</span></div>
          </Card>
        </ScrollReveal>
      ))}
    </Grid>
    <Footer />
  </>;
}
