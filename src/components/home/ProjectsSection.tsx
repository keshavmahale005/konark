import { ArrowUpRight } from 'lucide-react';
import { projectGallery } from '../../data/projectGallery';
import RevealGroup from '../common/RevealGroup';
import SectionTitle from '../common/SectionTitle';

const featuredTitles=['Comblock Boiler','Boiler House','Cooling Tower','Steam Distributor Header','Chimney Erection'];
const featured=featuredTitles.flatMap(title=>projectGallery.filter(project=>project.title===title).slice(0,1));

export default function ProjectsSection(){
  return <section className="hp-section hp-projects" aria-labelledby="hp-projects-title">
    <div className="hp-shell">
      <SectionTitle id="hp-projects-title" eyebrow="Projects" title={<>A look at our<br/><em>project work.</em></>} action={<a href="/projects" className="hp-link">View all projects <ArrowUpRight size={17}/></a>}/>
      <RevealGroup className="hp-projects__grid">
        {featured.map(project=><a className="hp-project" href="/projects" key={project.src}>
          <img src={project.image} alt="" loading="lazy" decoding="async"/>
          <span className="hp-project__caption">{project.title}</span>
          <span className="hp-project__arrow" aria-hidden="true"><ArrowUpRight size={18}/></span>
        </a>)}
      </RevealGroup>
    </div>
  </section>;
}
