import type { PointerEvent } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { Eyebrow } from '../common/SectionTitle';

/** A ripple spreads from where the button was pressed. */
function ripple(event:PointerEvent<HTMLAnchorElement>){
  const button=event.currentTarget;
  const box=button.getBoundingClientRect();
  const dot=document.createElement('span');
  dot.className='hm-ripple';
  dot.style.left=`${event.clientX-box.left}px`;
  dot.style.top=`${event.clientY-box.top}px`;
  button.appendChild(dot);
  dot.addEventListener('animationend',()=>dot.remove());
}

export default function ContactCTA({motion=false}:{motion?:boolean}){
  const [ref,inView]=useInView<HTMLDivElement>();
  return <section className="hp-cta-section" aria-labelledby="hp-cta-title">
    <div className="hp-shell">
      <div ref={motion?ref:undefined} className={`hp-cta${motion?` hm-cta${inView?' is-in':''}`:''}`}>
        <span className="hp-cta__rays" aria-hidden="true"/>
        <div>
          <Eyebrow light>Start a conversation</Eyebrow>
          <h2 className="hp-h2" id="hp-cta-title">Let’s solve your<br/><em>next challenge.</em></h2>
        </div>
        <div className="hp-cta__actions">
          <a className="hp-btn hp-btn--dark" href="/contact_us" onPointerDown={motion?ripple:undefined}>Get in touch <ArrowUpRight size={17}/></a>
          <ul className="hp-cta__contacts">
            <li><a href="tel:+917888008030"><Phone size={16} aria-hidden="true"/>+91 78880 08030</a></li>
            <li><a href="mailto:sales@konarkglobal.com"><Mail size={16} aria-hidden="true"/>sales@konarkglobal.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
