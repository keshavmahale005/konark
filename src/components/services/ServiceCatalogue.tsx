import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import { Activity, CalendarCheck, ClipboardCheck, Cog, Droplets, Factory, Fan, Fuel, Gauge, Hourglass, ShieldCheck, Siren, Waves, Wind, Wrench, Zap } from 'lucide-react';
import { services } from '../../data/services';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';

// One icon per entry in data/services.ts, in the same order.
const icons=[CalendarCheck,Siren,Wrench,Gauge,Hourglass,Zap,Fuel,ClipboardCheck,Factory,Droplets,Activity,ShieldCheck,Wind,Waves,Cog,Fan];

export default function ServiceCatalogue(){
  const grid=useRef<HTMLDivElement>(null);
  const [head,headIn]=useInView<HTMLDivElement>();
  const [body,bodyIn]=useInView<HTMLDivElement>('0px 0px -15% 0px');

  // Cards flip in along diagonals: delay grows with row + column, whatever the column count.
  useEffect(()=>{
    const node=grid.current;
    if(!node)return;
    const place=()=>{
      const cards=Array.from(node.children) as HTMLElement[];
      const rows=[...new Set(cards.map(card=>card.offsetTop))].sort((a,b)=>a-b);
      const cols=[...new Set(cards.map(card=>card.offsetLeft))].sort((a,b)=>a-b);
      cards.forEach(card=>card.style.setProperty('--d',`${(rows.indexOf(card.offsetTop)+cols.indexOf(card.offsetLeft))*85}ms`));
    };
    place();
    window.addEventListener('resize',place);
    return()=>window.removeEventListener('resize',place);
  },[]);

  // One light source for the whole grid: every card's border picks up the glow near the pointer.
  const glow=(event:PointerEvent<HTMLDivElement>)=>{
    if(event.pointerType!=='mouse'||prefersReducedMotion())return;
    for(const card of Array.from(event.currentTarget.children) as HTMLElement[]){
      const rect=card.getBoundingClientRect();
      card.style.setProperty('--mx',`${event.clientX-rect.left}px`);
      card.style.setProperty('--my',`${event.clientY-rect.top}px`);
    }
  };

  return <section className="sv-section sv-catalogue" id="service-list" aria-labelledby="sv-catalogue-title">
    <div className="sv-shell">
      <div ref={head} className={`sv-catalogue__head${headIn?' is-in':''}`}>
        <p className="sv-eyebrow"><i aria-hidden="true"/>What we do</p>
        <h2 className="sv-h2" id="sv-catalogue-title">What our engineers<br/><em>take care of.</em></h2>
      </div>
      <div ref={body}>
        <div ref={grid} className={`sv-cards${bodyIn?' is-in':''}`} onPointerMove={glow}>
          {services.map((service,i)=>{
            const Icon=icons[i];
            return <article className="sv-card" id={`service-${i+1}`} key={service} style={{'--i':i} as CSSProperties}>
              <span className="sv-card__icon" aria-hidden="true"><Icon size={22} strokeWidth={1.7}/></span>
              <b className="sv-card__num">{String(i+1).padStart(2,'0')}</b>
              <h3>{service}</h3>
            </article>;
          })}
        </div>
      </div>
    </div>
  </section>;
}
