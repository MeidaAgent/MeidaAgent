'use client';

import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Fingerprint, Activity, TerminalSquare, MessageSquare, Cpu, Brain, Zap, ArrowRight } from 'lucide-react';
import ChatDrawer from './ChatDrawer';

export default function MeetAgent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasChatted, setHasChatted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('meida_has_chatted');
    if (stored === 'true') {
      setHasChatted(true);
    }
  }, []);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    if (!hasChatted) {
      setHasChatted(true);
      localStorage.setItem('meida_has_chatted', 'true');
    }
  };

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden border-t border-neutral-800/60">
      {/* Calm Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon/[0.03] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Moved Outside Grid */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-[#a8e600]">Agent</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8 lg:gap-12">
          
          {/* Left Column: Live Routing Telemetry Console */}
          <div className="w-full self-start lg:sticky lg:top-32">
            <div className="relative rounded-[2rem] border border-white/10 bg-[#050505] p-6 sm:p-7 overflow-hidden flex flex-col shadow-[0_0_40px_rgba(204,255,0,0.04)] h-auto min-h-[480px] lg:h-[520px] justify-between">
              
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
                  </span>
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    ROUTER ENGINE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neon bg-neon/10 px-2.5 py-1 rounded-full border border-neon/20 uppercase tracking-widest font-semibold">
                  Devnet Live
                </span>
              </div>

              {/* Center Pipeline Visual */}
              <div className="my-5 space-y-2.5">
                
                {/* Node 1: Incoming */}
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 font-mono text-[11px]">
                      01
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Incoming Request</div>
                      <div className="text-[10px] font-mono text-neutral-500">POST /v1/chat/completions</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded">
                    HTTP/2
                  </span>
                </div>

                {/* Connector Arrow */}
                <div className="flex justify-center -my-0.5">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-neutral-700 to-neon" />
                </div>

                {/* Node 2: Classifier */}
                <div className="p-3 rounded-xl bg-neon/5 border border-neon/30 flex items-center justify-between shadow-[0_0_20px_rgba(204,255,0,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-neon text-black font-mono text-[11px] font-bold flex items-center justify-center">
                      02
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        Meida Semantic Classifier
                      </div>
                      <div className="text-[10px] font-mono text-neon">Latency: 3.8ms · Complexity Score: 0.84</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neon font-bold bg-neon/20 px-2 py-0.5 rounded">
                    FAST
                  </span>
                </div>

                {/* Connector Arrow */}
                <div className="flex justify-center -my-0.5">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-neon to-neutral-700" />
                </div>

                {/* Node 3: Target Model Endpoints */}
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Dynamic Cluster Target
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">4 Nodes Online</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                    <div className="bg-neutral-900/90 border border-neutral-800 px-2 py-1.5 rounded text-neutral-300 flex items-center justify-between">
                      <span>Claude 3.5</span>
                      <span className="text-[9px] text-neon">PRIMARY</span>
                    </div>
                    <div className="bg-neutral-900/90 border border-neutral-800 px-2 py-1.5 rounded text-neutral-400 flex items-center justify-between">
                      <span>GPT-4o</span>
                      <span className="text-[9px] text-neutral-500">FALLBACK</span>
                    </div>
                    <div className="bg-neutral-900/90 border border-neutral-800 px-2 py-1.5 rounded text-neutral-400 flex items-center justify-between">
                      <span>DeepSeek-V3</span>
                      <span className="text-[9px] text-neutral-500">HOT</span>
                    </div>
                    <div className="bg-neutral-900/90 border border-neutral-800 px-2 py-1.5 rounded text-neutral-400 flex items-center justify-between">
                      <span>Llama-3 70B</span>
                      <span className="text-[9px] text-neutral-500">HOT</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Telemetry Bar */}
              <div className="pt-3 border-t border-neutral-800/80 flex flex-row gap-2 text-center">
                <div className="flex-1 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/60">
                  <div className="text-[9px] font-mono text-neutral-500 uppercase">Latency</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">&lt;4ms</div>
                </div>
                <div className="flex-1 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/60">
                  <div className="text-[9px] font-mono text-neutral-500 uppercase">Failover</div>
                  <div className="text-xs font-mono font-bold text-neon mt-0.5">0.00% Loss</div>
                </div>
                <div className="flex-1 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/60">
                  <div className="text-[9px] font-mono text-neutral-500 uppercase">Uptime</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">99.999%</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: UI & Stats */}
          <div className="flex flex-col justify-center">
            
            {/* Main Stats Card */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 mb-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
              
              {/* Progress Bars */}
              <div className="flex flex-col justify-center gap-5">
                <ProgressBar label="Processing Power: 95%" value={95} />
                <ProgressBar label="Threat Analysis: 86%" value={86} />
                <ProgressBar label="System Stability" status="OPTIMAL" />
                <ProgressBar label="Data Streams" status="ACTIVE" />
              </div>

              {/* Circular Gauges */}
              <div className="flex flex-row lg:flex-col gap-6 justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                  <CircularGauge value={95} />
                  <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">Routing Accuracy</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CircularGauge value={88} />
                  <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">Cost Efficiency</span>
                </div>
              </div>
            </div>

            {/* Middle Row Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Special Ops Card */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between group hover:bg-white/[0.07] transition-all">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 leading-relaxed">
                    Core Function: Model Routing & Optimization
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    Meida Agent continuously analyzes task complexity and seamlessly routes prompts to the most cost-effective and capable AI model available. This guarantees optimal performance and ultra-low latency for every single interaction.
                  </p>
                </div>
              </div>

              {/* Skill Matrix Card */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between group hover:bg-white/[0.07] transition-all">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Skill Matrix</h3>
                  <div className="flex flex-col gap-4 mb-6">
                    <SkillRow icon={<Brain className="w-4 h-4 text-neon" />} label="CONTEXT ANALYSIS" value={99} level="99%" />
                    <SkillRow icon={<Zap className="w-4 h-4 text-neon" />} label="API COST OPTIMIZATION" value={85} level="85%" />
                    <SkillRow icon={<Activity className="w-4 h-4 text-neon" />} label="SUB-AGENT ORCHESTRATION" status="ACTIVE" />
                    <SkillRow icon={<TerminalSquare className="w-4 h-4 text-neon" />} label="DYNAMIC ROUTING PROTOCOL" status="OPTIMIZED" />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Lore Card */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between group hover:bg-white/[0.07] transition-all">
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Designed as the ultimate AI routing co-pilot, Meida operates within a highly secure Web3 environment. Meida retains deep contextual memory across all sessions, allowing for uninterrupted and highly personalized workflows that adapt to your specific needs.
                </p>
              </div>

              {/* System Dashboard Card */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between group hover:bg-white/[0.07] transition-all">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">SYSTEM DASHBOARD</h3>
                  <div className="text-sm text-neutral-400 font-mono flex flex-col gap-1 mb-6">
                    <p>KNOWLEDGE BASE: EXPANDING</p>
                    <p>TTFT (TIME-TO-FIRST-TOKEN): &lt;50ms (EDGE)</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={handleOpenChat}
                    className="flex items-center gap-2 bg-neon text-black px-6 py-2.5 rounded-full hover:bg-neon/90 transition-all text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(204,255,0,0.25)] hover:scale-[1.02] active:scale-95"
                  >
                    <TerminalSquare className="w-4 h-4" />
                    INITIALIZE ROUTER ENGINE
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      {hasChatted && !isChatOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-8 right-8 z-[90] flex items-center justify-center w-14 h-14 bg-neon text-black rounded-full shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:shadow-[0_0_40px_rgba(204,255,0,0.6)] transition-all hover:scale-110 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Drawer */}
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
}

function useInView(options = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

function ProgressBar({ label, value, status }) {
  const [ref, isInView] = useInView();

  return (
    <div className="w-full" ref={ref}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-neutral-300 font-medium tracking-wide">{label}</span>
        {status && (
          <span className="text-xs font-mono font-bold text-neon flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
            </span>
            {status}
          </span>
        )}
      </div>
      {!status && (
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-neon/50 to-neon shadow-[0_0_10px_rgba(204,255,0,0.8)] rounded-full transition-all duration-1000 ease-out delay-150"
            style={{ width: isInView ? `${value}%` : '0%' }}
          />
        </div>
      )}
    </div>
  );
}

function CircularGauge({ value }) {
  const [ref, isInView] = useInView();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isInView ? (circumference - (value / 100) * circumference) : circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24" ref={ref}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#ccff00"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="drop-shadow-[0_0_8px_rgba(204,255,0,0.8)] transition-all duration-1000 ease-out delay-150"
        />
      </svg>
      <div className="absolute flex items-center justify-center inset-0">
        <span className="text-white font-semibold text-lg">{displayValue}%</span>
      </div>
    </div>
  );
}

function SkillRow({ icon, label, value, level, status }) {
  const [ref, isInView] = useInView();

  return (
    <div className="flex items-center gap-3 group" ref={ref}>
      <div className="w-8 h-8 rounded-lg bg-neon/5 border border-neon/20 flex items-center justify-center shrink-0 group-hover:bg-neon/20 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-semibold text-neutral-300 tracking-wider uppercase">{label}</span>
          {status ? (
            <span className="text-[10px] font-mono font-bold text-neon flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon" />
              </span>
              {status}
            </span>
          ) : (
            <span className="text-[10px] text-neutral-500 font-mono">{level}</span>
          )}
        </div>
        {!status && (
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
            {/* Segmented Gradient Bar Effect */}
            <div 
              className="h-full bg-gradient-to-r from-neon/40 to-[#a8e600] shadow-[0_0_10px_rgba(204,255,0,0.5)] transition-all duration-1000 ease-out delay-150 relative"
              style={{ width: isInView ? `${value}%` : '0%' }}
            >
              {/* Segments/Stripes overlay */}
              <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
