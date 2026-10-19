export type ClipboardPort = { writeText(text:string): Promise<void> };
export async function copyEmail(address:string,clipboard:ClipboardPort | undefined):Promise<boolean>{
 if(!clipboard) return false;
 try { await clipboard.writeText(address);return true; }catch{return false;}
}