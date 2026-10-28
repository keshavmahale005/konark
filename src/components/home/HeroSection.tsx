import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { prefersReducedMotion } from '../../hooks/useInView';
import { useBackgroundVideo, VideoToggle } from '../common/BackgroundVideo';

const heroVideo='/videos/welding.mp4';

export default function HeroSection(){
  const {videoProps,available,playing,ready,toggle}=useBackgroundVideo();
  const section=useRef<HTMLElement>(null);

  // Depth parallax (pointer) and scroll-out (video zooms, copy lifts away) as CSS variables.
  useEffect(()=>{
    const node=section.current;
    if(!node||prefersReducedMotion())return;
    let frame=0,px=0,py=0;
    const apply=()=>{
      frame=0;
      const box=node.getBoundingClientRect();
      node.style.setProperty('--hm-sx',Math.min(1,Math.max(0,-box.top/box.height)).toFixed(3));
      node.style.setProperty('--hm-px',px.toFixed(3));
      node.style.setProperty('--hm-py',py.toFixed(3));
    };
    const queue=()=>{if(!frame)frame=requestAnimationFrame(apply)};
    const move=(event:PointerEvent)=>{
      if(event.pointerType!=='mouse')return;
      const box=node.getBoundingClientRect();
      px=(event.clientX-box.left)/box.width*2-1;
      py=(event.clientY-box.top)/box.height*2-1;
      queue();
    };
    const leave=()=>{px=0;py=0;queue()};
    queue();
    window.addEventListener('scroll',queue,{passive:true});
    node.addEventListener('pointermove',move);
    node.addEventListener('pointerleave',leave);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',queue);node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',leave)};
  },[]);

  return <section ref={section} className="hp-hero" aria-labelledby="hp-hero-title">
    <div className="hp-hero__backdrop" aria-hidden="true">
      <video {...videoProps} className={`hp-hero__video${ready?' is-ready':''}`} src={heroVideo}/>
      <span className="hp-hero__shade"/>
    </div>
    <div className="hp-shell hp-hero__inner">
      <div className="hp-hero__copy">
        <p className="hp-hero__eyebrow"><i aria-hidden="true"/>Industrial solutions · Since 1994</p>
        <h1 className="hp-hero__title" id="hp-hero-title">
          <span className="hp-line"><span>Putting you in a</span></span>
          <span className="hp-line"><span><em>winning position.</em></span></span>
        </h1>
        <p className="hp-hero__lead">Putting you in a winning position with dependable equipment, engineering and energy efficiency solutions.</p>
        <p className="hp-hero__vision">Konark Global will be one of the leading organizations for industrial development.</p>
        <div className="hp-hero__actions">
          <a className="hp-btn hp-btn--primary" href="/products">Explore our capabilities <ArrowRight size={18}/></a>
          <a className="hp-link is-light" href="/about_us">Discover Konark <ArrowUpRight size={17}/></a>
        </div>
      </div>
    </div>
    <div className="hp-shell hp-hero__foot">
      <span>NASHIK, INDIA <i/> SERVING INDUSTRY</span>
      <div className="hp-hero__foot-end">
        {available&&<VideoToggle className="hp-hero__toggle" playing={playing} onToggle={toggle}/>}
        <a href="#intro">SCROLL TO EXPLORE <ArrowDown size={15}/></a>
      </div>
    </div>
  </section>;
}
