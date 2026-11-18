import { describe, it, expect } from "vitest";
const background={dark:"#0c0d0f",light:"#f2f1ed",contrast:"#000000"} as const;
const inks={dark:"#f4f3ee",light:"#1e2522",contrast:"#ffffff"} as const;
const sub={dark:"#b8b9b8",light:"#4a5650",contrast:"#ffffff"} as const;
const accent={
 dark:["#a6e6c5","#a0caff","#dec0fc","#ffc79e"],
 light:["#176341","#245db0","#75439c","#96500a"],
 contrast:["#bbfbd6","#c6dfff","#ead6ff","#ffdab9"],
} as const;
const foreground={dark:"#10261b",light:"#ffffff",contrast:"#000000"} as const;
function luminance(hex:string):number{
 const v=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
 return .2126*(v[0]??0)+.7152*(v[1]??0)+.0722*(v[2]??0);
}
function ratio(one:string,two:string):number{const a=luminance(one),b=luminance(two);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);}
describe("contrastes de texte WCAG AA",()=>{
 for(const theme of ["dark","light","contrast"] as const){
  it(`textes réguliers et secondaires en thème ${theme}`,()=>{expect(ratio(inks[theme],background[theme])).toBeGreaterThanOrEqual(4.5);expect(ratio(sub[theme],background[theme])).toBeGreaterThanOrEqual(4.5);});
  for(const color of accent[theme]){
   it(`accent ${color} lisible sur ${theme}`,()=>{expect(ratio(color,background[theme])).toBeGreaterThanOrEqual(4.5);expect(ratio(foreground[theme],color)).toBeGreaterThanOrEqual(4.5);});
  }
 }
});

const secondaryPairs={
 dark:["#ffb4a2","#ffd17d","#f1e491","#7bddf1"],
 light:["#9b382e","#775000","#605900","#006579"],
 contrast:["#ffd3ca","#ffe2a1","#fff49b","#adf0ff"]
} as const;
describe("couleurs complémentaires SOURCE / PLAY, 4 paires × 3 thèmes",()=>{
 for(const theme of ["dark","light","contrast"] as const){
   for(const color of secondaryPairs[theme]){
     it(`secondaire ${color} est lisible dans ${theme}`,()=>{
       expect(ratio(color,background[theme])).toBeGreaterThanOrEqual(4.5);
     });
   }
 }
});

const matrixColors={page:"#020a05",panel:"#09160e",text:"#d7ffe0",secondary:"#addbb7",pair:"#6ff3ff",accents:["#f0b429","#ff6f59","#7fb2ff","#8fd6a5"]};
function rgbBlend(bg:string,overlay:string,opacity:number):string{
 const a=[1,3,5].map(i=>parseInt(bg.slice(i,i+2),16));
 const b=[1,3,5].map(i=>parseInt(overlay.slice(i,i+2),16));
 return "#"+a.map((v,i)=>Math.round(v*(1-opacity)+(b[i]??0)*opacity).toString(16).padStart(2,"0")).join("");
}
describe("Matrix sur SOURCE et PLAY, quatre accents et pluie",()=>{
 for(const mode of ["source","play"] as const){
  for(const color of matrixColors.accents){
   it(`AA de Matrix ${mode} pour ${color}`,()=>{
     expect(ratio(matrixColors.text,matrixColors.page)).toBeGreaterThanOrEqual(4.5);
     expect(ratio(matrixColors.secondary,matrixColors.panel)).toBeGreaterThanOrEqual(4.5);
     expect(ratio(color,matrixColors.page)).toBeGreaterThanOrEqual(4.5);
     expect(ratio("#0e1424",color)).toBeGreaterThanOrEqual(4.5);
     expect(ratio(matrixColors.pair,matrixColors.page)).toBeGreaterThanOrEqual(4.5);
   });
  }
 }
 it("pire pixel blanc à 32% (canvas à 55% × glyphes plafonnés) reste lisible",()=>{
  const worst=rgbBlend(matrixColors.page,"#ffffff",.32);
  expect(ratio(matrixColors.text,worst)).toBeGreaterThanOrEqual(4.5);
  expect(ratio(matrixColors.secondary,worst)).toBeGreaterThanOrEqual(4.5);
 });
});
