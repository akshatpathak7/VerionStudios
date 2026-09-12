import { ArrowUpRight, ArrowDown, Code2, PanelsTopLeft } from "lucide-react";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { studio } from "./studio";
import { ReviewForm } from "./review-form";
export default function Home() {
 return <div id="top" className="site">
  <a className="skip-link" href="#main">Skip to content</a>
  <SiteHeader/>
  <main id="main">
   <section className="hero wrap" aria-labelledby="hero-title">
    <div className="eyebrow">VIDEO EDITING & WEB DEVELOPMENT</div>
    <div className="hero-heading"><h1 id="hero-title">Get your next video<br/><span>professionally edited</span></h1></div>
    <div className="hero-bottom"><p>{studio.intro}</p><div className="hero-actions"><a className="button button-primary" href="#contact">Start a project <ArrowUpRight size={19}/></a><a className="text-link" href="#editing">View our services <ArrowDown size={16}/></a></div></div>
    <div className="cinema">
     <div className="cinema-top"><span>VIDEO FORMATS</span><span>LAYOUT & EDITING</span></div>
     <div className="format-study" aria-label="Landscape, square, and portrait video formats">
      <div className="format-item"><div className="format-frame landscape"><span>16:9</span></div><span>Landscape</span></div>
      <div className="format-item"><div className="format-frame square"><span>1:1</span></div><span>Square</span></div>
      <div className="format-item"><div className="format-frame portrait"><span>9:16</span></div><span>Portrait</span></div>
     </div>
     <div className="timeline" aria-hidden="true"><div className="time-ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span><span>00:20</span><span>00:25</span></div><div className="tracks"><div className="track video-track"><i>VIDEO</i><i>CUTS</i><i>TITLES</i></div><div className="track audio-track">{Array.from({length:100},(_,i)=><b key={i} style={{height:`${25+((i*37+i*i*7)%70)}%`}}/>)}</div><div className="playhead"/></div></div>
    </div>
    <p className="frame-caption">Illustrative editing timeline</p>
   </section>
   <section id="editing" className="editing wrap section"><div className="section-heading"><div><div className="eyebrow">01 / VIDEO EDITING</div><h2>Editing for the<br/><span>content you create</span></h2></div><p>We edit podcasts, social videos, and longer productions, with attention to pacing, sound, and the format you need.</p></div><div className="services">{studio.editing.map((service,i)=><article className="service" key={service.title}><div className="service-top"><span>0{i+1}</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div></section>
   <section id="digital" className="digital section"><div className="wrap"><div className="eyebrow">02 / WEB DEVELOPMENT</div><div className="digital-content"><h2>Custom websites<br/><span>and dashboards</span></h2><div className="digital-services">{studio.digital.map((service,i)=><article key={service.title}><span className="code-mark" aria-hidden="true">{i===0?<Code2 size={25}/>:<PanelsTopLeft size={25}/>}</span><div><h3>{service.title}</h3><p>{service.description}</p></div></article>)}</div></div></div></section>
   <section id="contact" className="contact wrap section"><div className="eyebrow">03 / CONTACT</div><div className="contact-row"><h2>Tell us about<br/><span>your project</span></h2><a className="contact-arrow" href="#contact-details" aria-label="View contact email addresses"><ArrowUpRight strokeWidth={1}/></a></div><div className="contact-details" id="contact-details"><p>Email us with a brief description of your project,<br/>your timeline, and any references you have.</p><div className="contact-emails">{studio.emails.map(email=><a className="email-link" key={email} href={`mailto:${email}`}><span>{email}</span> <ArrowUpRight size={18}/></a>)}</div></div></section>
   <ReviewForm/>
  </main>
  <SiteFooter/>
 </div>;
}
