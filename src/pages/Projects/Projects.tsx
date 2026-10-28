import { useState } from 'react';
import { flushSync } from 'react-dom';
import ProjectsHero from '../../components/projects/ProjectsHero';
import ProjectStats from '../../components/projects/ProjectStats';
import ProjectProcess from '../../components/projects/ProjectProcess';
import ProjectScope from '../../components/projects/ProjectScope';
import ProjectShowcase from '../../components/projects/ProjectShowcase';
import ProjectsCTA from '../../components/projects/ProjectsCTA';
import type { ProjectFilter, ProjectGroup } from '../../data/projectGroups';
import { prefersReducedMotion } from '../../hooks/useInView';
import '../../styles/projects.css';

export default function Projects(){
  const [filter,setFilter]=useState<ProjectFilter>('all');
  // Gallery chips morph the grid with a view transition where supported.
  const changeFilter=(id:ProjectFilter)=>{
    if(id===filter)return;
    const apply=()=>flushSync(()=>setFilter(id));
    if(!('startViewTransition' in document)||prefersReducedMotion()){apply();return;}
    document.startViewTransition(apply);
  };
  // Scope panels filter first, then scroll — a view transition mid-scroll would show stale snapshots.
  const showGroup=(id:ProjectGroup)=>{
    setFilter(id);
    document.getElementById('project-gallery')?.scrollIntoView({behavior:prefersReducedMotion()?'auto':'smooth',block:'start'});
  };
  return <div className="projects-page">
    <ProjectsHero/>
    <ProjectStats/>
    <ProjectProcess/>
    <ProjectScope onShow={showGroup}/>
    <ProjectShowcase filter={filter} onFilter={changeFilter}/>
    <ProjectsCTA/>
  </div>;
}
