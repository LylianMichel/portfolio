type PixelIconProps={kind:"volley"|"game";size?:number};
export const PixelIcon=({kind,size=26}:PixelIconProps)=>{
 const cells=kind==="volley"
 ?["..XX..",".X..X.","X.XX.X","X.XX.X",".X..X.","..XX.."]
 :[".XXXX.","X....X","X.X..X","X....X",".XXXX.","......"];
 return <svg width={size} height={size} viewBox="0 0 6 6" role="img" aria-label={kind==="volley"?"Balle de volley en pixels":"Manette en pixels"} shapeRendering="crispEdges">
  {cells.flatMap((line,y)=>Array.from(line).flatMap((pixel,x)=>pixel==="X"?[<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor"/>]:[]))}
 </svg>;
};
