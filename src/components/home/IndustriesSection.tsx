import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sectors } from '../../data/industries';
import RevealGroup from '../common/RevealGroup';
import SectionTitle from '../common/SectionTitle';

const media='https://www.konarkglobal.com/assets/images/industry';
// Cards pop in in this shuffled order rather than left to right.
const shuffle=[5,0,9,3,11,7,1,10,4,8,2,6];

export default function IndustriesSection(){
  return <section className="hp-section hp-industries" aria-labelledby="hp-industries-title">
    <div className="hp-shell">
      <SectionTitle id="hp-industries-title" eyebrow="Industries we serve" title={<>Solutions shaped<br/>around <em>your sector.</em></>} action={<a href="/industries" className="hp-link">View all industries <ArrowUpRight size={17}/></a>}/>
      <RevealGroup className="hp-industry-grid">
        {sectors.map(([name,desc,file],i)=><article className="hp-industry" key={name} style={{'--hm-d':`${shuffle[i%shuffle.length]*70}ms`,'--hm-r':`${(i%3-1)*4}deg`} as CSSProperties}>
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
