import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import Breadcrumb from '../../components/layout/Breadcrumb';
import RevealGroup from '../../components/common/RevealGroup';
import SectionTitle from '../../components/common/SectionTitle';
import ContactCTA from '../../components/home/ContactCTA';
import ProductFilter from '../../components/products/ProductFilter';
import ProductCategory from '../../components/products/ProductCategory';
import ProductGrid from '../../components/products/ProductGrid';
import { channelPartners } from '../../data/partners';
import { productPages } from '../../data/productPages';
import { products } from '../../data/products';
import { matchesQuery } from '../../utils/helpers';
import '../../styles/home.css';
import '../../styles/products.css';

const families=products.map(([name,...items],i)=>({name,items,number:i+1}));

export default function Products(){
  const [query,setQuery]=useState('');
  // A family whose name matches keeps all its items; otherwise only matching items stay.
  const visibleFamilies=families.map(family=>({...family,items:matchesQuery(query,family.name)?family.items:family.items.filter(item=>matchesQuery(query,item))})).filter(family=>family.items.length);
  const matches=visibleFamilies.reduce((sum,family)=>sum+family.items.length,0)+productPages.filter(page=>matchesQuery(query,page.title,page.eyebrow,page.intro)).length;
  return <div className="products-page">
    <section className="pr-hero" aria-labelledby="pr-hero-title">
      <span className="pr-hero__rays" aria-hidden="true"/>
      <div className="hp-shell pr-hero__inner">
        <div className="pr-hero__copy">
          <Breadcrumb items={[['Home','/'],['Products']]}/>
          <p className="pr-hero__eyebrow"><i aria-hidden="true"/>Our products</p>
          <h1 id="pr-hero-title">Equipment for <em>essential processes.</em></h1>
          <p className="pr-hero__sub">Explore equipment and product families listed by Konark Global and its channel partners.</p>
          <div className="pr-hero__actions">
            <a className="hp-btn hp-btn--primary" href="#families">Product families <ArrowDown size={17}/></a>
            <a className="hp-link is-light" href="#catalog">Product details <ArrowRight size={16}/></a>
          </div>
        </div>
        <aside className="pr-hero__panel" aria-label="Catalog overview">
          <div className="pr-hero__stats">
            <div><strong>{products.length}</strong><span>Product families</span></div>
            <div><strong>{productPages.length}</strong><span>Product detail pages</span></div>
          </div>
          <p className="pr-hero__label">Channel partners</p>
          <ul className="pr-hero__partners">
            {channelPartners.map(({name,href,external})=><li key={name}><a href={href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}>{name}<ArrowUpRight size={14} aria-hidden="true"/></a></li>)}
          </ul>
        </aside>
      </div>
    </section>

    <ProductFilter query={query} onChange={setQuery} matches={matches}/>

    <section className="hp-section pr-families" id="families" aria-labelledby="pr-families-title">
      <div className="hp-shell">
        <SectionTitle id="pr-families-title" eyebrow="Product families" title={<>Browse by <em>product family.</em></>}/>
        {visibleFamilies.length
          ?<RevealGroup className="pr-families__grid">{visibleFamilies.map(family=><ProductCategory key={family.name} {...family} query={query}/>)}</RevealGroup>
          :<div className="pr-empty"><p>No product families match “{query.trim()}”.</p><button type="button" onClick={()=>setQuery('')}>Clear search</button></div>}
      </div>
    </section>

    <section className="hp-section pr-catalog" id="catalog" aria-labelledby="pr-catalog-title">
      <div className="hp-shell">
        <SectionTitle id="pr-catalog-title" eyebrow="Product details" title={<>Explore the <em>catalog.</em></>}/>
        <ProductGrid query={query} onClear={()=>setQuery('')}/>
      </div>
    </section>

    <ContactCTA/>
  </div>;
}
