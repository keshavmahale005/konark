import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './styles/responsive.css';
import ProductDetail from './pages/Products/ProductDetail';
import { productPages } from './data/productPages';
import { navigation } from './data/navigation';
import { Header, Footer } from './components/layout/SiteChrome';
import { sectors } from './data/industries';
import { products } from './data/products';
import ProjectGallery from './components/projects/ProjectGallery';
import ManufacturingGallery from './components/projects/ManufacturingGallery';
import RevealGroup from './components/common/RevealGroup';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import Career from './pages/Career/Career';

const media = 'https://www.konarkglobal.com/assets/images';
const services = ['Annual Service Contract','Breakdown','Overhauling','Efficiency Checking','Ageing Analysis','Energy Audits','Fuel Conversion','Boiler annual and bare inspection','Erection and commissioning of these equipment','Descaling of boilers, heat exchangers, cooling towers','Shock pulse measurements','Preventive maintenance','Air leakage test','Flow measurement','Screw element reconditioning','Motor Overhauling'];
const projectNames = ['Drainage Line','Chiller','Comblock Boiler','Cooling Tower','Steam Pipe Line','Boiler House','Heat Exchanger Pipeline','Steam Distributor Header','Feed Water Pipeline, Fluid Gas Ducting','Pressure Reducing Station','Feed Water Tank','Chimney Erection','Pressure Reducing Station','Flue Gas Chimney','Processing Pipeline','Pitch Handling Pipeline'];

function Eyebrow({children,light=false}:{children:ReactNode;light?:boolean}){return <div className={`eyebrow ${light?'light':''}`}><i/>{children}</div>}
function CTA(){return <section className="contact-strip"><div><Eyebrow light>Start a conversation</Eyebrow><h2>Let’s solve your<br/><em>next challenge.</em></h2></div><a className="button light-button" href="/contact_us">Get in touch <ArrowUpRight size={17}/></a></section>}
function SectorGrid(){return <RevealGroup className="industry-grid">{sectors.map(([name,desc,file],i)=><article className="industry-card" key={name}><div className="industry-photo"><img src={`${media}/industry/${file}.jpg`} alt={`${name} industry`} loading="lazy"/><span>0{i+1}</span></div><div className="industry-copy"><h3>{name}</h3><p>{desc}</p><a aria-label={`Enquire about ${name}`} href="/contact_us"><ArrowUpRight size={18}/></a></div></article>)}</RevealGroup>}
function Hero({title,sub,tag=''}:{title:ReactNode;sub:string;tag?:string}){return <section className="page-hero"><div className="hero-image"/><div className="hero-shade"/><div className="page-hero-content"><Eyebrow light>{tag}</Eyebrow><h1>{title}</h1><p>{sub}</p><div className="page-hero-meta">INDUSTRIAL SOLUTIONS <i/> NASHIK, INDIA</div></div></section>}
function Industries(){return <><Hero tag="Industry segments" title={<>Deep understanding.<br/><em>Across industries.</em></>} sub="Explore industry-specific solutions crafted to enhance your processes, productivity, and innovation."/><section className="section"><div className="section-head"><div><Eyebrow>Industries we support</Eyebrow><h2>Purpose-built thinking<br/>for <em>every process.</em></h2></div><p className="section-note">From food and pharmaceuticals to steel and engineering, explore the sectors connected by industrial solutions.</p></div><SectorGrid/></section><CTA/></>}function SimplePage({tag,title,sub,children}:{tag:string;title:string;sub:string;children?:ReactNode}){return <><section className="simple-hero"><Eyebrow>{tag}</Eyebrow><h1>{title}</h1><p>{sub}</p></section>{children}</>}

function Services(){return <><SimplePage tag="Services" title="Support through every operating stage." sub="Service for industrial utility equipment, systems and plant operations."/><section className="section"><div className="service-grid">{services.map((x,i)=><div id={`service-${i+1}`} key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div><div className="service-copy"><h2>Our core competencies</h2><ul><li>30 Years Experience: Products knowledge, Technical skill set, Strong Training Culture, Strong Leadership.</li><li>Team Culture: Calls are attended in time because of enough man power which helps to save your downtime & to achieve your goals in the todays cutthroat competition.</li><li>Data Maintaining: It gives history of your unit which helps us to plan effective service offerings and inventory combinations ensuring unit performance consistently.</li><li>Review Mechanism: Every service given by our team is reviewed by seniors for further improvements and necessary actions.</li><li>Strong Support from Principle Company: Our service engineers are trained at Thermax Ltd. so our team of experts have in-depth knowledge of products.</li><li>Strong Infrastructure: We have the provisions to fulfill statutory requirements to work on site like ESIC, PF and safety norms.</li><li>Usage of Advanced Software CRM Software: Ensure an enthralling presence on the digital landscape with mobile app which connect us in faster way.</li></ul></div></section><CTA/></>}
function Projects(){return <><ProjectGallery mode="projects"/><CTA/></>}
function Manufacturing(){return <><SimplePage tag="Manufacturing · R&D Therm" title="Process equipment, made in Nashik." sub="R&D Therm India Pvt Ltd designs and manufactures process equipment for sustainable industrial solutions."/><section className="section manufacturing-content"><p className="lead">R&D Therm India Pvt Ltd is a leading manufacturer in Nashik, specializing in industrial manufacturing of distillation columns, heat exchangers, pressure vessels, reactors, tanks, and chimneys. We use materials like SS 304, SS 316, Hastelloy, Titanium, Carbon Steel SA 515/516, and Mild Steel IS 2062 to deliver high-quality solutions.</p><p>R&D Therm India Pvt Ltd, the flagship of Konark Global, is located in Nashik, Maharashtra. Established in 1996, we combine technical expertise with innovative automation to deliver process equipment manufacturing and sustainable industrial solutions.</p><h2>Why choose R&D Therm?</h2><ul>{['Strict adherence to manufacturing codes for pressure vessels and heat exchangers','Compliance with quality standards, including ASME U Stamp and IBR approval','Timely delivery of distillation columns and other equipment','Continuous process improvements for enhanced productivity','Teamwork focused on customer satisfaction','Repeat business from satisfied clients'].map(x=><li key={x}>{x}</li>)}</ul><h2>State-of-the-art manufacturing facility</h2><p>Located in Nashik’s Satpur Industrial Area, just 180 km from Mumbai, our manufacturing facility spans 1 acre with a 40,000 sq. ft. shop and 13-meter shed height. Equipped with automated machines, we ensure fast delivery and top-quality process equipment manufacturing.</p><p>We work with leading consultants and Third Party Inspectors (TPI) like Lloyd's, TUV, Bureau Veritas, Chempro, Tata Consulting Engineers Ltd, Sulzer, Udhe India, EIL, Baxcounsel, TOYO Engineering Ltd., and Shiva Engineering.</p><p>As an ASME U Stamp certified and IBR approved manufacturer, we are expanding globally to deliver industrial manufacturing in Nashik and beyond.</p><h2 id="manufacturing-capabilities">Manufacturing capabilities</h2><div className="capability-grid">{[['Distillation Column','Max Diameter: 2700 mm · Max Length: 33 Meters'],['Heat Exchangers','Max Surface Area: 323 m² · Max Pressure: 50 Bar'],['Pressure Vessels','Max Capacity: 35 KL · Max Pressure: 50 Bar'],['Reactor','Max Weight: 9 Tons'],['Air Receiver & Surge Tanks','Max Capacity: 11 m³']].map(([a,b])=><article key={a}><b>{a}</b><p>{b}</p></article>)}</div><p>Industry: OEM, Compressor Distributors, EPC Projects</p><h2>Our manufacturing projects</h2><ManufacturingGallery/></section><CTA/></>}
function Sitemap(){return <><SimplePage tag="Site map" title="Explore Konark Global." sub="A guide to the public pages and product families listed on the original site."/><section className="section sitemap-grid"><div><h2>Company</h2>{navigation.map(([n,p])=><a key={p} href={p}>{n}<ArrowUpRight size={14}/></a>)}</div><div><h2>Products</h2>{products.flatMap(([g,...items])=>[g,...items]).map((x,i)=><a key={`${x}${i}`} href="/products">{x}<ArrowUpRight size={14}/></a>)}{productPages.map(item=><a key={item.path} href={item.path}>{item.title}<ArrowUpRight size={14}/></a>)}</div><div><h2>Services</h2>{services.map(x=><a key={x} href="/services">{x}<ArrowUpRight size={14}/></a>)}</div><div><h2>Projects</h2>{projectNames.map((x,i)=><a key={`${x}${i}`} href="/projects">{x}<ArrowUpRight size={14}/></a>)}</div></section></>}function Gallery(){return <><ProjectGallery mode="gallery"/><CTA/></>}
function App(){
  const path=decodeURI(location.pathname).replace(/\/$/,'')||'/';
  const routes:Record<string,{title:string;element:ReactNode}>=Object.fromEntries(productPages.map(product=>[product.path,{title:product.title+' | Konark Global',element:<ProductDetail page={product}/>}]));
  Object.assign(routes,{
    '/':{title:'Konark Global | Industrial Equipment & Engineering',element:<Home/>},
    '/industries':{title:'Industry Segments | Konark Global',element:<Industries/>},
    '/about_us':{title:'About Konark Global',element:<About/>},
    '/products':{title:'Industrial Products | Konark Global',element:<Products/>},
    '/projects':{title:'Industrial Projects | Konark Global',element:<Projects/>},
    '/services':{title:'Services | Konark Global',element:<Services/>},
    '/manufacturing':{title:'Manufacturing | Konark Global',element:<Manufacturing/>},
    '/contact_us':{title:'Contact Konark Global',element:<Contact/>},
    '/career':{title:'Careers | Konark Global',element:<Career/>},
    '/join_the_team':{title:'Join the Team | Konark Global',element:<Career/>},
    '/gallery':{title:'Gallery | Konark Global',element:<Gallery/>},
    '/sitemap':{title:'Sitemap | Konark Global',element:<Sitemap/>}
  });
  const page=routes[path]||{title:'Page not found | Konark Global',element:<SimplePage tag="Konark Global" title="Page not found." sub="Explore our products, projects and services."/>};
  const product=productPages.find(item=>item.path===path);
  const descriptions:Record<string,string>={
    '/':'Konark Global brings industrial equipment, project execution, manufacturing and service together to support essential processes.',
    '/industries':'Explore the food, chemical, pharmaceutical, rubber, engineering, textile, automobile, steel, aromatic, AAC block, graphite and paint segments listed by Konark Global.',
    '/about_us':'Learn about Konark Global, its group companies, values, leadership, operating areas and history since 1994.',
    '/products':'Explore industrial products and partner equipment offered by Konark Global, including boilers, water treatment, compressors, pumps and cooling towers.',
    '/projects':'View industrial installations and equipment projects featured by Konark Global.',
    '/services':'Explore industrial equipment maintenance, boiler service, inspections, audits and commissioning services listed by Konark Global.',
    '/manufacturing':'Explore R&D Therm’s manufacturing capabilities, facility information, materials, quality standards and process equipment.',
    '/contact_us':'Contact Konark Global in Satpur, Nashik for industrial equipment, engineering, service and manufacturing enquiries.',
    '/career':'Review current career listings and prepare an application for Konark Global.',
    '/join_the_team':'Career information and application contact for Konark Global.',
    '/gallery':'Browse project and manufacturing photographs shown on Konark Global.',
    '/sitemap':'Browse the public pages and product families listed on Konark Global.'
  };
  const description=product?.sourceStatus==='restricted'?'Konark Global lists this product category. The original page could not be fully retrieved during the content audit.':product?.intro||descriptions[path]||'Konark Global industrial equipment, engineering, projects, services and manufacturing.';
  useEffect(()=>{
    document.title=page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content',description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content',page.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content',description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href',`https://www.konarkglobal.com${path==='/'?'/':path}`);
    window.scrollTo(0,0);
  },[path,page.title,description]);
  return <><Header/><main>{page.element}</main><Footer/></>;
}export default App;















