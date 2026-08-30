'use client';

import { useState } from 'react';
import { Copy, Check, Twitter, ShieldAlert, Cpu } from 'lucide-react';

export default function TokenStats() {
  const [copied, setCopied] = useState(false);
  const socialUrl = 'https://x.com/MeidaAgent';

  const handleCopy = async () => {
    await navigator.clipboard.writeText('Official contract deployment scheduled with Mainnet Genesis. Beware of impersonators.');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="mt-8 w-full max-w-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      
      {/* Unified Institutional Pre-TGE Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-neutral-700/80 transition-all">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-neon/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800/60">
          <div className="flex items-center gap-2">
            <img 
              src="/meidalogo-removebg.png" 
              alt="$MEIDA" 
              className="w-5 h-5 object-contain drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]" 
            />
            <span className="text-xs font-mono text-white font-bold tracking-wider">$MEIDA TOKEN</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-400 font-semibold">
              PRE-TGE
            </span>
          </div>

          <a 
            href={socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors group/link"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            <span className="text-[11px]">@MeidaAgent</span>
            <Twitter className="w-3.5 h-3.5 text-neutral-500 group-hover/link:text-[#1DA1F2] transition-colors" />
          </a>
        </div>

        {/* Middle: Genesis Status & Contract Box */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-lg sm:text-xl font-black text-white tracking-wider">
                GENESIS PHASE
              </div>
              <p className="text-[11px] font-mono text-neutral-400">
                Native Gas Settlement & Node Collateral
              </p>
            </div>
            
            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1 text-[10px] font-mono text-neutral-500 shrink-0">
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded">Sub-50ms Routing</span>
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded">Buyback & Burn</span>
            </div>
          </div>

          {/* Official Contract Status Bar */}
          <div className="relative pt-1">
            <div className="flex items-center bg-[#090909] border border-neutral-800/90 rounded-lg overflow-hidden group/bar hover:border-neutral-700 transition-colors">
              <div className="px-3.5 py-2.5 flex-1 font-mono text-xs text-neutral-400 flex items-center gap-2 overflow-hidden whitespace-nowrap">
                <span className="text-neutral-600 font-bold uppercase text-[10px] tracking-wider">CONTRACT</span>
                <span className="text-neutral-300 truncate text-[11px] sm:text-xs">Deployment at Mainnet Genesis</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-2.5 bg-neutral-900 border-l border-neutral-800 hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white relative shrink-0"
                title="Copy official status notice"
                aria-label="Copy contract status"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-neon" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Toast Notification */}
            {copied && (
              <div className="absolute left-0 -bottom-9 z-30 bg-neutral-900 border border-neon/40 text-neon text-[11px] font-mono px-3 py-1.5 rounded-md shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-ping" />
                <span>Official contract will be published exclusively on Mainnet TGE.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer: Anti-Scam Security Notice */}
        <div className="mt-3 pt-2.5 border-t border-neutral-900/80 flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
          <ShieldAlert className="w-3.5 h-3.5 text-yellow-500/80 shrink-0" />
          <span className="truncate">$MEIDA is not yet tradable. Beware of fake contracts on DEXes.</span>
        </div>

      </div>

    </div>
  );
}
