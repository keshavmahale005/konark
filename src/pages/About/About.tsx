import { ArrowRight, Info, MapPin } from 'lucide-react';
import Breadcrumb from '../../components/layout/Breadcrumb';
import RevealGroup from '../../components/common/RevealGroup';
import SectionTitle from '../../components/common/SectionTitle';
import ContactCTA from '../../components/home/ContactCTA';
import { aboutFeatureImage, awards, coreValues, leaders, missions, operationAreas, roadmap, targetImage, visionIcon } from '../../data/about';
import '../../styles/home.css';
import '../../styles/about.css';

const pad=(n:number)=>String(n).padStart(2,'0');

export default function About(){
  return <div className="about-page">
    <section className="ab-hero" aria-labelledby="ab-hero-title">
      <span className="ab-hero__rays" aria-hidden="true"/>
      <div className="hp-shell ab-hero__inner">
        <div className="ab-hero__copy">
          <Breadcrumb items={[['Home','/'],['About Us']]}/>
          <p className="ab-hero__eyebrow"><i aria-hidden="true"/>About Konark Global</p>
          <h1 id="ab-hero-title">About Konark Global: <em>Industrial Solutions</em></h1>
          <p className="ab-hero__sub">Since 1994, Konark Global has been a trusted provider of industrial boilers, utility equipment and energy efficiency solutions.</p>
        </div>
        <div className="ab-hero__media">
          <figure className="ab-hero__frame"><img src={aboutFeatureImage} alt="" fetchPriority="high" decoding="async"/></figure>
          <div className="ab-hero__year" aria-hidden="true"><small>Since</small><strong>1994</strong></div>
        </div>
      </div>
    </section>


    <section className="hp-section ab-overview" id="overview" aria-label="Overview">
      <div className="hp-shell">
        <RevealGroup className="ab-overview__grid">
          <p className="ab-overview__lead">Since 1994, Konark Global has been a trusted provider of industrial boilers in Nashik, Thermax boilers, thermic fluid heaters, water treatment plants in India, boiler chemicals, Atlas Copco compressors, Advance Cooling towers, and energy efficiency solutions. As a leading industrial equipment supplier, we deliver tailored solutions, consistent service, system studies, and 24/7 support through our committed team.</p>
          <div className="ab-overview__side">
            <p>Our dedication to customer satisfaction has earned recognition from principal companies like Thermax Limited, Atlas Copco, and Advance Cooling Towers for our robust systems, processes, and commitment to sustainable industrial solutions.</p>
            <a className="hp-link" href="/products">Explore our range of industrial utility equipment <ArrowRight size={15}/> today!</a>
          </div>
        </RevealGroup>
      </div>
    </section>

    <section className="hp-section ab-vision" id="vision" aria-label="Vision and core values">
      <div className="hp-shell ab-vision__grid">
        <RevealGroup className="ab-vision__card">
          <span className="ab-icon-tile"><img src={visionIcon} alt="" loading="lazy"/></span>
          <h2 className="hp-h2">Our vision</h2>
          <h3>Konark Global</h3>
          <p>Konark Global aims to achieve a 100 Cr turnover by 2025, expanding in dealership, projects, and manufacturing. We partner with customers to drive sustainable industrial solutions and growth.</p>
          <p className="ab-vision__note"><Info size={15} aria-hidden="true"/>The 2025 turnover target is historical.</p>
        </RevealGroup>
        <div className="ab-values">
          <h2 className="hp-h2">Core values</h2>
          <RevealGroup className="ab-values__list">
            {coreValues.map((value,i)=><div className="ab-value" key={value}><b>0{i+1}</b><span>{value}</span></div>)}
          </RevealGroup>
        </div>
      </div>
    </section>

    <section className="hp-section ab-mission" id="mission" aria-labelledby="ab-mission-title">
      <div className="hp-shell">
        <SectionTitle id="ab-mission-title" eyebrow="Group companies" title="Our mission"/>
        <RevealGroup className="ab-mission__grid">
          {missions.map(({title,icon,text},i)=><article className="ab-mission__card" key={title}>
            <div className="ab-mission__top"><span className="ab-icon-tile"><img src={icon} alt="" loading="lazy"/></span><span className="ab-mission__num">{pad(i+1)}</span></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>)}
        </RevealGroup>
      </div>
    </section>

    <section className="hp-section ab-leaders" id="leadership" aria-labelledby="ab-leaders-title">
      <div className="hp-shell">
        <SectionTitle id="ab-leaders-title" eyebrow="Leadership" title="Who we are" action={<p className="ab-title-note">Meet the visionary leadership team behind Konark Global – driving innovation, excellence, and industrial growth.</p>}/>
        <RevealGroup className="ab-leaders__grid">
          {leaders.map(({name,image,description})=><article className="ab-leader" key={name}>
            <div className="ab-leader__photo"><img src={image} alt="" loading="lazy" decoding="async"/></div>
            <div className="ab-leader__body">
              <p className="ab-leader__role"><i aria-hidden="true"/>Director</p>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          </article>)}
        </RevealGroup>
      </div>
    </section>

    <section className="hp-section ab-awards" id="awards" aria-labelledby="ab-awards-title">
      <div className="hp-shell">
        <SectionTitle light id="ab-awards-title" eyebrow="Recognition" title="Our awards and certificates"/>
        <RevealGroup className="ab-awards__grid">
          {awards.map(({name,image},i)=><figure className="ab-award" key={name}>
            <div className="ab-award__image"><img src={image} alt={name} loading="lazy" decoding="async"/></div>
            <figcaption><span>{pad(i+1)}</span><strong>{name}</strong></figcaption>
          </figure>)}
        </RevealGroup>
      </div>
    </section>

    <section className="hp-section ab-operations" id="operations" aria-labelledby="ab-operations-title">
      <div className="hp-shell">
        <SectionTitle id="ab-operations-title" eyebrow="Coverage" title="Areas of operation"/>
        <RevealGroup className="ab-operations__grid">
          {operationAreas.map(([name,places])=><article className="ab-area" key={name}>
            <span className="ab-area__icon"><MapPin size={18} aria-hidden="true"/></span>
            <h3>{name}</h3>
            <p>{places}</p>
          </article>)}
        </RevealGroup>
      </div>
    </section>

    <section className="hp-section ab-roadmap" id="roadmap" aria-labelledby="ab-roadmap-title">
      <div className="hp-shell">
        <SectionTitle id="ab-roadmap-title" eyebrow="1994 – 2025" title="Road map for Konark Global" action={<p className="ab-title-note">Explore our journey of innovation and growth in delivering sustainable industrial solutions.</p>}/>
        <RevealGroup className="ab-timeline">
          {roadmap.map(([year,title,text])=><div className={`ab-milestone${year==='2025'?' is-target':''}`} key={year}>
            <span className="ab-milestone__dot" aria-hidden="true"/>
            <b>{year}</b>
            <h3>{title}</h3>
            {text&&<p>{text}</p>}
            {year==='2025'&&<img src={targetImage} alt="100 Cr turnover target" loading="lazy"/>}
          </div>)}
        </RevealGroup>
      </div>
    </section>

    <ContactCTA/>
  </div>;
}
