import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Cog, HardHat, PencilRuler, Power, Truck } from 'lucide-react';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';

// The five stages named in Konark Fabtech's mission statement on the About page.
const steps=[['Design',PencilRuler],['Engineer',Cog],['Supply',Truck],['Execute',HardHat],['Commission',Power]] as const;

export default function ProjectProcess(){
  const track=useRef<HTMLDivElement>(null);
  const [lit,setLit]=useState(0);
  const [head,headIn]=useInView<HTMLDivElement>();
  useEffect(()=>{
    const node=track.current;
    if(!node)return;
    if(prefersReducedMotion()){node.style.setProperty('--p','1');setLit(steps.length);return;}
    let frame=0;
    // Scroll-linked: the connector fills as the track travels from 85% to 35% of the viewport.
    const update=()=>{
      frame=0;
      const rect=node.getBoundingClientRect();
      const vh=window.innerHeight;
      const vertical=window.matchMedia('(max-width: 760px)').matches;
      const travel=vertical?Math.max(rect.height,vh*.5):vh*.5;
      const p=Math.min(1,Math.max(0,(vh*.85-rect.top)/travel));
      node.style.setProperty('--p',p.toFixed(4));
      setLit(Math.min(steps.length,Math.floor(p*(steps.length-1)+1e-3)+(p>0?1:0)));
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
  },[]);
  return <section className="pj-section pj-process" aria-labelledby="pj-process-title">
    <div className="pj-shell">
      <div ref={head} className={`pj-process__head${headIn?' is-in':''}`}>
        <div>
          <p className="pj-eyebrow is-sentence"><i aria-hidden="true"/>Turnkey projects · Konark Fabtech</p>
          <h2 className="pj-h2" id="pj-process-title">From first drawing<br/><em>to commissioning.</em></h2>
        </div>
        <p className="pj-process__lead">Konark Fabtech India Pvt. Ltd. designs, engineers, supplies, executes, and commissions turnkey installation projects for industrial equipment.</p>
      </div>
      <div ref={track} className="pj-steps">
        <span className="pj-steps__rail" aria-hidden="true"><span/></span>
        <ol className="pj-steps__list">
          {steps.map(([label,Icon],i)=><li className={`pj-step${i<lit?' is-lit':''}`} key={label} style={{'--i':i} as CSSProperties}>
            <span className="pj-step__node" aria-hidden="true"><Icon size={24} strokeWidth={1.7}/></span>
            <span className="pj-step__num" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
            <strong>{label}</strong>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
