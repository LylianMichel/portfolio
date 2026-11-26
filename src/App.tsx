import { useEffect, useState } from "react";
import { ArrowDown, ArrowDownToLine, ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "./data/projects";
import { profile } from "./data/profile";
import "./editorial.css";

const base = import.meta.env.BASE_URL === "./" ? "/" : import.meta.env.BASE_URL;
const links = [["Projets", "projets"], ["Compétences", "competences"], ["Parcours", "parcours"], ["Contact", "contact"]];
const entries = [
  ...projects.map(project => ({
    ...project,
    id: project.id === "anivault" ? "yorivai" : project.id,
    title: project.id === "anivault" ? "Yorivai" : project.title,
    ...(project.id === "anivault" ? {
      shortDescription: "Catalogue et bibliothèque personnelle d’animés et de lectures.",
      description: "Yorivai reprend les besoins d’AniVault dans une nouvelle application. Le monorepo sépare l’interface React, l’API Express et la couche de données Prisma.",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "Prisma", "PostgreSQL", "Neon", "AniList", "Zod"],
      features: ["Catalogue importé depuis AniList", "Recherche par titre et filtres par genre ou statut", "Bibliothèque, favoris et suivi de progression"],
      technicalApproach: "L’API Express expose le catalogue et la bibliothèque. Prisma décrit les modèles PostgreSQL et Zod valide les données à l’entrée de l’API.",
      contribution: undefined,
      challenge: undefined,
      result: undefined,
    } : {}),
    group: ["le-temple", "eco-repare"].includes(project.id) ? "Universitaire" : "Personnel",
    status: project.id === "anivault" ? "Anciennement AniVault" : project.id === "towerdefence" ? "Prototype Godot" : "Projet universitaire",
    ongoing: false,
  })),
  ...[
    { id: "fractalens", title: "FractaLens", group: "Universitaire", status: "SAÉ S3.A.01", shortDescription: "Génération d’images et d’animations fractales en Java.", technologies: ["Java", "Gradle", "Picocli", "JaCoCo"], context: "Projet universitaire mené en équipe à l’IUT de Lens.", technicalApproach: "Picocli valide les arguments de la ligne de commande et configure le générateur. Les paramètres couvrent les suites de Julia, Mandelbrot, Tricorn et Multibrot, les palettes et les transformations. La bibliothèque produit des images fixes et des GIF de zoom ou de rotation." },
    { id: "ashes-of-eternity", title: "Ashes of Eternity", group: "Personnel", status: "En développement", shortDescription: "Roguelite dark fantasy en 3D isométrique.", technologies: ["Unity 6", "C#", "URP"], context: "Projet en cours de développement en équipe de deux.", technicalApproach: "La conception prévoit des donjons, des classes évolutives et une progression du personnage." },
    { id: "lylianos", title: "LylianOS", group: "Personnel", status: "Prototype", shortDescription: "Portfolio interactif inspiré d’un système d’exploitation.", technologies: ["React", "TypeScript", "Framer Motion"], context: "Exploration d’une autre façon de présenter mes projets et mon CV.", technicalApproach: "Le prototype contient un bureau, un dock animé, un gestionnaire de fenêtres et une application CV." },
  ].map(project => ({...project, ongoing: project.id === "ashes-of-eternity", images: [], features: [], description: project.shortDescription, contribution: undefined, challenge: undefined, result: undefined })),
];

export const routeIds = entries.map(project => project.id);
type Entry = (typeof entries)[number];
const projectLabel = (project: Entry) => project.status === "Projet universitaire" ? project.group : project.group + " · " + project.status;

function Picture({ project, index = 0 }: { project: Entry; index?: number }) {
  const image = project.images[index];
  return image ? <img src={image.src} srcSet={image.srcSet} sizes="(max-width: 700px) 94vw, 60vw" width={image.width} height={image.height} alt={image.alt} loading="lazy" /> : null;
}

function ProjectIndex() {
  const [filter, setFilter] = useState("Tous");
  const shown = entries.filter(project => filter === "Tous" || (filter === "En cours" ? project.ongoing : project.group === filter));
  return <section className="section" id="projets">
    <div className="section-head"><h2>Projets</h2><div className="filters" role="group" aria-label="Filtrer les projets">
      {["Tous", "Personnel", "Universitaire", "En cours"].map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
    </div></div>
    <span className="sr-only" role="status">{shown.length} projets affichés</span>
    <div className="project-list">{shown.map(project => <article className="project-row" key={project.id}>
      <a className="project-link" href={base + "projets/" + project.id + "/"}>
        <div><p className="eyebrow">{projectLabel(project)}</p><h3>{project.title}</h3><p>{project.shortDescription}</p></div><ArrowUpRight aria-hidden="true" />
      </a>
      {project.images.length > 0 && <div className="project-preview"><Picture project={project} /></div>}
    </article>)}</div>
  </section>;
}

const domains = [
  { title: "Applications web", projects: ["yorivai", "le-temple", "eco-repare"] },
  { title: "Logiciel et jeux", projects: ["fractalens", "ashes-of-eternity", "towerdefence"] },
  { title: "Interfaces interactives", projects: ["lylianos", "yorivai"] },
];

function Skills() {
  const [active, setActive] = useState(0);
  const domain = domains[active];
  const examples = entries.filter(project => domain?.projects.includes(project.id));
  const technologies = [...new Set(examples.flatMap(project => project.technologies))];
  return <section className="section skills" id="competences"><h2>Compétences</h2>
    <div className="filters" role="group" aria-label="Domaines techniques">{domains.map((domain, index) => <button key={domain.title} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{domain.title}</button>)}</div>
    <ul className="tags">{technologies.map(name => <li key={name}>{name}</li>)}</ul>
    <div className="examples">{examples.map(project => <a key={project.id} href={base + "projets/" + project.id + "/"}>{project.title} <ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>
  </section>;
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-meta"><p className="eyebrow">Développeur junior · BUT Informatique</p><p className="eyebrow">Barlin, Hauts-de-France</p></div>
      <h1>Lylian<br />Michel<span>.</span></h1>
      <div className="hero-bottom"><p>Je développe des applications web et des logiciels, avec un intérêt particulier pour le backend et les bases de données.</p><aside className="availability"><span className="eyebrow">Recherche de stage</span><strong>8 semaines dès le<br />12 avril 2027</strong><a href="#contact">Me contacter <ArrowUpRight size={17} aria-hidden="true" /></a></aside></div>
      <a className="jump" href="#projets">Découvrir mes projets <ArrowDown size={17} aria-hidden="true" /></a>
    </section>
    <ProjectIndex />
    <Skills />
    <section className="section split" id="parcours"><div><h2>Parcours</h2><p>J’explore le développement logiciel à travers des projets personnels et universitaires. J’aime comprendre comment une interface, une API et une base de données fonctionnent ensemble.</p></div>
    <div><p className="eyebrow">2026–2027</p><h3>BUT Informatique · 2ᵉ année</h3><p>IUT de Lens, Université d’Artois</p><a className="text-link" href={base + "cv/"}>Consulter le CV <ArrowUpRight size={17} aria-hidden="true" /></a></div></section>
    <section className="section contact" id="contact"><p className="eyebrow">Stage · avril 2027</p><h2>Contact</h2><a className="email" href={"mailto:" + profile.email}>{profile.email} <ArrowUpRight aria-hidden="true" /></a><div className="examples"><a href={profile.github}>GitHub <ArrowUpRight size={15} aria-hidden="true" /></a><a href={profile.linkedin}>LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a></div></section>
  </>;
}

function CaseStudy({ project }: { project: Entry }) {
  const sections = [["Contexte", project.context], ["Contribution", project.contribution], ["Problématique", project.challenge], ["Approche technique", project.technicalApproach], ["Résultat", project.result]];
  return <article className="case-study">
    <a className="text-link" href={base + "#projets"}><ArrowLeft size={17} aria-hidden="true" /> Tous les projets</a>
    <p className="eyebrow">{projectLabel(project)}</p><h1>{project.title}</h1><p className="lede">{project.description}</p>
    <ul className="tags">{project.technologies.map(name => <li key={name}>{name}</li>)}</ul>
    {project.images[0] && <figure><Picture project={project} /><figcaption>{project.id === "yorivai" ? "Capture d’AniVault · " : ""}{project.images[0].label}</figcaption></figure>}
    <div className="case-grid">{sections.filter(([, body]) => body).map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
    {project.features.length > 0 && <section><h2>Fonctionnalités</h2><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>}</div>
    {project.images.slice(1).map((image, index) => <figure key={image.src}><Picture project={project} index={index + 1} /><figcaption>{image.label}</figcaption></figure>)}
    {"codeAccess" in project && project.codeAccess === "private" && <a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent("Accès au code — " + project.title)}`}>Demander l’accès au code source <ArrowUpRight size={17} aria-hidden="true" /></a>}
    {project.id === "lylianos" && <a className="text-link" href="https://github.com/LylianMichel/portfolio/tree/feature/lylianos">Voir la branche LylianOS <ArrowUpRight size={17} aria-hidden="true" /></a>}
    {project.id === "fractalens" && <a className="text-link" href="https://github.com/LylianMichel/FractaLens">Voir le code de FractaLens <ArrowUpRight size={17} aria-hidden="true" /></a>}
  </article>;
}

export function describeRoute(path: string) {
  const normalized = path.replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";
  const project = entries.find(entry => normalized === "/projets/" + entry.id);
  const cv = normalized === "/cv";
  const home = normalized === "/";
  const key = project ? "project-" + project.id : cv ? "cv" : home ? "home" : "not-found";
  return {project, cv, home, key, title: project?.title ?? (cv ? "CV" : home ? "Développeur junior · BUT Informatique" : "Page introuvable"), description: project?.shortDescription ?? "Lylian Michel, étudiant en BUT Informatique à l’IUT de Lens, recherche un stage de 8 semaines dès le 12 avril 2027."};
}

function Resume() {
  return <article className="case-study"><h1>CV</h1><p className="lede">Lylian Michel · Développeur junior</p>
    <a className="text-link" href={profile.cvUrl} download="CV-Lylian-Michel.pdf">Télécharger le CV (PDF) <ArrowDownToLine size={17} aria-hidden="true" /></a>
    <figure className="resume-preview"><img src={base + "cv-public.webp"} width={794} height={1123} alt="CV de Lylian Michel. La formation et les expériences informatiques sont résumées ci-dessous." /></figure>
    <div className="case-grid"><section><h2>Formation</h2><p>BUT Informatique à l’IUT de Lens depuis septembre 2025.</p></section><section><h2>Expériences informatiques</h2><p>Maintenance informatique à la mairie de Barlin en mars 2023 et à la Communauté d’agglomération de l’Artois en décembre 2022.</p></section></div>
  </article>;
}

export default function App({ path }: { path?: string }) {
  const route = describeRoute(path ?? (typeof window === "undefined" ? "/" : window.location.pathname));
  useEffect(() => { document.title = route.title + " — Lylian Michel"; }, [route.title]);
  return <><a className="skip" href="#contenu">Aller au contenu</a>
    <header className="site-header"><a className="monogram" href={base} aria-label="LM. — Lylian Michel, accueil">LM<span>.</span></a><nav aria-label="Navigation principale">{links.map(([label, id]) => <a key={id} href={base + "#" + id}>{label}</a>)}</nav><a className="cv-link" href={base + "cv/"}>CV <ArrowUpRight size={16} aria-hidden="true" /></a></header>
    <main id="contenu" tabIndex={-1}>{route.home ? <Home /> : route.project ? <CaseStudy project={route.project} /> : route.cv ? <Resume /> : <article className="case-study"><p className="eyebrow">404</p><h1>Page introuvable</h1><a className="text-link" href={base}><ArrowLeft size={17} aria-hidden="true" /> Retour à l’accueil</a></article>}</main>
    <footer className="site-footer"><span>Lylian Michel</span><a href={base + "#contact"}>Contact <ArrowUpRight size={15} aria-hidden="true" /></a></footer>
  </>;
}
