import { useEffect, useRef, type ReactNode } from 'react';

export default function RevealGroup({children,className}:{children:ReactNode;className:string}){
  const group=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const items=Array.from(group.current?.children||[]) as HTMLElement[];
    if(!items.length)return;
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduceMotion||!('IntersectionObserver' in window)){
      items.forEach(item=>item.classList.add('is-revealed'));
      return;
    }
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        (entry.target as HTMLElement).classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },{rootMargin:'0px 0px -48px 0px',threshold:0.08});
    items.forEach((item,index)=>{
      item.classList.add('scroll-reveal');
      item.style.setProperty('--reveal-delay',`${Math.min(index*65,390)}ms`);
      observer.observe(item);
    });
    return()=>observer.disconnect();
  },[]);
  return <div ref={group} className={`reveal-group ${className}`}>{children}</div>;
}