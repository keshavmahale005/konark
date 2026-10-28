import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { manufacturingGallery } from '../../data/manufacturingGallery';
import { prefersReducedMotion } from '../../hooks/useInView';

const heroImage=manufacturingGallery.find(item=>item.title==='Shop Floor')!.image;
const slats=Array.from({length:9},(_,i)=>i);

type Spark={x:number;y:number;vx:number;vy:number;life:number;max:number};

/** Canvas of weld sparks thrown from the seam's travelling head. They fall
    under gravity, bounce off the floor and cool from white to deep orange. */
function useSparks(canvasRef:React.RefObject<HTMLCanvasElement|null>,headRef:React.RefObject<HTMLElement|null>){
  useEffect(()=>{
    const canvas=canvasRef.current;
    const ctx=canvas?.getContext('2d');
    if(!canvas||!ctx||prefersReducedMotion())return;
    const sparks:Spark[]=[];
    let frame=0,running=false,width=0,height=0,last=performance.now(),burstUntil=performance.now()+3400,nextBurst=0;
    const resize=()=>{
      const dpr=Math.min(window.devicePixelRatio||1,2);
      width=canvas.clientWidth;height=canvas.clientHeight;
      canvas.width=width*dpr;canvas.height=height*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const emit=(x:number,y:number,count:number)=>{
      for(let i=0;i<count;i++){
        const angle=-Math.PI/2+(Math.random()-.5)*Math.PI*1.3;
        const speed=2+Math.random()*6;
        sparks.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:0,max:40+Math.random()*50});
      }
    };
    const tick=(now:number)=>{
      const dt=Math.min((now-last)/16.7,2.5);
      last=now;
      const head=headRef.current?.getBoundingClientRect();
      const box=canvas.getBoundingClientRect();
      if(head){
        const x=head.left+head.width/2-box.left,y=head.top+head.height/2-box.top;
        if(now<burstUntil)emit(x,y,Math.random()<.7?3:1);
        else if(now>nextBurst){emit(x,y,26);nextBurst=now+1400+Math.random()*1800}
      }
      ctx.clearRect(0,0,width,height);
      ctx.globalCompositeOperation='lighter';
      for(let i=sparks.length-1;i>=0;i--){
        const s=sparks[i];
        s.life+=dt;
        s.vy+=.22*dt;
        s.x+=s.vx*dt;s.y+=s.vy*dt;
        if(s.y>height-2){s.y=height-2;s.vy*=-.32;s.vx*=.6}
        const t=s.life/s.max;
        if(t>=1){sparks.splice(i,1);continue}
        ctx.strokeStyle=`hsla(${48-t*36},100%,${88-t*42}%,${1-t})`;
        ctx.lineWidth=1.6-t;
        ctx.beginPath();
        ctx.moveTo(s.x,s.y);
        ctx.lineTo(s.x-s.vx*1.8,s.y-s.vy*1.8);
        ctx.stroke();
      }
      frame=requestAnimationFrame(tick);
    };
    resize();
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting&&!running){running=true;last=performance.now();frame=requestAnimationFrame(tick)}
      if(!entry.isIntersecting&&running){running=false;cancelAnimationFrame(frame)}
    });
    observer.observe(canvas);
    window.addEventListener('resize',resize);
    return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('resize',resize)};
  },[canvasRef,headRef]);
}

export default function MfHero(){
  const canvas=useRef<HTMLCanvasElement>(null);
  const head=useRef<HTMLSpanElement>(null);
  useSparks(canvas,head);
  return <section className="mf-hero kit-dark" aria-labelledby="mf-hero-title">
    <canvas ref={canvas} className="mf-hero__sparks" aria-hidden="true"/>
    <div className="kit-shell mf-hero__inner">
      <div className="mf-hero__copy">
        <p className="mf-hero__tag"><span>Manufacturing</span><span>R&amp;D Therm</span></p>
        <h1 className="kit-h1 mf-hero__title" id="mf-hero-title">
          <span className="mf-hot" style={{'--i':0} as CSSProperties}>Process equipment,</span>{' '}
          <em className="mf-hot" style={{'--i':1} as CSSProperties}>made in Nashik.</em>
        </h1>
        <div className="mf-seam" aria-hidden="true"><span className="mf-seam__bead"/><span ref={head} className="mf-seam__head"/></div>
        <p className="kit-lead mf-hero__lead">R&amp;D Therm India Pvt Ltd designs and manufactures process equipment for sustainable industrial solutions.</p>
        <div className="mf-hero__actions">
          <a className="kit-btn kit-btn--primary mf-btn" href="#manufacturing-capabilities">See capabilities <ArrowDown size={18}/></a>
          <a className="kit-link" href="/contact_us">Discuss a requirement <ArrowUpRight size={17}/></a>
        </div>
      </div>
      <figure className="mf-hero__photo">
        <img src={heroImage} alt="R&D Therm shop floor" fetchPriority="high" decoding="async"/>
        <span className="mf-blinds" aria-hidden="true">{slats.map(i=><i key={i} style={{'--i':i} as CSSProperties}/>)}</span>
      </figure>
    </div>
  </section>;
}
