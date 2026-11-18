export function rainShouldRun(hidden:boolean,reduced:boolean,frozen:boolean):boolean{
 return !hidden&&!reduced&&!frozen;
}
export function rainQuality(averageMs:number,columns:number):"keep"|"halve"|"freeze"{
 if(averageMs<=12)return "keep";
 return columns>8?"halve":"freeze";
}
