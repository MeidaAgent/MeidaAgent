'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, ArrowUp, Sparkles } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Pilot Router', href: '#pilot-router' },
    { label: 'Surfaces', href: '#surfaces' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Desktop App', href: '#desktop-app' },
    { label: 'Install', href: '#install' },
  ],
  resources: [
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com/MeidaAgent/MeidaAgent', external: true },
    { label: 'Product Guide', href: '/docs', external: false },
  ],
};

export default function Footer() {
  const [showFirstLogo, setShowFirstLogo] = useState(true);

  useEffect(() => {
    let timeoutId;
    const loop = () => {
      setShowFirstLogo((prev) => {
        const isCurrentlyFirst = prev;
        timeoutId = setTimeout(loop, isCurrentlyFirst ? 4000 : 12000);
        return !isCurrentlyFirst;
      });
    };
    timeoutId = setTimeout(loop, 12000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <footer className="relative border-t border-neutral-800/50">
      {/* CTA Banner */}
      <div className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#1a1a1a] bg-[#050505] p-10 sm:p-16 lg:p-20">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neon/5 opacity-50" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column: Headline */}
              <div>
                <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-medium text-white leading-[1.1] tracking-tight">
                  Run more.<br />Spend less.
                </h2>
              </div>
              
              {/* Right Column: Text & Button */}
              <div className="md:pl-10 flex flex-col items-start gap-6">
                <p className="text-neutral-400 text-lg leading-relaxed max-w-sm">
                  Route each turn to the lowest-cost model that can complete it reliably.
                </p>
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#install')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center bg-neon text-black font-semibold px-8 py-3.5 rounded-full hover:bg-[#b5ff00] transition-colors duration-300 shadow-[0_0_20px_rgba(168,230,0,0.2)]"
                >
                  Install Meida Agent
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="relative w-6 h-6 animate-spin" 
                  style={{ animationDuration: '8s' }}
                >
                  <img 
                    src="/meidalogo-removebg.png" 
                    alt="Meida Logo" 
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${showFirstLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} 
                  />
                  <img 
                    src="/meidalogo5-removebg.png" 
                    alt="Meida Logo 5" 
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${showFirstLogo ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`} 
                  />
                </div>
                <span className="text-white font-semibold text-lg">Meida Agent</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-6">
                The premium, lightning-fast AI router for Crypto and Web3.
                Intelligently routes your complex agentic tasks and Web3 analysis to the most capable models (Claude 3.5, GPT-4o, Llama) with absolute precision.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                Open Source SDK · MIT License
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (!link.external && link.href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-sm text-neutral-400 hover:text-neon transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (!link.external && link.href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-sm text-neutral-400 hover:text-neon transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © 2026 Meida Agent. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neon transition-colors group"
          >
            Back to top
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
