const base='https://www.konarkglobal.com/assets/rd/';
export const manufacturingGallery=[
 ['Distillation Column','distillation-column.jpg'],['Distillation Column','distillation-column-2.jpg'],['Distillation Column','distillation-column-3.jpg'],['Distillation Column','distillation-column-4.jpg'],['Distillation Column','distillation-column-5.jpg'],
 ['Deaerator','deaerator.jpg'],['Deaerator','deaerator-1.jpg'],['Deaerator','deaerator-2.jpg'],['Deaerator','deaerator-3.jpg'],
 ['Pressure Vessel','pressure-vessel.jpg'],['Pressure Vessel','pressure-vessel-1.jpg'],['Pressure Vessel','pressure-vessel-2.jpg'],
 ['Air Receiver','air-receiver.jpg'],['Heat Exchanger','heat-exchanger.jpg'],['Stack','stack.jpg'],['Turnkey Solution','turnkey-solution.jpg'],['Infrastructure','infrastructure.jpg'],['Shop Floor','shop-floor.jpg']
].map(([title,file])=>({title,image:base+file}));
