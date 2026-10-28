import type { CSSProperties } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import RevealGroup from '../common/RevealGroup';
import CopyButton from './CopyButton';
import { DropPin, Envelope, RingIcon } from './ContactMotifs';
import { address, emails, mapEmbedUrl, mapsUrl, phones } from '../../data/contact';
import { pad } from '../../utils/helpers';

export default function OfficeSection(){
  return <section className="ct-office" id="office" aria-labelledby="ct-office-title">
    <div className="hp-shell">
      <RevealGroup className="ct-office__head">
        <h2 id="ct-office-title" className="hp-h2">Reaching our <em>office</em></h2>
        <span className="ct-route" aria-hidden="true"><i/></span>
      </RevealGroup>
      <RevealGroup className="ct-bento">
        <article className="ct-tile ct-tile--map">
          <div className="ct-map">
            <MapPin className="ct-map__fallback" size={34} aria-hidden="true"/>
            <iframe src={mapEmbedUrl} title="Map of the Konark Global office, Satpur, Nashik" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
          </div>
          <div className="ct-map__card">
            <span className="ct-tile__badge ct-tile__badge--solid"><DropPin size={22}/></span>
            <h3>Visit our office</h3>
            <address>{address}</address>
            <div className="ct-map__actions">
              <a className="ct-map__open" href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Navigation size={15} aria-hidden="true"/></a>
              <CopyButton value={address} what="address"/>
            </div>
          </div>
        </article>

        <article className="ct-tile ct-tile--mail">
          <span className="ct-tile__badge"><Envelope/></span>
          <h3>Email us</h3>
          <ul className="ct-mails">
            {emails.map(email=><li key={email}><a href={`mailto:${email}`}>{email}</a><CopyButton value={email} what={email}/></li>)}
          </ul>
        </article>

        <article className="ct-tile ct-tile--call">
          <span className="ct-tile__badge"><RingIcon size={22}/></span>
          <h3>Call us</h3>
          {/* Numbers "dial" in digit by digit once the card is revealed. */}
          <ul className="ct-keypad">
            {phones.map(([label,number],k)=><li key={number}><a href={`tel:${number}`} aria-label={label}>
              <small aria-hidden="true">{pad(k+1)}</small>
              <span aria-hidden="true">{[...label].map((char,d)=><i key={d} style={{'--d':k*4+d} as CSSProperties}>{char}</i>)}</span>
            </a></li>)}
          </ul>
        </article>
      </RevealGroup>
    </div>
  </section>;
}
