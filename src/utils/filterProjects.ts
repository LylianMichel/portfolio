import type { Project } from "../types";
export type FilterCategory="all" | "web" | "game";
export function filterProjects<T extends Pick<Project,"id">>(projects:readonly T[],category:FilterCategory):T[]{
 return projects.filter(project=>category==="all"||(category==="game"?project.id==="towerdefence":project.id!=="towerdefence"));
}
