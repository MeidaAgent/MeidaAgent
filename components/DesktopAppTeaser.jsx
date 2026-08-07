'use client';

import { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, Activity, Sparkles, Zap, Lock, Coins, Terminal } from 'lucide-react';
import WaitlistForm from './WaitlistForm';

const logTemplates = [
  { model: 'Llama-3 70B', time: '31.2ms', tokens: '412 tok', cost: '$0.00008', color: 'text-neon', border: 'border-neon/30' },
  { model: 'Claude 3.5 Sonnet', time: '46.8ms', tokens: '1,280 tok', cost: '$0.00384', color: 'text-purple-400', border: 'border-purple-500/30' },
  { model: 'GPT-4o', time: '38.4ms', tokens: '640 tok', cost: '$0.00160', color: 'text-blue-400', border: 'border-blue-500/30' },
  { model: 'Llama-3 70B', time: '29.5ms', tokens: '290 tok', cost: '$0.00005', color: 'text-neon', border: 'border-neon/30' },
  { model: 'GPT-4o', time: '41.1ms', tokens: '850 tok', cost: '$0.00212', color: 'text-blue-400', border: 'border-blue-500/30' },
];

export default function DesktopAppTeaser() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [queueCount, setQueueCount] = useState(492);

  // Real-time animation states
  const [latency, setLatency] = useState(34.2);
  const [bars, setBars] = useState([33.1, 34.5, 32.8, 35.2, 33.9, 31.8, 36.4, 34.0, 32.5, 35.8, 33.2, 34.2]);
  const [tokens, setTokens] = useState(1402891);
  const [tokenFlash, setTokenFlash] = useState(false);
  const [modelPercents, setModelPercents] = useState({ llama: 64, gpt: 28, claude: 8 });
  const [activeLogs, setActiveLogs] = useState([
    { id: 1, text: 'REQ #8921 -> Llama-3 70B (Fast)', time: '31.2ms', color: 'text-neon', tag: 'ROUTED' },
    { id: 2, text: 'REQ #8922 -> Claude 3.5 Sonnet (Audit)', time: '46.8ms', color: 'text-purple-400', tag: 'ROUTED' },
  ]);

  // Fetch waitlist count on mount
  useEffect(() => {
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) setQueueCount(data.count);
      })
      .catch(() => {});
  }, []);

  // Live real-time telemetry loop
  useEffect(() => {
    // 1. Realistic rolling latency ping stream (every 1.8s)
    const latencyInterval = setInterval(() => {
      const isSpike = Math.random() < 0.12;
      const newPing = +(isSpike ? (39 + Math.random() * 5) : (31 + Math.random() * 5)).toFixed(1);
      
      setLatency(newPing);
      setBars(prev => [...prev.slice(1), newPing]);
    }, 1800);

    // 2. Tokens Routed tick
    const tokensInterval = setInterval(() => {
      const delta = Math.floor(Math.random() * 320) + 80;
      setTokens(prev => prev + delta);
      setTokenFlash(true);
      setTimeout(() => setTokenFlash(false), 500);
    }, 1600);

    // 3. Model Distribution micro-shift
    const modelInterval = setInterval(() => {
      const llamaShift = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const newLlama = 64 + llamaShift;
      const newGpt = 28 - Math.floor(llamaShift / 2);
      const newClaude = 100 - newLlama - newGpt;
      setModelPercents({ llama: newLlama, gpt: newGpt, claude: newClaude });
    }, 3500);

    // 4. Live Request Stream Ticker
    const logInterval = setInterval(() => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const reqId = Math.floor(Math.random() * 8000) + 2000;
      const newLog = {
        id: Date.now(),
        text: `REQ #${reqId} -> ${template.model} (${template.tokens} | ${template.cost})`,
        time: template.time,
        color: template.color,
        tag: 'ROUTED',
      };
      setActiveLogs(prev => [newLog, prev[0]]);
    }, 2400);

    return () => {
      clearInterval(latencyInterval);
      clearInterval(tokensInterval);
      clearInterval(modelInterval);
      clearInterval(logInterval);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="desktop-app" className="relative py-28 lg:py-36 border-t border-neutral-800/60 overflow-hidden">
      {/* Calm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neon/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-neon text-xs font-mono font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-neon" />
            <span>NATIVE APPLICATION • COMING SOON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6">
            The Dedicated <span className="text-neon">Meida Console</span> for Desktop.
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Manage your API keys, inspect sub-50ms routing nodes, and monitor token consumption locally with zero browser overhead.
          </p>
        </div>

        {/* Mockup Container (Glassmorphic Window with Cursor Spotlight) */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative max-w-5xl mx-auto"
        >
          {/* Cursor Spotlight Glow */}
          {isHovered && (
            <div 
              className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(204, 255, 0, 0.08), transparent 70%)`
              }}
            />
          )}

          {/* Outer Frame */}
          <div className="relative rounded-2xl p-1 bg-neutral-900/60 backdrop-blur-xl shadow-2xl border border-neutral-800">
            
            {/* Desktop App Window Header */}
            <div className="bg-[#0a0a0a] rounded-t-xl px-4 py-3 border-b border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-sm" />
                <span className="ml-2 text-xs font-mono text-neutral-400 font-medium">Meida Console v1.0.0-alpha.exe</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neon text-[10px] font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon animate-ping" />
                  Live Edge Socket Active
                </span>
              </div>
            </div>

            {/* Desktop App Mock Body */}
            <div className="bg-[#050505] rounded-b-xl p-5 sm:p-7 space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {/* Card 1: Live Routing Latency */}
                <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-neon/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                      LATENCY MATRIX
                    </span>
                    <Activity className="w-4 h-4 text-neon" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono mb-1 tracking-tight">
                    {latency}<span className="text-neon text-sm ml-1">ms</span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-4 font-mono">Sub-50ms target locked</p>
                  
                  {/* Rolling Real-Time Latency Time-Series */}
                  <div className="h-12 flex items-end gap-1.5 pt-2">
                    {(() => {
                      const minVal = Math.min(...bars);
                      return bars.map((val, idx) => {
                        const isMin = val === minVal;
                        const heightPercent = Math.min(100, Math.max(25, (val / 50) * 100));
                        return (
                          <div 
                            key={idx} 
                            style={{ height: `${heightPercent}%` }} 
                            className={`flex-1 rounded-t transition-all duration-700 ease-out relative group/bar ${
                              isMin 
                                ? 'bg-neon shadow-[0_0_15px_rgba(204,255,0,0.85)] z-10' 
                                : val > 38 
                                  ? 'bg-yellow-400/40 hover:bg-yellow-400' 
                                  : 'bg-neon/25 hover:bg-neon/60'
                            }`}
                          >
                            {/* Tooltip on hover */}
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover/bar:flex items-center gap-1 bg-black/95 border border-neutral-700 text-[9px] font-mono text-white px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30 pointer-events-none">
                              {isMin && <span className="text-neon font-bold">★ FASTEST:</span>}
                              <span>{val}ms</span>
                            </div>
                            {/* Pulsing indicator on the fastest/lowest ms bar */}
                            {isMin && (
                              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neon animate-ping" />
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Card 2: Local Node & API Gateway */}
                <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-neon/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-neutral-400">ACTIVE API KEY</span>
                    <Shield className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-[#050505] border border-neutral-800 rounded-lg p-2.5 font-mono text-xs text-neutral-300 mb-3 flex items-center justify-between">
                    <span className="truncate text-neutral-400">me_test_98f2...</span>
                    <span className="text-[10px] bg-neon/10 text-neon px-2 py-0.5 rounded font-bold">READY</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono pt-3 border-t border-neutral-800/50">
                    <span className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${tokenFlash ? 'bg-neon scale-125' : 'bg-neutral-600'} transition-all duration-300`} />
                      Tokens Routed:
                    </span>
                    <span className={`text-white font-bold font-mono transition-colors duration-300 ${tokenFlash ? 'text-neon' : 'text-white'}`}>
                      {tokens.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Card 3: Model Routing Distribution */}
                <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-neon/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-neutral-400">OPTIMAL TARGETS</span>
                    <Cpu className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="space-y-2.5 text-xs font-mono">
                    <div>
                      <div className="flex items-center justify-between text-neutral-300 mb-1">
                        <span>Llama-3 70B (Fast)</span>
                        <span className="text-neon">{modelPercents.llama}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-neon h-full transition-all duration-700 ease-out" 
                          style={{ width: `${modelPercents.llama}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-neutral-300 mb-1">
                        <span>GPT-4o (Reasoning)</span>
                        <span className="text-blue-400">{modelPercents.gpt}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-400 h-full transition-all duration-700 ease-out" 
                          style={{ width: `${modelPercents.gpt}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-neutral-300 mb-1">
                        <span>Claude 3.5 Sonnet (Audit)</span>
                        <span className="text-purple-400">{modelPercents.claude}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-400 h-full transition-all duration-700 ease-out" 
                          style={{ width: `${modelPercents.claude}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Request Stream Ticker Bar */}
              <div className="bg-[#050505] border border-neutral-800/80 rounded-xl p-3 px-4 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 overflow-hidden">
                <div className="flex items-center gap-2 text-neutral-400 whitespace-nowrap">
                  <Terminal className="w-3.5 h-3.5 text-neon animate-pulse" />
                  <span className="text-neutral-500 uppercase text-[10px] font-bold tracking-wider">Live Stream:</span>
                </div>
                <div className="flex-1 flex flex-col gap-1 w-full overflow-hidden">
                  {activeLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between text-[11px] animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <span className="text-neutral-300 truncate">{log.text}</span>
                      <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 ${log.color} font-semibold shrink-0`}>
                        {log.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3 Native Desktop Value Props */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/50 backdrop-blur-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-neon/10 text-neon mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Sub-50ms Local Edge</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Direct socket connection to AI clusters with zero browser latency overhead.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/50 backdrop-blur-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Encrypted Local Enclave</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">API keys and credentials are stored strictly in your hardware enclave.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/50 backdrop-blur-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Live Cost Arbitrage</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Auto-routes to the cheapest tier in real time, saving up to 60% on token fees.</p>
            </div>
          </div>
        </div>

        {/* Bottom OS Compatibility & Inline Waitlist */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-md">
          <div className="flex flex-col gap-2.5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs font-mono text-neon font-semibold uppercase tracking-wider">
                {queueCount}+ Developers in Mainnet Queue
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono">
              <span className="px-3 py-1 bg-neutral-800/60 border border-neutral-700/40 rounded-full text-neutral-300">Windows (.exe)</span>
              <span className="px-3 py-1 bg-neutral-800/60 border border-neutral-700/40 rounded-full text-neutral-300">macOS (.dmg)</span>
              <span className="px-3 py-1 bg-neutral-800/60 border border-neutral-700/40 rounded-full text-neutral-300">Linux (.AppImage)</span>
            </div>
          </div>

          <div className="w-full lg:w-auto flex justify-center">
            <WaitlistForm />
          </div>
        </div>

      </div>
    </section>
  );
}
