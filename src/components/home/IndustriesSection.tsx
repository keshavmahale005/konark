import { ArrowUpRight } from 'lucide-react';
import { sectors } from '../../data/industries';
import RevealGroup from '../common/RevealGroup';
import SectionTitle from '../common/SectionTitle';

const media='https://www.konarkglobal.com/assets/images/industry';

export default function IndustriesSection(){
  return <section className="hp-section hp-industries" aria-labelledby="hp-industries-title">
    <div className="hp-shell">
      <SectionTitle id="hp-industries-title" eyebrow="Industries we serve" title={<>Solutions shaped<br/>around <em>your sector.</em></>} action={<a href="/industries" className="hp-link">View all industries <ArrowUpRight size={17}/></a>}/>
      <RevealGroup className="hp-industry-grid">
        {sectors.map(([name,desc,file],i)=><article className="hp-industry" key={name}>
          <div className="hp-industry__media">
            <img src={`${media}/${file}.jpg`} alt={`${name} industry`} loading="lazy" decoding="async"/>
            <span className="hp-industry__num">{String(i+1).padStart(2,'0')}</span>
          </div>
          <div className="hp-industry__body">
            <h3>{name}</h3>
            <p>{desc}</p>
          </div>
          {/* The link's ::after stretches over the card, so the whole card is clickable. */}
          <a className="hp-industry__link" aria-label={`Enquire about ${name}`} href="/contact_us"><span className="hp-industry__arrow"><ArrowUpRight size={18}/></span></a>
        </article>)}
      </RevealGroup>
    </div>
  </section>;
}
