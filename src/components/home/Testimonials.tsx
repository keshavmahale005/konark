import { Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import RevealGroup from '../common/RevealGroup';
import SectionTitle from '../common/SectionTitle';

export default function Testimonials(){
  return <section className="hp-section hp-testimonials" aria-labelledby="hp-testimonials-title">
    <div className="hp-shell">
      <SectionTitle id="hp-testimonials-title" eyebrow="What clients say" title={<>Long-term relationships.<br/><em>Practical results.</em></>}/>
      <RevealGroup className="hp-quotes">
        {testimonials.map(({quote,source})=><figure className="hp-quote" key={source}>
          <span className="hp-quote__mark" aria-hidden="true"><Quote size={20}/></span>
          <blockquote>“{quote}”</blockquote>
          <figcaption>— {source}</figcaption>
        </figure>)}
      </RevealGroup>
    </div>
  </section>;
}
