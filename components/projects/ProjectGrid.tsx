"use client";
import { useState } from "react";
import { projects, ProjectCategory } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
export function ProjectGrid() { const [filter, setFilter] = useState<"Todos" | ProjectCategory>("Todos"); const categories = ["Todos", "Educación", "Tecnología", "Audiovisual", "Arte"] as const; const shown = filter === "Todos" ? projects : projects.filter(p => p.filterCategory === filter); return <><div className="filters" role="group" aria-label="Filtrar proyectos">{categories.map(c => <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)}>{c}</button>)}</div><div className="project-grid">{shown.map(p => <ProjectCard key={p.slug} project={p} />)}</div></>; }
