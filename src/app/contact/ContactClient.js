"use client";
import styled from "styled-components";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { company } from "@/data/company";

const Hero = styled.section`padding: clamp(160px,20vw,280px) 40px clamp(40px,6vw,80px); text-align: center;`;
const Big = styled.div`font-size: clamp(50px,10vw,130px); font-weight: 300; font-style: italic; line-height: 0.85;`;
const FormSection = styled.section`
  background: ${p => p.theme.mode === "dark" ? "#F1EADE" : "#fff"}; color: #151415;
  padding: clamp(80px,12vw,160px) 40px;
`;
const FormGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 800px; margin: 0 auto;
  @media(max-width:640px) { grid-template-columns: 1fr; }`;
const Label = styled.label`font-size: 14px; color: rgba(21,20,21,0.3); display: block; margin-bottom: 4px;`;
const Input = styled.input`
  width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(21,20,21,0.08);
  padding: 10px 0; font-size: clamp(20px,3vw,34px); font-family: var(--f-body); font-weight: 300;
  color: #151415; outline: none; transition: border-color 0.5s;
  &:focus { border-color: #7B5136; }
`;
const Textarea = styled.textarea`
  width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(21,20,21,0.08);
  padding: 10px 0; font-size: clamp(16px,2.2vw,26px); font-family: var(--f-body); font-weight: 300;
  color: #151415; outline: none; resize: none; transition: border-color 0.5s;
  &:focus { border-color: #7B5136; }
`;
const Submit = styled.button`
  width: 100%; padding: 18px; background: #151415; color: #F1EADE; border: none; border-radius: 4px;
  font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer;
  font-family: var(--f-body); position: relative; transition: background 0.5s;
  &:hover { background: #2a2528; }
`;
const MapSection = styled.section`padding: clamp(60px,10vw,120px) 40px;`;
const MapWrap = styled.div`border-radius: 12px; overflow: hidden; max-width: 1000px; margin: 0 auto; aspect-ratio: 16/9;
  iframe { width: 100%; height: 100%; border: none; }`;
const Offices = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1000px; margin: 40px auto 0;`;
const Office = styled.div`padding: 28px; border: 1px solid ${p => p.theme.border}; border-radius: 10px; transition: transform 0.4s; &:hover { transform: translateY(-3px); }`;
const City = styled.div`font-size: 26px; font-weight: 300; margin-bottom: 12px;`;
const Line = styled.div`font-size: 14px; color: ${p => p.theme.fgMuted}; line-height: 1.7;`;
const Primary = styled.span`display: inline-block; padding: 2px 10px; background: ${p => p.theme.gold}30; color: ${p => p.theme.gold}; font-size: 10px; letter-spacing: 0.15em; border-radius: 4px; margin-left: 8px; vertical-align: middle;`;

const dubaiOffice = company.offices.find(o => o.primary);
const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.5!2d${dubaiOffice.lng}!3d${dubaiOffice.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzQ5LjMiTiA1NcKwMTcnMTMuOSJF!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae`;

export default function ContactClient() {
  return <>
    <Hero>
      <ScrollReveal><Big><SplitText>Get in</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.15}><Big><SplitText delay={0.2}>Touch</SplitText></Big></ScrollReveal>
      <ScrollReveal delay={0.3}><p style={{ marginTop: 24, fontSize: 16, opacity: 0.4, maxWidth: 500, margin: "24px auto 0" }}>
        Every project begins with a conversation. Tell us about your vision and we will respond within 48 hours.
      </p></ScrollReveal>
    </Hero>

    <FormSection>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <ScrollReveal><div style={{ fontSize: "clamp(48px,9vw,110px)", fontWeight: 300, fontStyle: "italic" }}><SplitText>Admission</SplitText></div></ScrollReveal>
      </div>
      <FormGrid>
        {[
          { l: "Full Name", p: "Your Name" },
          { l: "Email Address", p: "you@email.com" },
          { l: "Phone", p: "+971 ..." },
          { l: "Company / Individual", p: "Your Company" },
          { l: "Country", p: "United Arab Emirates" },
          { l: "City", p: "Dubai" },
        ].map(f => (
          <ScrollReveal key={f.l}><Label>{f.l}</Label><Input placeholder={f.p} /></ScrollReveal>
        ))}
        <ScrollReveal style={{ gridColumn: "1/-1" }}>
          <Label>Project Type</Label>
          <Input placeholder="Residential / Commercial / Hospitality / Other" />
        </ScrollReveal>
        <ScrollReveal style={{ gridColumn: "1/-1" }}>
          <Label>Context for Inquiry /</Label>
          <Textarea rows={3} placeholder="Tell us about your project vision, timeline, and any specific requirements..." />
        </ScrollReveal>
        <ScrollReveal delay={0.1} style={{ gridColumn: "2" }}>
          <Submit>SUBMIT INQUIRY <span style={{ position: "absolute", bottom: 7, right: 7, width: 6, height: 6, borderRadius: "50%", background: "#F1EADE" }} /></Submit>
        </ScrollReveal>
      </FormGrid>
    </FormSection>

    <MapSection>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <ScrollReveal><Big style={{ fontSize: "clamp(40px,7vw,80px)" }}><SplitText>Find Us</SplitText></Big></ScrollReveal>
      </div>
      <ScrollReveal>
        <MapWrap>
          <iframe
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Montaigne Design Dubai Office Location"
            allowFullScreen
          />
        </MapWrap>
      </ScrollReveal>
      <Offices>
        {company.offices.map((o, i) => (
          <ScrollReveal key={o.city} delay={i * 0.1}>
            <Office>
              <City>{o.city}{o.primary && <Primary>HQ</Primary>}</City>
              <Line><strong>{company.legal}</strong></Line>
              <Line>{o.address}</Line>
              <Line>{o.district}</Line>
              <Line style={{ marginTop: 12 }}>{o.phone}</Line>
              <Line><a href={`mailto:${o.email}`} style={{ color: "inherit", borderBottom: "1px solid currentColor" }}>{o.email}</a></Line>
              <Line style={{ marginTop: 12 }}>
                <a href={`https://www.google.com/maps?q=${o.lat},${o.lng}`} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, borderBottom: "1px solid currentColor" }}>
                  VIEW ON MAP →
                </a>
              </Line>
            </Office>
          </ScrollReveal>
        ))}
      </Offices>
    </MapSection>

    <Footer />
  </>;
}
