import type { CSSProperties } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const wave='M0 30 C 150 0 300 60 450 30 S 750 0 900 30 S 1200 60 1350 30 S 1650 0 1800 30 V 120 H 0 Z';
const bubbles=[12,24,37,51,63,78,88];

/** The panel fills with liquid when it scrolls in: two waves roll at different
    speeds on the surface while bubbles rise through it. */
export default function ServicesCTA(){
  const [ref,inView]=useInView<HTMLDivElement>();
  return <section className="sv-cta-section" aria-labelledby="sv-cta-title">
    <div className="sv-shell">
      <div ref={ref} className={`sv-cta${inView?' is-in':''}`}>
        <div className="sv-cta__liquid" aria-hidden="true">
          <svg className="sv-cta__wave is-back" viewBox="0 0 1800 120" preserveAspectRatio="none"><path d={wave}/></svg>
          <svg className="sv-cta__wave is-front" viewBox="0 0 1800 120" preserveAspectRatio="none"><path d={wave}/></svg>
          <div className="sv-cta__fill">{bubbles.map((left,i)=><i key={left} style={{'--x':`${left}%`,'--i':i} as CSSProperties}/>)}</div>
        </div>
        <div className="sv-cta__copy">
          <p className="sv-eyebrow is-light"><i aria-hidden="true"/>Start a conversation</p>
          <h2 className="sv-h2" id="sv-cta-title">Let’s solve your<br/><em>next challenge.</em></h2>
        </div>
        <div className="sv-cta__actions">
          <a className="sv-btn sv-btn--light" href="/contact_us">Get in touch <ArrowUpRight size={17}/></a>
          <ul className="sv-cta__contacts">
            <li><a href="tel:+917888008030"><Phone size={16} aria-hidden="true"/>+91 78880 08030</a></li>
            <li><a href="mailto:sales@konarkglobal.com"><Mail size={16} aria-hidden="true"/>sales@konarkglobal.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
