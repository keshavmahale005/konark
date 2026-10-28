import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { prefersReducedMotion } from '../../hooks/useInView';
import { projectGallery } from '../../data/projectGallery';
import RevealGroup from '../common/RevealGroup';
import SectionTitle from '../common/SectionTitle';

const featuredTitles=['Comblock Boiler','Boiler House','Cooling Tower','Steam Distributor Header','Chimney Erection'];
const featured=featuredTitles.flatMap(title=>projectGallery.filter(project=>project.title===title).slice(0,1));

export default function ProjectsSection(){
  const section=useRef<HTMLElement>(null);
  useEffect(()=>{
    const node=section.current;
    if(!node||prefersReducedMotion())return;
    let frame=0;
    const update=()=>{
      frame=0;
      const vh=window.innerHeight;
      node.querySelectorAll<HTMLElement>('.hp-project').forEach(tile=>{
        const box=tile.getBoundingClientRect();
        const offset=(box.top+box.height/2-vh/2)/vh;
        tile.style.setProperty('--hm-py',`${(Math.max(-1,Math.min(1,offset))*-28).toFixed(1)}px`);
      });
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
  },[]);
  return <section ref={section} className="hp-section hp-projects" aria-labelledby="hp-projects-title">
    <div className="hp-shell">
      <SectionTitle id="hp-projects-title" eyebrow="Projects" title={<>A look at our<br/><em>project work.</em></>} action={<a href="/projects" className="hp-link">View all projects <ArrowUpRight size={17}/></a>}/>
      <RevealGroup className="hp-projects__grid">
        {featured.map(project=><a className="hp-project" href="/projects" key={project.src}>
          <img src={project.image} alt="" loading="lazy" decoding="async"/>
          <span className="hp-project__caption">{project.title}</span>
          <span className="hp-project__arrow" aria-hidden="true"><ArrowUpRight size={18}/></span>
          <span className="hm-doors" aria-hidden="true"><i/><i/></span>
        </a>)}
      </RevealGroup>
    </div>
  </section>;
}
