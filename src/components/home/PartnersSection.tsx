import { ArrowUpRight } from 'lucide-react';
import { channelPartners } from '../../data/partners';

export default function PartnersSection(){
  return <section className="hp-partners" aria-label="Channel partners">
    <div className="hp-shell hp-partners__inner">
      <p className="hp-partners__label"><i aria-hidden="true"/>Channel partners</p>
      <ul className="hp-partners__list">
        {channelPartners.map(({name,href,external})=><li key={name}>
          <a href={href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}>{name}<ArrowUpRight size={15} aria-hidden="true"/></a>
        </li>)}
      </ul>
    </div>
  </section>;
}
