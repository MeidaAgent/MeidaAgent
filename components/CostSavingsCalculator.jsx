'use client';

import { useState } from 'react';
import SectionHeader from './SectionHeader';
import { DollarSign, TrendingDown, Zap, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Database } from 'lucide-react';

const workloads = [
  {
    id: 'mixed',
    name: 'General Agents & Apps',
    desc: 'Balanced mix of short prompts, classification, and complex reasoning.',
    savingPercent: 74,
    directCostPerThousand: 4.80,
    meidaCostPerThousand: 1.25,
  },
  {
    id: 'heavy',
    name: 'Reasoning & Coding',
    desc: 'Heavy code generation, deep context, and multi-step tool calls.',
    savingPercent: 68,
    directCostPerThousand: 9.50,
    meidaCostPerThousand: 3.04,
  },
  {
    id: 'extraction',
    name: 'High-Volume RAG & Data',
    desc: 'High request volume, summarization, JSON schema extraction.',
    savingPercent: 82,
    directCostPerThousand: 2.90,
    meidaCostPerThousand: 0.52,
  },
];

export default function CostSavingsCalculator() {
  const [requests, setRequests] = useState(500000); // 500k requests/month default
  const [selectedWorkload, setSelectedWorkload] = useState('mixed');

  const currentWorkload = workloads.find((w) => w.id === selectedWorkload) || workloads[0];

  const thousands = requests / 1000;
  const directCost = Math.round(thousands * currentWorkload.directCostPerThousand);
  const meidaCost = Math.round(thousands * currentWorkload.meidaCostPerThousand);
  const monthlySavings = directCost - meidaCost;
  const annualSavings = monthlySavings * 12;

  const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);

  return (
    <section id="savings-calculator" className="relative py-28 lg:py-36 border-t border-neutral-800/60 overflow-hidden">
      {/* Calm Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-neon/[0.02] rounded-full blur-[220px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headline="Stop burning cash on direct LLM bills."
          description="Simulate your monthly workload. See how Meida's sub-50ms micro-tier routing and cache arbitrage cut your API expenses by up to 82%."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-950/80 border border-neutral-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
            
            {/* Workload Profile Selector */}
            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                1. Select Workload Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {workloads.map((w) => {
                  const isSelected = selectedWorkload === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWorkload(w.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                        isSelected
                          ? 'border-neon bg-neon/10 shadow-[0_0_20px_rgba(204,255,0,0.15)]'
                          : 'border-neutral-800 bg-[#0c0c0c] hover:border-neutral-700 hover:bg-neutral-900/60'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neon animate-pulse" />
                      )}
                      <div className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                        {w.name}
                      </div>
                      <div className="text-[11px] font-mono text-neon font-semibold">
                        ~{w.savingPercent}% Arbitrage
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-neutral-400 mt-2.5 font-mono">
                {currentWorkload.desc}
              </p>
            </div>

            {/* Request Slider */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  2. Monthly Request Volume
                </label>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                    {formatNumber(requests)}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 ml-1.5">reqs/month</span>
                </div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={requests}
                onChange={(e) => setRequests(Number(e.target.value))}
                className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neon focus:outline-none"
              />

              <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-2">
                <span>50k (Startup)</span>
                <span>1M (Growth)</span>
                <span>5M+ (Enterprise Scale)</span>
              </div>
            </div>

            {/* Technical Arbitrage Drivers */}
            <div className="pt-4 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/80">
                <div className="text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-neon" />
                  <span>Tier Downscale</span>
                </div>
                <span className="text-white font-bold">-32% Cost</span>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/80">
                <div className="text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>Context Cache</span>
                </div>
                <span className="text-white font-bold">-35% Cache Hit</span>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/80">
                <div className="text-neutral-400 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Token Pruning</span>
                </div>
                <span className="text-white font-bold">-15% Tokens</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Savings Result Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#111] to-[#080808] border border-neon/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_60px_rgba(204,255,0,0.08)]">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
              <span className="text-xs font-mono text-neon font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-neon" />
                ESTIMATED ARBITRAGE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neon/10 border border-neon/30 text-[11px] font-mono text-neon font-bold">
                {currentWorkload.savingPercent}% OFF
              </span>
            </div>

            {/* Direct vs Meida Cost Comparison */}
            <div className="space-y-4 mb-6">
              {/* Direct Bill */}
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-red-950/20 border border-red-900/30">
                <div>
                  <span className="text-xs font-mono text-neutral-400 block">Direct LLM API Bill</span>
                  <span className="text-[11px] font-mono text-red-400">OpenAI / Anthropic standard</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-neutral-300 line-through opacity-80">
                    ${formatNumber(directCost)}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 block">/mo</span>
                </div>
              </div>

              {/* Meida Bill */}
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-neon/10 border border-neon/30">
                <div>
                  <span className="text-xs font-mono text-white font-bold block">With Meida Router</span>
                  <span className="text-[11px] font-mono text-neon">Sub-50ms Smart Arbitrage</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-neon">
                    ${formatNumber(meidaCost)}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 block">/mo</span>
                </div>
              </div>
            </div>

            {/* Net Monthly Savings Callout */}
            <div className="p-5 rounded-xl bg-[#0a0a0a] border border-neutral-800 text-center mb-6">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Net Monthly Capital Saved
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-neon via-white to-neon">
                +${formatNumber(monthlySavings)}
                <span className="text-sm text-neutral-400 font-normal ml-1">/mo</span>
              </div>
              <span className="text-xs font-mono text-neon">
                ≈ ${formatNumber(annualSavings)} Projected Annual Run-rate
              </span>
            </div>

            {/* CTA */}
            <a
              href="#desktop-app"
              className="w-full inline-flex items-center justify-center gap-2 bg-neon text-black font-bold py-3.5 px-6 rounded-xl hover:bg-neon/90 hover:shadow-[0_0_25px_rgba(204,255,0,0.3)] transition-all duration-300 font-mono text-sm group"
            >
              <span>Deploy Meida & Start Saving</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
