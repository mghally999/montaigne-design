"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSequence from "@/components/ImageSequence";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { articles } from "@/data/journal";
import { company } from "@/data/company";

const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const allImgs = projects.flatMap(p => p.images).slice(0, 7);
const allNames = projects.map(p => p.title).slice(0, 7);

const Hero = styled.section`position: relative; min-height: 115vh; overflow: hidden; display: grid; place-items: center;`;
const HeroBg = styled.div`position: absolute; inset: -10%; background: url(${p => p.$src}) center/cover;`;
const Overlay = styled.div`position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, ${p => p.theme.bg}40 0%, transparent 40%, ${p => p.theme.bg}e6 88%, ${p => p.theme.bg} 100%);`;
const HeroText = styled.div`position: relative; z-index: 10; text-align: center; padding: 0 40px;`;
const BigText = styled.div`font-size: clamp(55px,12vw,160px); line-height: 0.8; font-weight: 300; font-style: italic;`;
const SubText = styled.div`margin-top: 48px; font-size: 17px; font-weight: 300; line-height: 1.75; color: ${p => p.theme.fgMuted};`;
const CTA = styled(Link)`
  display: inline-block; margin-top: 24px; padding: 18px 52px; background: ${p => p.theme.fg};
  color: ${p => p.theme.bg}; border-radius: 4px; font-size: 11px; letter-spacing: 0.3em;
  text-transform: uppercase; font-weight: 500; position: relative; transition: all 0.5s; text-decoration: none;
  &:hover { opacity: 0.9; transform: scale(1.02); }
`;
const Dot = styled.span`position: absolute; bottom: 7px; right: 7px; width: 7px; height: 7px; border-radius: 50%; background: ${p => p.theme.bg};`;
const SectionTitle = styled.div`text-align: center; padding: clamp(100px,16vw,220px) 40px clamp(50px,8vw,100px);`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; padding: 0 40px 80px;`;
const Card = styled(Link)`
  position: relative; overflow: hidden; border-radius: 6px; aspect-ratio: ${p => p.$ar || "4/3"};
  text-decoration: none; color: inherit;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); }
  &:hover img { transform: scale(1.06); }
`;
const CardOverlay = styled.div`position: absolute; inset: 0; background: linear-gradient(transparent 40%, ${p => p.theme.bg}d9 100%);`;
const CardInfo = styled.div`position: absolute; bottom: 16px; left: 20px; z-index: 2;`;
const CardCat = styled.div`font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: ${p => p.theme.fgMuted};`;
const CardTitle = styled.div`font-size: 22px; font-weight: 300; margin-top: 2px;`;
const CreamSection = styled.section`background: ${p => p.theme.mode === "dark" ? "#F1EADE" : "#fff"}; color: #151415; position: relative; z-index: 10; padding: clamp(100px,16vw,220px) 40px;`;
const FeatureGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin-top: 60px;`;
const FeatureCard = styled.div`
  background: rgba(255,255,255,0.4); backdrop-filter: blur(16px); border-radius: 18px;
  padding: 52px 22px 22px; position: relative; border: 0.5px solid rgba(21,20,21,0.03);
  transition: transform 0.5s, box-shadow 0.5s;
  &:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(21,20,21,0.06); }
`;
const NumBadge = styled.div`
  position: absolute; top: 14px; right: 16px; width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid rgba(21,20,21,0.07); display: grid; place-items: center; font-size: 15px; font-weight: 300;
`;
const JournalGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; max-width: 900px; margin: 0 auto; padding: 0 40px 80px;`;
const JCard = styled(Link)`
  padding: 20px; border: 1px solid ${p => p.theme.border}; border-radius: 6px; text-decoration: none; color: inherit;
  transition: border-color 0.4s, transform 0.4s;
  &:hover { border-color: ${p => p.theme.fgMuted}; transform: translateY(-3px); }
`;

const SideImg = styled.div`
  position: absolute; ${p => p.$side}: 0; top: ${p => p.$top}; width: 15%; max-width: 230px;
  z-index: 5; border-radius: 4px; overflow: hidden;
`;

export default function HomePage() {
  const [heroP, setHeroP] = useState(0);
  useEffect(() => {
    let raf;
    const t = () => { setHeroP(cl(scrollY / (innerHeight || 900), 0, 1)); raf = requestAnimationFrame(t); };
    raf = requestAnimationFrame(t); return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <Hero>
        <HeroBg $src={projects[0].hero} style={{ transform: `scale(${1 + heroP * 0.2})` }} />
        <Overlay />
        <SideImg $side="left" $top="28%" style={{ transform: `translateY(${heroP * 120}px) rotate(${-12 + heroP * 35}deg)`, transformOrigin: "-120% 50%" }}>
          <img src={projects[2].thumb} alt="" style={{ width: "100%", aspectRatio: "22/30", objectFit: "cover" }} />
          <span style={{ position: "absolute", top: 14, left: 0, right: 0, textAlign: "center", fontSize: 18, fontWeight: 300, fontStyle: "italic" }}>P.</span>
        </SideImg>
        <SideImg $side="right" $top="28%" style={{ transform: `translateY(${heroP * 120}px) rotate(${12 - heroP * 35}deg)`, transformOrigin: "220% 50%" }}>
          <img src={projects[3].thumb} alt="" style={{ width: "100%", aspectRatio: "22/30", objectFit: "cover" }} />
          <span style={{ position: "absolute", top: 14, left: 0, right: 0, textAlign: "center", fontSize: 18, fontWeight: 300, fontStyle: "italic" }}>I.</span>
        </SideImg>
        <HeroText style={{ transform: `translateY(${heroP * -50}px)`, opacity: 1 - heroP * 0.6 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", opacity: 0.22, marginBottom: 30 }}><SplitText>{company.tagline}</SplitText></div>
          <BigText><SplitText delay={0.2}>Known</SplitText></BigText>
          <BigText style={{ marginTop: 4 }}><SplitText delay={0.5}>First</SplitText></BigText>
          <SubText><div>Commitment</div><div style={{ marginLeft: "2.5em" }}>Precedes</div><div style={{ marginLeft: "1em" }}>Entry</div></SubText>
          <CTA href="/projects">SEEK ADMISSION<Dot /></CTA>
        </HeroText>
      </Hero>

      <section>
        <SectionTitle>
          <ScrollReveal><BigText><SplitText>Explore</SplitText></BigText></ScrollReveal>
          <ScrollReveal delay={0.15}><BigText><SplitText delay={0.2}>Places</SplitText></BigText></ScrollReveal>
          <ScrollReveal delay={0.35}>
            <SubText><div style={{ marginLeft: "3.5em" }}>Not</div><div style={{ marginLeft: "6em" }}>Everything</div><div style={{ marginLeft: "2em" }}>is Visible</div></SubText>
          </ScrollReveal>
        </SectionTitle>
      </section>

      <ImageSequence images={allImgs} names={allNames} />

      <CreamSection>
        <ScrollReveal>
          <div style={{ fontSize: "clamp(40px,8vw,96px)", fontWeight: 300, lineHeight: 1.06, maxWidth: 740 }}>
            <span style={{ display: "block" }}>You Won&apos;t Find</span>
            <span style={{ display: "block", marginLeft: "2em" }}>Them</span>
            <span style={{ display: "block" }}>on a Map</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p style={{ marginTop: 20, maxWidth: 500, fontSize: 14, lineHeight: 1.8, color: "rgba(21,20,21,0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            THESE PLACES AREN&apos;T BROADLY ANNOUNCED.
          </p>
        </ScrollReveal>
        <FeatureGrid>
          {company.services.slice(0, 5).map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <FeatureCard>
                <NumBadge>{i + 1}</NumBadge>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8, lineHeight: 1.4 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "rgba(21,20,21,0.35)", fontStyle: "italic" }}>{s.desc}</div>
              </FeatureCard>
            </ScrollReveal>
          ))}
        </FeatureGrid>
      </CreamSection>

      <section style={{ padding: "clamp(80px,12vw,180px) 0" }}>
        <SectionTitle style={{ padding: "0 40px clamp(40px,6vw,80px)" }}>
          <ScrollReveal><BigText style={{ fontSize: "clamp(50px,10vw,120px)" }}><SplitText>Selected</SplitText></BigText></ScrollReveal>
          <ScrollReveal delay={0.1}><BigText style={{ fontSize: "clamp(50px,10vw,120px)" }}><SplitText delay={0.15}>Projects</SplitText></BigText></ScrollReveal>
        </SectionTitle>
        <Grid>
          {projects.slice(0, 4).map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.08}>
              <Card href={`/projects/${p.slug}`} $ar={i % 3 === 0 ? "16/10" : "4/5"}>
                <img src={p.thumb} alt={p.title} />
                <CardOverlay />
                <CardInfo><CardCat>{p.category} · {p.year}</CardCat><CardTitle>{p.title}</CardTitle></CardInfo>
              </Card>
            </ScrollReveal>
          ))}
        </Grid>
      </section>

      <section style={{ padding: "0 0 clamp(80px,12vw,180px)" }}>
        <SectionTitle style={{ padding: "0 40px clamp(40px,6vw,60px)" }}>
          <ScrollReveal><BigText style={{ fontSize: "clamp(50px,10vw,120px)" }}><SplitText>Design</SplitText></BigText></ScrollReveal>
          <ScrollReveal delay={0.1}><BigText style={{ fontSize: "clamp(50px,10vw,120px)" }}><SplitText delay={0.15}>Thinking</SplitText></BigText></ScrollReveal>
        </SectionTitle>
        <JournalGrid>
          {articles.slice(0, 4).map((a, i) => (
            <ScrollReveal key={a.slug} delay={i * 0.06}>
              <JCard href={`/journal/${a.slug}`}>
                <CardCat>{a.category} · {a.date}</CardCat>
                <div style={{ fontSize: 20, fontWeight: 300, margin: "8px 0 6px" }}>{a.title}</div>
                <div style={{ fontSize: 13, opacity: 0.3, lineHeight: 1.6 }}>{a.excerpt.slice(0, 120)}…</div>
              </JCard>
            </ScrollReveal>
          ))}
        </JournalGrid>
      </section>

      <Footer />
    </>
  );
}
