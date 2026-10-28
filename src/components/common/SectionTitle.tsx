import type { ReactNode } from 'react';
import RevealGroup from './RevealGroup';

export function Eyebrow({children,light=false}:{children:ReactNode;light?:boolean}){
  return <p className={`section-eyebrow${light?' is-light':''}`}><i aria-hidden="true"/>{children}</p>;
}

export default function SectionTitle({id,eyebrow,title,action,light=false}:{id:string;eyebrow:string;title:ReactNode;action?:ReactNode;light?:boolean}){
  return <RevealGroup className={`section-title${light?' is-light':''}`}>
    <div>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 id={id}>{title}</h2>
    </div>
    {action}
  </RevealGroup>;
}
