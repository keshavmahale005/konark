import { ArrowUpRight } from 'lucide-react';
import RevealGroup from '../common/RevealGroup';
import { Eyebrow } from '../common/SectionTitle';

const stats=[['1994','Konark Engineers inception'],['3','Integrated group companies'],['12','Industry segments listed'],['Pan India','Project execution reach']];

export default function AboutSection(){
  return <section className="hp-section hp-intro" id="intro" aria-labelledby="hp-intro-title">
    <div className="hp-shell">
      <RevealGroup className="hp-intro__grid">
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="hp-h2" id="hp-intro-title">One partner.<br/><em>Many possibilities.</em></h2>
        </div>
        <div className="hp-intro__body">
          <p className="hp-lead">Konark Global brings industrial equipment, project execution, manufacturing and service together to support essential processes.</p>
          <p>Since 1994, Konark Global has supported industry through its group companies, technical expertise and associations with leading equipment partners. Our aim is simple: dependable solutions that help customers work with confidence.</p>
          <a href="/about_us" className="hp-link">Meet Konark Global <ArrowUpRight size={17}/></a>
        </div>
      </RevealGroup>
      <RevealGroup className="hp-stats">
        {stats.map(([value,label],i)=><div className="hp-stat" key={label}>
          <span className="hp-stat__index">{String(i+1).padStart(2,'0')}</span>
          <strong>{value}</strong>
          <span className="hp-stat__label">{label}</span>
        </div>)}
      </RevealGroup>
    </div>
  </section>;
}
