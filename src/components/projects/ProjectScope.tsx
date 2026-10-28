import { useState, type CSSProperties, type PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { filterLabel, groupedProjects, type ProjectGroup } from '../../data/projectGroups';
import { useInView } from '../../hooks/useInView';

const pad=(n:number)=>String(n).padStart(2,'0');
const covers:[ProjectGroup,string][]=[['steam','comblockboiler.jpg'],['piping','steampipeline.jpg'],['cooling','pro.jpg'],['chimney','chimneyerection.jpg']];
const panels=covers.map(([id,cover])=>({
  id,
  label:filterLabel[id],
  items:groupedProjects.filter(project=>project.group===id),
  image:groupedProjects.find(project=>project.src===cover)!.image
}));

/** Expanding photo panels, one per kind of installation. The open panel's
    progress bar hands over to the next when it fills; hovering pauses it and a
    click stops the cycle. */
export default function ProjectScope({onShow}:{onShow:(id:ProjectGroup)=>void}){
  const [active,setActive]=useState(0);
  const [cycling,setCycling]=useState(true);
  const [ref,inView]=useInView<HTMLDivElement>();
  const hover=(i:number)=>(event:PointerEvent)=>{if(event.pointerType==='mouse')setActive(i)};
  return <section className="pj-section pj-scope" aria-labelledby="pj-scope-title">
    <div className="pj-shell">
      <div className={`pj-scope__head${inView?' is-in':''}`}>
        <div>
          <p className="pj-eyebrow is-light"><i aria-hidden="true"/>Scope of work</p>
          <h2 className="pj-h2" id="pj-scope-title">What our projects<br/><em>cover.</em></h2>
        </div>
        <p className="pj-scope__lead">Four kinds of installation appear across the project photographs. Open one to see what it includes.</p>
      </div>
      <div ref={ref} className={`pj-scope__panels${inView?' is-in':''}${cycling?' is-cycling':''}`}>
        {panels.map((panel,i)=>{
          const open=i===active;
          return <article className={`pj-panel${open?' is-open':''}`} key={panel.id} style={{'--i':i} as CSSProperties} onPointerEnter={hover(i)}>
            <img className="pj-panel__bg" src={panel.image} alt="" loading="lazy" decoding="async"/>
            <button className="pj-panel__head" type="button" aria-expanded={open} aria-controls={`pj-panel-${panel.id}`} onClick={()=>{setActive(i);setCycling(false)}}>
              <span className="pj-panel__num">{pad(i+1)}</span>
              <span className="pj-panel__label">{panel.label}</span>
            </button>
            <div className="pj-panel__body" id={`pj-panel-${panel.id}`} inert={!open}>
              <span className="pj-panel__count">{pad(panel.items.length)} project photos</span>
              <h3>{panel.label}</h3>
              <ul>{panel.items.map((item,j)=><li key={item.src} style={{'--j':j} as CSSProperties}>{item.title}</li>)}</ul>
              <button className="pj-btn pj-btn--primary" type="button" onClick={()=>onShow(panel.id)}>View these projects <ArrowUpRight size={17}/></button>
            </div>
            {open&&<span className="pj-panel__bar" aria-hidden="true" onAnimationEnd={()=>setActive((i+1)%panels.length)}/>}
          </article>;
        })}
      </div>
    </div>
  </section>;
}
