import { useEffect, useRef, type CSSProperties } from 'react';
import { manufacturingAbout, manufacturingIntro, manufacturingWhy } from '../../data/manufacturing';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';

/** Sets --p (0→1) on an element as it travels from the bottom of the viewport to `end` of the way up. */
function useScrollProgress<T extends HTMLElement>(end=.35){
  const ref=useRef<T>(null);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    if(prefersReducedMotion()){node.style.setProperty('--p','1');return;}
    let frame=0;
    const update=()=>{
      frame=0;
      const rect=node.getBoundingClientRect();
      const vh=window.innerHeight;
      const p=(vh*.92-rect.top)/(vh*(.92-end)+rect.height*.6);
      node.style.setProperty('--p',Math.min(1,Math.max(0,p)).toFixed(4));
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
  },[end]);
  return ref;
}

function gearPath(teeth:number,outer:number,inner:number){
  const points:string[]=[];
  const step=Math.PI*2/teeth;
  for(let i=0;i<teeth;i++){
    const a=i*step;
    [[a,inner],[a+step*.12,outer],[a+step*.5,outer],[a+step*.62,inner]].forEach(([angle,r])=>points.push(`${(Math.cos(angle)*r).toFixed(2)},${(Math.sin(angle)*r).toFixed(2)}`));
  }
  return `M${points.join('L')}Z`;
}
const bigGear=gearPath(18,100,86);
const smallGear=gearPath(12,68,55);

export function MfIntro(){
  const reading=useScrollProgress<HTMLParagraphElement>();
  const words=manufacturingIntro.split(' ');
  return <section className="kit-section mf-intro" aria-label="About R&D Therm">
    <div className="kit-shell mf-intro__inner">
      <p className="kit-eyebrow"><i aria-hidden="true"/>R&amp;D Therm India Pvt Ltd</p>
      {/* Words brighten in reading order as the paragraph scrolls up. */}
      <p ref={reading} className="mf-intro__lead">
        {words.map((word,i)=><span key={i} style={{'--w':(i/words.length).toFixed(4)} as CSSProperties}>{word} </span>)}
      </p>
      <div className="mf-intro__about">
        <span className="mf-intro__year" aria-hidden="true">1996</span>
        <p>{manufacturingAbout}</p>
      </div>
    </div>
  </section>;
}

export function MfWhy(){
  const gears=useScrollProgress<HTMLDivElement>(.1);
  const [list,inView]=useInView<HTMLOListElement>();
  return <section className="kit-section kit-dark mf-why" aria-labelledby="mf-why-title">
    <div ref={gears} className="kit-shell mf-why__inner">
      {/* Meshed gears turn with scroll; the small one runs faster and the other way. */}
      <div className="mf-gears" aria-hidden="true">
        <svg viewBox="-110 -110 220 220" className="mf-gear is-big"><path d={bigGear}/><circle r="34"/><circle r="12"/></svg>
        <svg viewBox="-78 -78 156 156" className="mf-gear is-small"><path d={smallGear}/><circle r="22"/><circle r="8"/></svg>
      </div>
      <div className="mf-why__copy">
        <p className="kit-eyebrow"><i aria-hidden="true"/>Why R&amp;D Therm</p>
        <h2 className="kit-h2" id="mf-why-title">Why choose<br/><em>R&amp;D Therm?</em></h2>
        <ol ref={list} className={`mf-rail${inView?' is-in':''}`}>
          {manufacturingWhy.map((item,i)=><li key={item} style={{'--i':i} as CSSProperties}><span className="mf-rail__bolt" aria-hidden="true"/>{item}</li>)}
        </ol>
      </div>
    </div>
  </section>;
}
