import { ArrowUpRight } from "lucide-react";
import { studio } from "./studio";

export function Brand() {
  return <a className="brand" href="/" aria-label={`${studio.name} home`}>
    <img src={studio.logo} width="52" height="52" alt=""/>
    <span>VERION<span className="brand-sub">STUDIOS</span></span>
  </a>;
}

export function SiteHeader() {
  return <header className="header wrap">
    <Brand/>
    <nav aria-label="Main navigation"><a href="/#editing">Editing</a><a href="/#digital">Digital solutions</a><a href="/#contact">Contact</a></nav>
    <a className="header-cta" href="/#contact">Let’s talk <ArrowUpRight size={17} aria-hidden="true"/></a>
  </header>;
}

export function SiteFooter() {
  return <footer className="footer wrap">
    <Brand/>
    <nav aria-label="Footer navigation"><a href="/privacy-policy">Privacy policy</a><a href="/terms-and-conditions">Terms and conditions</a></nav>
    <span>© {new Date().getFullYear()} {studio.name}</span>
  </footer>;
}
