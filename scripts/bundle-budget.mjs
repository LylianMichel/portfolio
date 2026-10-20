import { readdir,readFile,mkdir,writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { join } from "node:path";
const files=await readdir("dist/assets");
const types=["js","css"];
const byType=Object.fromEntries(await Promise.all(types.map(async type=>{
 const selected=files.filter(name=>name.endsWith("."+type));
 const total=(await Promise.all(selected.map(async name=>gzipSync(await readFile(join("dist/assets",name))).length))).reduce((a,b)=>a+b,0);
 return [type,total];
})));
const baseline={js:128030,css:16870};
const delta=byType.js-baseline.js;
const report={baselineBytes:baseline, currentBytes:byType, deltaBytes:{js:delta,css:byType.css-baseline.css},withinJsBudget:delta<=25600};
await mkdir("artifacts/metrics",{recursive:true});
await writeFile("artifacts/metrics/bundle.json",JSON.stringify(report,null,2));
console.log("BUNDLE_GZIP",JSON.stringify(report));
if(!report.withinJsBudget){console.error("JavaScript gzip budget exceeded: +25 KiB");process.exitCode=1;}
