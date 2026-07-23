export type ProjectCategory = "Educación" | "Tecnología" | "Audiovisual" | "Arte";

export type Project = {
  slug: string;
  title: string;
  shortTitle?: string;
  categories: string[];
  filterCategory: ProjectCategory;
  description: string;
  tools: string[];
  year: string;
  role: string;
  duration: string;
  website?: string;
  github?: string;
  visual: "roma" | "education" | "steam" | "film" | "art";
  caseStudy?: {
    context: string;
    problem: string;
    objectives: string[];
    process: string[];
    decisions: string[];
    result: string;
    evidence: string[];
    learnings: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "roma",
    title: "ROMA",
    categories: ["IA", "Web3", "Civic Tech", "Product Design"],
    filterCategory: "Tecnología",
    description: "Plataforma de reportes ciudadanos que combina inteligencia artificial, privacidad y visualización geográfica para organizar información comunitaria.",
    tools: ["Next.js", "Supabase", "OpenAI", "Semaphore", "Vercel"],
    year: "2024", role: "Product designer · Developer", duration: "Buildathon · MVP individual",
    website: "https://roma-ten-zeta.vercel.app/", github: "https://github.com/vincesmandres/ROMA", visual: "roma",
    caseStudy: {
      context: "Los reportes comunitarios suelen permanecer fragmentados en conversaciones, redes sociales y canales privados, dificultando su verificación y seguimiento.",
      problem: "Era necesario diseñar una forma sencilla de recibir, clasificar y visualizar reportes ciudadanos sin exponer innecesariamente la identidad de las personas.",
      objectives: ["Reducir la fricción para reportar", "Organizar señales comunitarias con IA", "Proteger la identidad de las personas", "Mostrar información geográfica agregada"],
      process: ["Definición del flujo de reporte", "Diseño de una arquitectura orientada a privacidad", "Clasificación de reportes mediante IA", "Almacenamiento y moderación", "Visualización geográfica agregada", "Desarrollo y despliegue del MVP"],
      decisions: ["La ubicación se comparte solo de forma voluntaria.", "La clasificación automática funciona como apoyo y requiere moderación.", "La interfaz prioriza claridad y confianza sobre densidad de información."],
      result: "Un prototipo funcional desarrollado individualmente durante un Buildathon y reconocido con el segundo lugar.",
      evidence: ["MVP navegable", "Flujo de reporte y moderación", "Visualización geográfica agregada", "Arquitectura con Supabase, OpenAI y Semaphore"],
      learnings: ["La privacidad debe formar parte del producto desde el primer flujo.", "Un MVP útil necesita acotar con precisión su promesa.", "La IA funciona mejor cuando hace visible su papel y sus límites."]
    }
  },
  { slug: "ia-educacion", title: "IA aplicada a la educación", categories: ["Educación", "IA", "Diseño instruccional"], filterCategory: "Educación", description: "Sistema de trabajo para diseñar actividades, guías, evaluaciones y experiencias de aprendizaje utilizando IA de manera crítica y estructurada.", tools: ["ChatGPT", "Gemini", "NotebookLM", "PhET", "LaTeX", "Python"], year: "En desarrollo", role: "Educador · Diseñador instruccional", duration: "Práctica continua", visual: "education" },
  { slug: "experiencias-steam", title: "Experiencias STEAM", categories: ["Educación", "Física", "Matemática", "Prototipado"], filterCategory: "Educación", description: "Proyectos interdisciplinarios en los que estudiantes utilizan programación, ciencia, diseño y construcción para comprender fenómenos complejos.", tools: ["Python", "Prototipado", "PhET", "Diseño de proyectos"], year: "En desarrollo", role: "Docente · Diseñador de experiencias", duration: "Por proyecto", visual: "steam" },
  { slug: "storytelling-audiovisual", title: "Storytelling audiovisual educativo", categories: ["Filmmaking", "Educación", "Social Media"], filterCategory: "Audiovisual", description: "Producción de contenidos educativos que combinan storytelling, rigor pedagógico, guion, grabación y edición para plataformas digitales.", tools: ["Guion", "Fotografía", "Edición de video", "Dirección creativa"], year: "En desarrollo", role: "Filmmaker · Creador educativo", duration: "Por pieza", visual: "film" },
  { slug: "exploraciones-visuales", title: "Exploraciones visuales", categories: ["Arte", "Abstracción", "Dirección visual"], filterCategory: "Arte", description: "Serie artística basada en composición abstracta, color, estructura, ritmo visual y exploración gráfica.", tools: ["Composición", "Color", "Textura", "Arte visual"], year: "En desarrollo", role: "Artista visual", duration: "Serie abierta", visual: "art" }
];

export const featuredProjects = projects;
