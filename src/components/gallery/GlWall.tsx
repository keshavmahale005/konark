import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { galleryImages } from '../../data/galleryImages';
import { prefersReducedMotion } from '../../hooks/useInView';

const pad=(n:number)=>String(n).padStart(2,'0');
const speeds=[-.10,.08,-.05,.12];

function useColumnCount(){
  const pick=()=>window.matchMedia('(max-width: 640px)').matches?2:window.matchMedia('(max-width: 1000px)').matches?3:4;
  const [count,setCount]=useState(pick);
  useEffect(()=>{
    const onResize=()=>setCount(pick());
    window.addEventListener('resize',onResize);
    return()=>window.removeEventListener('resize',onResize);
  },[]);
  return count;
}

/** Zooms the photo out of its thumbnail and back into it on close (FLIP). */
function Viewer({index,onIndex,onClose,thumbOf}:{index:number;onIndex:(i:number)=>void;onClose:()=>void;thumbOf:(i:number)=>HTMLElement|null}){
  const img=useRef<HTMLImageElement>(null);
  const root=useRef<HTMLDivElement>(null);
  const closing=useRef(false);
  const first=useRef(true);
  const item=galleryImages[index];
  const total=galleryImages.length;
  const step=(d:number)=>onIndex((index+d+total)%total);

  const flip=(from:DOMRect,to:DOMRect,reverse=false)=>{
    const keyframes=[{transform:`translate(${from.left-to.left}px,${from.top-to.top}px) scale(${from.width/to.width},${from.height/to.height})`,borderRadius:'14px'},{transform:'none',borderRadius:'10px'}];
    return img.current?.animate(reverse?[...keyframes].reverse():keyframes,{duration:520,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
  };

  useLayoutEffect(()=>{
    const node=img.current,thumb=thumbOf(index);
    if(!node)return;
    if(first.current&&thumb&&!prefersReducedMotion())flip(thumb.getBoundingClientRect(),node.getBoundingClientRect());
    else node.animate([{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'none'}],{duration:320,easing:'ease-out'});
    first.current=false;
  },[index]);

  const close=()=>{
    if(closing.current)return;
    closing.current=true;
    root.current?.classList.add('is-closing');
    const node=img.current,thumb=thumbOf(index);
    const box=thumb?.getBoundingClientRect();
    const onScreen=box&&box.bottom>0&&box.top<window.innerHeight;
    const run=node&&box&&onScreen&&!prefersReducedMotion()?flip(box,node.getBoundingClientRect(),true):undefined;
    if(run)run.onfinish=onClose;else onClose();
  };

  useEffect(()=>{
    const previous=document.body.style.overflow;
    const opener=document.activeElement as HTMLElement|null;
    document.body.style.overflow='hidden';
    root.current?.querySelector<HTMLButtonElement>('.gl-viewer__close')?.focus();
    return()=>{document.body.style.overflow=previous;opener?.focus({preventScroll:true})};
  },[]);
  useEffect(()=>{
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)};
    window.addEventListener('keydown',key);
    return()=>window.removeEventListener('keydown',key);
  });

  return <div ref={root} className="gl-viewer" role="dialog" aria-modal="true" aria-label={item.title} onClick={close}>
    <div className="gl-viewer__bar" onClick={e=>e.stopPropagation()}>
      <span aria-live="polite"><b>{pad(index+1)}</b> / {pad(total)}</span>
      <button className="gl-viewer__btn gl-viewer__close" aria-label="Close photo" onClick={close}><X size={20}/></button>
    </div>
    <figure className="gl-viewer__stage" onClick={e=>e.stopPropagation()}>
      <img ref={img} key={item.image} src={item.image} alt={item.title} style={{'--ar':item.width/item.height} as CSSProperties}/>
    </figure>
    <button className="gl-viewer__btn gl-viewer__nav is-prev" aria-label="Previous photo" onClick={e=>{e.stopPropagation();step(-1)}}><ArrowLeft size={20}/></button>
    <button className="gl-viewer__btn gl-viewer__nav is-next" aria-label="Next photo" onClick={e=>{e.stopPropagation();step(1)}}><ArrowRight size={20}/></button>
  </div>;
}

/** Masonry wall: columns drift at different speeds while scrolling, and each
    photo develops from a washed-out print as it comes into view. */
export default function GlWall(){
  const cols=useColumnCount();
  const wall=useRef<HTMLDivElement>(null);
  const [open,setOpen]=useState<number|null>(null);
  const thumbs=useRef<(HTMLButtonElement|null)[]>([]);

  // Greedy placement into the shortest column, using each photo's real ratio.
  const columns=useMemo(()=>{
    const heights=Array(cols).fill(0);
    const out:number[][]=Array.from({length:cols},()=>[]);
    galleryImages.forEach((item,i)=>{
      const c=heights.indexOf(Math.min(...heights));
      out[c].push(i);
      heights[c]+=item.height/item.width;
    });
    return out;
  },[cols]);

  useEffect(()=>{
    const node=wall.current;
    if(!node)return;
    const items=Array.from(node.querySelectorAll<HTMLElement>('.gl-shot:not(.is-developed)'));
    if(prefersReducedMotion()||!('IntersectionObserver' in window)){items.forEach(item=>item.classList.add('is-developed'));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('is-developed');
      observer.unobserve(entry.target);
    }),{rootMargin:'0px 0px -8% 0px',threshold:.2});
    items.forEach(item=>observer.observe(item));
    return()=>observer.disconnect();
  },[cols]);

  useEffect(()=>{
    const node=wall.current;
    if(!node||prefersReducedMotion())return;
    let frame=0;
    const update=()=>{
      frame=0;
      const rect=node.getBoundingClientRect();
      const p=(window.innerHeight-rect.top)/(window.innerHeight+rect.height);
      Array.from(node.children).forEach((col,i)=>(col as HTMLElement).style.setProperty('--shift',`${((p-.5)*speeds[i%speeds.length]*rect.height*.5).toFixed(1)}px`));
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
  },[cols]);

  return <section className="kit-section gl-wall" id="gl-wall" aria-labelledby="gl-wall-title">
    <div className="kit-shell">
      <div className="gl-wall__head">
        <p className="kit-eyebrow"><i aria-hidden="true"/>Image gallery</p>
        <h2 className="kit-h2" id="gl-wall-title">Every photo,<br/><em>one wall.</em></h2>
      </div>
      <div ref={wall} className="gl-columns" style={{'--cols':cols} as CSSProperties}>
        {columns.map((column,c)=><div className="gl-column" key={c}>
          {column.map(i=>{
            const item=galleryImages[i];
            return <button key={item.image} ref={el=>{thumbs.current[i]=el}} className="gl-shot" type="button" onClick={()=>setOpen(i)} aria-label={`Open ${item.title}`}>
              <img src={item.image} alt="" loading="lazy" decoding="async" width={item.width} height={item.height}/>
              <span className="gl-shot__finder" aria-hidden="true"><i/><i/><i/><i/></span>
              <span className="gl-shot__label" aria-hidden="true">Photo {pad(i+1)}</span>
            </button>;
          })}
        </div>)}
      </div>
    </div>
    {open!==null&&<Viewer index={open} onIndex={setOpen} onClose={()=>setOpen(null)} thumbOf={i=>thumbs.current[i]?.querySelector('img')??null}/>}
  </section>;
}
