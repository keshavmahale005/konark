import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { ArrowDown, ArrowUpRight, Mail, Phone } from 'lucide-react';
import { sectors } from '../../data/industries';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';

const media='https://www.konarkglobal.com/assets/images/industry';
const imageOf=(file:string)=>`${media}/${file}.jpg`;
const pad=(n:number)=>String(n).padStart(2,'0');

/** Letters fall into place one by one and bounce on landing. Words stay unbroken. */
function Drop({text,start=0}:{text:string;start?:number}){
  let index=start;
  return <span aria-hidden="true">{text.split(' ').flatMap((word,w)=>[w?' ':null,<span className="in-word" key={w}>
    {[...word].map((char,c)=><span className="in-drop" key={c} style={{'--i':index++} as CSSProperties}>{char}</span>)}
  </span>])}</span>;
}

export function InHero(){
  const [flipped,setFlipped]=useState(false);
  // Every few seconds a diagonal wave turns the cubes between photo and name.
  useEffect(()=>{
    if(prefersReducedMotion())return;
    const timer=setInterval(()=>setFlipped(f=>!f),3800);
    return()=>clearInterval(timer);
  },[]);
  return <section className="in-hero kit-dark" aria-labelledby="in-hero-title">
    <div className="kit-shell in-hero__inner">
      <div className="in-hero__copy">
        <p className="kit-eyebrow"><i aria-hidden="true"/>Industry segments</p>
        <h1 className="kit-h1 in-hero__title" id="in-hero-title" aria-label="Deep understanding. Across industries.">
          <Drop text="Deep understanding."/><br/>
          <em className="in-photo-text" aria-hidden="true">Across industries.</em>
        </h1>
        <p className="kit-lead in-hero__lead">Explore industry-specific solutions crafted to enhance your processes, productivity, and innovation.</p>
        <div className="in-hero__foot">
          <a className="kit-btn kit-btn--primary in-btn" href="#in-sectors">Browse industries <ArrowDown size={18}/></a>
          <span className="in-hero__meta" aria-hidden="true">Industrial solutions <i/> Nashik, India</span>
        </div>
      </div>
      <div className={`in-cubes${flipped?' is-flipped':''}`} aria-hidden="true">
        {sectors.map(([name,,file],i)=><div className="in-cube" key={name} style={{'--r':Math.floor(i/4),'--c':i%4} as CSSProperties}>
          <div className="in-cube__body">
            <span className="in-cube__face is-front"><img src={imageOf(file)} alt="" loading={i<8?'eager':'lazy'} decoding="async"/></span>
            <span className="in-cube__face is-bottom"><b>{pad(i+1)}</b>{name}</span>
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}

/** Characters appear one after another behind a moving caret. */
function Typed({parts,active}:{parts:{text:string;em?:boolean;br?:boolean}[];active:boolean}){
  let index=0;
  const total=parts.reduce((n,part)=>n+part.text.length,0);
  return <span className={`in-type${active?' is-typing':''}`} aria-hidden="true">
    {parts.map((part,p)=>{
      const chars=[...part.text].map((char,c)=>{const i=index++;return <span key={c} className={i===total-1?'is-last':undefined} style={{'--i':i} as CSSProperties}>{char}</span>});
      return <span key={p}>{part.em?<em>{chars}</em>:chars}{part.br&&<br/>}</span>;
    })}
  </span>;
}

export function InSectors(){
  const [head,headIn]=useInView<HTMLDivElement>();
  const [list,listIn]=useInView<HTMLUListElement>('0px 0px -10% 0px');
  const [active,setActive]=useState(0);
  const [hovering,setHovering]=useState(false);
  const preview=useRef<HTMLDivElement>(null);
  const target=useRef({x:0,y:0});

  // The preview chases the pointer with easing and leans into horizontal speed.
  useEffect(()=>{
    if(!hovering||prefersReducedMotion())return;
    const node=preview.current;
    if(!node)return;
    let frame=0,x=target.current.x,y=target.current.y;
    const tick=()=>{
      const dx=target.current.x-x,dy=target.current.y-y;
      x+=dx*.14;y+=dy*.14;
      node.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${Math.max(-12,Math.min(12,dx*.12)).toFixed(2)}deg)`;
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(frame);
  },[hovering]);

  const track=(event:PointerEvent<HTMLUListElement>)=>{
    if(event.pointerType!=='mouse')return;
    const box=event.currentTarget.getBoundingClientRect();
    target.current={x:event.clientX-box.left,y:event.clientY-box.top};
    if(!hovering)setHovering(true);
  };

  return <section className="kit-section in-sectors" id="in-sectors" aria-labelledby="in-sectors-title">
    <div className="kit-shell">
      <div ref={head} className={`in-sectors__head${headIn?' is-in':''}`}>
        <div>
          <p className="kit-eyebrow"><i aria-hidden="true"/>Industries we support</p>
          <h2 className="kit-h2" id="in-sectors-title" aria-label="Purpose-built thinking for every process.">
            <Typed active={headIn} parts={[{text:'Purpose-built thinking',br:true},{text:'for '},{text:'every process.',em:true}]}/>
          </h2>
        </div>
        <p className="kit-lead">From food and pharmaceuticals to steel and engineering, explore the sectors connected by industrial solutions.</p>
      </div>
      <div className="in-index">
        <ul ref={list} className={`in-list${listIn?' is-in':''}${hovering?' is-hovering':''}`} onPointerMove={track} onPointerLeave={()=>setHovering(false)}>
          {sectors.map(([name,desc,file],i)=><li className={`in-row${active===i?' is-active':''}`} key={name} style={{'--i':i} as CSSProperties} onPointerEnter={()=>setActive(i)}>
            <span className="in-row__num" aria-hidden="true">{pad(i+1)}</span>
            <h3 className="in-row__name"><span data-text={name}>{name}</span></h3>
            <p className="in-row__desc">{desc}</p>
            <img className="in-row__thumb" src={imageOf(file)} alt={`${name} industry`} loading="lazy" decoding="async"/>
            <a className="in-row__link" href="/contact_us" aria-label={`Enquire about ${name}`}><ArrowUpRight size={18}/></a>
          </li>)}
        </ul>
        <div ref={preview} className={`in-preview${hovering?' is-visible':''}`} aria-hidden="true">
          {sectors.map(([name,,file],i)=><img key={name} className={active===i?'is-active':undefined} src={imageOf(file)} alt="" loading="lazy" decoding="async"/>)}
        </div>
      </div>
    </div>
  </section>;
}

/** Letters swell like a dock as the pointer passes over the headline. */
export function InCTA(){
  const [ref,inView]=useInView<HTMLDivElement>();
  const title=useRef<HTMLHeadingElement>(null);
  const magnify=(event:PointerEvent<HTMLDivElement>)=>{
    if(event.pointerType!=='mouse'||prefersReducedMotion())return;
    title.current?.querySelectorAll<HTMLElement>('.in-mag').forEach(letter=>{
      const box=letter.getBoundingClientRect();
      const d=Math.hypot(event.clientX-(box.left+box.width/2),(event.clientY-(box.top+box.height/2))*1.6);
      const s=1+.42*Math.max(0,1-d/150);
      letter.style.transform=`translateY(${(-(s-1)*34).toFixed(1)}px) scale(${s.toFixed(3)})`;
    });
  };
  const rest=()=>title.current?.querySelectorAll<HTMLElement>('.in-mag').forEach(letter=>{letter.style.transform=''});
  // Letters sit in per-word groups so a word never breaks across lines.
  const letters=(text:string)=>text.split(' ').flatMap((word,w)=>[w?' ':null,<span className="in-word" key={w}>{[...word].map((char,i)=><span className="in-mag" key={i}>{char}</span>)}</span>]);
  return <section className="in-cta-section" aria-labelledby="in-cta-title">
    <div className="kit-shell">
      <div ref={ref} className={`in-cta${inView?' is-in':''}`} onPointerMove={magnify} onPointerLeave={rest}>
        <div>
          <p className="kit-eyebrow is-light"><i aria-hidden="true"/>Start a conversation</p>
          <h2 ref={title} className="kit-h2 in-cta__title" id="in-cta-title" aria-label="Let’s solve your next challenge.">
            <span aria-hidden="true">{letters('Let’s solve your')}<br/><em>{letters('next challenge.')}</em></span>
          </h2>
        </div>
        <div className="in-cta__actions">
          <a className="kit-btn kit-btn--dark in-btn" href="/contact_us">Get in touch <ArrowUpRight size={17}/></a>
          <ul className="kit-contacts">
            <li><a href="tel:+917888008030"><Phone size={16} aria-hidden="true"/>+91 78880 08030</a></li>
            <li><a href="mailto:sales@konarkglobal.com"><Mail size={16} aria-hidden="true"/>sales@konarkglobal.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
