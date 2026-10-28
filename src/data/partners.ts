// Channel partners, their destinations and logos: the homepage showcase and the footer both read this list.
// Logos: the files konarkglobal.com hosts for each partner, plus Kirloskar's official mark
// (kirloskarpumps.com), stored locally because that site blocks hotlinking.
// `logoHeight` evens out the white margins baked into the files at the homepage card's 132px logo
// stage (the footer's 72px tiles scale it down); both clip the margins.
// `range` summarises each partner's product family in data/products.ts.
const media='https://www.konarkglobal.com/assets/images';
export const channelPartners:{name:string;href:string;external:boolean;logo:string;logoHeight:number;range:string}[] = [
  {name:'Thermax', href:'https://www.thermaxglobal.com/', external:true, logo:`${media}/principles/thermax.jpg`, logoHeight:128, range:'Boilers, heaters & water treatment'},
  {name:'Atlas Copco', href:'/atlas-copco', external:false, logo:`${media}/principles/atlas.jpg`, logoHeight:150, range:'Air compressors, dryers & spares'},
  {name:'Advance Cooling Tower', href:'/Aseries', external:false, logo:`${media}/principles/advance_cooling.png`, logoHeight:58, range:'Cooling towers & services'},
  {name:'Grundfos Pumps', href:'/grundfos-pumps', external:false, logo:`${media}/grund-removebg-preview.png`, logoHeight:92, range:'Pumps'},
  {name:'Kirloskar Brothers', href:'https://www.kirloskarpumps.com/', external:true, logo:'/images/partners/kirloskar.svg', logoHeight:100, range:'Pumps for HVAC, dewatering & water distribution'}
];
