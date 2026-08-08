'use client';

import { ArrowLeft, ArrowRight, Zap, DollarSign, Scale, Shield } from 'lucide-react';
import Link from 'next/link';

const strategies = [
  {
    id: 'lowest-cost',
    name: 'Lowest Cost',
    value: '"lowest-cost"',
    icon: <DollarSign className="w-5 h-5 text-neon" />,
    desc: 'Always routes to the cheapest provider that meets the minimum quality threshold for the classified intent. Best for high-volume, cost-sensitive workloads like bulk summarization or data extraction.',
    savings: '~82%',
    latency: '~60ms',
    quality: 'Good',
    useCase: 'High-volume RAG, data extraction, chat bots',
  },
  {
    id: 'lowest-latency',
    name: 'Lowest Latency',
    value: '"lowest-latency"',
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    desc: 'Prioritizes the fastest available provider regardless of cost. Ideal for real-time trading bots, live support interfaces, and latency-critical Web3 applications.',
    savings: '~45%',
    latency: '~25ms',
    quality: 'High',
    useCase: 'Trading bots, live support, real-time agents',
  },
  {
    id: 'cost-latency-balanced',
    name: 'Cost-Latency Balanced',
    value: '"cost-latency-balanced"',
    icon: <Scale className="w-5 h-5 text-purple-400" />,
    desc: 'The default strategy. Balances cost savings with acceptable latency by scoring providers on a weighted composite of price, speed, and quality. Recommended for most applications.',
    savings: '~68%',
    latency: '~38ms',
    quality: 'High',
    useCase: 'General agents, Web3 dApps, multi-purpose',
    default: true,
  },
  {
    id: 'quality-first',
    name: 'Quality First',
    value: '"quality-first"',
    icon: <Shield className="w-5 h-5 text-yellow-400" />,
    desc: 'Always routes to the highest-capability provider (typically Claude 3.5 Sonnet or GPT-4o) regardless of cost or latency. Use for critical tasks like smart contract audits or compliance reviews.',
    savings: '~20%',
    latency: '~80ms',
    quality: 'Maximum',
    useCase: 'Audits, compliance, critical reasoning',
  },
];

export default function RoutingStrategiesPage() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-between">
      <div>
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-8">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span>/</span>
          <Link href="/docs" className="hover:text-white transition-colors">docs</Link>
          <span>/</span>
          <span className="text-neon">routing-strategies</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Routing Strategies
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed mb-10 max-w-2xl">
          Control how the Meida arbitrage engine selects providers by passing a <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">strategy</code> field in your request body. If omitted, <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">cost-latency-balanced</code> is used by default.
        </p>
        <hr className="border-neutral-800/60 mb-10" />

        <div className="space-y-10 text-neutral-300">

          {/* Strategy Cards */}
          <div className="space-y-6">
            {strategies.map((s) => (
              <div key={s.id} className={`rounded-xl border ${s.default ? 'border-neon/30 bg-neon/[0.02]' : 'border-neutral-800 bg-neutral-950'} p-6 relative overflow-hidden`}>
                {s.default && (
                  <span className="absolute top-4 right-4 text-[9px] font-mono font-bold bg-neon/10 text-neon border border-neon/20 px-2 py-0.5 rounded-full uppercase tracking-widest">Default</span>
                )}

                <div className="flex items-center gap-3 mb-3">
                  {s.icon}
                  <h3 className="text-lg font-bold text-white">{s.name}</h3>
                </div>

                <div className="bg-[#0a0a0a] border border-neutral-800/60 rounded-lg px-3 py-2 inline-block mb-4">
                  <code className="text-xs font-mono text-neon">"strategy": {s.value}</code>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed mb-5">{s.desc}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#0a0a0a] border border-neutral-800/60 rounded-lg p-3">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase mb-1">Avg. Savings</div>
                    <div className="text-sm font-mono text-neon font-bold">{s.savings}</div>
                  </div>
                  <div className="bg-[#0a0a0a] border border-neutral-800/60 rounded-lg p-3">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase mb-1">Avg. Latency</div>
                    <div className="text-sm font-mono text-white font-bold">{s.latency}</div>
                  </div>
                  <div className="bg-[#0a0a0a] border border-neutral-800/60 rounded-lg p-3">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase mb-1">Quality</div>
                    <div className="text-sm font-mono text-white font-bold">{s.quality}</div>
                  </div>
                  <div className="bg-[#0a0a0a] border border-neutral-800/60 rounded-lg p-3">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase mb-1">Best For</div>
                    <div className="text-[11px] font-mono text-neutral-400">{s.useCase}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Usage Example */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Usage Example</h2>
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#070707]">
              <div className="bg-[#111] border-b border-neutral-800 px-4 py-2.5">
                <span className="text-xs text-neutral-500 font-mono">TypeScript</span>
              </div>
              <div className="p-5 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">{`const response = await router.chat.completions.create({
  model: 'auto-route',
  strategy: 'lowest-cost',  // Override default strategy
  messages: [
    { role: 'user', content: 'Summarize this whitepaper...' }
  ],
});

// Check which provider was selected
console.log(response.router_telemetry.selected_provider);
// → "deepseek/deepseek-v3"`}</pre>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-neutral-800/60 flex items-center justify-between">
        <Link href="/docs/chat-completions" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Chat Completions
        </Link>
        <Link href="/docs/error-codes" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          Error Codes
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
