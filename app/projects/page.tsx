import type { Metadata } from "next";
import { ProjectGrid } from "../../components/projects/ProjectGrid";
export const metadata: Metadata = { title: "Proyectos" };
export default function ProjectsPage() { return <main><div className="page-shell page-heading"><p className="eyebrow">Archivo de trabajo</p><h1>Proyectos entre educación, tecnología y creación.</h1><p>Casos, exploraciones y sistemas construidos para comprender, comunicar y hacer que las ideas se vuelvan experiencias.</p></div><section className="page-shell section" style={{paddingTop: 0}}><ProjectGrid /></section></main>; }
