import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { ArrowUpRight, Box, Container, Cylinder, FlaskConical, Layers, Mail, Phone } from 'lucide-react';
import { capabilities, capabilityIndustries, materials } from '../../data/manufacturing';
import { manufacturingGallery } from '../../data/manufacturingGallery';
import { useInView } from '../../hooks/useInView';

const capabilityIcons=[Cylinder,Layers,Container,FlaskConical,Box];
// Deterministic scatter for the exploded view: [x, y, rotation] per part.
const scatter=[[-60,-40,-14],[50,-30,10],[-30,40,-8],[70,50,16],[-80,10,6]];
const pad=(n:number)=>String(n).padStart(2,'0');

/** Parts start scattered like an exploded drawing and snap together. */
export function MfCapabilities(){
  const [ref,inView]=useInView<HTMLDivElement>();
  return <section className="kit-section mf-caps" id="manufacturing-capabilities" aria-labelledby="mf-caps-title">
    <div className="kit-shell">
      <p className="kit-eyebrow"><i aria-hidden="true"/>What we build</p>
      <h2 className="kit-h2" id="mf-caps-title">Manufacturing<br/><em>capabilities.</em></h2>
      <div ref={ref} className={`mf-caps__grid${inView?' is-in':''}`}>
        {capabilities.map(([name,spec],i)=>{
          const Icon=capabilityIcons[i];
          const part=(k:number)=>{const [x,y,r]=scatter[(i+k)%scatter.length];return {'--x':`${x}px`,'--y':`${y}px`,'--r':`${r}deg`,'--k':i*2+k} as CSSProperties};
          return <article className="mf-cap" key={name}>
            <span className="mf-cap__part mf-cap__icon" style={part(0)} aria-hidden="true"><Icon size={26} strokeWidth={1.6}/></span>
            <span className="mf-cap__part mf-cap__num" style={part(1)} aria-hidden="true">{pad(i+1)}</span>
            <h3 className="mf-cap__part" style={part(2)}>{name}</h3>
            <dl className="mf-cap__part" style={part(3)}>
              {spec.split(' · ').map(row=>{const [label,value]=row.split(': ');return <div key={row}><dt>{label}</dt><dd>{value}</dd></div>})}
            </dl>
          </article>;
        })}
      </div>
      <p className="mf-caps__industry">{capabilityIndustries}</p>
    </div>
  </section>;
}

/** Material tiles are dealt from one stacked deck to their places; a polish shine runs across them. */
export function MfMaterials(){
  const [ref,inView]=useInView<HTMLDivElement>();
  const grid=useRef<HTMLDivElement>(null);
  useLayoutEffect(()=>{
    const node=grid.current;
    if(!node)return;
    const place=()=>{
      const tiles=Array.from(node.children) as HTMLElement[];
      const deck=tiles[0];
      tiles.forEach((tile,i)=>{
        tile.style.setProperty('--dx',`${deck.offsetLeft-tile.offsetLeft}px`);
        tile.style.setProperty('--dy',`${deck.offsetTop-tile.offsetTop}px`);
        tile.style.setProperty('--rot',`${(i%2?1:-1)*(3+i*2)}deg`);
      });
    };
    place();
    window.addEventListener('resize',place);
    return()=>window.removeEventListener('resize',place);
  },[]);
  return <section className="kit-section mf-materials" aria-labelledby="mf-materials-title">
    <div ref={ref} className={`kit-shell mf-materials__inner${inView?' is-in':''}`}>
      <div>
        <p className="kit-eyebrow"><i aria-hidden="true"/>Materials</p>
        <h2 className="kit-h2" id="mf-materials-title">Built in the<br/><em>right metal.</em></h2>
      </div>
      <div ref={grid} className="mf-deck">
        {materials.map((material,i)=><div className="mf-metal" key={material} style={{'--i':i} as CSSProperties}>
          <span>{pad(i+1)}</span>
          <strong>{material}</strong>
        </div>)}
      </div>
    </div>
  </section>;
}

/** Vertical scroll drives the photo track sideways while the section is pinned. */
export function MfTrack(){
  const outer=useRef<HTMLElement>(null);
  const track=useRef<HTMLDivElement>(null);
  const [index,setIndex]=useState(0);
  const [pinned,setPinned]=useState(true);
  useEffect(()=>{
    const section=outer.current,strip=track.current;
    if(!section||!strip)return;
    const query=window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)');
    let frame=0;
    const measure=()=>{
      const pin=!query.matches;
      setPinned(pin);
      // The track moves faster than the page scrolls, so the pin lasts about two-thirds of its length.
      section.style.height=pin?`${(strip.scrollWidth-window.innerWidth)*.65+window.innerHeight}px`:'';
      update();
    };
    const update=()=>{
      frame=0;
      if(query.matches){strip.style.transform='';return;}
      const distance=strip.scrollWidth-window.innerWidth;
      const p=Math.min(1,Math.max(0,-section.getBoundingClientRect().top/Math.max(1,section.offsetHeight-window.innerHeight)));
      strip.style.transform=`translate3d(${(-p*distance).toFixed(1)}px,0,0)`;
      section.style.setProperty('--p',p.toFixed(4));
      setIndex(Math.round(p*(manufacturingGallery.length-1)));
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    // Frames have fixed widths in CSS, so the track length is known before images load.
    measure();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',measure);
    query.addEventListener('change',measure);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',measure);query.removeEventListener('change',measure)};
  },[]);
  return <section ref={outer} className={`mf-track${pinned?' is-pinned':''}`} aria-labelledby="mf-track-title">
    <div className="mf-track__sticky">
      <div className="kit-shell mf-track__head">
        <div>
          <p className="kit-eyebrow is-light"><i aria-hidden="true"/>R&amp;D Therm</p>
          <h2 className="kit-h2" id="mf-track-title">Our manufacturing<br/><em>projects.</em></h2>
        </div>
        <p className="mf-track__count" aria-hidden="true"><b>{pad(index+1)}</b> / {pad(manufacturingGallery.length)}</p>
      </div>
      <div ref={track} className="mf-track__strip">
        {manufacturingGallery.map((item,i)=><figure className="mf-shot" key={item.image}>
          <img src={item.image} alt={`${item.title} — R&D Therm manufacturing`} loading="lazy" decoding="async"/>
          {/* The photos carry their own printed titles, so only the index shows. */}
          <figcaption><span>{pad(i+1)}</span><span className="kit-sr">{item.title}</span></figcaption>
        </figure>)}
      </div>
      <span className="mf-track__bar" aria-hidden="true"><i/></span>
    </div>
  </section>;
}

/** The headline glows like hot metal wherever the pointer is; one heat pass runs across it on entry. */
export function MfCTA(){
  const [ref,inView]=useInView<HTMLDivElement>();
  const heat=(event:PointerEvent<HTMLDivElement>)=>{
    if(event.pointerType!=='mouse')return;
    const title=event.currentTarget.querySelector('h2');
    if(!title)return;
    const rect=title.getBoundingClientRect();
    title.style.setProperty('--hx',`${event.clientX-rect.left}px`);
    title.style.setProperty('--hy',`${event.clientY-rect.top}px`);
  };
  return <section className="mf-cta-section" aria-labelledby="mf-cta-title">
    <div className="kit-shell">
      <div ref={ref} className={`mf-cta kit-dark${inView?' is-in':''}`} onPointerMove={heat}>
        <span className="mf-cta__rivets" aria-hidden="true"><i/><i/><i/><i/></span>
        <div>
          <p className="kit-eyebrow"><i aria-hidden="true"/>Start a conversation</p>
          <h2 className="kit-h2 mf-cta__title" id="mf-cta-title">Let’s solve your<br/>next challenge.</h2>
        </div>
        <div className="mf-cta__actions">
          <a className="kit-btn kit-btn--primary mf-btn" href="/contact_us">Get in touch <ArrowUpRight size={17}/></a>
          <ul className="kit-contacts">
            <li><a href="tel:+917888008030"><Phone size={16} aria-hidden="true"/>+91 78880 08030</a></li>
            <li><a href="mailto:sales@konarkglobal.com"><Mail size={16} aria-hidden="true"/>sales@konarkglobal.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
