"use client";
import styled from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { company } from "@/data/company";

const Hero = styled.section`padding: clamp(160px,20vw,280px) 40px clamp(60px,8vw,100px);`;
const Big = styled.div`font-size: clamp(50px,10vw,130px); font-weight: 300; font-style: italic; line-height: 0.85;`;
const Intro = styled.div`max-width: 700px; margin: 60px auto 0; font-size: 18px; line-height: 1.9; color: ${p => p.theme.fgMuted}; text-align: center;`;
const Stats = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 24px; padding: 80px 40px; max-width: 900px; margin: 0 auto; text-align: center;`;
const StatNum = styled.div`font-size: clamp(36px,5vw,60px); font-weight: 300; color: ${p => p.theme.gold};`;
const StatLabel = styled.div`font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: ${p => p.theme.fgMuted}; margin-top: 8px;`;
const CreamSection = styled.section`background: ${p => p.theme.mode === "dark" ? "#F1EADE" : "#fff"}; color: #151415; padding: clamp(80px,12vw,160px) 40px;`;
const TwoCol = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1000px; margin: 0 auto; @media(max-width:768px){grid-template-columns:1fr;}`;
const ColTitle = styled.div`font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(21,20,21,0.3); margin-bottom: 16px;`;
const ColText = styled.p`font-size: 17px; line-height: 1.8; color: rgba(21,20,21,0.6);`;
const ServicesGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; padding: 80px 40px; max-width: 1000px; margin: 0 auto;`;
const ServiceCard = styled.div`padding: 32px 0; border-top: 1px solid ${p => p.theme.border};`;
const ServiceTitle = styled.div`font-size: 22px; font-weight: 300; margin-bottom: 8px;`;
const ServiceDesc = styled.div`font-size: 14px; color: ${p => p.theme.fgMuted}; line-height: 1.7;`;
const ArchImg = styled.div`margin: 80px 40px; border-radius: 8px; overflow: hidden; max-height: 500px;
  img { width: 100%; height: 100%; object-fit: cover; }`;
const Offices = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; padding: 0 40px 80px; max-width: 900px; margin: 0 auto;`;
const Office = styled.div`padding: 24px; border: 1px solid ${p => p.theme.border}; border-radius: 8px;`;
const OfficeCity = styled.div`font-size: 24px; font-weight: 300; margin-bottom: 8px;`;
const OfficeLine = styled.div`font-size: 14px; color: ${p => p.theme.fgMuted}; line-height: 1.6;`;

export default function AboutClient() {
  return <>
    <Hero style={{ textAlign: "center" }}>
      <ScrollReveal><Big><SplitText>About</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.15}><Big><SplitText delay={0.2}>Montaigne</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.3}><Intro>{company.about.intro}</Intro></ScrollReveal>
    </Hero>

    <Stats>
      {[[company.projectCount,"Projects Completed"],[company.awards+"","Awards Won"],[company.experience,"Of Experience"],["3","Global Offices"]].map(([n,l],i)=>(
        <ScrollReveal key={l} delay={i*0.1}><StatNum>{n}</StatNum><StatLabel>{l}</StatLabel></ScrollReveal>
      ))}
    </Stats>

    <ArchImg><ScrollReveal><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80&auto=format&fit=crop" alt="Montaigne Design Studio" /></ScrollReveal></ArchImg>

    <CreamSection>
      <TwoCol>
        <ScrollReveal>
          <ColTitle>Our Philosophy</ColTitle>
          <ColText>{company.about.philosophy}</ColText>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <ColTitle>Our Approach</ColTitle>
          <ColText>{company.about.approach}</ColText>
        </ScrollReveal>
      </TwoCol>
    </CreamSection>

    <section style={{ padding: "clamp(80px,12vw,160px) 0" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <ScrollReveal><Big style={{ fontSize: "clamp(40px,7vw,80px)" }}><SplitText>Services</SplitText></Big></ScrollReveal>
      </div>
      <ServicesGrid>
        {company.services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.06}>
            <ServiceCard><ServiceTitle>{s.title}</ServiceTitle><ServiceDesc>{s.desc}</ServiceDesc></ServiceCard>
          </ScrollReveal>
        ))}
      </ServicesGrid>
    </section>

    <section style={{ padding: "0 0 clamp(80px,12vw,160px)" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <ScrollReveal><Big style={{ fontSize: "clamp(40px,7vw,80px)" }}><SplitText>Our Offices</SplitText></Big></ScrollReveal>
      </div>
      <Offices>
        {company.offices.map((o, i) => (
          <ScrollReveal key={o.city} delay={i * 0.1}>
            <Office>
              <OfficeCity>{o.city}</OfficeCity>
              <OfficeLine>{o.address}</OfficeLine>
              <OfficeLine>{o.district}</OfficeLine>
              <OfficeLine style={{ marginTop: 8 }}>{o.phone}</OfficeLine>
              <OfficeLine><a href={`mailto:${o.email}`} style={{ color: "inherit", borderBottom: "1px solid currentColor" }}>{o.email}</a></OfficeLine>
            </Office>
          </ScrollReveal>
        ))}
      </Offices>
    </section>

    <Footer />
  </>;
}
