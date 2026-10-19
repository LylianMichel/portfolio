import { describe, it, expect } from "vitest";
const background={dark:"#151516",light:"#f2f1ed",contrast:"#000000"} as const;
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
