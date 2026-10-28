import { ArrowRight, ArrowUpRight } from 'lucide-react';
import RevealGroup from '../common/RevealGroup';
import { Eyebrow } from '../common/SectionTitle';

const companies=[
  ['01','Konark Engineers','Industrial utility equipment · Sales & service','/products'],
  ['02','Konark Fabtech','Turnkey projects · Installation','/projects'],
  ['03','R&D Therm','Process equipment manufacturing','/manufacturing']
];

export default function CompanyCards(){
  return <section className="hp-section hp-group" aria-labelledby="hp-group-title">
    <span className="hp-group__watermark" aria-hidden="true">Konark</span>
    <div className="hp-shell hp-group__grid">
      <RevealGroup className="hp-group__intro">
        <Eyebrow light>One group · complementary strengths</Eyebrow>
        <h2 className="hp-h2" id="hp-group-title">From equipment to<br/><em>engineered outcomes.</em></h2>
        <p>Konark Engineers, Konark Fabtech and R&D Therm bring sales and service, turnkey projects, and process equipment manufacturing under one group.</p>
        <a href="/about_us" className="hp-btn hp-btn--primary">Explore the group <ArrowRight size={17}/></a>
      </RevealGroup>
      <RevealGroup className="hp-group__list">
        {companies.map(([n,title,desc,href])=><a className="hp-company" href={href} key={n}>
          <b>{n}</b>
          <span className="hp-company__text"><strong>{title}</strong><small>{desc}</small></span>
          <span className="hp-company__arrow"><ArrowUpRight size={20}/></span>
        </a>)}
      </RevealGroup>
    </div>
  </section>;
}
