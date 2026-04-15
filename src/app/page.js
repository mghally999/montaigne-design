"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
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
const floatAnim = keyframes`0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-20px) rotate(3deg)}`;

/* ─── HERO ─── */
const Hero = styled.section`position: relative; min-height: 120vh; overflow: hidden; display: grid; place-items: center;`;
const HeroBg = styled.div`position: absolute; inset: -10%; background: url(${p => p.$src}) center/cover; will-change: transform;`;
const HeroOverlay = styled.div`
  position: absolute; inset: 0; z-index: 1;
  background: ${p => p.theme.heroOverlay};
`;
const HeroContent = styled.div`position: relative; z-index: 10; text-align: center; padding: 0 40px; max-width: 1000px;`;
const HeroTag = styled.div`
  font-size: 13px; letter-spacing: 0.4em; text-transform: uppercase;
  color: ${p => p.theme.mode === "dark" ? "rgba(241,234,222,0.45)" : "rgba(241,234,222,0.6)"};
  margin-bottom: 36px;
`;
const BigTitle = styled.div`
  font-size: clamp(60px,13vw,170px); line-height: 0.82; font-weight: 300; font-style: italic;
  color: ${p => p.theme.mode === "dark" ? "#F1EADE" : "#F1EADE"};
  text-shadow: 0 2px 40px rgba(0,0,0,0.3);
`;
const SubPoem = styled.div`
  margin-top: 52px; font-size: 18px; font-weight: 400; line-height: 1.8;
  color: ${p => p.theme.mode === "dark" ? "rgba(241,234,222,0.65)" : "rgba(241,234,222,0.75)"};
  text-shadow: 0 1px 8px rgba(0,0,0,0.4);
`;
const SeekBtn = styled(Link)`
  display: inline-flex; align-items: center; gap: 16px;
  margin-top: 32px; padding: 20px 56px; background: #fff; color: #151415;
  border-radius: 4px; font-size: 12px; letter-spacing: 0.28em;
  text-transform: uppercase; font-weight: 500; position: relative; text-decoration: none;
  transition: all 0.6s var(--ease); box-shadow: 0 4px 30px rgba(0,0,0,0.15);
  &:hover { transform: scale(1.03); box-shadow: 0 8px 40px rgba(0,0,0,0.25); }
`;
const BtnDot = styled.span`position: absolute; bottom: 8px; right: 8px; width: 7px; height: 7px; border-radius: 50%; background: #151415;`;
const SideCard = styled.div`
  position: absolute; z-index: 5; border-radius: 6px; overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.2);
  transition: transform 0.15s linear;
`;
const SideLabel = styled.span`
  position: absolute; top: 14px; left: 0; right: 0; text-align: center;
  font-size: 20px; font-weight: 300; font-style: italic; color: #F1EADE;
  text-shadow: 0 1px 6px rgba(0,0,0,0.5);
`;
const HeroSideText = styled.div`
  position: absolute; z-index: 8; font-size: 14px; font-weight: 400; line-height: 1.5;
  color: ${p => p.theme.mode === "dark" ? "rgba(241,234,222,0.5)" : "rgba(241,234,222,0.6)"};
  text-shadow: 0 1px 6px rgba(0,0,0,0.3);
`;

/* ─── EXPLORE SECTION ─── */
const ExploreSection = styled.section`position: relative; overflow: hidden;`;
const ExploreTitle = styled.div`
  text-align: center; padding: clamp(100px,16vw,220px) 40px clamp(50px,8vw,100px);
`;
const SectionBig = styled.div`
  font-size: clamp(68px,14vw,180px); font-weight: 300; font-style: italic; line-height: 0.82;
`;
const SubPoem2 = styled.div`
  margin-top: 40px; font-size: 18px; font-weight: 300; line-height: 1.9;
  color: ${p => p.theme.fgMuted};
`;

/* ─── CREAM SECTION ─── */
const CreamSection = styled.section`
  background: ${p => p.theme.mode === "dark" ? "#F1EADE" : "#fff"};
  color: #151415; position: relative; z-index: 10; overflow: hidden;
  padding: clamp(100px,16vw,220px) 40px;
`;
const CreamBig = styled.div`
  font-size: clamp(40px,8vw,96px); font-weight: 300; line-height: 1.06; max-width: 740px;
  color: #151415;
`;
const CreamSub = styled.p`
  margin-top: 20px; max-width: 500px; font-size: 14px; line-height: 1.8;
  color: rgba(21,20,21,0.45); text-transform: uppercase; letter-spacing: 0.15em;
`;
const FeatureGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin-top: 60px;`;
const FeatureCard = styled.div`
  background: rgba(255,255,255,0.45); backdrop-filter: blur(16px);
  border-radius: 20px; padding: 52px 24px 24px; position: relative;
  border: 0.5px solid rgba(21,20,21,0.04);
  transition: transform 0.5s, box-shadow 0.5s;
  &:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(21,20,21,0.07); }
`;
const NumBadge = styled.div`
  position: absolute; top: 16px; right: 18px; width: 40px; height: 40px; border-radius: 50%;
  border: 1px solid rgba(21,20,21,0.08); display: grid; place-items: center;
  font-size: 16px; font-weight: 300; color: rgba(21,20,21,0.4);
`;
const StoneFloat = styled.div`
  position: absolute; top: 5%; right: 5%; width: clamp(100px,15vw,200px); z-index: 1;
  animation: ${floatAnim} 8s ease-in-out infinite;
  img { width: 100%; border-radius: 16px; opacity: 0.5; filter: contrast(1.2); }
`;

/* ─── PROJECTS GRID ─── */
const ProjectsGrid = styled.div`
  display: grid; grid-template-columns: repeat(12, 1fr); gap: 10px; padding: 0 40px 100px;
`;
const layouts = [
  { c: "1/6", ar: "16/10" }, { c: "6/9", ar: "4/5" }, { c: "9/13", ar: "3/4" },
  { c: "1/5", ar: "3/4" }, { c: "5/10", ar: "16/10" }, { c: "10/13", ar: "4/5" },
];
const PCard = styled(Link)`
  grid-column: ${p => p.$c}; position: relative; overflow: hidden; border-radius: 8px;
  text-decoration: none; color: inherit;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); }
  &:hover img { transform: scale(1.06); }
`;
const POverlay = styled.div`position: absolute; inset: 0; background: linear-gradient(transparent 35%, rgba(21,20,21,0.85) 100%);`;
const PInfo = styled.div`position: absolute; bottom: 18px; left: 22px; z-index: 2;`;
const PCat = styled.div`font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(241,234,222,0.45);`;
const PTitle = styled.div`font-size: 24px; font-weight: 300; color: #F1EADE; margin-top: 3px;`;

/* ─── JOURNAL ─── */
const JGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; max-width: 900px; margin: 0 auto; padding: 0 40px 100px;`;
const JCard = styled(Link)`
  padding: 24px; border: 1px solid ${p => p.theme.border}; border-radius: 8px; text-decoration: none; color: inherit;
  transition: border-color 0.4s, transform 0.4s;
  &:hover { border-color: ${p => p.theme.fgMuted}; transform: translateY(-4px); }
`;

/* ─── SVG PATH ─── */
const DecorativePath = styled.svg`
  position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
  opacity: ${p => p.$op || 0.15};
`;

export default function HomePage() {
  const [heroP, setHeroP] = useState(0);
  useEffect(() => {
    let raf;
    const t = () => { setHeroP(cl(scrollY / (innerHeight || 900), 0, 1)); raf = requestAnimationFrame(t); };
    raf = requestAnimationFrame(t); return () => cancelAnimationFrame(raf);
  }, []);

  // Side images for hero - 3 left, 3 right
  const leftImages = [
    { src: projects[0].thumb, top: "15%", w: "14%", delay: 0 },
    { src: projects[2].thumb, top: "42%", w: "16%", delay: 0.3 },
    { src: projects[4].thumb, top: "68%", w: "13%", delay: 0.6 },
  ];
  const rightImages = [
    { src: projects[1].thumb, top: "12%", w: "15%", delay: 0.1 },
    { src: projects[3].thumb, top: "40%", w: "14%", delay: 0.4 },
    { src: projects[5].thumb, top: "65%", w: "16%", delay: 0.5 },
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <Hero>
        <HeroBg $src={projects[0].hero} style={{ transform: `scale(${1 + heroP * 0.2})` }} />
        <HeroOverlay />

        {/* SVG decorative path */}
        <DecorativePath viewBox="0 0 1440 1080" preserveAspectRatio="none" $op={0.2} style={{ zIndex: 3 }}>
          <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F1EADE" /><stop offset=".5" stopColor="#C9A96E" /><stop offset="1" stopColor="transparent" /></linearGradient></defs>
          <path fill="none" stroke="url(#hg)" strokeWidth="1" d="M0,906C291,1635,658-337,214,246-110,671,233,23,802,10c196-5,555,183,328,583-63,110-140-93,310-86" vectorEffect="non-scaling-stroke" />
        </DecorativePath>

        {/* LEFT floating side images */}
        {leftImages.map((img, i) => (
          <SideCard key={`L${i}`} style={{
            left: 0, top: img.top, width: img.w, maxWidth: 220,
            transform: `translateY(${heroP * (80 + i * 40)}px) rotate(${(-8 - i * 5) + heroP * (25 + i * 10)}deg)`,
            transformOrigin: "-100% 50%",
            opacity: 1 - heroP * 0.6,
          }}>
            <img src={img.src} alt="" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
            {i === 0 && <SideLabel>P.</SideLabel>}
          </SideCard>
        ))}

        {/* RIGHT floating side images */}
        {rightImages.map((img, i) => (
          <SideCard key={`R${i}`} style={{
            right: 0, top: img.top, width: img.w, maxWidth: 220,
            transform: `translateY(${heroP * (80 + i * 40)}px) rotate(${(8 + i * 5) - heroP * (25 + i * 10)}deg)`,
            transformOrigin: "200% 50%",
            opacity: 1 - heroP * 0.6,
          }}>
            <img src={img.src} alt="" style={{ width: "100%", aspectRatio: i % 2 ? "4/5" : "3/4", objectFit: "cover" }} />
            {i === 0 && <SideLabel>I.</SideLabel>}
          </SideCard>
        ))}

        {/* Side text blocks */}
        <HeroSideText style={{ left: "5%", top: "22%", zIndex: 8, opacity: 1 - heroP * 0.8 }}>
          <div>A Private Studio</div>
          <div style={{ marginLeft: "1em" }}>for Makers</div>
        </HeroSideText>
        <HeroSideText style={{ right: "5%", top: "20%", textAlign: "right", opacity: 1 - heroP * 0.8 }}>
          <div>Coordinates</div>
          <div style={{ marginLeft: "1em" }}>Withheld</div>
        </HeroSideText>

        {/* Main hero text */}
        <HeroContent style={{ transform: `translateY(${heroP * -60}px)`, opacity: 1 - heroP * 0.7 }}>
          <HeroTag><SplitText>{company.tagline}</SplitText></HeroTag>
          <BigTitle><SplitText delay={0.2}>Nothing</SplitText></BigTitle>
          <BigTitle style={{ marginTop: 6 }}><SplitText delay={0.4}>Shown</SplitText></BigTitle>
          <BigTitle style={{ marginTop: 6 }}><SplitText delay={0.6}>First</SplitText></BigTitle>
          <SubPoem>
            <div>Commitment</div>
            <div style={{ marginLeft: "2.5em" }}>Precedes</div>
            <div style={{ marginLeft: "1.2em" }}>Entry /</div>
          </SubPoem>
          <SeekBtn href="/projects">SEEK ADMISSION<BtnDot /></SeekBtn>
        </HeroContent>
      </Hero>

      {/* ═══ EXPLORE PLACES ═══ */}
      <ExploreSection>
        <DecorativePath viewBox="0 0 1440 1080" preserveAspectRatio="none" $op={0.1}>
          <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="transparent" /><stop offset=".4" stopColor="#7B5136" stopOpacity="0.3" /><stop offset="1" stopColor="transparent" /></linearGradient></defs>
          <path fill="none" stroke="url(#pg)" strokeWidth="1" d="M517,1080c246-233,804-243,752-429-28-100-413-154-649-30-229,121-467,88-462,50,15-108,394,337,527,134C925,438,14,695,250,0" vectorEffect="non-scaling-stroke" />
        </DecorativePath>
        <ExploreTitle>
          <ScrollReveal><SectionBig><SplitText>Explore</SplitText></SectionBig></ScrollReveal>
          <ScrollReveal delay={0.15}><SectionBig><SplitText delay={0.2}>Places</SplitText></SectionBig></ScrollReveal>
          <ScrollReveal delay={0.35}>
            <SubPoem2>
              <div style={{ marginLeft: "3.5em" }}>Not</div>
              <div style={{ marginLeft: "6em" }}>Everything</div>
              <div style={{ marginLeft: "2em" }}>is Visible</div>
            </SubPoem2>
          </ScrollReveal>
        </ExploreTitle>
      </ExploreSection>

      {/* ═══ SCROLL IMAGE SEQUENCE ═══ */}
      <ImageSequence images={allImgs} names={allNames} />

      {/* ═══ YOU WON'T FIND THEM ON A MAP ═══ */}
      <CreamSection>
        <DecorativePath viewBox="0 0 1440 1080" preserveAspectRatio="none" $op={0.06}>
          <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7B5136" /><stop offset=".5" stopColor="#C9A96E" /><stop offset="1" stopColor="#F1EADE" /></linearGradient></defs>
          <path fill="none" stroke="url(#ag)" strokeWidth="1" d="M848,0C1951,144,309,169,217,422c-92,253,1165,49,464,347-701,299,613-437,338,310" vectorEffect="non-scaling-stroke" />
        </DecorativePath>

        <StoneFloat>
          <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=60&auto=format&fit=crop" alt="" />
        </StoneFloat>

        <ScrollReveal>
          <CreamBig>
            <span style={{ display: "block" }}>You Won&apos;t Find</span>
            <span style={{ display: "block", marginLeft: "2em" }}>Them</span>
            <span style={{ display: "block" }}>on a Map</span>
          </CreamBig>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <CreamSub>THESE PLACES AREN&apos;T BROADLY ANNOUNCED.</CreamSub>
        </ScrollReveal>
        <FeatureGrid>
          {company.services.slice(0, 5).map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <FeatureCard>
                <NumBadge>{i + 1}</NumBadge>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, lineHeight: 1.4, color: "#151415" }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "rgba(21,20,21,0.4)", fontStyle: "italic" }}>{s.desc}</div>
              </FeatureCard>
            </ScrollReveal>
          ))}
        </FeatureGrid>
      </CreamSection>

      {/* ═══ SELECTED PROJECTS ═══ */}
      <section style={{ padding: "clamp(80px,12vw,180px) 0" }}>
        <ExploreTitle style={{ padding: "0 40px clamp(40px,6vw,80px)" }}>
          <ScrollReveal><SectionBig style={{ fontSize: "clamp(50px,10vw,130px)" }}><SplitText>Selected</SplitText></SectionBig></ScrollReveal>
          <ScrollReveal delay={0.1}><SectionBig style={{ fontSize: "clamp(50px,10vw,130px)" }}><SplitText delay={0.15}>Projects</SplitText></SectionBig></ScrollReveal>
        </ExploreTitle>
        <ProjectsGrid>
          {projects.slice(0, 6).map((p, i) => {
            const l = layouts[i % layouts.length];
            return (
              <ScrollReveal key={p.slug} delay={i * 0.06} style={{ gridColumn: l.c }}>
                <PCard href={`/projects/${p.slug}`} $c={l.c}>
                  <div style={{ aspectRatio: l.ar, overflow: "hidden", borderRadius: 8 }}>
                    <img src={p.thumb} alt={p.title} />
                  </div>
                  <POverlay style={{ borderRadius: 8 }} />
                  <PInfo>
                    <PCat>{p.category} · {p.year}</PCat>
                    <PTitle>{p.title}</PTitle>
                    <div style={{ fontSize: 13, color: "rgba(241,234,222,0.4)", marginTop: 2 }}>{p.subtitle}</div>
                  </PInfo>
                </PCard>
              </ScrollReveal>
            );
          })}
        </ProjectsGrid>
      </section>

      {/* ═══ JOURNAL ═══ */}
      <section style={{ padding: "0 0 clamp(80px,12vw,180px)" }}>
        <ExploreTitle style={{ padding: "0 40px clamp(40px,6vw,60px)" }}>
          <ScrollReveal><SectionBig style={{ fontSize: "clamp(50px,10vw,130px)" }}><SplitText>Design</SplitText></SectionBig></ScrollReveal>
          <ScrollReveal delay={0.1}><SectionBig style={{ fontSize: "clamp(50px,10vw,130px)" }}><SplitText delay={0.15}>Thinking</SplitText></SectionBig></ScrollReveal>
        </ExploreTitle>
        <JGrid>
          {articles.slice(0, 4).map((a, i) => (
            <ScrollReveal key={a.slug} delay={i * 0.06}>
              <JCard href={`/journal/${a.slug}`}>
                <PCat>{a.category} · {a.date}</PCat>
                <div style={{ fontSize: 22, fontWeight: 300, margin: "10px 0 8px" }}>{a.title}</div>
                <div style={{ fontSize: 14, opacity: 0.35, lineHeight: 1.7 }}>{a.excerpt.slice(0, 140)}…</div>
              </JCard>
            </ScrollReveal>
          ))}
        </JGrid>
      </section>

      <Footer />
    </>
  );
}
