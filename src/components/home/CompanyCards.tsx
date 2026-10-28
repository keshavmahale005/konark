import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { prefersReducedMotion } from '../../hooks/useInView';
import RevealGroup from '../common/RevealGroup';
import { Eyebrow } from '../common/SectionTitle';

const companies=[
  ['01','Konark Engineers','Industrial utility equipment · Sales & service','/products'],
  ['02','Konark Fabtech','Turnkey projects · Installation','/projects'],
  ['03','R&D Therm','Process equipment manufacturing','/manufacturing']
];

export default function CompanyCards(){
  const section=useRef<HTMLElement>(null);
  useEffect(()=>{
    const node=section.current;
    if(!node||prefersReducedMotion())return;
    let frame=0;
    const update=()=>{
      frame=0;
      const box=node.getBoundingClientRect();
      const p=(window.innerHeight-box.top)/(window.innerHeight+box.height);
      node.style.setProperty('--hm-wx',Math.min(1,Math.max(0,p)).toFixed(3));
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll)};
  },[]);
  return <section ref={section} className="hp-section hp-group" aria-labelledby="hp-group-title">
    <span className="hp-group__watermark" aria-hidden="true">Konark</span>
    <div className="hp-shell hp-group__grid">
      <RevealGroup className="hp-group__intro">
        <Eyebrow light>One group · complementary strengths</Eyebrow>
        <h2 className="hp-h2" id="hp-group-title">From equipment to<br/><em>engineered outcomes.</em></h2>
        <p>Konark Engineers, Konark Fabtech and R&D Therm bring sales and service, turnkey projects, and process equipment manufacturing under one group.</p>
        <a href="/about_us" className="hp-btn hp-btn--primary">Explore the group <ArrowRight size={17}/></a>
      </RevealGroup>
      <RevealGroup className="hp-group__list">
        {companies.map(([n,title,desc,href])=><a className="hp-company" href={href} key={n}>
          <b>{n}</b>
          <span className="hp-company__text"><strong>{title}</strong><small>{desc}</small></span>
          <span className="hp-company__arrow"><ArrowUpRight size={20}/></span>
        </a>)}
      </RevealGroup>
    </div>
  </section>;
}
