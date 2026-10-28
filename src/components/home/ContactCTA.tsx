import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { Eyebrow } from '../common/SectionTitle';

export default function ContactCTA(){
  return <section className="hp-cta-section" aria-labelledby="hp-cta-title">
    <div className="hp-shell">
      <div className="hp-cta">
        <span className="hp-cta__rays" aria-hidden="true"/>
        <div>
          <Eyebrow light>Start a conversation</Eyebrow>
          <h2 className="hp-h2" id="hp-cta-title">Let’s solve your<br/><em>next challenge.</em></h2>
        </div>
        <div className="hp-cta__actions">
          <a className="hp-btn hp-btn--dark" href="/contact_us">Get in touch <ArrowUpRight size={17}/></a>
          <ul className="hp-cta__contacts">
            <li><a href="tel:+917888008030"><Phone size={16} aria-hidden="true"/>+91 78880 08030</a></li>
            <li><a href="mailto:sales@konarkglobal.com"><Mail size={16} aria-hidden="true"/>sales@konarkglobal.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
