"use client";
import Link from "next/link";
import styled from "styled-components";
import SR from "./SR";

const Foot = styled.footer`
  background: var(--c-black); color: var(--c-cream);
  padding: var(--large) var(--g-margin) var(--g-gap);
  position: relative;
`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(var(--g-columns), 1fr);
  column-gap: var(--g-gap); row-gap: var(--h5);
`;
const NoSo = styled.span`grid-column: 1/4; font-size: var(--mm); color: rgba(var(--c-cream-rgb),0.2); @media(max-width:1024px){grid-column:1/4;}`;
const Indep = styled.span`grid-column: 4/8; font-size: var(--p); color: rgba(var(--c-cream-rgb),0.4); @media(max-width:1024px){grid-column:1/7; margin-top: var(--m);}`;
const NavWrap = styled.nav`
  grid-column: 1/13; display: flex; flex-wrap: wrap; gap: var(--g-gap);
  @media(max-width:1024px){grid-column:1/7;}
`;
const NL = styled(Link)`
  font-family: var(--font-t1); font-size: var(--h1); font-weight: 300; line-height: 0.95;
  color: rgba(var(--c-cream-rgb),0.4); transition: color 0.9s var(--f-cubic);
  &:hover { color: var(--c-cream); }
  @media(max-width:1024px){font-size: var(--h2);}
`;
const Bottom = styled.div`
  grid-column: 1/13; display: flex; justify-content: space-between; flex-wrap: wrap; gap: var(--m);
  padding-top: var(--g-gap); border-top: 1px solid rgba(var(--c-cream-rgb),0.05);
  @media(max-width:1024px){grid-column:1/7;}
`;
const Small = styled.span`font-size: var(--m); color: rgba(var(--c-cream-rgb),0.2);`;

export default function Footer() {
  return (
    <Foot>
      <Grid>
        <NoSo>Independent Practice</NoSo>
        <Indep>Operating across Dubai, Shanghai, and Paris since 2004.</Indep>
        <NavWrap>
          {[{l:"Projects",h:"/#projects"},{l:"About",h:"/#about"},{l:"Journal",h:"/#journal"},{l:"Contact",h:"/#contact"}].map(n=>(
            <NL key={n.l} href={n.h}>{n.l}</NL>
          ))}
        </NavWrap>
        <Bottom>
          <Small>© 2024 Montaigne Design</Small>
          <Small>Dubai · Shanghai · Paris</Small>
        </Bottom>
      </Grid>
    </Foot>
  );
}
