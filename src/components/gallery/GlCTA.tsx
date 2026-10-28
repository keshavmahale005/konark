import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

/** A camera iris covers the panel and twists open to reveal it. */
export default function GlCTA(){
  const [ref,inView]=useInView<HTMLDivElement>();
  return <section className="gl-cta-section" aria-labelledby="gl-cta-title">
    <div className="kit-shell">
      <div ref={ref} className={`gl-cta kit-dark${inView?' is-in':''}`}>
        <span className="gl-cta__iris" aria-hidden="true"/>
        <div>
          <p className="kit-eyebrow"><i aria-hidden="true"/>Start a conversation</p>
          <h2 className="kit-h2" id="gl-cta-title">Let’s solve your<br/><em>next challenge.</em></h2>
        </div>
        <div className="gl-cta__actions">
          <a className="kit-btn kit-btn--primary gl-btn" href="/contact_us">Get in touch <ArrowUpRight size={17}/></a>
          <ul className="kit-contacts">
            <li><a href="tel:+917888008030"><Phone size={16} aria-hidden="true"/>+91 78880 08030</a></li>
            <li><a href="mailto:sales@konarkglobal.com"><Mail size={16} aria-hidden="true"/>sales@konarkglobal.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
