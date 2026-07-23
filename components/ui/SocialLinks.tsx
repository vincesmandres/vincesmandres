const socials = [{ label: "GitHub", href: "https://github.com/vincesmandres" }, { label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" }, { label: "X / Twitter", href: "#" }];
export function SocialLinks() { return <div className="social-links">{socials.map(s => <a key={s.label} href={s.href} target={s.href !== "#" ? "_blank" : undefined} rel="noreferrer">{s.label}</a>)}</div>; }
