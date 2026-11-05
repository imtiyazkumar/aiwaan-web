import { Link, NavLink, useLocation } from 'react-router';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [{ label: 'Work', to: '/projects' }, { label: 'Studio', to: '/about' }, { label: 'Services', to: '/services' }, { label: 'Contact', to: '/contact' }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return <header className="site-nav"><Link to="/" className="nav-logo">Aiwaan<span>®</span></Link><nav className="nav-links">{links.map(link => <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'active' : ''}>{link.label}</NavLink>)}</nav><Link to="/get-quote" className="nav-cta">Start a project <ArrowUpRight size={15} /></Link><button className="nav-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>{open && <div className="mobile-nav">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link to="/get-quote" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={15} /></Link></div>}</header>;
}
