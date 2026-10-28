import type { CSSProperties } from 'react';
import { MapPin, Phone } from 'lucide-react';

/** Words that "tune in" one after another, like a signal locking on. The sentence still reads as plain text. */
export function TuneIn({text,start=0}:{text:string;start?:number}){
  return <>{text.split(' ').map((word,i,all)=><span key={i}><span className="ct-tune" style={{'--i':start+i} as CSSProperties}>{word}</span>{i<all.length-1&&' '}</span>)}</>;
}

/** Envelope whose flap opens and letter rises when its card is hovered or focused. */
export function Envelope({className=''}:{className?:string}){
  return <svg className={`ct-envelope ${className}`} viewBox="0 0 64 48" aria-hidden="true">
    <rect className="ct-envelope__back" x="2" y="10" width="60" height="36" rx="5"/>
    {/* The open flap sits behind the letter, the closed one in front; the two swap halfway through the flip. */}
    <path className="ct-envelope__flap ct-envelope__flap--open" d="M3 12a5 5 0 0 1 4-2h50a5 5 0 0 1 4 2L32 32Z"/>
    <g className="ct-envelope__letter"><rect x="10" y="13" width="44" height="29" rx="2"/><path d="M17 21h30M17 27h22"/></g>
    <path className="ct-envelope__front" d="M2 18 32 34 62 18v23a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5Z"/>
    <path className="ct-envelope__flap ct-envelope__flap--closed" d="M3 12a5 5 0 0 1 4-2h50a5 5 0 0 1 4 2L32 32Z"/>
  </svg>;
}

/** Handset that rings, with sound arcs, when its card is hovered or focused. */
export function RingIcon({size=20}:{size?:number}){
  return <span className="ct-ring" aria-hidden="true"><Phone size={size}/><i/><i/></span>;
}

/** Map pin that hops, leaving a ripple on the ground. */
export function DropPin({size=20}:{size?:number}){
  return <span className="ct-pin" aria-hidden="true"><MapPin size={size}/><i/></span>;
}

// Drawn on the 1440px desktop layout: under the quick-contact lines, up through the column gap,
// then over the top of the form card. "meet" keeps it aligned with the centred content on wider screens.
const flight='M-260 712 C 250 700 520 730 700 640 C 800 590 770 330 830 200 C 880 80 1100 50 1700 50';

/** Dotted flight path across the hero with a paper plane gliding along it. */
export function FlightPath(){
  return <svg className="ct-flight" viewBox="0 0 1440 735" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <path className="ct-flight__trail" d={flight}/>
    <g className="ct-flight__plane">
      <path d="M-13-10 15 0-13 10-7 0Z"/>
      <path className="ct-flight__fold" d="M-7 0 15 0"/>
      <animateMotion dur="11s" repeatCount="indefinite" rotate="auto" path={flight} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".45 .05 .35 1"/>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.86;1" dur="11s" repeatCount="indefinite"/>
    </g>
  </svg>;
}
