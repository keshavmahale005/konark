import { useEffect, useRef, useState } from 'react';

/** Flags an element once it first scrolls into view. Reduced-motion users and
    browsers without IntersectionObserver get the final state immediately. */
export function useInView<T extends Element>(rootMargin='0px 0px -12% 0px'){
  const ref=useRef<T>(null);
  const [inView,setInView]=useState(false);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    if(prefersReducedMotion()||!('IntersectionObserver' in window)){setInView(true);return;}
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting)return;
      setInView(true);
      observer.disconnect();
    },{rootMargin,threshold:0.15});
    observer.observe(node);
    return()=>observer.disconnect();
  },[rootMargin]);
  return [ref,inView] as const;
}

export function prefersReducedMotion(){
  return typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
