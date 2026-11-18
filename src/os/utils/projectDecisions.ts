export type ProjectDecision={label:string;value:string;number:string};
export function projectDecisions(project:{challenge?:string|null;technicalApproach?:string|null;result?:string|null}):ProjectDecision[]{
 return ([
  ["DIFFICULTÉ",project.challenge],
  ["CHOIX TECHNIQUE",project.technicalApproach],
  ["RÉSULTAT",project.result],
 ] as const).filter(([,value])=>Boolean(value)).map(([label,value],index)=>({
  label,value:value!,number:String(index+1).padStart(2,"0")
 }));
}
