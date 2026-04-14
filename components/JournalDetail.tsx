"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { getEntry, JOURNAL } from "@/data/content";
import SplitText from "./SplitText";
import SR from "./SR";
import Footer from "./Footer";
import { usePageReady, useCursorTrail } from "@/hooks/useStringEngine";

const Hero = styled.section`position:relative;height:50vh;overflow:hidden;min-height:340px`;
const HOv = styled.div`position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(var(--c-black-rgb),0.25) 0%,rgba(var(--c-black-rgb),0.75) 60%,var(--c-black) 100%)`;
const Back = styled(Link)`position:absolute;top:var(--h3);left:var(--g-margin);z-index:10;font-size:var(--mm);color:var(--c-cream);@media(max-width:1024px){top:var(--h5);left:var(--g-gap)}`;
const HC = styled.div`position:absolute;bottom:var(--h3);left:var(--g-margin);right:var(--g-margin);z-index:2;max-width:700px;@media(max-width:1024px){bottom:var(--h5);left:var(--g-gap);right:var(--g-gap)}`;
const Meta = styled.div`font-size:var(--mm);color:rgba(var(--c-cream-rgb),0.35);margin-bottom:var(--m)`;

const Article = styled.article`padding:var(--h3) var(--g-margin);max-width:680px;margin:0 auto;@media(max-width:1024px){padding:var(--h5) var(--g-gap)}`;
const P = styled.p`font-size:var(--p);line-height:2.2;color:rgba(var(--c-cream-rgb),0.55);font-weight:300;margin-bottom:var(--h5);
  &:first-of-type::first-letter{font-size:3rem;float:left;line-height:1;margin-right:var(--m);color:var(--c-brown);font-weight:300;font-style:italic}`;

const MoreWrap = styled.section`padding:var(--h3) var(--g-margin);max-width:680px;margin:0 auto;border-top:1px solid rgba(var(--c-cream-rgb),0.05);@media(max-width:1024px){padding:var(--h5) var(--g-gap)}`;
const MoreCard = styled(Link)`display:block;padding:var(--g-gap);border:1px solid rgba(var(--c-cream-rgb),0.05);border-radius:0.3rem;transition:border-color 0.4s;margin-bottom:var(--m);&:hover{border-color:rgba(var(--c-cream-rgb),0.12)}`;

export default function JournalDetail() {
  const { slug } = useParams() as { slug: string };
  const entry = getEntry(slug);
  usePageReady();
  useCursorTrail();
  if (!entry) return <div style={{padding:"var(--large) var(--g-margin)",textAlign:"center"}}><h1>Not found</h1><Link href="/">← Home</Link></div>;
  const others = JOURNAL.filter(j => j.slug !== slug).slice(0, 2);

  return (
    <main>
      <Hero>
        <Image src={entry.image} alt={entry.title} fill sizes="100vw" priority style={{objectFit:"cover"}}/>
        <HOv/>
        <Back href="/#journal">← Back to Journal</Back>
        <HC>
          <Meta>{entry.category} · {entry.date} · {entry.readTime}</Meta>
          <SplitText className="t-h1">{entry.title}</SplitText>
        </HC>
      </Hero>

      <Article>
        {entry.content.split("\n\n").map((para, i) => (
          <SR key={i} delay={i * 40}><P>{para}</P></SR>
        ))}
      </Article>

      <MoreWrap>
        <div style={{fontSize:"var(--mm)",marginBottom:"var(--g-gap)",color:"rgba(var(--c-cream-rgb),0.25)"}}>Continue Reading</div>
        {others.map(j => (
          <SR key={j.slug}>
            <MoreCard href={`/journal/${j.slug}`}>
              <div style={{fontSize:"var(--mm)",color:"rgba(var(--c-cream-rgb),0.25)",marginBottom:"var(--mm)"}}>{j.category} · {j.date}</div>
              <div style={{fontSize:"var(--h5)",fontWeight:300}}>{j.title}</div>
            </MoreCard>
          </SR>
        ))}
      </MoreWrap>

      <Footer/>
    </main>
  );
}
