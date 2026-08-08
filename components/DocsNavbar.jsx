'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DocsNavbar() {
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 border-neutral-800/80 shadow-2xl shadow-black/80'
          : 'bg-black/30 border-white/20'
      } backdrop-blur-md border rounded-full px-4 sm:px-6 py-3`}
    >
      <div className="flex items-center justify-between">
        {/* Logo with 4-to-5 point star rotation & morph */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div 
            className="relative w-8 h-8 animate-spin" 
            style={{ animationDuration: '8s' }}
          >
            {/* Logo 1: 4-pointed star */}
            <img 
              src="/meidalogo-removebg.png" 
              alt="Meida Logo" 
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${showFirstLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} 
            />
            {/* Logo 2: 5-pointed star */}
            <img 
              src="/meidalogo5-removebg.png" 
              alt="Meida Logo 5" 
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${showFirstLogo ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`} 
            />
          </div>
          <span className="text-white font-semibold text-base sm:text-lg tracking-tight">
            Meida Agent <span className="text-neutral-500 font-normal text-sm sm:text-base">Docs</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full hover:bg-neutral-800 transition-all duration-300 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
