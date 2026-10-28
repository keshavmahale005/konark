import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './styles/responsive.css';
import ProductDetail from './pages/Products/ProductDetail';
import { productPages } from './data/productPages';
import { navigation } from './data/navigation';
import { Header, Footer } from './components/layout/SiteChrome';
import { products } from './data/products';
import RevealGroup from './components/common/RevealGroup';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import Career from './pages/Career/Career';
import { services } from './data/services';
import Projects from './pages/Projects/Projects';
import Services from './pages/Services/Services';
import Manufacturing from './pages/Manufacturing/Manufacturing';
import Industries from './pages/Industries/Industries';
import Gallery from './pages/Gallery/Gallery';

const media = 'https://www.konarkglobal.com/assets/images';
const projectNames = ['Drainage Line','Chiller','Comblock Boiler','Cooling Tower','Steam Pipe Line','Boiler House','Heat Exchanger Pipeline','Steam Distributor Header','Feed Water Pipeline, Fluid Gas Ducting','Pressure Reducing Station','Feed Water Tank','Chimney Erection','Pressure Reducing Station','Flue Gas Chimney','Processing Pipeline','Pitch Handling Pipeline'];

function Eyebrow({children,light=false}:{children:ReactNode;light?:boolean}){return <div className={`eyebrow ${light?'light':''}`}><i/>{children}</div>}
function CTA(){return <section className="contact-strip"><div><Eyebrow light>Start a conversation</Eyebrow><h2>Let’s solve your<br/><em>next challenge.</em></h2></div><a className="button light-button" href="/contact_us">Get in touch <ArrowUpRight size={17}/></a></section>}


function SimplePage({tag,title,sub,children}:{tag:string;title:string;sub:string;children?:ReactNode}){return <><section className="simple-hero"><Eyebrow>{tag}</Eyebrow><h1>{title}</h1><p>{sub}</p></section>{children}</>}




function Sitemap(){return <><SimplePage tag="Site map" title="Explore Konark Global." sub="A guide to the public pages and product families listed on the original site."/><section className="section sitemap-grid"><div><h2>Company</h2>{navigation.map(([n,p])=><a key={p} href={p}>{n}<ArrowUpRight size={14}/></a>)}</div><div><h2>Products</h2>{products.flatMap(([g,...items])=>[g,...items]).map((x,i)=><a key={`${x}${i}`} href="/products">{x}<ArrowUpRight size={14}/></a>)}{productPages.map(item=><a key={item.path} href={item.path}>{item.title}<ArrowUpRight size={14}/></a>)}</div><div><h2>Services</h2>{services.map(x=><a key={x} href="/services">{x}<ArrowUpRight size={14}/></a>)}</div><div><h2>Projects</h2>{projectNames.map((x,i)=><a key={`${x}${i}`} href="/projects">{x}<ArrowUpRight size={14}/></a>)}</div></section></>}
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















