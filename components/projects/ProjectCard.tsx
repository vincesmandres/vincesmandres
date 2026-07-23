import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../../data/projects";
import { AbstractVisual } from "../ui/AbstractVisual";
export function ProjectCard({ project }: { project: Project }) { return <article className="project-card"><Link href={`/projects/${project.slug}`}><AbstractVisual variant={project.visual} /><div className="card-meta"><p className="tagline">{project.categories.join(" · ")}</p><h3>{project.title}</h3><p>{project.description}</p><span className="case-link">Ver caso de estudio <ArrowUpRight size={16} /></span></div></Link></article>; }
