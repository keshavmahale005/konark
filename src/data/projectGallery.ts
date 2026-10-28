export const projectGallery = [
  {title:'Drainage Line', src:'10.jpg'},
  {title:'Chiller', src:'11.jpg'},
  {title:'Comblock Boiler', src:'comblockboiler.jpg'},
  {title:'Cooling Tower', src:'pro.jpg'},
  {title:'Steam Pipe Line', src:'steampipeline.jpg'},
  {title:'Boiler House', src:'boilerhouse.jpg'},
  {title:'Heat Exchanger Pipeline', src:'heatexchangerpipeline.jpg'},
  {title:'Steam Distributor Header', src:'steamdistributorheader.jpg'},
  {title:'Feed Water Pipeline, Fluid Gas Ducting', src:'1.jpg'},
  {title:'Pressure Reducing Station', src:'pressure_reducing.jpg'},
  {title:'Feed Water Tank', src:'feedwatertank.jpg'},
  {title:'Chimney Erection', src:'chimneyerection.jpg'},
  {title:'Pressure Reducing Station', src:'pressurereducing.jpg'},
  {title:'Flue Gas Chimney', src:'6.jpg'},
  {title:'Processing Pipeline', src:'7.jpg'},
  {title:'Pitch Handling Pipeline', src:'8.jpg'}
].map(project=>({...project, image:`https://www.konarkglobal.com/assets/images/konark-projects/${project.src}`}));
