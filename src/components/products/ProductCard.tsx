import { ArrowUpRight } from 'lucide-react';
import type { ProductPage } from '../../data/productPages';
import { highlight, pad } from '../../utils/helpers';

export default function ProductCard({page,number,query}:{page:ProductPage;number:number;query:string}){
  return <a className="pr-card" href={page.path}>
    <span className="pr-card__top">
      <span className="pr-card__num">{pad(number)}</span>
      <span className="pr-card__arrow" aria-hidden="true"><ArrowUpRight size={17}/></span>
    </span>
    <small className="pr-card__eyebrow">{page.eyebrow}</small>
    <strong>{highlight(page.title,query)}</strong>
    {/* Restricted pages hold content-audit notes in their intro, which are not meant for the catalog. */}
    {page.sourceStatus!=='restricted'&&<p>{page.intro}</p>}
  </a>;
}
