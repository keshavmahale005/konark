import { projectGallery } from './projectGallery';

export const projectFilters=[
  {id:'all',label:'All projects'},
  {id:'steam',label:'Boilers & steam'},
  {id:'piping',label:'Pipelines'},
  {id:'cooling',label:'Cooling'},
  {id:'chimney',label:'Chimneys'}
] as const;
export type ProjectFilter=typeof projectFilters[number]['id'];
export type ProjectGroup=Exclude<ProjectFilter,'all'>;

// Groups follow each photograph's own title.
const groupOf:Record<string,ProjectGroup>={
  'Comblock Boiler':'steam','Boiler House':'steam','Steam Distributor Header':'steam','Pressure Reducing Station':'steam','Feed Water Tank':'steam',
  'Drainage Line':'piping','Steam Pipe Line':'piping','Heat Exchanger Pipeline':'piping','Feed Water Pipeline, Fluid Gas Ducting':'piping','Processing Pipeline':'piping','Pitch Handling Pipeline':'piping',
  'Chiller':'cooling','Cooling Tower':'cooling',
  'Chimney Erection':'chimney','Flue Gas Chimney':'chimney'
};
export const filterLabel=Object.fromEntries(projectFilters.map(item=>[item.id,item.label])) as Record<ProjectFilter,string>;
export const groupedProjects=projectGallery.map((project,id)=>({...project,id,group:groupOf[project.title],category:filterLabel[groupOf[project.title]]}));
