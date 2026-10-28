import { useEffect, useState } from 'react';
import { ArrowUpRight, Factory, Flag, LayoutGrid, MapPin } from 'lucide-react';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';
import RevealGroup from '../common/RevealGroup';
import { Eyebrow } from '../common/SectionTitle';

const stats=[
  {value:'1994', label:'Konark Engineers inception', Icon:Flag},
  {value:'3', label:'Integrated group companies', Icon:Factory},
  {value:'12', label:'Industry segments listed', Icon:LayoutGrid},
  {value:'Pan India', label:'Project execution reach', Icon:MapPin}
];

function CountUp({value}:{value:string}){
  const [ref,inView]=useInView<HTMLSpanElement>();
  const target=Number(value);
  const numeric=Number.isFinite(target);
  const from=target>1000?target-44:0;
  const [shown,setShown]=useState(from);
  useEffect(()=>{
    if(!numeric||!inView)return;
    if(prefersReducedMotion()){setShown(target);return;}
    const start=performance.now();
    let frame=0;
    const tick=(now:number)=>{
      const k=Math.min(1,(now-start)/1700);
      setShown(Math.round(from+(target-from)*(1-Math.pow(1-k,4))));
      if(k<1)frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(frame);
  },[inView,numeric,target,from]);
  if(!numeric)return <span ref={ref}>{value}</span>;
  return <span ref={ref} className="hm-count"><span className="hm-sr">{value}</span><span aria-hidden="true">{shown}</span></span>;
}

export default function AboutSection(){
  return <section className="hp-section hp-intro" id="intro" aria-labelledby="hp-intro-title">
    <div className="hp-shell">
      <RevealGroup className="hp-intro__grid">
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="hp-h2" id="hp-intro-title">One partner.<br/><em>Many possibilities.</em></h2>
        </div>
        <div className="hp-intro__body">
          <p className="hp-lead">Konark Global brings industrial equipment, project execution, manufacturing and service together to support essential processes.</p>
          <p>Since 1994, Konark Global has supported industry through its group companies, technical expertise and associations with leading equipment partners. Our aim is simple: dependable solutions that help customers work with confidence.</p>
          <a href="/about_us" className="hp-link">Meet Konark Global <ArrowUpRight size={17}/></a>
        </div>
      </RevealGroup>
      <RevealGroup className="hp-stats">
        {stats.map(({value,label,Icon},i)=><div className="hp-stat" key={label}>
          <div className="hp-stat__top">
            <span className="hp-stat__icon"><Icon size={21} strokeWidth={1.9} aria-hidden="true"/></span>
            <span className="hp-stat__index">{String(i+1).padStart(2,'0')}</span>
          </div>
          <strong><CountUp value={value}/></strong>
          <span className="hp-stat__label">{label}</span>
          <Icon className="hp-stat__watermark" strokeWidth={1.25} aria-hidden="true"/>
        </div>)}
      </RevealGroup>
    </div>
  </section>;
}
