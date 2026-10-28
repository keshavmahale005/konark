import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { projectGallery } from '../../data/projectGallery';
import RevealGroup from '../common/RevealGroup';

export default function ProjectGallery({mode='projects'}:{mode?:'projects'|'gallery'}) {
  const [active,setActive]=useState<number|null>(null);
  useEffect(()=>{
    if(active===null)return;
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape')setActive(null);
      if(event.key==='ArrowLeft')setActive(index=>(index===null?null:(index+projectGallery.length-1)%projectGallery.length));
      if(event.key==='ArrowRight')setActive(index=>(index===null?null:(index+1)%projectGallery.length));
    };
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    window.addEventListener('keydown',onKeyDown);
    return()=>{document.body.style.overflow=previousOverflow;window.removeEventListener('keydown',onKeyDown)};
  },[active]);
  const label=mode==='projects'?'Projects':'Gallery';
  return <>
    <section className="simple-hero"><div className="eyebrow"><i/>{label}</div><h1>{mode==='projects'?'Engineering in action.':'Work across the process.'}</h1><p>{mode==='projects'?'A selection of industrial installations and equipment projects shown on the Konark Global website.':'Project photographs and captions from the Konark Global image gallery.'}</p></section>
    <section className="section project-gallery-section"><RevealGroup className="project-gallery-grid">{projectGallery.map((project,i)=><button className="project-tile" key={`${project.title}-${i}`} onClick={()=>setActive(i)} aria-label={`View project photo: ${project.title}`}><div><img src={project.image} alt={project.title} loading="lazy"/><span>{String(i+1).padStart(2,'0')}</span><ArrowUpRight size={18}/></div><strong>{project.title}</strong></button>)}</RevealGroup></section>
    {active!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={projectGallery[active].title} onClick={()=>setActive(null)}><button className="lightbox-close" aria-label="Close image" onClick={()=>setActive(null)}><X/></button><button className="lightbox-prev" aria-label="Previous project" onClick={e=>{e.stopPropagation();setActive((active+projectGallery.length-1)%projectGallery.length)}}><ArrowLeft/></button><figure onClick={e=>e.stopPropagation()}><img src={projectGallery[active].image} alt={projectGallery[active].title}/><figcaption>{projectGallery[active].title}</figcaption></figure><button className="lightbox-next" aria-label="Next project" onClick={e=>{e.stopPropagation();setActive((active+1)%projectGallery.length)}}><ArrowRight/></button></div>}
  </>;
}
