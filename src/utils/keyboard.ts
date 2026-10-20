export type ShortcutAction = "projects" | "contact" | "pixel" | null;
export const KONAMI_KEYS = ["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a"].join("");
export function shortcutAction(sequence: string): ShortcutAction {
 if(sequence.endsWith(KONAMI_KEYS))return "pixel";
 if(sequence.endsWith("gp"))return "projects";
 if(sequence.endsWith("gc"))return "contact";
 return null;
}
export function appendShortcut(sequence:string,key:string):string{
 const normal=key.toLowerCase();
 if(!/^[a-z]$/.test(normal)&&!["arrowup","arrowdown","arrowleft","arrowright"].includes(normal))return sequence;
 return (sequence+normal).slice(-75);
}
