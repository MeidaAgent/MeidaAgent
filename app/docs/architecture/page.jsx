'use client';

import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const pipelineSteps = [
  {
    step: '01',
    label: 'CLASSIFY',
    color: 'text-neon',
    borderColor: 'border-neon/30',
    title: 'Semantic Classification',
    desc: 'Each incoming turn is analyzed in under 4ms by a lightweight local classifier. It extracts intent, complexity score (0–1), context length, and risk flags — without ever touching a foundation model.',
    specs: [
      { label: 'Latency', value: '<4ms' },
      { label: 'Model', value: 'Local Rules + MicroLM' },
      { label: 'Output', value: 'Complexity Score + Intent Tag' },
    ],
  },
  {
    step: '02',
    label: 'ARBITRAGE',
    color: 'text-blue-400',
    borderColor: 'border-blue-400/30',
    title: 'Tier Selection & Cost Arbitrage',
    desc: 'Based on the classification output, the arbitrage engine selects the lowest-cost provider tier that can reliably complete the task. Simple queries go to fast/cheap models; complex reasoning escalates to premium tiers.',
    specs: [
      { label: 'Latency', value: '<8ms' },
      { label: 'Model', value: 'Small Judge (Llama-3 8B)' },
      { label: 'Output', value: 'Tier Level (T1–T4) + Provider' },
    ],
  },
  {
    step: '03',
    label: 'FAILOVER',
    color: 'text-purple-400',
    borderColor: 'border-purple-400/30',
    title: 'Zero-Downtime Failover',
    desc: 'If the primary provider returns a 429 (rate limit), 503 (outage), or times out, the failover engine instantly reroutes to the next-best provider in the same tier. No tokens are lost, no latency spikes — the user never notices.',
    specs: [
      { label: 'Failover Time', value: '<12ms' },
      { label: 'Token Loss', value: '0.00%' },
      { label: 'Fallback Depth', value: '3 Providers Deep' },
    ],
  },
];

const edgeNodes = [
  { provider: 'Claude 3.5 Sonnet', tier: 'T4 (Premium)', role: 'Complex reasoning, audits, long-context', status: 'PRIMARY' },
  { provider: 'GPT-4o', tier: 'T3 (Standard)', role: 'General purpose, balanced cost/quality', status: 'ACTIVE' },
  { provider: 'DeepSeek-V3', tier: 'T2 (Fast)', role: 'Code generation, structured output', status: 'HOT' },
  { provider: 'Llama-3 70B', tier: 'T1 (Economy)', role: 'Simple queries, classification, chat', status: 'HOT' },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-between">
      <div>
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-8">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span>/</span>
          <Link href="/docs" className="hover:text-white transition-colors">docs</Link>
          <span>/</span>
          <span className="text-neon">architecture</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Architecture Overview
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed mb-10 max-w-2xl">
          Meida operates as an edge-distributed routing gateway positioned between your application and multiple foundation LLMs. Every turn passes through a 3-step pipeline before reaching a model.
        </p>
        <hr className="border-neutral-800/60 mb-10" />

        {/* 3-Step Pipeline */}
        <div className="space-y-10">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Routing Pipeline
          </h2>

          <div className="space-y-6">
            {pipelineSteps.map((step, i) => (
              <div key={i} className={`relative rounded-xl border ${step.borderColor} bg-neutral-950 p-6 overflow-hidden`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-mono font-bold ${step.color}`}>{step.step}</span>
                  <span className={`text-xs font-mono font-bold ${step.color} uppercase tracking-widest`}>{step.label}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-5">{step.desc}</p>

                <div className="grid grid-cols-3 gap-3">
                  {step.specs.map((spec, j) => (
                    <div key={j} className="bg-[#0a0a0a] border border-neutral-800/60 rounded-lg p-3">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase mb-1">{spec.label}</div>
                      <div className="text-xs font-mono text-white font-semibold">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {i < pipelineSteps.length - 1 && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 bg-neutral-950 border border-neutral-800 rounded-full p-1.5">
                    <ArrowRight className="w-3 h-3 text-neutral-500 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Edge Node Pool */}
        <div className="mt-14 space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Edge Node Pool
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            The following providers are actively connected to the Meida routing mesh. Each node is health-checked every 5 seconds.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider">
                  <th className="text-left py-3 pr-4">Provider</th>
                  <th className="text-left py-3 pr-4">Tier</th>
                  <th className="text-left py-3 pr-4">Role</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {edgeNodes.map((node, i) => (
                  <tr key={i} className="border-b border-neutral-800/50">
                    <td className="py-3 pr-4 text-white font-semibold">{node.provider}</td>
                    <td className="py-3 pr-4 text-neutral-400">{node.tier}</td>
                    <td className="py-3 pr-4 text-neutral-400">{node.role}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        node.status === 'PRIMARY' ? 'bg-neon/10 text-neon border border-neon/20' :
                        node.status === 'ACTIVE' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-neutral-900 text-neutral-400 border border-neutral-800'
                      }`}>
                        {node.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Budget */}
        <div className="mt-10 p-5 rounded-xl bg-neutral-950 border border-neutral-800/80">
          <div className="text-xs font-mono text-neutral-500 uppercase mb-2">End-to-End Routing Overhead</div>
          <div className="text-2xl font-bold text-neon font-mono">&lt;50ms total</div>
          <p className="text-xs text-neutral-400 mt-2">Classify (4ms) + Arbitrage (8ms) + Network Hop (~30ms) = sub-50ms before first token.</p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-neutral-800/60 flex items-center justify-between">
        <Link href="/docs" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Introduction
        </Link>
        <Link href="/docs/authentication" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          Authentication
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
