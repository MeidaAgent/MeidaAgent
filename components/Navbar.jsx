'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Atom, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Pilot Router', href: '#pilot-router' },
  { label: 'Surfaces', href: '#surfaces' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Desktop App', href: '#desktop-app' },
  { label: 'Install', href: '#install' },
  { label: 'Docs', href: '/docs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [showFirstLogo, setShowFirstLogo] = useState(true);

  useEffect(() => {
    let timeoutId;
    const loop = () => {
      setShowFirstLogo((prev) => {
        const isCurrentlyFirst = prev;
        // If it was first, we switch to second (which lasts 4s). 
        // If it was second, we switch to first (which lasts 12s).
        timeoutId = setTimeout(loop, isCurrentlyFirst ? 4000 : 12000);
        return !isCurrentlyFirst;
      });
    };
    timeoutId = setTimeout(loop, 12000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href, external) => {
    if (external) return;
    
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      e.preventDefault();
      setMobileOpen(false);
      router.push(href);
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition duration-500 ${scrolled
          ? 'bg-black/40 border-white/20 shadow-lg shadow-black/50'
          : 'bg-black/20 border-white/20'
        } backdrop-blur-md border ${mobileOpen ? 'rounded-2xl' : 'rounded-full'} px-4 sm:px-6 py-3`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group"
        >
          <div 
            className="relative w-8 h-8 animate-spin" 
            style={{ animationDuration: '8s' }}
          >
            {/* Logo 1 (4-sudut) */}
            <img 
              src="/meidalogo-removebg.png" 
              alt="Meida Logo" 
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${showFirstLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} 
            />
            {/* Logo 2 (5-sudut) */}
            <img 
              src="/meidalogo5-removebg.png" 
              alt="Meida Logo 5" 
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${showFirstLogo ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`} 
            />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Meida Agent
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleClick(e, link.href, link.external)}
              className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-all duration-300 rounded-full border border-transparent hover:border-neon hover:bg-neon/20"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#install"
            onClick={(e) => handleClick(e, '#install', false)}
            className="hidden sm:inline-flex items-center gap-2 bg-neon text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-neon/90 hover:shadow-[0_0_20px_rgba(255,51,204,0.3)] transition-all duration-300 active:scale-95"
          >
            Install Meida Agent
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
      >
        <div className="flex flex-col gap-1 pb-4 border-t border-neutral-800 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleClick(e, link.href, link.external)}
              className="px-4 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#install"
            onClick={(e) => handleClick(e, '#install', false)}
            className="mt-2 mx-4 text-center bg-neon text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-neon/90 transition-all"
          >
            Install Meida Agent
          </a>
        </div>
      </div>
    </nav>
  );
}
