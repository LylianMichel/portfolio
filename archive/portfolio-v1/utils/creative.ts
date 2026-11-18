export type Experience = "source" | "play";
export const experiences: readonly Experience[] = ["source","play"];
export function initialExperience(storage:Pick<Storage,"getItem">|null):Experience{
  try{return storage?.getItem("portfolio-experience")==="play"?"play":"source"}catch{return "source"}
}
export function experienceAnnouncement(mode:Experience):string{
  return mode==="play"?"Mode PLAY activé":"Mode SOURCE activé";
}
