"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [["Proyectos", "/projects"], ["Docencia + IA", "/docencia-ia"], ["Sobre mí", "/about"], ["Contacto", "/contact"]];
  return <header className="site-header"><div className="nav-wrap"><Link href="/" className="logo" onClick={() => setOpen(false)}>MAVM<span>.</span></Link><nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Navegación principal">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="nav-cv" href="/contact" onClick={() => setOpen(false)}>Descargar CV <ArrowUpRight size={15} /></Link></nav><button className="menu-button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header>;
}
