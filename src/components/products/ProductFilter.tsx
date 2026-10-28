import { Search, X } from 'lucide-react';

export default function ProductFilter({query,onChange,matches}:{query:string;onChange:(value:string)=>void;matches:number}){
  const searching=query.trim()!=='';
  return <div className="pr-toolbar">
    <div className="hp-shell pr-toolbar__inner">
      <label className="pr-search">
        <Search size={18} aria-hidden="true"/>
        <span className="sr-only">Search products</span>
        <input type="search" value={query} onChange={event=>onChange(event.target.value)} placeholder="Search products…" autoComplete="off"/>
        {query&&<button type="button" onClick={()=>onChange('')} aria-label="Clear search"><X size={16}/></button>}
      </label>
      <p className="pr-toolbar__count" role="status">{searching?`${matches} ${matches===1?'match':'matches'}`:''}</p>
      <nav className="pr-toolbar__jump" aria-label="Products page sections">
        <a href="#families">Product families</a>
        <a href="#catalog">Product details</a>
      </nav>
    </div>
  </div>;
}
