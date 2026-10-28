import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { services } from '../../data/services';
import { prefersReducedMotion } from '../../hooks/useInView';

const glyphs='ABCDEFGHKMNPRSTUVWXYZ0123456789#%&*+=/<>';
const ticks=Array.from({length:31},(_,i)=>i);

/** Characters cycle through random glyphs before locking in, left to right.
    Final letters stay in the flow (transparent) so nothing reflows while scrambling. */
function Decode({text,delay=0}:{text:string;delay?:number}){
  const root=useRef<HTMLSpanElement>(null);
  useLayoutEffect(()=>{
    const chars=Array.from(root.current?.querySelectorAll<HTMLElement>('[data-c]')||[]);
    if(prefersReducedMotion())return;
    const start=performance.now()+delay;
    const lockAt=chars.map((_,i)=>start+i*38+Math.random()*260);
    chars.forEach(char=>char.classList.add('is-scrambling'));
    let frame=0,last=0;
    const tick=(now:number)=>{
      if(now-last>55){
        last=now;
        chars.forEach((char,i)=>{
          if(!char.classList.contains('is-scrambling'))return;
          if(now>=lockAt[i])char.classList.remove('is-scrambling');
          else char.dataset.g=glyphs[Math.floor(Math.random()*glyphs.length)];
        });
      }
      if(chars.some(char=>char.classList.contains('is-scrambling')))frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(frame);chars.forEach(char=>char.classList.remove('is-scrambling'))};
  },[delay]);
  return <span ref={root} aria-hidden="true">{[...text].map((char,i)=>char===' '?' ':<span className="sv-decode" data-c="" data-g={char} key={i}>{char}</span>)}</span>;
}

/** Split-flap board: the top half of the old line folds down and the new line's bottom half drops in. */
function SplitFlap(){
  const [index,setIndex]=useState(0);
  useEffect(()=>{
    if(prefersReducedMotion())return;
    const timer=setInterval(()=>setIndex(i=>(i+1)%services.length),2600);
    return()=>clearInterval(timer);
  },[]);
  const next=services[index];
  const prev=services[(index+services.length-1)%services.length];
  return <span className="sv-flap" aria-hidden="true">
    <span className="sv-flap__half is-top"><span>{next}</span></span>
    <span className="sv-flap__half is-bottom"><span>{prev}</span></span>
    <span className="sv-flap__half is-top is-fold" key={`t${index}`}><span>{prev}</span></span>
    <span className="sv-flap__half is-bottom is-drop" key={`b${index}`}><span>{next}</span></span>
  </span>;
}

export default function ServicesHero(){
  const gauge=useRef<SVGSVGElement>(null);
  // The needle leans toward the pointer, within the dial's sweep.
  const lean=(event:PointerEvent<HTMLElement>)=>{
    const svg=gauge.current;
    if(event.pointerType!=='mouse'||!svg)return;
    const box=svg.getBoundingClientRect();
    const angle=Math.atan2(event.clientY-(box.top+box.height/2),event.clientX-(box.left+box.width/2))*180/Math.PI+90;
    const wrapped=((angle+540)%360)-180;
    svg.style.setProperty('--lean',`${Math.max(-120,Math.min(120,wrapped))-40}deg`);
  };
  return <section className="sv-hero" aria-labelledby="sv-hero-title" onPointerMove={lean} onPointerLeave={()=>gauge.current?.style.removeProperty('--lean')}>
    <div className="sv-shell sv-hero__inner">
      <div className="sv-hero__copy">
        <p className="sv-hero__eyebrow"><i aria-hidden="true"/>Services</p>
        <h1 className="sv-hero__title" id="sv-hero-title" aria-label="Support through every operating stage.">
          <Decode text="Support through every"/> <em><Decode text="operating stage." delay={420}/></em>
        </h1>
        <p className="sv-hero__lead">Service for industrial utility equipment, systems and plant operations.</p>
        <div className="sv-hero__actions">
          <a className="sv-btn sv-btn--primary" href="#service-list">See all services <ArrowDown size={18}/></a>
          <a className="sv-link is-light" href="/contact_us">Request a service <ArrowUpRight size={17}/></a>
        </div>
        <div className="sv-hero__board">
          <span className="sv-hero__board-label"><i aria-hidden="true"/>Now servicing</span>
          <SplitFlap/>
        </div>
      </div>
      <figure className="sv-dial" aria-hidden="true">
        <svg ref={gauge} viewBox="0 0 360 360">
          <circle className="sv-dial__face" cx="180" cy="180" r="160"/>
          <circle className="sv-dial__ring" cx="180" cy="180" r="138"/>
          {ticks.map(i=><line className={`sv-dial__tick${i%5===0?' is-major':''}`} key={i} x1="180" y1={i%5===0?52:58} x2="180" y2="72"
            style={{'--i':i,transform:`rotate(${-135+i*9}deg)`} as CSSProperties}/>)}
          <path className="sv-dial__zone" d="M 321 142.2 A 146 146 0 0 1 283.2 283.2"/>
          <g className="sv-dial__needle"><g className="sv-dial__arm">
            <path d="M180 62 L186 180 L174 180 Z"/>
            <circle cx="180" cy="180" r="15"/>
          </g></g>
          <circle className="sv-dial__cap" cx="180" cy="180" r="6"/>
        </svg>
        <figcaption>
          <strong>24/7</strong>
          <span><b/>Support through our committed team</span>
        </figcaption>
      </figure>
    </div>
  </section>;
}
