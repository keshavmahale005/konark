import type { CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { projectGallery } from '../../data/projectGallery';

const reels=[projectGallery.filter((_,i)=>i%2===0),projectGallery.filter((_,i)=>i%2===1)];
const titleWords=['Engineering','in'];

export default function ProjectsHero(){
  return <section className="pj-hero" aria-labelledby="pj-hero-title">
    <div className="pj-hero__backdrop" aria-hidden="true"><span className="pj-hero__rays"/><span className="pj-hero__orb"/></div>
    <div className="pj-shell pj-hero__inner">
      <div className="pj-hero__copy">
        <p className="pj-hero__eyebrow"><i aria-hidden="true"/>Projects</p>
        <h1 className="pj-hero__title" id="pj-hero-title">
          {titleWords.map((word,i)=><span className="pj-word" style={{'--i':i} as CSSProperties} key={word}><span>{word}</span></span>)}
          <span className="pj-word" style={{'--i':2} as CSSProperties}><em>action.
            <svg className="pj-hero__scribble" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M4 17C58 7 132 4 190 8s88 6 106 2"/></svg>
          </em></span>
        </h1>
        <p className="pj-hero__lead">A selection of industrial installations and equipment projects shown on the Konark Global website.</p>
        <div className="pj-hero__actions">
          <a className="pj-btn pj-btn--primary" href="#project-gallery">Browse the projects <ArrowDown size={18}/></a>
          <a className="pj-link is-light" href="/contact_us">Discuss your project <ArrowUpRight size={17}/></a>
        </div>
      </div>
      {/* Two counter-scrolling film reels of the project photographs. */}
      <div className="pj-hero__reels" aria-hidden="true">
        {reels.map((reel,r)=><div className={`pj-reel${r?' is-reverse':''}`} key={r}>
          <div className="pj-reel__track">
            {[...reel,...reel].map((project,i)=><figure className="pj-reel__frame" key={`${project.src}-${i}`}>
              <img src={project.image} alt="" loading={i<3?'eager':'lazy'} decoding="async"/>
              <figcaption>{project.title}</figcaption>
            </figure>)}
          </div>
        </div>)}
      </div>
    </div>
    <div className="pj-shell pj-hero__foot" aria-hidden="true">
      <span>Turnkey installations <i/> Pan India</span>
      <span className="pj-hero__scroll">Scroll <b/></span>
    </div>
  </section>;
}
