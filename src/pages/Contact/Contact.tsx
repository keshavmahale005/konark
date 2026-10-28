import { ArrowUpRight, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import Breadcrumb from '../../components/layout/Breadcrumb';
import RevealGroup from '../../components/common/RevealGroup';
import ContactForm from '../../components/forms/ContactForm';
import '../../styles/home.css';
import '../../styles/contact.css';

const address='C-14/2, M.I.D.C. Industrial Area, Satpur, Nashik - 422 007, Maharashtra, India.';
const mapsUrl=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const emails=['enquiry@konarkglobal.com','sales@konarkglobal.com'];
const phones=[['0253-2361604','02532361604'],['2360684','02532360684'],['9422293397','9422293397'],['9422249499','9422249499']];

export default function Contact(){
  return <div className="contact-page">
    <section className="ct-hero" aria-labelledby="ct-hero-title">
      <span className="ct-hero__rays" aria-hidden="true"/>
      <div className="hp-shell ct-hero__inner">
        <div className="ct-hero__copy">
          <Breadcrumb items={[['Home','/'],['Contact']]}/>
          <p className="ct-hero__eyebrow"><i aria-hidden="true"/>Contact</p>
          <h1 id="ct-hero-title">Reach the Konark Global <em>team.</em></h1>
          <p className="ct-hero__sub">Our office is in Satpur Industrial Area, Nashik.</p>
        </div>
        <ul className="ct-quick" aria-label="Quick contact">
          <li><a href={`tel:${phones[0][1]}`}><span className="ct-quick__icon"><Phone size={20} aria-hidden="true"/></span><span><small>Call us</small><strong>{phones[0][0]}</strong></span><ArrowUpRight size={18} aria-hidden="true"/></a></li>
          <li><a href={`mailto:${emails[0]}`}><span className="ct-quick__icon"><Mail size={20} aria-hidden="true"/></span><span><small>Email us</small><strong>{emails[0]}</strong></span><ArrowUpRight size={18} aria-hidden="true"/></a></li>
          <li><a href="#office"><span className="ct-quick__icon"><MapPin size={20} aria-hidden="true"/></span><span><small>Visit our office</small><strong>Satpur Industrial Area, Nashik</strong></span><ArrowUpRight size={18} aria-hidden="true"/></a></li>
        </ul>
      </div>
    </section>

    <section className="hp-section ct-main">
      <div className="hp-shell ct-main__grid">
        <div className="ct-details" id="office">
          <h2 className="hp-h2">Reaching our <em>office</em></h2>
          <RevealGroup className="ct-cards">
            <article className="ct-card ct-card--office">
              <span className="ct-pin" aria-hidden="true"><MapPin size={22}/></span>
              <h3>Visit our office</h3>
              <address>{address}</address>
              <a className="hp-link is-light" href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Navigation size={15}/></a>
            </article>
            <article className="ct-card">
              <span className="ct-card__icon"><Mail size={20} aria-hidden="true"/></span>
              <h3>Email us</h3>
              <ul>{emails.map(email=><li key={email}><a href={`mailto:${email}`}>{email}<ArrowUpRight size={15} aria-hidden="true"/></a></li>)}</ul>
            </article>
            <article className="ct-card">
              <span className="ct-card__icon"><Phone size={20} aria-hidden="true"/></span>
              <h3>Call us</h3>
              <ul className="ct-phones">{phones.map(([label,number])=><li key={number}><a href={`tel:${number}`}>{label}</a></li>)}</ul>
            </article>
          </RevealGroup>
        </div>
        <ContactForm/>
      </div>
    </section>
  </div>;
}
