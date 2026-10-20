import { type PointerEvent, type ReactNode, useRef } from "react";
export const MagneticAction = ({ children }: { children: ReactNode }) => {
 const ref=useRef<HTMLSpanElement>(null);
 const move=(event:PointerEvent<HTMLSpanElement>)=>{
  if(event.pointerType!=="mouse"||!window.matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)").matches)return;
  const bounds=event.currentTarget.getBoundingClientRect();
  const x=(event.clientX-(bounds.left+bounds.width/2))/bounds.width*5;
  const y=(event.clientY-(bounds.top+bounds.height/2))/bounds.height*5;
  ref.current?.style.setProperty("transform",`translate3d(${x}px,${y}px,0)`);
 };
 const reset=()=>{if(ref.current)ref.current.style.transform="";};
 return <span ref={ref} className="lm-magnetic" onPointerMove={move} onPointerLeave={reset} onBlurCapture={reset}>{children}</span>;
};
