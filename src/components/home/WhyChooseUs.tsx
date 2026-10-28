import { ArrowUpRight, CalendarClock, Handshake, Layers, Wrench } from 'lucide-react';
import RevealGroup from '../common/RevealGroup';
import SectionTitle from '../common/SectionTitle';

const approach=[
  {title:'Trusted partners', text:'Authorised channel relationships include Thermax, Atlas Copco, Advance Cooling Tower and Kirloskar Brothers.', Icon:Handshake},
  {title:'On-time delivery', text:'Ensuring your project would meet your delivery targets.', Icon:CalendarClock},
  {title:'Technical expertise', text:'Knowledge across industrial utility needs, project solutions and manufacturing excellence.', Icon:Wrench},
  {title:'Turnkey execution', text:'A one-stop solution for process and utility needs, from equipment supply to installation and commissioning.', Icon:Layers}
];

export default function WhyChooseUs(){
  return <section className="hp-section hp-approach" aria-labelledby="hp-approach-title">
    <div className="hp-shell">
      <SectionTitle light id="hp-approach-title" eyebrow="Our approach" title={<>Built around what<br/>keeps industry <em>moving.</em></>} action={<a className="hp-link is-light" href="/services">How we support you <ArrowUpRight size={17}/></a>}/>
      <RevealGroup className="hp-approach__grid">
        {approach.map(({title,text,Icon},i)=><article className="hp-approach__card" key={title}>
          <div className="hp-approach__top">
            <span className="hp-approach__icon"><Icon size={22} strokeWidth={1.75} aria-hidden="true"/></span>
            <span className="hp-approach__num">{String(i+1).padStart(2,'0')}</span>
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
          <span className="hm-curl" aria-hidden="true"/>
        </article>)}
      </RevealGroup>
    </div>
  </section>;
}
