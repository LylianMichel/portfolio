import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";
interface RevealProps extends PropsWithChildren { className?:string; delay?:number }
export const Reveal=({children,className="",delay=0}:RevealProps)=>{
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={reduced?false:{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.14}} transition={{duration:reduced?0:.42,delay:reduced?0:delay,ease:"easeOut"}}>{children}</motion.div>;
};
