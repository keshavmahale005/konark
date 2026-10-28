import { ArrowDown, ArrowRight, ArrowUpRight, Factory } from 'lucide-react';

const heroImage='https://www.konarkglobal.com/assets/images/projects/thermax.jpg';

export default function HeroSection(){
  return <section className="hp-hero" aria-labelledby="hp-hero-title">
    <div className="hp-hero__backdrop" aria-hidden="true"><span className="hp-hero__rays"/></div>
    <div className="hp-shell hp-hero__inner">
      <div className="hp-hero__copy">
        <p className="hp-hero__eyebrow"><i aria-hidden="true"/>Industrial solutions · Since 1994</p>
        <h1 className="hp-hero__title" id="hp-hero-title">
          <span className="hp-line"><span>Putting you in a</span></span>
          <span className="hp-line"><span><em>winning position.</em></span></span>
        </h1>
        <p className="hp-hero__lead">Putting you in a winning position with dependable equipment, engineering and energy efficiency solutions.</p>
        <p className="hp-hero__vision">Konark Global will be one of the leading organizations for industrial development.</p>
        <div className="hp-hero__actions">
          <a className="hp-btn hp-btn--primary" href="/products">Explore our capabilities <ArrowRight size={18}/></a>
          <a className="hp-link is-light" href="/about_us">Discover Konark <ArrowUpRight size={17}/></a>
        </div>
      </div>
      <div className="hp-hero__media">
        <div className="hp-hero__frame"><img src={heroImage} alt="" fetchPriority="high" decoding="async"/></div>
        <div className="hp-hero__card" aria-hidden="true"><span><i/>Project execution reach</span><strong>Pan India</strong></div>
        <div className="hp-hero__badge" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs><path id="hp-badge-ring" d="M14,60 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>
            <text><textPath href="#hp-badge-ring" textLength="286" lengthAdjust="spacing">INDUSTRIAL SOLUTIONS · SINCE 1994 · </textPath></text>
          </svg>
          <span><Factory size={22} strokeWidth={1.8}/></span>
        </div>
      </div>
    </div>
    <div className="hp-shell hp-hero__foot">
      <span>NASHIK, INDIA <i/> SERVING INDUSTRY</span>
      <a href="#intro">SCROLL TO EXPLORE <ArrowDown size={15}/></a>
    </div>
  </section>;
}
