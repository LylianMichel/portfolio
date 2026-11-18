export type Accent = "mint" | "blue" | "violet" | "orange";
export type Appearance = "matrix";
export type RainIntensity = "off" | "soft" | "intense";
export const accents: Accent[] = ["mint","blue","violet","orange"];
export const appearances: Appearance[] = ["matrix"];
export function initialAppearance(_storage: Pick<Storage,"getItem"> | null, _prefersLight: boolean): Appearance {
 return "matrix";
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
