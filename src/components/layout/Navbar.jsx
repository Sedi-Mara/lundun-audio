import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/logo.png';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`container mx-auto px-6 md:px-8 max-w-6xl transition-all duration-500 ${scrolled ? 'bg-surface/80 backdrop-blur-xl border border-border-subtle rounded-full py-3 shadow-lg shadow-black/20' : ''}`}>
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center py-1">
            <img src={logo} alt="Lundun Audio" className="h-16 md:h-20 w-auto object-contain hover:opacity-80 transition-opacity" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => `text-sm font-medium transition-colors hover:text-text-main ${isActive ? 'text-text-main' : 'text-text-muted'}`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="ml-2 px-6 py-2.5 bg-text-main text-bg-dark text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-all">
              Begin Project
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-2xl text-text-main outline-none p-2 bg-surface rounded-full border border-border-subtle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 bg-surface border border-border-subtle rounded-3xl md:hidden flex flex-col p-6 gap-6 shadow-2xl z-40"
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `text-lg font-medium px-4 py-2 rounded-xl transition-colors ${isActive ? 'bg-white/5 text-text-main' : 'text-text-muted hover:text-text-main'}`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="w-full text-center py-4 mt-2 bg-text-main text-bg-dark rounded-full font-semibold">
              Begin Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
