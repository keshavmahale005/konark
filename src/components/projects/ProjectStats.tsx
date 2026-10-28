import type { CSSProperties } from 'react';
import { projectGallery } from '../../data/projectGallery';
import { useInView } from '../../hooks/useInView';

// Figures come from the About timeline, areas of operation and this page's gallery.
const stats=[
  {value:'1994',label:'Konark Engineers inception'},
  {value:'2012',label:'Project company Konark Fabtech started'},
  {value:String(projectGallery.length),label:'Project snapshots in this gallery'},
  {value:'Pan India',label:'Project execution reach'}
];
const strip=Array.from({length:20},(_,i)=>i%10);

/** Each digit rolls up a 0–9 reel twice before landing; words rise letter by letter. */
function Odometer({value,delay}:{value:string;delay:number}){
  const numeric=/^\d+$/.test(value);
  return <span className={`pj-odo${numeric?'':' is-text'}`} aria-hidden="true">
    {[...value].map((char,i)=>{
      const vars={'--i':i,'--delay':`${delay+i*110}ms`} as CSSProperties;
      if(!numeric)return <span className="pj-odo__char" style={vars} key={i}>{char===' '?' ':char}</span>;
      return <span className="pj-odo__digit" style={{...vars,'--d':char} as CSSProperties} key={i}>
        <span className="pj-odo__strip">{strip.map((n,j)=><span key={j}>{n}</span>)}</span>
      </span>;
    })}
  </span>;
}

export default function ProjectStats(){
  const [ref,inView]=useInView<HTMLDivElement>('0px 0px -8% 0px');
  return <section className="pj-stats-section" aria-label="Projects at a glance">
    <div className="pj-shell">
      <div ref={ref} className={`pj-stats${inView?' is-in':''}`}>
        {stats.map((stat,i)=><div className="pj-stat" key={stat.label} style={{'--i':i} as CSSProperties}>
          <strong><span className="pj-sr">{stat.value}</span><Odometer value={stat.value} delay={i*140}/></strong>
          <span className="pj-stat__label">{stat.label}</span>
        </div>)}
      </div>
    </div>
  </section>;
}
