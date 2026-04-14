"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { getProject, getAdjacent } from "@/data/content";
import SplitText from "./SplitText";
import SR from "./SR";
import Footer from "./Footer";
import { usePageReady, useCursorTrail } from "@/hooks/useStringEngine";

const Hero = styled.section`position:relative;height:85vh;overflow:hidden;@media(max-width:1024px){height:55vh}`;
const HI = styled.div<{$sy:number}>`position:absolute;inset:0;transform:translateY(${p=>p.$sy*0.12}px);will-change:transform;img{object-fit:cover}`;
const HOv = styled.div`position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(var(--c-black-rgb),0.25) 0%,rgba(var(--c-black-rgb),0.65) 60%,var(--c-black) 100%)`;
const Back = styled(Link)`position:absolute;top:var(--h3);left:var(--g-margin);z-index:10;font-size:var(--mm);color:var(--c-cream);transition:letter-spacing 0.4s;&:hover{letter-spacing:0.3em}@media(max-width:1024px){top:var(--h5);left:var(--g-gap)}`;
const HC = styled.div`position:absolute;bottom:var(--h3);left:var(--g-margin);right:var(--g-margin);z-index:2;@media(max-width:1024px){bottom:var(--h5);left:var(--g-gap);right:var(--g-gap)}`;
const Cat = styled.div`font-size:var(--mm);color:rgba(var(--c-cream-rgb),0.4);margin-bottom:var(--m)`;
const Tag = styled.p`font-size:var(--p);font-style:italic;color:rgba(var(--c-cream-rgb),0.45);margin-top:var(--mm)`;

const InfoGrid = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:var(--g-gap);padding:var(--h3) var(--g-margin);max-width:1000px;margin:0 auto;border-bottom:1px solid rgba(var(--c-cream-rgb),0.05);@media(max-width:1024px){grid-template-columns:repeat(2,1fr);padding:var(--h5) var(--g-gap)}`;
const IL = styled.div`font-size:var(--mm);color:rgba(var(--c-cream-rgb),0.3);margin-bottom:var(--mm)`;
const IV = styled.div`font-size:var(--p);font-weight:300`;

const DescWrap = styled.div`display:grid;grid-template-columns:1fr 2fr;gap:var(--h3);padding:var(--h3) var(--g-margin);max-width:1000px;margin:0 auto;@media(max-width:1024px){grid-template-columns:1fr;padding:var(--h5) var(--g-gap);gap:var(--g-gap)}`;

const GWrap = styled.section`padding:var(--g-gap) var(--g-margin) var(--h3);max-width:1200px;margin:0 auto;@media(max-width:1024px){padding:var(--g-gap)}`;
const MainImg = styled.div`position:relative;overflow:hidden;border-radius:0.3rem;margin-bottom:var(--m);aspect-ratio:16/9`;
const Arr = styled.button<{$s:string}>`position:absolute;${p=>p.$s}:var(--m);top:50%;transform:translateY(-50%);width:2.5rem;height:2.5rem;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:rgba(0,0,0,0.3);color:#fff;font-size:1rem;z-index:4;backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;transition:all 0.3s;&:hover{background:rgba(0,0,0,0.5)}`;
const ThRow = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:var(--mm)`;
const Th = styled.div<{$a:boolean}>`cursor:pointer;overflow:hidden;border-radius:0.2rem;position:relative;aspect-ratio:16/9;opacity:${p=>p.$a?1:0.3};border:${p=>p.$a?`2px solid rgba(var(--c-gold-rgb),0.5)`:"1px solid rgba(var(--c-cream-rgb),0.06)"};transition:opacity 0.4s;img{object-fit:cover}&:hover{opacity:${p=>p.$a?1:0.55}}`;

const NavSec = styled.div`display:flex;justify-content:space-between;flex-wrap:wrap;gap:var(--g-gap);padding:var(--h3) var(--g-margin);max-width:1000px;margin:0 auto;border-top:1px solid rgba(var(--c-cream-rgb),0.05);@media(max-width:1024px){padding:var(--h5) var(--g-gap)}`;
const NL = styled(Link)<{$a?:string}>`text-align:${p=>p.$a||"left"};transition:opacity 0.3s;&:hover{opacity:0.6}`;
const NLab = styled.div`font-size:var(--mm);color:rgba(var(--c-cream-rgb),0.25);margin-bottom:var(--mm)`;
const NT = styled.div`font-size:var(--h5);font-weight:300`;

export default function ProjectDetail() {
  const { id } = useParams() as { id: string };
  const project = getProject(id);
  const [gi, setGi] = useState(0);
  const [sy, setSy] = useState(0);
  usePageReady();
  useCursorTrail();
  useEffect(() => {
    const h = () => setSy(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!project) return <div style={{padding:"var(--large) var(--g-margin)",textAlign:"center"}}><h1>Not found</h1><Link href="/">← Home</Link></div>;
  const { prev, next } = getAdjacent(id);

  return (
    <main>
      <Hero>
        <HI $sy={sy}><Image src={project.images[0]} alt={project.title} fill priority sizes="100vw" style={{objectFit:"cover"}}/></HI>
        <HOv/>
        <Back href="/#projects">← Back to Projects</Back>
        <HC>
          <Cat>{project.category} · {project.year}</Cat>
          <SplitText className="t-h0">{project.title}</SplitText>
          <Tag>{project.tagline}</Tag>
        </HC>
      </Hero>

      <SR><InfoGrid>
        {[{l:"Client",v:project.client},{l:"Location",v:project.location},{l:"Area",v:project.area},{l:"Year",v:project.year}].map(i=>(
          <div key={i.l}><IL>{i.l}</IL><IV>{i.v}</IV></div>
        ))}
      </InfoGrid></SR>

      <SR><DescWrap>
        <div><IL>Scope</IL><div style={{fontSize:"var(--m)",fontWeight:300,lineHeight:2,color:"rgba(var(--c-cream-rgb),0.45)"}}>{project.scope}</div></div>
        <div><p style={{fontSize:"var(--p)",lineHeight:2.2,color:"rgba(var(--c-cream-rgb),0.55)",fontWeight:300}}>{project.description}</p></div>
      </DescWrap></SR>

      <GWrap>
        <SR>
          <MainImg>
            <Image src={project.images[gi]} alt={`${project.title} ${gi+1}`} fill sizes="100vw" style={{objectFit:"cover"}}/>
            <Arr $s="left" onClick={()=>setGi((gi-1+project.images.length)%project.images.length)}>‹</Arr>
            <Arr $s="right" onClick={()=>setGi((gi+1)%project.images.length)}>›</Arr>
          </MainImg>
        </SR>
        <ThRow>
          {project.images.map((img,i)=>(
            <Th key={i} $a={gi===i} onClick={()=>setGi(i)}>
              <Image src={img} alt={`Thumb ${i+1}`} fill sizes="25vw" loading="lazy" style={{objectFit:"cover"}}/>
            </Th>
          ))}
        </ThRow>
      </GWrap>

      <SR><NavSec>
        <NL href={`/project/${prev.id}`}><NLab>← Previous</NLab><NT>{prev.title}</NT></NL>
        <NL href={`/project/${next.id}`} $a="right"><NLab>Next →</NLab><NT>{next.title}</NT></NL>
      </NavSec></SR>

      <Footer/>
    </main>
  );
}
