import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"], style: ["normal", "italic"] });
export const metadata: Metadata = { metadataBase: new URL("https://mavm-portfolio.vercel.app"), title: { default: "MAVM. · Creative Technologist & Educator", template: "%s · MAVM." }, description: "Portafolio de Maikel Andres Vinces Mendoza: docencia digital, inteligencia artificial, diseño instruccional, desarrollo web, filmmaking y arte visual.", keywords: ["Creative Technologist", "docencia digital", "inteligencia artificial", "diseño instruccional", "web development", "filmmaking", "STEAM"], openGraph: { title: "MAVM. · Creative Technologist & Educator", description: "Transformo ideas complejas en experiencias visuales, educativas y digitales.", type: "website", locale: "es_EC" }, twitter: { card: "summary_large_image", title: "MAVM. · Creative Technologist & Educator", description: "Experiencias visuales, educativas y digitales." }, icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body className={`${sans.variable} ${display.variable}`}><Navbar />{children}<Footer /></body></html>; }
