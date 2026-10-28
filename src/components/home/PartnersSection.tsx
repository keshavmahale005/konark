import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { channelPartners } from '../../data/partners';

export default function PartnersSection(){
  return <section className="hp-partners" aria-labelledby="hp-partners-title">
    <div className="hp-shell">
      <div className="hp-partners__head">
        <div>
          <p className="section-eyebrow"><i aria-hidden="true"/>Channel partners</p>
          <h2 className="hp-partners__title" id="hp-partners-title">Leading brands, <em>one point of contact.</em></h2>
        </div>
        <p className="hp-partners__note">Konark Global sells and services industrial equipment from these channel partners. Open a partner to explore its range.</p>
      </div>
      <ul className="hp-partners__list">
        {channelPartners.map(({name,href,external,logo,logoHeight,range})=><li key={name}>
          <a className="hp-partner" href={href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}>
            <span className="hp-partner__logo">
              <img src={logo} alt={`${name} logo`} loading="lazy" decoding="async" style={{'--logo-h':`${logoHeight}px`} as CSSProperties}/>
            </span>
            <span className="hp-partner__meta">
              <strong>{name}</strong>
              <small>{range}</small>
            </span>
            <span className="hp-partner__go" aria-hidden="true"><ArrowUpRight size={16}/></span>
          </a>
        </li>)}
      </ul>
    </div>
  </section>;
}
