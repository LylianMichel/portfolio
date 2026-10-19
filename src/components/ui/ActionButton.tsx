import type { AnchorHTMLAttributes, ReactNode } from "react";
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {children:ReactNode;primary?:boolean};
export const ActionButton = ({children,primary=false,className="",...props}:Props) => (
 <a className={`lm-button ${primary?"lm-button--primary":""} ${className}`} {...props}>{children}</a>
);
