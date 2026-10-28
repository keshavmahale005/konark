import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Award, Briefcase, Clock, GraduationCap, Mail, MapPin, Phone, Users } from 'lucide-react';
import Breadcrumb from '../../components/layout/Breadcrumb';
import RevealGroup from '../../components/common/RevealGroup';
import SectionTitle from '../../components/common/SectionTitle';
import CareerForm from '../../components/forms/CareerForm';
import { partnerAssociations, roles } from '../../data/careers';
import { roleApplicationMailto } from '../../services/contactService';
import { pad } from '../../utils/helpers';
import '../../styles/home.css';
import '../../styles/contact.css';
import '../../styles/career.css';

const vacancies=roles.reduce((sum,{vacancies})=>sum+Number(vacancies),0);
const steps=['Fill in your details','Prepare email','Attach your CV and send'];

export default function Career(){
  const [post,setPost]=useState('');
  // /career and /join_the_team both render this page; the breadcrumb follows the route.
  const joinTeam=location.pathname.replace(/\/$/,'')==='/join_the_team';
  function applyWithForm(role:string){
    setPost(role);
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('apply')?.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
  }
  return <div className="career-page">
    <section className="cr-hero" aria-labelledby="cr-hero-title">
      <span className="cr-hero__rays" aria-hidden="true"/>
      <div className="hp-shell cr-hero__inner">
        <div className="cr-hero__copy">
          <Breadcrumb items={[['Home','/'],[joinTeam?'Join the Team':'Careers']]}/>
          <p className="cr-hero__eyebrow"><i aria-hidden="true"/>Careers</p>
          <h1 id="cr-hero-title">Careers at <em>Konark Global</em></h1>
          <p className="cr-hero__sub">If you would like to be a part of our team, just drop your resume.</p>
          <div className="cr-hero__actions">
            <a className="hp-btn hp-btn--primary" href="#positions">View positions <ArrowDown size={17}/></a>
            <a className="hp-link is-light" href="#apply">Send your application <ArrowRight size={16}/></a>
          </div>
        </div>
        <aside className="cr-hero__panel" aria-label="Career enquiries">
          <div className="cr-hero__stats">
            <div><strong>{roles.length}</strong><span>Positions listed</span></div>
            <div><strong>{vacancies}</strong><span>Vacancies</span></div>
          </div>
          <p className="cr-hero__enquiry">For any enquiry please contact us or send mail:</p>
          <div className="cr-hero__contacts">
            <a href="tel:+917219894104"><Phone size={17} aria-hidden="true"/>+91 7219894104</a>
            <a href="mailto:hr@konarkglobal.com"><Mail size={17} aria-hidden="true"/>hr@konarkglobal.com</a>
          </div>
        </aside>
      </div>
    </section>

    <section className="hp-section cr-jobs" id="positions" aria-labelledby="cr-jobs-title">
      <div className="hp-shell">
        <SectionTitle id="cr-jobs-title" eyebrow="Job listings" title="Positions listed on the original website"/>
        <RevealGroup className="cr-jobs__grid">
          {roles.map(({role,qualification,additional,experience,vacancies,location,description},i)=><article className="cr-job" key={role}>
            <div className="cr-job__head">
              <span className="cr-job__icon"><Briefcase size={22} strokeWidth={1.8} aria-hidden="true"/></span>
              <h3>{role}</h3>
              <span className="cr-job__num">{pad(i+1)}</span>
            </div>
            <p className="cr-job__desc">{description}</p>
            <dl className="cr-job__details">
              <div><dt><GraduationCap size={15} aria-hidden="true"/>Desired qualification</dt><dd>{qualification}</dd></div>
              <div><dt><Award size={15} aria-hidden="true"/>Additional qualification</dt><dd>{additional}</dd></div>
              <div><dt><Clock size={15} aria-hidden="true"/>Desired experience</dt><dd>{experience}</dd></div>
              <div><dt><Users size={15} aria-hidden="true"/>Vacancies</dt><dd>{vacancies}</dd></div>
              <div><dt><MapPin size={15} aria-hidden="true"/>Location</dt><dd>{location}</dd></div>
            </dl>
            <div className="cr-job__actions">
              <a className="hp-btn hp-btn--primary" href={roleApplicationMailto(role)}>Apply by email <ArrowUpRight size={16}/></a>
              <button className="cr-job__form-link" type="button" onClick={()=>applyWithForm(role)}>Use application form <ArrowDown size={15} aria-hidden="true"/></button>
            </div>
          </article>)}
        </RevealGroup>
      </div>
    </section>

    <section className="hp-section cr-apply" id="apply" aria-label="Career application">
      <div className="hp-shell cr-apply__grid">
        <RevealGroup className="cr-steps">
          {steps.map((step,i)=><div className="cr-step" key={step}><b>{pad(i+1)}</b><span>{step}</span></div>)}
        </RevealGroup>
        <CareerForm post={post} onPostChange={setPost}/>
      </div>
    </section>

    <section className="hp-section cr-partners" aria-labelledby="cr-partners-title">
      <div className="hp-shell">
        <SectionTitle id="cr-partners-title" eyebrow="Our associations" title="Empowering industries with trusted engineering solutions" action={<p className="cr-title-note">At Konark Global, we are proud to be associated with reputed names in industrial engineering and manufacturing, delivering equipment and support services across sectors.</p>}/>
        <RevealGroup className="cr-partners__grid">
          {partnerAssociations.map(([name,text],i)=><article className="cr-partner" key={name}>
            <span className="cr-partner__num">{pad(i+1)}</span>
            <h3>{name}</h3>
            <p>{text}</p>
          </article>)}
        </RevealGroup>
      </div>
    </section>
  </div>;
}
