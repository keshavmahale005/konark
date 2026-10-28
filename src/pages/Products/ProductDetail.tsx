import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ProductPage } from '../../data/productPages';

export default function ProductDetail({ page }: { page: ProductPage }) {
  return <>
    <section className="simple-hero product-detail-hero">
      <div className="eyebrow"><i/>{page.eyebrow}</div>
      <h1>{page.title}</h1>
      <p>{page.intro}</p>
      <div className="product-detail-actions"><a className="button dark-button" href="/contact_us">Enquire about this product <ArrowUpRight size={16}/></a><a className="text-link" href="/products">All product families <ArrowRight size={16}/></a></div>
    </section>
    {page.sourceStatus==='restricted'&&<aside className="source-note"><strong>Source page access was restricted during the content audit.</strong><span>This route is retained, but its full live copy and media still need verification.</span><a href={`https://www.konarkglobal.com${page.path}`} target="_blank" rel="noreferrer">Open original page <ArrowUpRight size={14}/></a></aside>}
    <section className="section product-detail-content">
      {page.sections.map((section,i)=><article className="product-detail-section" key={section.title}><div className="eyebrow"><i/>{String(i+1).padStart(2,'0')}</div><div><h2>{section.title}</h2>{section.body&&<p>{section.body}</p>}{section.items&&<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</div></article>)}
    </section>
    <section className="contact-strip"><div><div className="eyebrow light"><i/> PRODUCT ENQUIRY</div><h2>Talk with our<br/><em>industrial team.</em></h2></div><a className="button light-button" href="/contact_us">Contact Konark <ArrowUpRight size={16}/></a></section>
  </>;
}
