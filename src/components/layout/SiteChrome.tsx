import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, PointerEvent, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Briefcase, ChevronDown, X, Phone, Mail, MapPin, Users } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { productPages } from '../../data/productPages';
import '../../styles/header.css';
function Eyebrow({children,light=false}:{children:ReactNode;light?:boolean}){return <div className={`eyebrow ${light?'light':''}`}><i/>{children}</div>}function QuoteDialog({onClose}:{onClose:()=>void}){
  const [notice,setNotice]=useState('');
  const dialogRef=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    const previousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const focusable=()=>Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')||[]).filter(element=>element.offsetParent!==null);
    const first=dialogRef.current?.querySelector<HTMLElement>('input');first?.focus();
    const key=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();onClose();return}
      if(event.key!=='Tab')return;
      const items=focusable();if(!items.length)return;
      const firstItem=items[0],lastItem=items[items.length-1];
      if(event.shiftKey&&document.activeElement===firstItem){event.preventDefault();lastItem.focus()}
      else if(!event.shiftKey&&document.activeElement===lastItem){event.preventDefault();firstItem.focus()}
    };
    window.addEventListener('keydown',key);
    return()=>{window.removeEventListener('keydown',key);document.body.style.overflow=previousOverflow;previousFocus?.focus()};
  },[onClose]);
  function send(event:FormEvent<HTMLFormElement>){event.preventDefault();const data=new FormData(event.currentTarget);const body=[`Name: ${data.get('name')}`,`Mobile: ${data.get('mobile')}`,`Email: ${data.get('email')}`,`Company: ${data.get('company')}`,`City: ${data.get('city')}`].join('\n');setNotice('Your email application should open. Review the request and send it to Konark Global.');window.location.href=`mailto:sales@konarkglobal.com?subject=${encodeURIComponent('Get a quote')}&body=${encodeURIComponent(body)}`}
  return <div className="modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><section ref={dialogRef} className="quote-dialog" role="dialog" aria-modal="true" aria-labelledby="quote-heading" aria-describedby="quote-description"><button className="quote-close" onClick={onClose} aria-label="Close quote request"><X/></button><Eyebrow>Konark Global</Eyebrow><h2 id="quote-heading">Get a quote</h2><p id="quote-description">Share your contact details and prepare an email request to the sales team.</p><form className="quote-form" onSubmit={send}><label>Name<input name="name" autoComplete="name" required/></label><label>Mobile<input name="mobile" type="tel" autoComplete="tel" required/></label><label>Email<input name="email" type="email" autoComplete="email" required/></label><label>Company<input name="company" autoComplete="organization"/></label><label>City<input name="city" autoComplete="address-level2"/></label><div className="quote-actions"><button className="button dark-button" type="submit">Prepare email <ArrowUpRight size={16}/></button><button className="cancel-button" type="button" onClick={onClose}>Cancel</button></div>{notice&&<p className="form-note" role="status">{notice}</p>}</form></section></div>;
}type MenuId='products'|'careers';
const careerLinks:[string,string,typeof Briefcase][]=[['Career','/career',Briefcase],['Join the Team','/join_the_team',Users]];
// Product pages are grouped into families by their eyebrow; each page lands in the first family whose rule matches.
const productFamilies:{title:string;match:(eyebrow:string)=>boolean}[]=[
  {title:'Boilers & heaters',match:e=>/boiler|heater|heat pump|heat recovery/i.test(e)&&!/chemicals|house products/i.test(e)},
  {title:'Water treatment & chemicals',match:e=>/chemicals|water|effluent/i.test(e)&&!/paper chemicals|oil-field/i.test(e)},
  {title:'Paper & oil-field chemicals',match:e=>/paper chemicals|oil-field/i.test(e)},
  {title:'Steam, enviro & spares',match:e=>/steam accessories|condensate|boiler house|enviro|spares/i.test(e)},
  {title:'Partner equipment',match:()=>true}
];
const productGroups=productFamilies.map((family,index)=>({title:family.title,items:productPages.filter(page=>productFamilies.findIndex(f=>f.match(page.eyebrow))===index)}));
const megaColumns=[[productGroups[0],productGroups[1]],[productGroups[2],productGroups[3]],[productGroups[4]]];
const primaryLinks=navigation.filter(([,p])=>!careerLinks.some(([,c])=>c===p));

function Header(){
  const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false),[quoteOpen,setQuoteOpen]=useState(false);
  const [menu,setMenu]=useState<MenuId|null>(null),[sub,setSub]=useState<MenuId|null>(null);
  const closeTimer=useRef(0),headerRef=useRef<HTMLElement>(null),toggleRef=useRef<HTMLButtonElement>(null);
  const path=location.pathname;
  const productsActive=path==='/products'||productPages.some(item=>item.path===path);
  const careersActive=careerLinks.some(([,p])=>p===path);
  const closeQuote=useCallback(()=>setQuoteOpen(false),[]);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>40);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[]);
  useEffect(()=>{
    if(!menu)return;
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){document.getElementById(`nav-trigger-${menu}`)?.focus();setMenu(null)}};
    const click=(event:MouseEvent)=>{if(!(event.target as HTMLElement).closest('.site-nav__item'))setMenu(null)};
    window.addEventListener('keydown',key);document.addEventListener('mousedown',click);
    return()=>{window.removeEventListener('keydown',key);document.removeEventListener('mousedown',click)};
  },[menu]);
  useEffect(()=>{
    if(!open)return;
    // The drawer opens below the sticky header, wherever the header currently sits.
    document.documentElement.style.setProperty('--drawer-top',`${headerRef.current?.getBoundingClientRect().bottom??80}px`);
    const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);toggleRef.current?.focus()}};
    const resize=()=>{if(window.innerWidth>1180)setOpen(false)};
    window.addEventListener('keydown',key);window.addEventListener('resize',resize);
    return()=>{window.removeEventListener('keydown',key);window.removeEventListener('resize',resize);document.body.style.overflow=previousOverflow};
  },[open]);
  const hoverOpen=(event:PointerEvent<HTMLElement>,id:MenuId)=>{if(event.pointerType!=='mouse')return;window.clearTimeout(closeTimer.current);setMenu(id)};
  const hoverClose=(event:PointerEvent<HTMLElement>)=>{if(event.pointerType!=='mouse')return;closeTimer.current=window.setTimeout(()=>setMenu(null),160)};
  const itemProps=(id:MenuId)=>({className:`site-nav__item has-${id==='products'?'mega':'dropdown'}${menu===id?' is-open':''}`,onPointerEnter:(event:PointerEvent<HTMLElement>)=>hoverOpen(event,id),onPointerLeave:hoverClose});
  const triggerProps=(id:MenuId,active:boolean)=>({id:`nav-trigger-${id}`,type:'button' as const,className:`site-nav__link site-nav__trigger${active?' is-active':''}`,'aria-expanded':menu===id,'aria-controls':`nav-panel-${id}`,onClick:()=>setMenu(menu===id?null:id)});
  const current=(p:string)=>path===p?'page' as const:undefined;
  return <>
    <div className="site-topbar">
      <div className="site-shell site-topbar__inner">
        <span className="site-topbar__tag"><i aria-hidden="true"/>Industrial equipment · Engineering · Energy efficiency</span>
        <div className="site-topbar__contact">
          <a href="tel:+917888008030"><Phone size={14} aria-hidden="true"/>+91 78880 08030</a>
          <i aria-hidden="true"/>
          <a href="mailto:sales@konarkglobal.com"><Mail size={14} aria-hidden="true"/>sales@konarkglobal.com</a>
        </div>
      </div>
    </div>
    <header ref={headerRef} className={`site-header${scrolled?' is-scrolled':''}`}>
      <div className="site-shell site-header__inner">
        <a className="site-brand" href="/" aria-label="Konark Global home"><img src="/images/logo/logo.png" alt="Konark Global" width="272" height="146"/></a>
        <nav className="site-nav" aria-label="Primary navigation">
          <ul>
            {primaryLinks.map(([name,p])=>name==='Products'?<li key={p} {...itemProps('products')}>
              <button {...triggerProps('products',productsActive)}>Products<ChevronDown size={15} aria-hidden="true"/></button>
              <div className="site-mega" id="nav-panel-products">
                <div className="site-mega__inner">
                  <div className="site-mega__intro">
                    <p className="site-mega__eyebrow">Our products</p>
                    <p className="site-mega__title">Equipment for essential processes.</p>
                    <p>Explore equipment and product families listed by Konark Global and its channel partners.</p>
                    <a className="site-mega__all" href="/products" aria-current={current('/products')}>All products <ArrowRight size={15}/></a>
                  </div>
                  <div className="site-mega__columns">
                    {megaColumns.map((column,i)=><div key={i}>{column.map(group=><div className="site-mega__group" key={group.title}>
                      <p className="site-mega__group-title">{group.title}</p>
                      <ul>{group.items.map(item=><li key={item.path}><a href={item.path} aria-current={current(item.path)}>{item.title}</a></li>)}</ul>
                    </div>)}</div>)}
                  </div>
                </div>
              </div>
            </li>:<li key={p} className="site-nav__item"><a className={`site-nav__link${path===p?' is-active':''}`} aria-current={current(p)} href={p}>{name}</a></li>)}
            <li {...itemProps('careers')}>
              <button {...triggerProps('careers',careersActive)}>Careers<ChevronDown size={15} aria-hidden="true"/></button>
              <div className="site-dropdown" id="nav-panel-careers">
                {careerLinks.map(([name,p,Icon])=><a key={p} href={p} aria-current={current(p)}><span><Icon size={17} aria-hidden="true"/></span>{name}</a>)}
              </div>
            </li>
          </ul>
        </nav>
        <div className="site-header__actions">
          <button className="site-cta" type="button" onClick={()=>setQuoteOpen(true)}>Get a quote <ArrowUpRight size={16}/></button>
          <button ref={toggleRef} className={`site-menu-toggle${open?' is-open':''}`} type="button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="site-drawer" onClick={()=>setOpen(!open)}><span/><span/><span/></button>
        </div>
      </div>
    </header>
    <div className={`site-drawer${open?' is-open':''}`} id="site-drawer" inert={!open}>
      <div className="site-drawer__backdrop" onClick={()=>setOpen(false)}/>
      <nav className="site-drawer__panel" aria-label="Mobile navigation">
        <ul className="site-drawer__list">
          {primaryLinks.map(([name,p])=>name==='Products'?<li key={p}>
            <div className="site-drawer__row">
              <a className={productsActive?'is-active':''} href={p} aria-current={current(p)}>Products</a>
              <button type="button" aria-label="Show product categories" aria-expanded={sub==='products'} onClick={()=>setSub(sub==='products'?null:'products')}><ChevronDown size={18}/></button>
            </div>
            {sub==='products'&&<div className="site-drawer__sub">{productGroups.map(group=><div key={group.title}>
              <p>{group.title}</p>
              {group.items.map(item=><a key={item.path} href={item.path} aria-current={current(item.path)}>{item.title}</a>)}
            </div>)}</div>}
          </li>:<li key={p}><a className={path===p?'is-active':''} href={p} aria-current={current(p)}>{name}<ArrowRight size={17}/></a></li>)}
          <li>
            <div className="site-drawer__row">
              <span className={careersActive?'is-active':''}>Careers</span>
              <button type="button" aria-label="Show career pages" aria-expanded={sub==='careers'} onClick={()=>setSub(sub==='careers'?null:'careers')}><ChevronDown size={18}/></button>
            </div>
            {sub==='careers'&&<div className="site-drawer__sub">{careerLinks.map(([name,p])=><a key={p} href={p} aria-current={current(p)}>{name}</a>)}</div>}
          </li>
        </ul>
        <div className="site-drawer__footer">
          <button className="site-cta" type="button" onClick={()=>{setOpen(false);setQuoteOpen(true)}}>Get a quote <ArrowUpRight size={16}/></button>
          <a href="tel:+917888008030"><Phone size={16}/>+91 78880 08030</a>
          <a href="mailto:sales@konarkglobal.com"><Mail size={16}/>sales@konarkglobal.com</a>
        </div>
      </nav>
    </div>
    {quoteOpen&&<QuoteDialog onClose={closeQuote}/>}
  </>;
}
function Footer(){const manufacturingLinks=['Distillation Columns Nashik','Heat Exchangers India','Pressure Vessels Nashik','Reactors Manufacturing','Tanks Fabrication','Chimney Manufacturers'];const serviceLinks=['Custom Fabrication Services','Boiler Overhauling','Equipment Ageing Analysis','Energy Audit Services','Fuel Conversion','Boiler Inspection','Erection and Commissioning','Boiler Descaling'];return <footer><div className="footer-main"><div className="footer-brand"><a className="brand inverse" href="/" aria-label="Konark Global home"><img className="brand-logo" src="/images/logo/logo.png" alt="Konark Global" width="272" height="146"/></a><p>Putting you in a winning position.</p><p className="footer-vision">“To be first choice for needs of industries attaining respect as a high-performance organization, providing sustainable solutions.”</p><div className="footer-partners"><span>Channel partners</span><a href="https://www.thermaxglobal.com/" target="_blank" rel="noreferrer">Thermax</a><a href="/atlas-copco">Atlas Copco</a><a href="/Aseries">Advance Cooling Tower</a><a href="/grundfos-pumps">Grundfos Pumps</a><a href="https://www.kirloskarpumps.com/" target="_blank" rel="noreferrer">Kirloskar Brothers</a></div></div><div><h2 className="footer-heading">Quick links</h2>{[['Home','/'],...navigation.filter(([,p])=>p!=='/join_the_team')].map(([n,p])=><a key={p} href={p}>{p==='/career'?'Careers':n}</a>)}<a href="/sitemap">Sitemap</a></div><div><h2 className="footer-heading">Products & manufacturing</h2>{manufacturingLinks.map(x=><a key={x} href="/manufacturing#manufacturing-capabilities">{x}</a>)}<a href="/manufacturing">Industrial Equipment Nashik</a><h2 className="footer-heading footer-subhead">Services</h2>{serviceLinks.map((x,i)=><a key={x} href="/services">{x}</a>)}</div><div><h2 className="footer-heading">Contact Konark Global</h2><p><MapPin size={15}/> C-14/2, M.I.D.C. Industrial Area,<br/>Satpur, Nashik - 422 007,<br/>Maharashtra, India.</p><a href="tel:02532361604"><Phone size={15}/>0253-2361604</a><a href="tel:+919422249499"><Phone size={15}/>+91 9422249499</a><a href="tel:+917888008030"><Phone size={15}/>7888008030</a><a href="mailto:sales@konarkglobal.com"><Mail size={15}/>sales@konarkglobal.com</a><a href="mailto:enquiry@konarkglobal.com"><Mail size={15}/>enquiry@konarkglobal.com</a></div></div><div className="footer-bottom"><span>© Copyright © 2025, All rights reserved with Konark Global</span><span>Technical partner: <a href="https://techgarner.in" target="_blank" rel="noreferrer">Techgarner IT Services Pvt. Ltd.</a></span></div></footer>}
export { Header, Footer };
