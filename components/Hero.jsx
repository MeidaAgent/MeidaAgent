'use client';

import { useState } from 'react';
import { Copy, Check, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import TokenStats from './TokenStats';


export default function Hero() {
  // Clean state for Hero

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center pt-24 sm:pt-32 pb-16 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[#000000] flex justify-end">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full lg:w-[85%] xl:w-[80%] h-full object-cover object-center"
        >
          <source src="/meida-character.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlays (Trik membuat bagian kiri/bawah gelap) */}
        {/* Gradasi kiri ke kanan (Kiri gelap pekat untuk teks, kanan sedikit redup untuk karakter) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] from-15% via-[#000000]/60 via-50% to-[#000000]/30 z-10" />
        
        {/* Gradasi bawah ke atas (Bawah gelap menyatu dengan section selanjutnya) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] from-15% via-[#000000]/80 via-30% to-transparent to-60% z-10 pointer-events-none" />
        
        {/* Gradasi atas ke bawah (Opsional untuk navbar) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 to-transparent h-24 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Content Area (Text only, since video is the background) */}
        <div className="w-full max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
              </span>
              <span className="text-xs font-mono text-neon uppercase tracking-widest font-semibold">
                SUB-50MS AI ROUTING GATEWAY
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2 animate-fade-in-up mt-6" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Ultra-fast
                <br />
                AI routing.
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-[#a8e600]">
                  Zero downtime failover.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-md animate-fade-in-up mt-6" style={{ animationDelay: '0.2s' }}>
              Meida dynamically classifies every turn, routes to optimal LLMs (Claude, GPT-4o, Llama), and auto-reroutes outages with 100% OpenAI drop-in compatibility.
            </p>

            <TokenStats />

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="#install"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#install')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 bg-neon text-black font-semibold px-7 py-3.5 rounded-full hover:bg-neon/90 hover:shadow-[0_0_30px_rgba(168,230,0,0.25)] transition-all duration-300 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                Install Meida Agent
              </a>
              <a
                href="#pilot-router"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#pilot-router')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 border border-neutral-700 text-neutral-300 font-medium px-7 py-3.5 rounded-full hover:border-neutral-500 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                See routing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
    </section>
  );
}
