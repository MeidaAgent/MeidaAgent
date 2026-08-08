'use client';

import { useState } from 'react';
import SectionHeader from './SectionHeader';
import { 
  MessageSquare, 
  Scan, 
  Scale, 
  Cpu, 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Lock, 
  CornerDownRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Flame, 
  RefreshCw, 
  Zap, 
  CheckCircle2, 
  XCircle,
  Activity
} from 'lucide-react';

const flowSteps = [
  {
    icon: <MessageSquare className="w-5 h-5 text-neon" />,
    title: 'Read the message',
    desc: 'The full turn is classified by difficulty, risk, context, and intent.',
  },
  {
    icon: <Scan className="w-5 h-5 text-neon" />,
    title: 'Extract signals',
    desc: 'Local rules identify debug work, strict formats, long context, and agentic tasks.',
  },
  {
    icon: <Scale className="w-5 h-5 text-neon" />,
    title: 'Judge the tier',
    desc: 'A small model selects the lowest tier that can complete the work reliably.',
  },
  {
    icon: <Cpu className="w-5 h-5 text-neon" />,
    title: 'Run the model',
    desc: 'The chosen tier maps to a concrete provider profile for that turn.',
  },
];

const tiers = [
  {
    level: 'R0',
    name: 'Trivial',
    desc: 'Greetings and one-liners.',
    cost: 'c0',
    intensity: 'bg-gradient-to-b from-neutral-700/50 to-transparent',
    border: 'border-neutral-700/50',
    glow: '',
  },
  {
    level: 'R1',
    name: 'Simple',
    desc: 'Routine edits and focused tasks.',
    cost: 'c1',
    intensity: 'bg-gradient-to-b from-green-900/30 to-transparent',
    border: 'border-green-800/30',
    glow: '',
  },
  {
    level: 'R2',
    name: 'Hard',
    desc: 'Refactors and non-trivial debugging.',
    cost: 'c2',
    intensity: 'bg-gradient-to-b from-yellow-900/20 to-transparent',
    border: 'border-yellow-800/30',
    glow: '',
  },
  {
    level: 'R3',
    name: 'Critical',
    desc: 'Production and cross-service work.',
    cost: 'c3',
    intensity: 'bg-gradient-to-b from-neon/10 to-transparent',
    border: 'border-neon/20',
    glow: 'shadow-[0_0_20px_rgba(168,230,0,0.05)]',
  },
];

export default function PilotRouter() {
  const [chaosState, setChaosState] = useState('healthy'); // 'healthy' | 'openai-down' | 'rate-limit'
  const [animating, setAnimating] = useState(false);

  const triggerChaos = (state) => {
    setAnimating(true);
    setChaosState(state);
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <section id="pilot-router" className="relative py-28 lg:py-36 border-t border-neutral-800/60 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headline="Every turn earns the right model."
          description="A local signal pass and a small judge model choose the cheapest capable tier before execution starts."
        />

        {/* Flow Diagram */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flowSteps.map((step, i) => (
            <div key={i} className="relative group flex flex-col p-8 rounded-2xl border border-neutral-800 bg-[#0a0a0a] hover:bg-neutral-900 transition-all duration-300 shadow-[0_0_0_rgba(204,255,0,0)] hover:shadow-[0_10px_40px_-10px_rgba(204,255,0,0.15)] hover:border-neon/30">
              <div className="mb-6 p-4 rounded-xl bg-neutral-800/50 inline-flex w-fit group-hover:bg-neon/10 transition-colors">
                {step.icon}
              </div>
              <h4 className="text-white font-bold text-xl mb-3">{step.title}</h4>
              <p className="text-[15px] text-neutral-400 leading-[1.6]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Tier Breakdown */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 border-y border-neutral-800 bg-transparent">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative group p-6 md:p-8 border-b md:border-b-0 md:border-r border-neutral-800 last:border-b-0 md:last:border-r-0 transition-all duration-300 ${
                  i === 2 
                    ? 'bg-gradient-to-b from-neon/15 to-transparent' 
                    : 'hover:bg-gradient-to-b hover:from-neutral-800/30 hover:to-transparent bg-transparent'
                }`}
              >
                {/* Active Top Border */}
                {i === 2 ? (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-neon shadow-[0_0_15px_rgba(168,230,0,0.6)]" />
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-neutral-700 transition-colors duration-300" />
                )}
                
                <span className="text-xs font-mono text-neutral-600 mb-6 block">
                  {tier.level}
                </span>
                <h4 className="text-white font-bold text-xl md:text-2xl mb-2">
                  {tier.name}
                </h4>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature 2: Interactive Chaos Engineering & Live Outage Failover Simulator */}
        <div className="mt-20 rounded-2xl border border-neutral-800/90 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-40 bg-neon/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header & Segmented Pill Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono font-semibold">
                  <Flame className="w-3 h-3" />
                  CHAOS FAULT-TOLERANCE LAB
                </span>
                <span className="text-[11px] font-mono text-neutral-500">Live Simulation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Simulate Zero-Downtime Outage Rerouting
              </h3>
            </div>

            {/* Segmented Pill Switcher */}
            <div className="flex items-center p-1 bg-black/90 border border-neutral-800 rounded-xl gap-1 shrink-0 self-start lg:self-center">
              <button
                onClick={() => triggerChaos('healthy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  chaosState === 'healthy'
                    ? 'bg-neon text-black shadow-[0_0_12px_rgba(204,255,0,0.35)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Normal</span>
              </button>

              <button
                onClick={() => triggerChaos('openai-down')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  chaosState === 'openai-down'
                    ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                    : 'text-neutral-400 hover:text-red-400'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>OpenAI 503 Outage</span>
              </button>

              <button
                onClick={() => triggerChaos('rate-limit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  chaosState === 'rate-limit'
                    ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.45)]'
                    : 'text-neutral-400 hover:text-yellow-400'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Rate Limit 429</span>
              </button>
            </div>
          </div>

          {/* 3-Column Connected Pipeline */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Step 1: Inbound Turn */}
            <div className="p-5 rounded-xl bg-[#0c0c0c] border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2.5">
                  <span className="font-bold text-neutral-300">01. INCOMING PAYLOAD</span>
                  <span className="flex items-center gap-1 text-neon">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-black/80 border border-neutral-800/80 font-mono text-xs text-neutral-300">
                  <span className="text-neon/80 block text-[10px] mb-1">POST /v1/chat/completions</span>
                  "Audit financial risk on multi-sig contract..."
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-neon" />
                  Tier: Critical (R3)
                </span>
                <span className="text-neutral-500">Latency: 0ms</span>
              </div>
            </div>

            {/* Step 2: Primary Provider Node */}
            <div className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
              chaosState === 'openai-down'
                ? 'bg-red-950/20 border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                : chaosState === 'rate-limit'
                  ? 'bg-yellow-950/20 border-yellow-500/70 shadow-[0_0_20px_rgba(234,179,8,0.15)]'
                  : 'bg-[#0c0c0c] border-neutral-800'
            }`}>
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                  <span className="font-bold text-neutral-300">02. PRIMARY TARGET</span>
                  {chaosState === 'openai-down' ? (
                    <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold">
                      HTTP 503 ERROR
                    </span>
                  ) : chaosState === 'rate-limit' ? (
                    <span className="px-2 py-0.5 rounded bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold">
                      HTTP 429 THROTTLED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-neon/15 border border-neon/30 text-neon text-[10px] font-bold">
                      200 OK (ONLINE)
                    </span>
                  )}
                </div>

                <div className="font-bold text-white text-base">
                  {chaosState === 'rate-limit' ? 'Anthropic Claude 3.5' : 'OpenAI GPT-4o'}
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                  Cluster: {chaosState === 'rate-limit' ? 'anthropic-us-west' : 'openai-us-east-2'}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] font-mono">
                {chaosState !== 'healthy' ? (
                  <div className="text-red-400 flex items-center gap-1.5 font-medium">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Failed in 1.4ms (Failover triggered)</span>
                  </div>
                ) : (
                  <div className="text-neon flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Serving traffic normally (34.2ms)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Meida Fallback Delivery */}
            <div className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
              chaosState !== 'healthy'
                ? 'bg-neon/10 border-neon shadow-[0_0_25px_rgba(204,255,0,0.15)]'
                : 'bg-[#0c0c0c] border-neutral-800'
            }`}>
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                  <span className="font-bold text-neutral-300">
                    {chaosState !== 'healthy' ? '03. INSTANT FAILOVER ROUTE' : '03. ROUTE RESOLUTION'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-mono">
                    {chaosState !== 'healthy' ? 'RECOVERY: 3.8ms' : 'SLA 99.999%'}
                  </span>
                </div>

                <div className="font-bold text-white text-base">
                  {chaosState === 'openai-down'
                    ? 'Rerouted to Claude 3.5 Sonnet'
                    : chaosState === 'rate-limit'
                      ? 'Rerouted to DeepSeek V3'
                      : 'Delivered via Primary Route'}
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                  {chaosState !== 'healthy'
                    ? 'Zero dropped tokens. Active session preserved.'
                    : 'Standby redundancy channels hot & ready.'}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] font-mono">
                {chaosState !== 'healthy' ? (
                  <span className="text-neon font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    STATUS 200 OK (100% Uptime Protected)
                  </span>
                ) : (
                  <span className="text-neutral-500">
                    Failover standby pool active
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Console Log Telemetry Bar */}
          <div className="mt-4 p-3 rounded-lg bg-black/90 border border-neutral-900 flex items-center gap-2 text-[11px] font-mono overflow-x-auto">
            <span className="text-neutral-500 shrink-0">[TELEMETRY] &gt;</span>
            {chaosState === 'healthy' && (
              <span className="text-neutral-400">
                [GATEWAY: NORMAL] Primary route operational. Average cluster response latency: <span className="text-neon font-bold">34.2ms</span>. Zero connection drops.
              </span>
            )}
            {chaosState === 'openai-down' && (
              <span className="text-red-400">
                [CHAOS ALERT] <span className="text-white font-bold">openai-us-east-2 (HTTP 503)</span> detected. Dynamic failover engaged: Rerouted payload to <span className="text-neon font-bold">claude-3.5-sonnet in 3.8ms</span>.
              </span>
            )}
            {chaosState === 'rate-limit' && (
              <span className="text-yellow-400">
                [THROTTLE ALERT] <span className="text-white font-bold">anthropic-us-west (HTTP 429)</span> rate limit hit. Dynamic failover engaged: Rerouted payload to <span className="text-neon font-bold">deepseek-v3 in 4.1ms</span>.
              </span>
            )}
          </div>

        </div>

        {/* Guardrails Section */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="text-neon mb-6 inline-flex">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Guardrails keep routing stable.
            </h3>
          </div>
          
          <div className="rounded-2xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden shadow-[0_20px_80px_-20px_rgba(204,255,0,0.05)]">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Anti-downgrade (Spans full height on md) */}
              <div className="p-8 md:p-10 md:border-r border-b md:border-b-0 border-neutral-800 group relative overflow-hidden flex flex-col justify-end min-h-[250px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon/10 via-transparent to-transparent opacity-100 transition-opacity duration-500" />
                <div className="text-neon mb-6 relative z-10">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-lg mb-3 relative z-10">Anti-downgrade</h4>
                <p className="text-[15px] text-neutral-400 leading-relaxed relative z-10">
                  Recent higher-tier turns stay warm, protecting continuity and model cache reuse.
                </p>
              </div>

              {/* Right column for the other two */}
              <div className="flex flex-col">
                <div className="p-8 md:p-10 border-b border-neutral-800 group relative overflow-hidden flex-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-transparent opacity-100 transition-opacity duration-500" />
                  <div className="text-neon mb-6 relative z-10">
                    <CornerDownRight className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-3 relative z-10">Sticky tier</h4>
                  <p className="text-[15px] text-neutral-400 leading-relaxed relative z-10">
                    Short follow-ups inherit the active workstream instead of dropping context.
                  </p>
                </div>
                <div className="p-8 md:p-10 group relative overflow-hidden flex-1">
                  <div className="absolute inset-0 bg-gradient-to-tl from-neon/5 via-transparent to-transparent opacity-100 transition-opacity duration-500" />
                  <div className="text-neon mb-6 relative z-10">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-3 relative z-10">Complaint up</h4>
                  <p className="text-[15px] text-neutral-400 leading-relaxed relative z-10">
                    A failed answer raises the next turn instead of repeating the same attempt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
