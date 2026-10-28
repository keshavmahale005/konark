import type { PointerEvent } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

/** Spotlight follows the pointer across the panel; the button leans toward it. */
function follow(event:PointerEvent<HTMLDivElement>){
  if(event.pointerType!=='mouse')return;
  const panel=event.currentTarget;
  const rect=panel.getBoundingClientRect();
  panel.style.setProperty('--mx',`${event.clientX-rect.left}px`);
  panel.style.setProperty('--my',`${event.clientY-rect.top}px`);
  const button=panel.querySelector<HTMLElement>('.pj-magnetic');
  if(!button)return;
  const box=button.getBoundingClientRect();
  const dx=event.clientX-(box.left+box.width/2);
  const dy=event.clientY-(box.top+box.height/2);
  const near=Math.hypot(dx,dy)<180;
  button.style.translate=near?`${(dx*.22).toFixed(1)}px ${(dy*.3).toFixed(1)}px`:'';
}
function release(event:PointerEvent<HTMLDivElement>){
  const button=event.currentTarget.querySelector<HTMLElement>('.pj-magnetic');
  if(button)button.style.translate='';
}

export default function ProjectsCTA(){
  const [ref,inView]=useInView<HTMLDivElement>();
  return <section className="pj-cta-section" aria-labelledby="pj-cta-title">
    <div className="pj-shell">
      <div ref={ref} className={`pj-cta${inView?' is-in':''}`} onPointerMove={follow} onPointerLeave={release}>
        <span className="pj-cta__spot" aria-hidden="true"/>
        <span className="pj-cta__rings" aria-hidden="true"><i/><i/><i/></span>
        <div className="pj-cta__copy">
          <p className="pj-eyebrow is-light"><i aria-hidden="true"/>Start a conversation</p>
          <h2 className="pj-h2" id="pj-cta-title">Let’s solve your<br/><em>next challenge.
            <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M4 15C70 5 150 3 214 8s70 7 82 3"/></svg>
          </em></h2>
        </div>
        <div className="pj-cta__actions">
          <a className="pj-btn pj-btn--dark pj-magnetic" href="/contact_us">Get in touch <ArrowUpRight size={17}/></a>
          <ul className="pj-cta__contacts">
            <li><a href="tel:+917888008030"><Phone size={16} aria-hidden="true"/>+91 78880 08030</a></li>
            <li><a href="mailto:sales@konarkglobal.com"><Mail size={16} aria-hidden="true"/>sales@konarkglobal.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
