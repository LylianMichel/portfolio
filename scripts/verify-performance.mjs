import { readFile,writeFile,mkdir } from "node:fs/promises";
const audits={};
let fail=false;
for(const mode of ["mobile","desktop"]){
 const r=JSON.parse(await readFile("artifacts/lighthouse/"+mode+".json","utf8"));
 const c=r.categories,a=r.audits;
 const metrics={
  performance:Math.round(c.performance.score*100),
  accessibility:Math.round(c.accessibility.score*100),
  seo:Math.round(c.seo.score*100),
  bestPractices:Math.round(c["best-practices"].score*100),
  lcpMs:Math.round(a["largest-contentful-paint"].numericValue),
  cls:a["cumulative-layout-shift"].numericValue,
  tbtMs:Math.round(a["total-blocking-time"].numericValue)
 };
 audits[mode]=metrics;
 if(metrics.performance<(mode==="mobile"?95:100)||metrics.accessibility!==100||metrics.lcpMs>2500||metrics.cls>.001){fail=true;console.error("BUDGET_FAILURE",mode,JSON.stringify(metrics));}
 else console.log("BUDGET_OK",mode,JSON.stringify(metrics));
}
for(const mode of ["mobile","desktop"]){
 try{
  const report=JSON.parse(await readFile("artifacts/lighthouse/matrix-"+mode+".json","utf8"));
  const matrix={
    performance:Math.round(report.categories.performance.score*100),
    accessibility:Math.round(report.categories.accessibility.score*100),
    lcpMs:Math.round(report.audits["largest-contentful-paint"].numericValue),
    cls:report.audits["cumulative-layout-shift"].numericValue
  };
  audits["matrix-"+mode]=matrix;
  if(matrix.performance<(mode==="mobile"?90:95)||matrix.accessibility!==100){fail=true;console.error("MATRIX_BUDGET_FAILURE",mode,JSON.stringify(matrix))}
  else console.log("MATRIX_BUDGET_OK",mode,JSON.stringify(matrix));
 }catch(error){fail=true;console.error("MATRIX_BUDGET_MISSING",mode,String(error))}
}
await mkdir("artifacts/metrics",{recursive:true});
await writeFile("artifacts/metrics/lighthouse-budgets.json",JSON.stringify(audits,null,2));
if(fail)process.exitCode=1;
