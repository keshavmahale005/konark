import type { CSSProperties } from 'react';
import { Wrench } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

// Konark Engineers' mission statement on the About page names this equipment.
const equipment=['Thermax boilers','Thermic fluid heaters','Water treatment plants','Boiler chemicals','Steam accessories','Rooftop solar systems','Atlas Copco compressors'];

/** Equipment names launch from the hub to their orbit, then the ring turns
    while each label counter-rotates to stay upright. Hover pauses the orbit. */
export default function ServiceEquipment(){
  const [ref,inView]=useInView<HTMLDivElement>();
  return <section className="sv-section sv-equipment" aria-labelledby="sv-equipment-title">
    <div ref={ref} className={`sv-shell sv-equipment__inner${inView?' is-in':''}`}>
      <div className="sv-equipment__copy">
        <p className="sv-eyebrow is-light"><i aria-hidden="true"/>Konark Engineers</p>
        <h2 className="sv-h2" id="sv-equipment-title">Equipment we<br/><em>sell and service.</em></h2>
        <p>We are committed to selling and servicing industrial utility equipment like Thermax boilers, thermic fluid heaters, water treatment plants, boiler chemicals, steam accessories, rooftop solar systems, and Atlas Copco compressors.</p>
      </div>
      <div className="sv-orbit">
        <span className="sv-orbit__track is-outer" aria-hidden="true"/>
        <span className="sv-orbit__track is-inner" aria-hidden="true"/>
        <div className="sv-orbit__hub" aria-hidden="true"><Wrench size={30} strokeWidth={1.6}/><span>Service</span></div>
        <ul className="sv-orbit__ring">
          {equipment.map((name,i)=><li key={name} style={{'--a':`${i*360/equipment.length-90}deg`,'--i':i} as CSSProperties}>
            <span>{name}</span>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
