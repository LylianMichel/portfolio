import type { ReactNode } from "react";
export const ProjectFrame=({game,title,children}:{game:boolean;title:string;children:ReactNode})=><div className={`lm-project-frame ${game?"lm-frame-game":"lm-frame-browser"}`}>
 <div className="lm-project-frame-bar">
  {game?<span aria-hidden="true" className="lm-game-hud">▦ GAME / SCREEN</span>:<span aria-hidden="true" className="lm-browser-dots">● ● ●</span>}
  <span>{title}</span><span aria-hidden="true">{game?"[PLAY]":"↗"}</span>
 </div>{children}
 </div>;
