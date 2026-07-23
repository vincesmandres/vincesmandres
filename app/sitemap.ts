import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://mavm-portfolio.vercel.app"; return ["", "/projects", "/docencia-ia", "/about", "/contact"].map(path => ({ url: `${base}${path}`, lastModified: new Date() })); }
