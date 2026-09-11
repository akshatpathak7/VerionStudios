"use client";
import { useState } from "react";
import { ArrowUpRight, ArrowDown, Pause, Play } from "lucide-react";
import { studio } from "./studio";
function Brand() { return <a className="brand" href="#top" aria-label={`${studio.name} home`}><img src={studio.logo} width="52" height="52" alt=""/><span>VERION<span className="brand-sub">STUDIOS</span></span></a>; }
export default function Home() {
 const [paused,setPaused]=useState(false);
 return <div id="top" className={paused?"site motion-paused":"site"}>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="header wrap"><Brand/><nav aria-label="Main navigation"><a href="#editing">Editing</a><a href="#digital">Digital solutions</a><a href="#contact">Contact</a></nav><a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={17}/></a></header>
  <main id="main">
   <section className="hero wrap" aria-labelledby="hero-title">
    <div className="eyebrow"><span className="red-square"/> INDEPENDENT CREATIVE & TECH STUDIO</div>
    <div className="hero-heading"><h1 id="hero-title">Built to keep<br/><span>them watching.</span></h1><span className="hero-asterisk" aria-hidden="true">✳</span></div>
    <div className="hero-bottom"><p>{studio.intro}</p><div className="hero-actions"><a className="button button-red" href="#contact">Start a project <ArrowUpRight size={19}/></a><a className="text-link" href="#editing">Explore what we do <ArrowDown size={16}/></a></div></div>
    <div className="cinema">
     <img className="cinema-image" src="/cinematic-concept.jpg" alt="Illustrative cinematic scene of a motorcyclist on a mountain road at dusk" fetchPriority="high"/>
     <div className="cinema-top"><span><span className="red-square"/> THE VERION PERSPECTIVE</span><span>FRAME 001 / CONCEPT VISUAL</span></div>
     <div className="cinema-copy"><span>MAKE EVERY<br/>FRAME <em>FEEL.</em></span><p>A little more story. A lot more impact.</p></div>
     <div className="frame-corner corner-tl"/><div className="frame-corner corner-br"/>
     <div className="timeline" aria-hidden="true"><div className="time-ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span><span>00:20</span><span>00:25</span></div><div className="tracks"><div className="track video-track"><i>THE STORY</i><i>THE RHYTHM</i><i>THE FEELING</i></div><div className="track audio-track">{Array.from({length:100},(_,i)=><b key={i} style={{height:`${25+((i*37+i*i*7)%70)}%`}}/>)}</div><div className="playhead"/></div></div>
    </div>
    <div className="frame-caption"><span>CONCEPT IMAGERY · A GLIMPSE OF OUR CREATIVE DIRECTION</span><button className="motion-toggle" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={12}/>:<Pause size={12}/>} {paused?"Resume motion":"Pause motion"}</button></div>
   </section>
   <section id="editing" className="editing wrap section"><div className="section-heading"><div><div className="eyebrow">01 / THE MAIN EVENT</div><h2>Good footage.<br/><span>Unforgettable edits.</span></h2></div><p>From the first hook to the final frame, we turn your footage into something worth staying for.</p></div><div className="services">{studio.editing.map((service,i)=><article className="service" key={service.title}><div className="service-top"><span>0{i+1}</span><ArrowUpRight size={23}/></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div></section>
   <section id="digital" className="digital section"><div className="wrap"><div className="eyebrow">02 / THE OTHER SIDE OF OUR BRAIN</div><div className="digital-content"><h2>Beyond the edit.<br/><span>We build digital<br/>experiences.</span></h2><div className="digital-services">{studio.digital.map((service,i)=><article key={service.title}><span className="code-mark" aria-hidden="true">{i===0?"</>":"[↗]"}</span><div><h3>{service.title}</h3><p>{service.description}</p></div></article>)}</div></div></div></section>
   <section id="contact" className="contact wrap section"><div className="eyebrow">03 / LET’S MAKE SOMETHING GOOD</div><div className="contact-row"><h2>Your next idea.<br/><span>Our next obsession.</span></h2><a className="contact-arrow" href="#contact-details" aria-label="View contact email addresses"><ArrowUpRight strokeWidth={1}/></a></div><div className="contact-details" id="contact-details"><p>Have footage to transform or something to build?<br/>Let’s bring it to life.</p><div className="contact-emails">{studio.emails.map(email=><a className="email-link" key={email} href={`mailto:${email}`}><span>{email}</span> <ArrowUpRight size={18}/></a>)}</div></div></section>
  </main>
  <footer className="footer wrap"><Brand/><span>© {new Date().getFullYear()} {studio.name}</span><a href="#top">Back to top <ArrowUpRight size={15}/></a></footer>
 </div>;
}
