import { ArrowDownRight, ArrowUpRight, Award, Building2, CircleArrowOutUpRight, Clock, Instagram, MoveUpRight, Plus, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router';

const projects = [
  { title: 'The Cedar House', type: 'Residential / Srinagar', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85', number: '01' },
  { title: 'Valley Light', type: 'Hospitality / Gulmarg', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85', number: '02' },
  { title: 'Nishat Studio', type: 'Workplace / Srinagar', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85', number: '03' },
];

export const stats = [
  { icon: <Award size={24} />, number: '150+', label: 'Projects Completed', description: 'Successfully delivered' },
  { icon: <Users size={24} />, number: '98%', label: 'Client Satisfaction', description: 'Happy customers' },
  { icon: <Clock size={24} />, number: '5+', label: 'Years Experience', description: 'In the industry' },
  { icon: <Building2 size={24} />, number: '50+', label: 'Happy Clients', description: 'Across Kashmir' },
];

const services = ['Architecture', 'Interior Design', '3D Visualization', 'Landscape & Light'];

export const meta = () => [
  { title: 'Aiwaan — Architecture shaped by light' },
  { name: 'description', content: 'Aiwaan is an architecture and visualization studio creating thoughtful spaces across Kashmir and beyond.' },
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero-section" id="top">
        <div className="hero-noise" />
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-copy">
          <p className="eyebrow reveal">Architecture / interiors / visual worlds</p>
          <h1 className="hero-title reveal reveal-delay-1">Spaces that<br /><em>stay</em> with you.</h1>
          <p className="hero-description reveal reveal-delay-2">Aiwaan is an independent studio shaping calm, considered environments from the dramatic landscape of Kashmir.</p>
          <div className="hero-actions reveal reveal-delay-3">
            <Link to="/projects" className="button button-light">Explore the work <ArrowUpRight size={16} /></Link>
            <a href="#manifesto" className="text-link">Scroll to discover <ArrowDownRight size={16} /></a>
          </div>
        </div>
        <div className="hero-visual reveal reveal-delay-2">
          <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90" alt="Warm modern interior with sculptural staircase" />
          <div className="hero-visual-label"><span>01</span><span>House of quiet / 2024</span></div>
        </div>
        <div className="hero-footer"><span>34.0837° N, 74.7973° E</span><span>Scroll to explore <span className="scroll-line" /></span><span>© Aiwaan Studio</span></div>
      </section>

      <section className="manifesto-section" id="manifesto">
        <div className="section-kicker"><span>01</span><span>Our point of view</span></div>
        <div className="manifesto-grid">
          <h2>We believe a building should feel like a <span>memory</span> before it feels like a structure.</h2>
          <div className="manifesto-side"><p>We work between the precise and the poetic—drawing from local material, natural light, and the rituals that make a place feel like home.</p><Link to="/about" className="circle-link">Our approach <MoveUpRight size={17} /></Link></div>
        </div>
        <div className="marquee" aria-label="Aiwaan architectural studio services"><div className="marquee-track">{[...services, ...services].map((item, i) => <span key={`${item}-${i}`}>{item} <Sparkles size={18} /></span>)}</div></div>
      </section>

      <section className="projects-section" id="work">
        <div className="section-heading"><div className="section-kicker"><span>02</span><span>Selected work</span></div><Link to="/projects" className="text-link dark-link">View all projects <ArrowUpRight size={16} /></Link></div>
        <div className="project-list">{projects.map((project) => <Link to="/projects" className="project-card" key={project.number}><div className="project-image"><img src={project.image} alt={project.title} loading="lazy" /><span className="project-index">{project.number}</span><span className="project-arrow"><MoveUpRight size={22} /></span></div><div className="project-meta"><div><h3>{project.title}</h3><p>{project.type}</p></div><span>View case study</span></div></Link>)}</div>
      </section>

      <section className="process-section">
        <div className="section-kicker light-kicker"><span>03</span><span>How we work</span></div>
        <div className="process-intro"><h2>From first line<br /><em>to last light.</em></h2><p>Every project is a conversation between where you are, where you want to be, and what the site is already trying to say.</p></div>
        <div className="process-steps">{['Listen deeply', 'Find the gesture', 'Make it real'].map((step, i) => <div className="process-step" key={step}><span>0{i + 1}</span><h3>{step}</h3><p>{['We start with the why, the context, and the small details that make a big difference.', 'One clear idea becomes the anchor for every material, view, and experience.', 'The vision becomes a place with craft, clarity, and a little bit of magic.'][i]}</p><Plus size={20} /></div>)}</div>
      </section>

      <section className="cta-section"><div className="cta-orb" /><p className="eyebrow">Have a space in mind?</p><h2>Let&apos;s make<br /><em>room for wonder.</em></h2><Link to="/get-quote" className="button button-dark">Start a conversation <CircleArrowOutUpRight size={17} /></Link></section>
      <footer className="site-footer"><div className="footer-brand">Aiwaan<span>®</span><p>Architecture for<br />the way you live.</p></div><div className="footer-links"><div><p className="footer-label">Explore</p><Link to="/projects">Work</Link><Link to="/about">Studio</Link><Link to="/services">Services</Link></div><div><p className="footer-label">Connect</p><Link to="/contact">Contact</Link><a href="mailto:hello@aiwaan.in">hello@aiwaan.in</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a></div></div><div className="footer-bottom"><span>© 2024 Aiwaan Studio</span><span>Built with intention in Kashmir</span></div></footer>
    </main>
  );
}
