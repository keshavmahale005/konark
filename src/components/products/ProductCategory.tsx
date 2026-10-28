import { ArrowUpRight, Cog, Cylinder, Droplets, ExternalLink, Fan, FlaskConical, Flame, Gauge, Snowflake, Wind, type LucideIcon } from 'lucide-react';
import { resolveProductLink } from '../../data/products';
import { highlight, pad } from '../../utils/helpers';

// First matching rule picks the family's icon; anything unmatched falls back to Cog.
const familyIcons:[RegExp,LucideIcon][]=[[/chemical/i,FlaskConical],[/boiler|heater/i,Flame],[/water|waste/i,Droplets],[/steam/i,Gauge],[/enviro/i,Wind],[/cooling tower/i,Snowflake],[/pump|kirloskar/i,Cylinder],[/atlas copco/i,Fan]];

export default function ProductCategory({name,items,number,query}:{name:string;items:string[];number:number;query:string}){
  const Icon=familyIcons.find(([pattern])=>pattern.test(name))?.[1]??Cog;
  const [brand,title]=name.includes(' · ')?name.split(' · '):['',name];
  return <article className="pr-family">
    <div className="pr-family__top">
      <span className="pr-family__icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true"/></span>
      <span className="pr-family__num">{pad(number)}</span>
    </div>
    <h3>{brand&&<small>{brand}</small>}{highlight(title,query)}</h3>
    <ul>
      {items.map(item=>{
        const {href,external}=resolveProductLink(item);
        return <li key={item}><a href={href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}>
          <span>{highlight(item,query)}</span>
          {external?<><ExternalLink size={14} aria-hidden="true"/><span className="sr-only"> (opens partner website)</span></>:<ArrowUpRight size={15} aria-hidden="true"/>}
        </a></li>;
      })}
    </ul>
  </article>;
}
