import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Expand } from 'lucide-react';
import { groupedProjects, projectFilters as filters, type ProjectFilter as FilterId } from '../../data/projectGroups';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';
import ProjectLightbox from './ProjectLightbox';

const projects=groupedProjects;
const countOf=(id:FilterId)=>id==='all'?projects.length:projects.filter(project=>project.group===id).length;
const pad=(n:number)=>String(n).padStart(2,'0');

function tilt(event:PointerEvent<HTMLElement>){
  if(event.pointerType!=='mouse')return;
  const tile=event.currentTarget;
  const rect=tile.getBoundingClientRect();
  const x=(event.clientX-rect.left)/rect.width;
  const y=(event.clientY-rect.top)/rect.height;
  tile.style.setProperty('--rx',`${((.5-y)*7).toFixed(2)}deg`);
  tile.style.setProperty('--ry',`${((x-.5)*9).toFixed(2)}deg`);
  tile.style.setProperty('--gx',`${(x*100).toFixed(1)}%`);
  tile.style.setProperty('--gy',`${(y*100).toFixed(1)}%`);
}
function untilt(event:PointerEvent<HTMLElement>){
  ['--rx','--ry','--gx','--gy'].forEach(name=>event.currentTarget.style.removeProperty(name));
}

export default function ProjectShowcase({filter,onFilter}:{filter:FilterId;onFilter:(id:FilterId)=>void}){
  const [active,setActive]=useState<number|null>(null);
  const grid=useRef<HTMLDivElement>(null);
  const chips=useRef<HTMLDivElement>(null);
  const hasFiltered=useRef(false);
  const firstFilter=useRef(filter);
  const [head,headIn]=useInView<HTMLDivElement>();
  const visible=filter==='all'?projects:projects.filter(project=>project.group===filter);

  // Curtain reveal as tiles scroll in. Tiles mounted by a filter change skip it,
  // because the view transition already animates them. Runs before the chip
  // measurement below so no forced layout catches tiles in their hidden state.
  useLayoutEffect(()=>{
    if(filter!==firstFilter.current)hasFiltered.current=true;
    const tiles=Array.from(grid.current?.querySelectorAll<HTMLElement>('.pj-tile:not(.is-in)')||[]);
    if(!tiles.length)return;
    if(hasFiltered.current||prefersReducedMotion()||!('IntersectionObserver' in window)){tiles.forEach(tile=>tile.classList.add('is-in','is-instant'));return;}
    const observer=new IntersectionObserver(entries=>{
      let order=0;
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const tile=entry.target as HTMLElement;
        tile.style.setProperty('--d',`${order++*90}ms`);
        tile.classList.add('is-in');
        observer.unobserve(tile);
      });
    },{rootMargin:'0px 0px -8% 0px',threshold:.12});
    tiles.forEach(tile=>observer.observe(tile));
    return()=>observer.disconnect();
  },[filter]);

  // The highlight pill slides to whichever filter is pressed.
  useLayoutEffect(()=>{
    const wrap=chips.current;
    if(!wrap)return;
    const place=()=>{
      const chip=wrap.querySelector<HTMLElement>('[aria-pressed="true"]');
      if(!chip)return;
      wrap.style.setProperty('--x',`${chip.offsetLeft}px`);
      wrap.style.setProperty('--w',`${chip.offsetWidth}px`);
    };
    place();
    document.fonts?.ready.then(place);
    const observer=new ResizeObserver(place);
    observer.observe(wrap);
    return()=>observer.disconnect();
  },[filter]);

  return <section className="pj-section pj-gallery" id="project-gallery" aria-labelledby="pj-gallery-title">
    <div className="pj-shell">
      <div ref={head} className={`pj-gallery__head${headIn?' is-in':''}`}>
        <div>
          <p className="pj-eyebrow"><i aria-hidden="true"/>Project gallery</p>
          <h2 className="pj-h2" id="pj-gallery-title">A look at our<br/><em>project work.</em></h2>
        </div>
        <p className="pj-gallery__count" aria-live="polite">Showing <b>{pad(visible.length)}</b> of {pad(projects.length)}</p>
      </div>
      <div className="pj-filters" ref={chips} role="group" aria-label="Filter projects">
        <span className="pj-filters__pill" aria-hidden="true"/>
        {filters.map(item=><button key={item.id} type="button" aria-pressed={filter===item.id} onClick={()=>onFilter(item.id)}>
          {item.label}<sup>{pad(countOf(item.id))}</sup>
        </button>)}
      </div>
      <div ref={grid} className="pj-grid">
        {visible.map((project,i)=><button className="pj-tile" type="button" key={project.id}
          style={{viewTransitionName:`pj-tile-${project.id}`} as CSSProperties}
          onClick={()=>setActive(i)} onPointerMove={tilt} onPointerLeave={untilt}
          aria-label={`View project photo: ${project.title}`}>
          <span className="pj-tile__media"><img src={project.image} alt="" loading="lazy" decoding="async"/></span>
          <span className="pj-tile__glare" aria-hidden="true"/>
          <span className="pj-tile__num" aria-hidden="true">{pad(project.id+1)}</span>
          <span className="pj-tile__body"><span className="pj-tile__cat">{project.category}</span><strong>{project.title}</strong></span>
          <span className="pj-tile__icon" aria-hidden="true"><Expand size={17}/></span>
        </button>)}
      </div>
    </div>
    {active!==null&&<ProjectLightbox items={visible} index={active} onIndex={setActive} onClose={()=>setActive(null)}/>}
  </section>;
}
