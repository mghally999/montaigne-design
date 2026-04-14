"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import SplitText from "./SplitText";
import SR from "./SR";
import Footer from "./Footer";
import { PROJECTS, JOURNAL } from "@/data/content";
import { useScrollProgress, useSpotlight, useParallax, useCursorTrail, usePageReady } from "@/hooks/useStringEngine";

/* ═══ WELCOME ═══ */
const Welcome = styled.section`
  position: relative; min-height: 100vh; overflow: hidden;
  background-image: url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=50&auto=format&fit=crop);
  background-size: cover; background-position: center 40%;
  contain: paint;
  &::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background: linear-gradient(180deg,
      rgba(var(--c-black-rgb),0.4) 0%, rgba(var(--c-black-rgb),0.35) 40%,
      rgba(var(--c-black-rgb),0.75) 75%, var(--c-black) 100%);
  }
`;
const WelcomeW = styled.div`
  position:relative; z-index:1; padding: 25vh 0 10vh;
  @media(max-width:1024px){ padding: 18vh 0 8vh; }
`;
const TitleLine = styled.span<{$l:string;$w:string}>`
  --left:${p=>p.$l}; --width:${p=>p.$w};
  color: var(--c-cream); pointer-events:none;
  @media(max-width:1024px){ --left:1; --width:6; }
`;
const CtaBlock = styled.div`
  --left:6; --width:2; margin-top: var(--h1); align-self:start;
  @media(max-width:1024px){ --left:2; --width:4; }
`;
const CtaLabel = styled.span`
  display:block; font-size: var(--p); color: var(--c-cream); margin-bottom: var(--h5);
  span { display:block; transition: translate 0.6s var(--f-cubic); }
  span:nth-child(1) { translate: 0.5em 0; }
  span:nth-child(2) { translate: 2em 0; }
  span:nth-child(3) { translate: 1em 0; }
`;
const SubLabel = styled.p`
  --left:${(p:{$l:string})=>p.$l}; --width:2; --top:${(p:{$t:string})=>p.$t};
  font-size: var(--mm); color: rgba(var(--c-cream-rgb),0.35); line-height:1.6;
  align-self:center; justify-self:center; text-align:center;
  @media(max-width:1024px){ --left:1; --width:3; }
`;

/* ═══ SVG PATH ═══ */
const SvgPath = styled.svg`
  position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0;
`;

/* ═══ PROJECTS ═══ */
const ProjSec = styled.section`
  background: var(--c-black); color: var(--c-cream); position:relative; padding: 0 0 var(--h3);
`;
const ProjTitle = styled.div`text-align:center; padding: var(--large) var(--g-margin) var(--h3); position:relative; z-index:2;`;
const ProjGrid = styled.div`
  display:grid; grid-template-columns: repeat(12,1fr); gap: var(--g-gap); margin: 0 var(--g-margin);
  @media(max-width:1024px){ grid-template-columns: repeat(6,1fr); }
`;
const PCard = styled(Link)<{$c:string;$mc:string;$a:string}>`
  grid-column: ${p=>p.$c}; position:relative; overflow:hidden; border-radius:0.3rem;
  aspect-ratio: ${p=>p.$a}; display:block;
  @media(max-width:1024px){ grid-column: ${p=>p.$mc}; aspect-ratio: 3/4; }
  &:hover .img { transform: scale(1.05); }
  .img { position:absolute; inset:0; transition: transform 0.9s var(--f-cubic); img { object-fit:cover; } }
`;
const POv = styled.div`position:absolute; inset:0; z-index:1;
  background: linear-gradient(180deg, transparent 25%, rgba(var(--c-black-rgb),0.88) 100%);`;
const PCon = styled.div`position:absolute; bottom:0; left:0; right:0; padding: var(--g-gap); z-index:2;`;
const PCat = styled.span`font-size:var(--mm); color:rgba(var(--c-cream-rgb),0.4); display:block; margin-bottom:0.3rem;`;
const PTit = styled.span`font-size: var(--h3); font-weight:300; line-height:1.1; display:block;`;
const PTag = styled.span`font-size: var(--m); font-style:italic; color:rgba(var(--c-cream-rgb),0.4); display:block; margin-top:0.2rem;`;

/* ═══ ABOUT (cream section) ═══ */
const AboutSec = styled.section`
  background: var(--c-cream); color: var(--c-black); padding: var(--large) 0; position:relative; z-index:10;
`;
const Stats = styled.div`
  display:grid; grid-template-columns: repeat(4,1fr); gap: var(--h5);
  padding: var(--h3) var(--g-margin); max-width: 900px; margin:0 auto; text-align:center;
  @media(max-width:1024px){ grid-template-columns: repeat(2,1fr); }
`;
const StatN = styled.div`font-size: var(--h2); font-weight:300; font-style:italic; color: var(--c-brown); line-height:1;`;
const StatL = styled.div`font-size:var(--mm); color:rgba(var(--c-black-rgb),0.35); margin-top:0.3rem;`;
const Arch = styled.div`
  border-radius: 50% 50% 0 0; overflow:hidden; aspect-ratio:1/1; position:relative;
  max-width: 650px; margin: var(--h5) auto 0; 
`;

/* ═══ JOURNAL ═══ */
const JournSec = styled.section`background: var(--c-black); color: var(--c-cream); padding: var(--large) 0; position:relative;`;
const JGrid = styled.div`
  display:grid; grid-template-columns: repeat(2,1fr); gap: var(--g-gap);
  margin: 0 auto; max-width: 900px; padding: 0 var(--g-margin);
  @media(max-width:1024px){ grid-template-columns: 1fr; }
`;
const JCard = styled(Link)`
  display:flex; gap: var(--g-gap); padding: var(--g-gap);
  border: 1px solid rgba(var(--c-cream-rgb),0.05); border-radius:0.3rem;
  transition: border-color 0.6s var(--f-cubic), transform 0.6s var(--f-cubic);
  &:hover { border-color: rgba(var(--c-cream-rgb),0.12); transform: translateY(-2px); }
  @media(max-width:1024px){ flex-direction:column; }
`;
const JImg = styled.div`width:110px; height:110px; flex-shrink:0; overflow:hidden; border-radius:0.2rem; position:relative;
  img { object-fit:cover; } @media(max-width:1024px){width:100%;height:150px;}`;

/* ═══ ADMISSION ═══ */
const AdmSec = styled.section`
  position:relative; background: var(--c-cream); color: var(--c-black);
  min-height:100vh; display:grid; place-items:center; padding: var(--large) var(--g-margin);
  overflow:hidden;
`;
const AdmBg = styled.div`
  position:absolute; inset:0;
  background: url(https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=30&auto=format&fit=crop) center/cover;
  opacity:0.05;
`;
const FormGrid = styled.div`
  display:grid; grid-template-columns: repeat(8,1fr); gap: var(--g-gap);
  width:100%; max-width: 900px; position:relative; z-index:1;
  @media(max-width:1024px){ grid-template-columns: repeat(6,1fr); }
`;
const Field = styled.div<{$c:string;$mc?:string}>`
  grid-column:${p=>p.$c};
  @media(max-width:1024px){ grid-column:${p=>p.$mc||"1/7"}; }
`;
const FLabel = styled.label`
  display:block; font-size: var(--p); color: rgba(var(--c-black-rgb),0.35); margin-bottom:0.2rem;
  span:nth-child(2) { margin-left:1em; }
`;
const FInput = styled.input`
  width:100%; font-size: var(--h2); font-family: inherit; font-weight:300;
  color: var(--c-black); background:transparent; border:none;
  border-bottom: 1px solid rgba(var(--c-black-rgb),0.1); padding: 0.4rem 0; outline:none;
  transition: border-color 0.6s var(--f-cubic);
  &:focus { border-color: var(--c-brown); }
  &::placeholder { color: rgba(var(--c-black-rgb),0.12); }
  @media(max-width:1024px){ font-size: var(--h4); }
`;
const FArea = styled.textarea`
  width:100%; font-size: var(--h3); font-family: inherit; font-weight:300;
  color: var(--c-black); background:transparent; border:none;
  border-bottom: 1px solid rgba(var(--c-black-rgb),0.1); padding: 0.4rem 0;
  outline:none; resize:none; transition: border-color 0.6s var(--f-cubic);
  &:focus { border-color: var(--c-brown); }
  &::placeholder { color: rgba(var(--c-black-rgb),0.12); }
  @media(max-width:1024px){ font-size: var(--h5); }
`;

/* ═══ PROJECT LAYOUT ═══ */
const layouts = [
  { col:"1/8",mc:"1/7",a:"16/10" }, { col:"8/13",mc:"1/7",a:"3/4" },
  { col:"1/5",mc:"1/4",a:"3/4" }, { col:"5/13",mc:"4/7",a:"16/10" },
  { col:"1/7",mc:"1/7",a:"4/5" }, { col:"7/13",mc:"1/7",a:"4/5" },
];

export default function Home() {
  const welcomeRef = useRef<HTMLElement>(null);
  const stoneRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  usePageReady();
  useCursorTrail();
  useScrollProgress(welcomeRef, { key: "--progress" });
  useSpotlight(stoneRef);
  useParallax(aboutTextRef, 0.08);

  return (
    <main>
      {/* ═══ WELCOME ═══ */}
      <Welcome ref={welcomeRef}>
        <SvgPath viewBox="0 0 1440 1080" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#A68773" /><stop offset=".5" stopColor="#9FAF9B" /><stop offset="1" stopColor="#151415" />
            </linearGradient>
          </defs>
          <path fill="none" stroke="url(#wg)" strokeWidth="1" d="M859,0c513,94.4,377,448.9-79,595.4-424,136.3-685,299.7-263,484.6" vectorEffect="non-scaling-stroke" />
        </SvgPath>

        <WelcomeW className="grid-w">
          <TitleLine $l="4" $w="9"><SplitText className="t-large">Nothing</SplitText></TitleLine>
          <TitleLine $l="2" $w="9"><SplitText className="t-large">Ordinary</SplitText></TitleLine>
          <TitleLine $l="5" $w="8"><SplitText className="t-large">Remains</SplitText></TitleLine>

          <SubLabel $l="9" $t="4" style={{marginTop:"var(--h5)"}}>Luxury Interior Design<br/>Dubai · Shanghai · Paris</SubLabel>
          <SubLabel $l="3" $t="5" style={{marginTop:"var(--h3)"}}>A Private Studio<br/>for Extraordinary Environments</SubLabel>

          <CtaBlock>
            <CtaLabel>
              <span>Commitment</span><span>Precedes</span><span>Entry /</span>
            </CtaLabel>
            <Link href="/#projects" className="button -big">Explore Projects</Link>
          </CtaBlock>
        </WelcomeW>
      </Welcome>

      {/* ═══ PROJECTS ═══ */}
      <ProjSec id="projects">
        <SvgPath viewBox="0 0 1440 1600" preserveAspectRatio="none" style={{height:"100%"}}>
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#15141500"/><stop offset=".3" stopColor="#7B513650"/><stop offset=".7" stopColor="#C9A96E25"/><stop offset="1" stopColor="#15141500"/>
            </linearGradient>
          </defs>
          <path fill="none" stroke="url(#pg)" strokeWidth="1" d="M517,0c246,127,804,132,752,234-28,54-412,84-649,16-229-66-467-48-462-27,15,59,394-184,527-73C925,350,14,621,250,1000,486,1379,1420,1200,1100,1600" vectorEffect="non-scaling-stroke"/>
        </SvgPath>

        <ProjTitle>
          <SR><SplitText className="t-large">Explore</SplitText></SR>
          <SR delay={100}><SplitText className="t-large">Projects</SplitText></SR>
          <SR delay={250}><p className="t-mm" style={{marginTop:"var(--h5)",color:"rgba(var(--c-cream-rgb),0.35)"}}>Not Everything Is Visible</p></SR>
        </ProjTitle>

        <ProjGrid>
          {PROJECTS.map((p,i)=>(
            <SR key={p.id} delay={i*80} style={{gridColumn: layouts[i].col}} className="">
              <PCard href={`/project/${p.id}`} $c={layouts[i].col} $mc={layouts[i].mc} $a={layouts[i].a}>
                <div className="img"><Image src={p.thumb} alt={p.title} fill sizes="50vw" loading="lazy"/></div>
                <POv/>
                <PCon>
                  <PCat>{p.category} · {p.year}</PCat>
                  <PTit>{p.title}</PTit>
                  <PTag>{p.tagline}</PTag>
                </PCon>
              </PCard>
            </SR>
          ))}
        </ProjGrid>
      </ProjSec>

      {/* ═══ ABOUT ═══ */}
      <AboutSec id="about">
        <div className="grid-w">
          <SR style={{"--left":3,"--width":5} as any}>
            <span style={{display:"block",fontFamily:"inherit",fontSize:"var(--h2)",fontWeight:300,lineHeight:1.05}}>
              <span style={{display:"block"}}>You Won&apos;t Find</span>
              <span style={{display:"block",marginLeft:"1.5em"}}>Spaces Like</span>
              <span style={{display:"block",marginLeft:"0.5em"}}>These Anywhere</span>
            </span>
          </SR>
          <SR delay={150} style={{"--left":3,"--width":4,"--top":2,marginTop:"var(--h3)"} as any}>
            <p className="t-p" ref={aboutTextRef} style={{color:"rgba(var(--c-black-rgb),0.55)"}}>
              There are <strong style={{fontSize:"1.3em",fontWeight:300,fontStyle:"italic"}}>150+</strong> projects
              completed to date, each conceived within a specific context and maintained with absolute discretion.
            </p>
          </SR>
          <SR delay={200} style={{"--left":8,"--width":3,"--top":2} as any}>
            <CtaLabel style={{color:"rgba(var(--c-black-rgb),0.6)"}}>
              <span>See if</span><span>Nearby /</span>
            </CtaLabel>
            <Link href="/#contact" className="button -big -dark">Begin a Conversation</Link>
          </SR>
        </div>

        <Stats>
          {[{n:"20+",l:"Years"},{n:"150+",l:"Projects"},{n:"12",l:"Awards"},{n:"3",l:"Studios"}].map(s=>(
            <SR key={s.l}><StatN>{s.n}</StatN><StatL>{s.l}</StatL></SR>
          ))}
        </Stats>

        <SR style={{padding:"0 var(--g-margin)"}}>
          <Arch><Image src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80&auto=format&fit=crop" alt="Studio" fill sizes="650px" style={{objectFit:"cover"}}/></Arch>
        </SR>

        <SR delay={100} style={{textAlign:"center",maxWidth:600,margin:"var(--h3) auto 0",padding:"0 var(--g-margin)"}}>
          <p style={{fontSize:"var(--h3)",fontWeight:300}}>Shaped by Cathy Wang and a small group working across locations and disciplines.</p>
          <p className="t-p" style={{marginTop:"var(--m)",color:"rgba(var(--c-black-rgb),0.4)"}}>Their involvement is ongoing and collaborative.</p>
        </SR>
      </AboutSec>

      {/* ═══ JOURNAL ═══ */}
      <JournSec id="journal">
        <ProjTitle>
          <SR><SplitText className="t-large">Design</SplitText></SR>
          <SR delay={80}><SplitText className="t-large">Thinking</SplitText></SR>
          <SR delay={200}><p className="t-mm" style={{marginTop:"var(--h5)",color:"rgba(var(--c-cream-rgb),0.35)"}}>Now Forming</p></SR>
        </ProjTitle>
        <JGrid>
          {JOURNAL.map((j,i)=>(
            <SR key={j.slug} delay={i*70}>
              <JCard href={`/journal/${j.slug}`}>
                <JImg><Image src={j.image} alt={j.title} fill sizes="120px"/></JImg>
                <div style={{flex:1}}>
                  <span className="t-mm" style={{color:"rgba(var(--c-cream-rgb),0.3)"}}>{j.category} · {j.date}</span>
                  <div style={{fontSize:"var(--h5)",fontWeight:300,lineHeight:1.25,margin:"0.3rem 0"}}>{j.title}</div>
                  <p className="t-m" style={{color:"rgba(var(--c-cream-rgb),0.3)",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{j.excerpt}</p>
                </div>
              </JCard>
            </SR>
          ))}
        </JGrid>
      </JournSec>

      {/* ═══ ADMISSION ═══ */}
      <AdmSec id="contact">
        <AdmBg/>
        <SvgPath viewBox="0 0 1440 1080" preserveAspectRatio="none" style={{zIndex:0}}>
          <defs>
            <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F1EADE"/><stop offset=".35" stopColor="#fff"/><stop offset=".7" stopColor="#fff"/><stop offset="1" stopColor="#F1EADE"/>
            </linearGradient>
          </defs>
          <path fill="none" stroke="url(#ag)" strokeWidth="1" d="M545,144c-1556,171,838,414,874,310,21-60-656,120-1037,41s951,62,596,441" vectorEffect="non-scaling-stroke"/>
        </SvgPath>

        <SR style={{textAlign:"center",marginBottom:"var(--h3)",position:"relative",zIndex:1}}>
          <SplitText className="t-large">Admission</SplitText>
        </SR>

        <FormGrid>
          <Field $c="1/5" $mc="1/7"><FLabel><span>Full</span><span>Name</span></FLabel><FInput placeholder="Your Name"/></Field>
          <Field $c="5/9" $mc="1/7"><FLabel><span>Email</span><span>Address</span></FLabel><FInput type="email" placeholder="you@email.com"/></Field>
          <Field $c="1/5" $mc="1/4"><FLabel>Country</FLabel><FInput placeholder="United Arab Emirates"/></Field>
          <Field $c="5/9" $mc="4/7"><FLabel>City</FLabel><FInput placeholder="Dubai"/></Field>
          <Field $c="1/7" $mc="1/7" style={{marginTop:"var(--g-gap)"}}><FLabel><span>Context for</span><span>Inquiry /</span></FLabel><FArea rows={3} placeholder="Tell us about your project vision…"/></Field>
          <Field $c="5/9" $mc="1/7" style={{marginTop:"var(--h1)"}}><button className="button -big -dark" style={{width:"100%"}}>Submit Inquiry</button></Field>
        </FormGrid>
      </AdmSec>

      <Footer/>
    </main>
  );
}
