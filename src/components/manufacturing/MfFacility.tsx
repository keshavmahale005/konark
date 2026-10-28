import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { Check } from 'lucide-react';
import { certificationCopy, facilityCopy, facilityFigures, inspectors, inspectorsCopy } from '../../data/manufacturing';
import { useInView } from '../../hooks/useInView';

const STEP_PX=64;
const fmt=(n:number)=>n>=1000?`${n/1000}k`:String(n);

/** A measuring tape slides under a fixed cursor until it reads the figure. */
function Tape({value,step,max}:{value:number;step:number;max:number}){
  const marks=Array.from({length:Math.round(max/step)+1},(_,i)=>i*step);
  return <span className="mf-tape" aria-hidden="true" style={{'--to':`${-(value/step)*STEP_PX}px`,'--step':`${STEP_PX}px`} as CSSProperties}>
    <span className="mf-tape__strip">{marks.map(mark=><i key={mark}><b>{fmt(+mark.toFixed(2))}</b></i>)}</span>
    <span className="mf-tape__cursor"/>
  </span>;
}

export function MfFacility(){
  const [ref,inView]=useInView<HTMLDivElement>();
  return <section className="kit-section mf-facility" aria-labelledby="mf-facility-title">
    <div className="kit-shell">
      <div className="mf-facility__head">
        <div>
          <p className="kit-eyebrow"><i aria-hidden="true"/>Satpur Industrial Area, Nashik</p>
          <h2 className="kit-h2" id="mf-facility-title">State-of-the-art<br/><em>manufacturing facility.</em></h2>
        </div>
        <p className="kit-lead">{facilityCopy}</p>
      </div>
      <div ref={ref} className={`mf-figures${inView?' is-in':''}`}>
        {facilityFigures.map((figure,i)=><div className="mf-figure" key={figure.label} style={{'--i':i} as CSSProperties}>
          <span className="mf-figure__label">{figure.label}</span>
          <strong>{figure.display}<small>{figure.unit}</small></strong>
          <Tape value={figure.value} step={figure.step} max={figure.max}/>
        </div>)}
      </div>
    </div>
  </section>;
}

/** Seals stamp down with an ink ring; a scan beam then sweeps the inspector
    list and ticks each name as it passes. */
export function MfQuality(){
  const [ref,inView]=useInView<HTMLDivElement>();
  const grid=useRef<HTMLUListElement>(null);
  // Each chip's check lands when the beam reaches its row.
  useLayoutEffect(()=>{
    const node=grid.current;
    if(!node)return;
    const place=()=>{
      const height=node.offsetHeight||1;
      Array.from(node.children).forEach(chip=>{
        const el=chip as HTMLElement;
        el.style.setProperty('--t',`${(((el.offsetTop+el.offsetHeight/2)/height)*2.4).toFixed(2)}s`);
      });
    };
    place();
    window.addEventListener('resize',place);
    return()=>window.removeEventListener('resize',place);
  },[]);
  return <section className="kit-section kit-dark mf-quality" aria-labelledby="mf-quality-title">
    <div ref={ref} className={`kit-shell mf-quality__inner${inView?' is-in':''}`}>
      <div className="mf-quality__copy">
        <p className="kit-eyebrow"><i aria-hidden="true"/>Quality &amp; inspection</p>
        <h2 className="kit-h2" id="mf-quality-title">Certified, inspected,<br/><em>approved.</em></h2>
        <p className="kit-lead">{certificationCopy}</p>
        <div className="mf-seals">
          <span className="mf-seal" style={{'--i':0} as CSSProperties}><b>ASME</b><span>U Stamp certified</span></span>
          <span className="mf-seal" style={{'--i':1} as CSSProperties}><b>IBR</b><span>Approved manufacturer</span></span>
        </div>
      </div>
      <div className="mf-scan">
        <p className="mf-scan__intro">{inspectorsCopy}</p>
        <div className="mf-scan__bed">
          <span className="mf-scan__beam" aria-hidden="true"/>
          <ul ref={grid} aria-label="Consultants and third party inspectors">
            {inspectors.map(name=><li key={name}><Check size={14} strokeWidth={3} aria-hidden="true"/>{name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
