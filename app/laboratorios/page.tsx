import { redirect } from "next/navigation";

export const metadata = {
  title: "Laboratorios GD",
  description: "Espacios de aprendizaje interactivo para Matemática, Álgebra y más.",
};

export default function LaboratoriosPage() {
  redirect("/laboratorios/index.html");
}
