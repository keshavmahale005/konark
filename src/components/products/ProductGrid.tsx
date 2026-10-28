import { useState } from 'react';
import { productPages } from '../../data/productPages';
import { productGroups } from '../../data/products';
import { matchesQuery } from '../../utils/helpers';
import RevealGroup from '../common/RevealGroup';
import ProductCard from './ProductCard';

const ALL='All products';

export default function ProductGrid({query,onClear}:{query:string;onClear:()=>void}){
  const [family,setFamily]=useState(ALL);
  const group=productGroups.find(g=>g.title===family);
  const visible=(group?group.items:productPages).filter(page=>matchesQuery(query,page.title,page.eyebrow,page.intro));
  return <>
    <div className="pr-tabs" role="group" aria-label="Filter product details by family">
      {[ALL,...productGroups.map(g=>g.title)].map(title=><button key={title} type="button" aria-pressed={family===title} onClick={()=>setFamily(title)}>
        {title}<span>{title===ALL?productPages.length:productGroups.find(g=>g.title===title)!.items.length}</span>
      </button>)}
    </div>
    {visible.length
      ?<RevealGroup key={family} className="pr-grid">{visible.map(page=><ProductCard key={page.path} page={page} number={productPages.indexOf(page)+1} query={query}/>)}</RevealGroup>
      :<div className="pr-empty"><p>No product details match “{query.trim()}” in {family===ALL?'the catalog':family}.</p><button type="button" onClick={onClear}>Clear search</button></div>}
  </>;
}
