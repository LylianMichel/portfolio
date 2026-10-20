export type Accent = "mint" | "blue" | "violet" | "orange";
export type Appearance = "dark" | "light" | "contrast" | "matrix";
export type RainIntensity = "off" | "soft" | "intense";
export const accents: Accent[] = ["mint","blue","violet","orange"];
export const appearances: Appearance[] = ["dark","light","contrast","matrix"];
export function initialAppearance(storage: Pick<Storage,"getItem"> | null, prefersLight: boolean): Appearance {
 let raw: string | null = null;
 try { raw = storage?.getItem("portfolio-theme") ?? null; } catch { /* Storage is optional. */ }
 return raw==="dark"||raw==="light"||raw==="contrast"||raw==="matrix" ? raw : prefersLight ? "light" : "dark";
}
export function initialAccent(storage: Pick<Storage,"getItem"> | null): Accent {
 let raw: string | null = null;
 try { raw = storage?.getItem("portfolio-accent") ?? null; } catch { /* Storage is optional. */ }
 return raw==="blue"||raw==="violet"||raw==="orange" ? raw : "mint";
}

export function initialRain(storage: Pick<Storage,"getItem"> | null, saveData:boolean):RainIntensity {
 let value:string|null=null;
 try{value=storage?.getItem("portfolio-matrix-rain")??null}catch{/* Storage facultatif */}
 return value==="off"||value==="soft"||value==="intense"?value:saveData?"off":"intense";
}
