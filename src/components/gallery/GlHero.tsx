import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { ArrowDown } from 'lucide-react';
import { galleryImages } from '../../data/galleryImages';

// Larger source photos make the pile; [index, x%, y%, rotation].
const pile:[number,number,number,number][]=[[0,6,16,-9],[9,38,4,6],[11,20,40,-3],[13,52,34,11],[16,8,58,7],[25,44,62,-8],[33,28,20,3]];

/** Polaroids fall onto the table and can be picked up and moved around. */
export default function GlHero(){
  const table=useRef<HTMLDivElement>(null);
  const top=useRef(10);
  const drag=useRef<{el:HTMLElement;x:number;y:number;ox:number;oy:number}|null>(null);

  const pick=(event:PointerEvent<HTMLElement>)=>{
    const el=event.currentTarget;
    el.setPointerCapture(event.pointerId);
    el.style.zIndex=String(++top.current);
    el.classList.add('is-held');
    drag.current={el,x:event.clientX,y:event.clientY,ox:parseFloat(el.dataset.ox||'0'),oy:parseFloat(el.dataset.oy||'0')};
  };
  const move=(event:PointerEvent<HTMLElement>)=>{
    const held=drag.current;
    if(!held||held.el!==event.currentTarget)return;
    const ox=held.ox+event.clientX-held.x,oy=held.oy+event.clientY-held.y;
    held.el.dataset.ox=String(ox);held.el.dataset.oy=String(oy);
    held.el.style.translate=`${ox}px ${oy}px`;
  };
  const drop=(event:PointerEvent<HTMLElement>)=>{
    if(drag.current?.el!==event.currentTarget)return;
    event.currentTarget.classList.remove('is-held');
    drag.current=null;
  };

  return <section className="gl-hero kit-dark" aria-labelledby="gl-hero-title">
    <span className="gl-hero__flash" aria-hidden="true"/>
    <div className="kit-shell gl-hero__inner">
      <div className="gl-hero__copy">
        <p className="kit-eyebrow"><i aria-hidden="true"/>Gallery</p>
        <h1 className="kit-h1 gl-hero__title" id="gl-hero-title">Work across<br/><em>the process.</em></h1>
        <p className="kit-lead gl-hero__lead">Project photographs and captions from the Konark Global image gallery.</p>
        <div className="gl-hero__foot">
          <a className="kit-btn kit-btn--primary gl-btn" href="#gl-wall">View all {galleryImages.length} photos <ArrowDown size={18}/></a>
          <span className="gl-hero__hint" aria-hidden="true">Drag the prints</span>
        </div>
      </div>
      <div ref={table} className="gl-table" aria-hidden="true">
        {pile.map(([index,x,y,r],i)=><figure className="gl-print" key={index} data-ox="0" data-oy="0"
          style={{'--x':`${x}%`,'--y':`${y}%`,'--r':`${r}deg`,'--i':i} as CSSProperties}
          onPointerDown={pick} onPointerMove={move} onPointerUp={drop} onPointerCancel={drop}>
          <img src={galleryImages[index].image} alt="" draggable={false} decoding="async"/>
          <figcaption>Photo {String(index+1).padStart(2,'0')}</figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}
