"use client";
import styled, { keyframes } from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { company } from "@/data/company";

const Hero = styled.section`padding: clamp(120px,18vw,280px) 40px clamp(40px,6vw,80px); text-align: center;
  @media(max-width:768px) { padding: clamp(100px,14vw,160px) 20px clamp(30px,4vw,60px); }`;
const Big = styled.div`font-size: clamp(40px,9vw,130px); font-weight: 300; font-style: italic; line-height: 0.85;`;
const FormSection = styled.section`
  background: ${p => p.theme.mode === "dark" ? "#F1EADE" : "#fff"};
  color: #151415; position: relative; overflow: hidden;
  padding: clamp(60px,10vw,160px) 40px;
  @media(max-width:768px) { padding: clamp(40px,8vw,80px) 20px; }
`;
const FormSvg = styled.svg`position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.06;`;
const FormGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 800px; margin: 0 auto; position: relative; z-index: 2;
  @media(max-width:640px) { grid-template-columns: 1fr; gap: 20px; }
`;
const Label = styled.label`font-size: 17px; font-weight: 400; color: rgba(21,20,21,0.35); display: block; margin-bottom: 4px; line-height: 1.4;
  @media(max-width:768px) { font-size: 15px; }`;
const Input = styled.input`
  width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(21,20,21,0.1);
  padding: 10px 0; font-size: clamp(18px,3vw,40px); font-family: var(--f-body); font-weight: 300;
  color: #151415; outline: none; transition: border-color 0.5s;
  &:focus { border-color: #7B5136; }
  &::placeholder { color: rgba(21,20,21,0.12); font-style: italic; }
`;
const Textarea = styled.textarea`
  width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(21,20,21,0.1);
  padding: 10px 0; font-size: clamp(16px,2.5vw,30px); font-family: var(--f-body); font-weight: 300;
  color: #151415; outline: none; resize: none; transition: border-color 0.5s;
  &:focus { border-color: #7B5136; }
  &::placeholder { color: rgba(21,20,21,0.12); font-style: italic; }
`;
const Submit = styled.button`
  width: 100%; padding: 18px; background: #151415; color: #F1EADE; border: none; border-radius: 4px;
  font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer;
  font-family: var(--f-body); position: relative; transition: all 0.5s;
  &:hover { background: #2a2528; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
`;
const MapSection = styled.section`padding: clamp(48px,8vw,120px) 40px;
  @media(max-width:768px) { padding: clamp(32px,6vw,60px) 20px; }`;
const MapWrap = styled.div`
  border-radius: 12px; overflow: hidden; max-width: 1000px; margin: 0 auto; aspect-ratio: 16/9;
  box-shadow: 0 8px 40px rgba(0,0,0,0.1);
  iframe { width: 100%; height: 100%; border: none;
    filter: ${p => p.theme.mode === "dark" ? "invert(0.9) hue-rotate(180deg) saturate(0.3)" : "none"}; }
  @media(max-width:640px) { aspect-ratio: 4/3; border-radius: 8px; }
`;
const Offices = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;
  max-width: 1000px; margin: 40px auto 0;
  @media(max-width:768px) { grid-template-columns: 1fr; margin: 28px auto 0; }
`;
const Office = styled.div`padding: 24px; border: 1px solid ${p => p.theme.border}; border-radius: 10px;
  transition: transform 0.5s, box-shadow 0.5s; &:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); }`;
const City = styled.div`font-size: 26px; font-weight: 300; margin-bottom: 10px;
  @media(max-width:480px) { font-size: 22px; }`;
const Line = styled.div`font-size: 14px; color: ${p => p.theme.fgMuted}; line-height: 1.7;`;
const Primary = styled.span`display: inline-block; padding: 3px 10px; background: ${p => p.theme.gold}25; color: ${p => p.theme.gold}; font-size: 10px; letter-spacing: 0.15em; border-radius: 4px; margin-left: 8px; vertical-align: middle;`;

const dubaiOffice = company.offices.find(o => o.primary);
const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.5!2d${dubaiOffice.lng}!3d${dubaiOffice.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzQ5LjMiTiA1NcKwMTcnMTMuOSJF!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae`;

export default function ContactClient() {
  return <>
    <Hero>
      <ScrollReveal><Big><SplitText>Get in</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.15}><Big><SplitText delay={0.2}>Touch</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.3}><p style={{ marginTop: 20, fontSize: 16, opacity: 0.45, maxWidth: 500, margin: "20px auto 0" }}>
        Every project begins with a conversation.
      </p></ScrollReveal>
    </Hero>
    <FormSection>
      <FormSvg viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs><linearGradient id="cfG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C9A96E" stopOpacity="0.4" /><stop offset="1" stopColor="#7B5136" stopOpacity="0.1" /></linearGradient></defs>
        <path fill="none" stroke="url(#cfG)" strokeWidth="1" d="M100,800C400,200,800,600,1200,100" vectorEffect="non-scaling-stroke" />
      </FormSvg>
      <div style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 2 }}>
        <ScrollReveal><div style={{ fontSize: "clamp(40px,8vw,110px)", fontWeight: 300, fontStyle: "italic", color: "#151415" }}><SplitText>Admission</SplitText></div></ScrollReveal>
      </div>
      <FormGrid>
        <ScrollReveal><Label>Full Name</Label><Input placeholder="Your Name" /></ScrollReveal>
        <ScrollReveal delay={0.05}><Label>Email Address</Label><Input placeholder="you@email.com" /></ScrollReveal>
        <ScrollReveal delay={0.1}><Label>Phone</Label><Input placeholder="+971 50 123 4567" /></ScrollReveal>
        <ScrollReveal delay={0.15}><Label>Company</Label><Input placeholder="Your Company" /></ScrollReveal>
        <ScrollReveal delay={0.2} style={{ gridColumn: "1/-1" }}><Label>Country</Label><Input placeholder="United Arab Emirates" /></ScrollReveal>
        <ScrollReveal delay={0.25} style={{ gridColumn: "1/-1" }}><Label>City</Label><Input placeholder="Dubai" /></ScrollReveal>
        <ScrollReveal delay={0.3} style={{ gridColumn: "1/-1" }}><Label>Context for Admission /</Label><Textarea rows={3} placeholder="Tell us about your project vision..." /></ScrollReveal>
        <div style={{ display: "none" }} className="desktop-spacer" />
        <ScrollReveal delay={0.35} style={{ gridColumn: "-2/-1" }}>
          <Submit>SUBMIT INQUIRY <span style={{ position: "absolute", bottom: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: "#F1EADE" }} /></Submit>
        </ScrollReveal>
      </FormGrid>
    </FormSection>
    <MapSection>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <ScrollReveal><Big style={{ fontSize: "clamp(36px,7vw,80px)" }}><SplitText>Find Us</SplitText></Big></ScrollReveal>
      </div>
      <ScrollReveal><MapWrap><iframe src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Montaigne Design Dubai Office" allowFullScreen /></MapWrap></ScrollReveal>
      <Offices>
        {company.offices.map((o, i) => (
          <ScrollReveal key={o.city} delay={i * 0.1}>
            <Office>
              <City>{o.city}{o.primary && <Primary>HQ</Primary>}</City>
              <Line><strong style={{ fontWeight: 500 }}>{company.legal}</strong></Line>
              <Line>{o.address}</Line>
              <Line>{o.district}</Line>
              <Line style={{ marginTop: 10 }}>{o.phone}</Line>
              <Line><a href={`mailto:${o.email}`} style={{ color: "inherit", borderBottom: "1px solid rgba(21,20,21,0.15)" }}>{o.email}</a></Line>
              <Line style={{ marginTop: 10 }}>
                <a href={`https://www.google.com/maps?q=${o.lat},${o.lng}`} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4 }}>VIEW ON MAP →</a>
              </Line>
            </Office>
          </ScrollReveal>
        ))}
      </Offices>
    </MapSection>
    <Footer />
  </>;
}
