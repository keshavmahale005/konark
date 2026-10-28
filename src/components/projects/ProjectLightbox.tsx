import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

type Item={title:string;image:string;category?:string};

export default function ProjectLightbox({items,index,onIndex,onClose}:{items:Item[];index:number;onIndex:(index:number)=>void;onClose:()=>void}){
  const [direction,setDirection]=useState<'next'|'prev'>('next');
  const closeButton=useRef<HTMLButtonElement>(null);
  const thumbs=useRef<HTMLDivElement>(null);
  const swipeStart=useRef<number|null>(null);
  const swiped=useRef(false);
  const item=items[index];
  const go=(step:1|-1)=>{setDirection(step>0?'next':'prev');onIndex((index+step+items.length)%items.length)};
  const jump=(target:number)=>{setDirection(target<index?'prev':'next');onIndex(target)};

  useEffect(()=>{
    const previousFocus=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    closeButton.current?.focus();
    return()=>{document.body.style.overflow=previousOverflow;previousFocus?.focus()};
  },[]);
  useEffect(()=>{
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape')onClose();
      if(event.key==='ArrowLeft')go(-1);
      if(event.key==='ArrowRight')go(1);
    };
    window.addEventListener('keydown',onKeyDown);
    return()=>window.removeEventListener('keydown',onKeyDown);
  });
  useEffect(()=>{
    thumbs.current?.children[index]?.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});
  },[index]);

  return <div className="pj-lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={()=>{if(swiped.current){swiped.current=false;return}onClose()}}>
    <div className="pj-lightbox__bar" onClick={e=>e.stopPropagation()}>
      <span className="pj-lightbox__count" aria-live="polite"><b>{String(index+1).padStart(2,'0')}</b> / {String(items.length).padStart(2,'0')}</span>
      <button ref={closeButton} className="pj-lightbox__btn" aria-label="Close image" onClick={onClose}><X size={20}/></button>
    </div>
    <div className="pj-lightbox__stage"
      onPointerDown={e=>{swipeStart.current=e.clientX;swiped.current=false}}
      onPointerUp={e=>{
        if(swipeStart.current===null)return;
        const dx=e.clientX-swipeStart.current;
        swipeStart.current=null;
        if(Math.abs(dx)>50){swiped.current=true;go(dx<0?1:-1)}
      }}>
      <button className="pj-lightbox__btn pj-lightbox__nav is-prev" aria-label="Previous project" onClick={e=>{e.stopPropagation();go(-1)}}><ArrowLeft size={20}/></button>
      <figure className={`pj-lightbox__figure is-${direction}`} key={item.image} onClick={e=>e.stopPropagation()}>
        <img src={item.image} alt={item.title} draggable={false} onLoad={e=>{const img=e.currentTarget;img.style.setProperty('--ar',String(img.naturalWidth/img.naturalHeight))}}/>
        <figcaption>{item.category&&<span>{item.category}</span>}{item.title}</figcaption>
      </figure>
      <button className="pj-lightbox__btn pj-lightbox__nav is-next" aria-label="Next project" onClick={e=>{e.stopPropagation();go(1)}}><ArrowRight size={20}/></button>
    </div>
    <div ref={thumbs} className="pj-lightbox__thumbs" onClick={e=>e.stopPropagation()}>
      {items.map((thumb,i)=><button key={thumb.image} className={i===index?'is-active':''} aria-label={`Show ${thumb.title}`} aria-current={i===index||undefined} onClick={()=>jump(i)}>
        <img src={thumb.image} alt="" loading="lazy"/>
      </button>)}
    </div>
  </div>;
}
