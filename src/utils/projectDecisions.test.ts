import {describe,it,expect} from "vitest";
import {projectDecisions} from "./projectDecisions";
describe("numérotation dynamique des projets",()=>{
 it("numérote les trois rubriques",()=>{
  expect(projectDecisions({challenge:"a",technicalApproach:"b",result:"c"}).map(x=>x.number)).toEqual(["01","02","03"]);
 });
 it("commence à 01 quand la difficulté manque",()=>{
  expect(projectDecisions({technicalApproach:"b",result:"c"})).toEqual([
   {number:"01",label:"CHOIX TECHNIQUE",value:"b"},
   {number:"02",label:"RÉSULTAT",value:"c"}
  ]);
 });
 it("ne produit aucun bloc vide",()=>{
  expect(projectDecisions({challenge:"",technicalApproach:null,result:undefined})).toEqual([]);
 });
});
