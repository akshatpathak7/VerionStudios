import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { studio } from "./studio";

export function LegalLayout({title,children}:{title:string;children:ReactNode}) {
  return <div className="site">
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader/>
    <main className="legal-content wrap" id="main">
      <a className="back-link" href="/">Back to homepage</a>
      <h1>{title}</h1>
      <p className="legal-date">Last updated: 11 September 2026</p>
      {children}
      <section><h2>Contact us</h2><p>For questions about this page, contact Verion Studios at either address:</p>
        <div className="contact-emails">{studio.emails.map(email=><a key={email} href={`mailto:${email}`}>{email}</a>)}</div>
      </section>
    </main>
    <SiteFooter/>
  </div>;
}
