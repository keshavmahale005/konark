import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { coreCompetencies } from '../../data/services';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';

const pad=(n:number)=>String(n).padStart(2,'0');

/** Sticky cards pile up as you scroll; each one sinks back and dims as the
    next slides over it, and the counter follows the card on top. */
export default function ServiceCompetencies(){
  const stack=useRef<HTMLOListElement>(null);
  const [current,setCurrent]=useState(0);
  const [intro,introIn]=useInView<HTMLDivElement>();
  useEffect(()=>{
    const node=stack.current;
    if(!node)return;
    const cards=Array.from(node.children) as HTMLElement[];
    if(prefersReducedMotion())return;
    let frame=0;
    const update=()=>{
      frame=0;
      let top=0;
      cards.forEach((card,i)=>{
        const rect=card.getBoundingClientRect();
        const stickTop=parseFloat(getComputedStyle(card).top)||0;
        if(rect.top<=stickTop+2)top=i;
        const next=cards[i+1];
        if(!next){card.style.setProperty('--cover','0');return;}
        const cover=Math.min(1,Math.max(0,(rect.bottom-next.getBoundingClientRect().top)/rect.height));
        card.style.setProperty('--cover',cover.toFixed(3));
      });
      setCurrent(top);
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
  },[]);
  return <section className="sv-section sv-skills" aria-labelledby="sv-skills-title">
    <div className="sv-shell sv-skills__inner">
      <div ref={intro} className={`sv-skills__intro${introIn?' is-in':''}`}>
        <p className="sv-eyebrow"><i aria-hidden="true"/>Why our service works</p>
        <h2 className="sv-h2" id="sv-skills-title">Our core<br/><em>competencies.</em></h2>
        <p className="sv-skills__counter" aria-hidden="true"><b key={current}>{pad(current+1)}</b><span>/ {pad(coreCompetencies.length)}</span></p>
        <p className="sv-skills__title" aria-hidden="true"><span key={current}>{coreCompetencies[current][0]}</span></p>
      </div>
      <ol ref={stack} className="sv-skills__stack">
        {coreCompetencies.map(([title,body],i)=><li className="sv-skill" key={title} style={{'--i':i} as CSSProperties}>
          <span className="sv-skill__num" aria-hidden="true">{pad(i+1)}</span>
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </li>)}
      </ol>
    </div>
  </section>;
}
