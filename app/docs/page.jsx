'use client';

import { useState } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';
import Link from 'next/link';
import WaitlistForm from '@/components/WaitlistForm';

export default function DocsRootPage() {
  const [selectedLang, setSelectedLang] = useState('curl');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    curl: `curl https://api.meida.cloud/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer me_live_xxxxxxxxxxxxxxxx" \\
  -d '{
    "model": "auto-route",
    "messages": [
      { "role": "user", "content": "Analyze this Solana transaction payload..." }
    ],
    "strategy": "cost-latency-balanced"
  }'`,
    typescript: `import { MeidaRouter } from '@meida/router';

// 100% Drop-in replacement for OpenAI SDK
const router = new MeidaRouter({
  apiKey: process.env.MEIDA_API_KEY || 'me_live_...',
  fallbackEnabled: true,
  maxLatencyMs: 50,
});

const response = await router.chat.completions.create({
  model: 'auto-route', // Dynamically routed to Claude 3.5, GPT-4o, or Llama-3
  messages: [{ role: 'user', content: 'Audit this smart contract...' }],
});

console.log(response.choices[0].message.content);
console.log('Telemetry:', response.router_telemetry);`,
    python: `from meida import MeidaRouter
import os

# Drop-in compatible with openai-python
client = MeidaRouter(
    api_key=os.getenv("MEIDA_API_KEY", "me_live_..."),
    strategy="lowest_cost_reliable"
)

completion = client.chat.completions.create(
    model="auto-route",
    messages=[{"role": "user", "content": "Analyze wallet token distribution"}]
)

print(completion.choices[0].message.content)`
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippets[selectedLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-between">
      <div>
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-8">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span>/</span>
          <span className="text-neon">docs</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Meida Developer Documentation
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed mb-10 max-w-2xl">
          High-performance, sub-50ms intelligent LLM router with zero-downtime failover and 100% OpenAI SDK drop-in compatibility.
        </p>
        <hr className="border-neutral-800/60 mb-10" />

        <div className="space-y-12 text-neutral-300">

          {/* How It Works — Brief */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">How It Works</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Every incoming turn passes through a 3-step pipeline — classify intent, select the cheapest capable tier, and execute with automatic failover — all in under 50ms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="text-xs font-mono text-neon font-bold mb-1">01. CLASSIFY</div>
                <p className="text-xs text-neutral-400">Determines task complexity and context length in &lt;4ms.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="text-xs font-mono text-blue-400 font-bold mb-1">02. ARBITRAGE</div>
                <p className="text-xs text-neutral-400">Routes to the lowest latency &amp; cost provider.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="text-xs font-mono text-purple-400 font-bold mb-1">03. FAILOVER</div>
                <p className="text-xs text-neutral-400">Reroutes automatically if primary returns 503 or 429.</p>
              </div>
            </div>

            <Link href="/docs/architecture" className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-neon transition-colors mt-2">
              Read full architecture docs
              <ArrowRight className="w-3 h-3" />
            </Link>
          </section>

          {/* Quickstart */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-tight">Quickstart</h2>
              <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-lg text-xs font-mono">
                {['curl', 'typescript', 'python'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2.5 py-1 rounded transition-all capitalize ${
                      selectedLang === lang
                        ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {lang === 'curl' ? 'cURL' : lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#070707]">
              <div className="bg-[#111] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">
                  {selectedLang === 'curl' ? 'POST /v1/chat/completions' : selectedLang === 'typescript' ? 'router.ts' : 'router.py'}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-neutral-800"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-neon" />
                      <span className="text-neon">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-5 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
                  {codeSnippets[selectedLang]}
                </pre>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Next Steps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Architecture', desc: 'Understand the 3-step routing pipeline.', href: '/docs/architecture' },
                { label: 'Authentication', desc: 'API key formats and security practices.', href: '/docs/authentication' },
                { label: 'Chat Completions', desc: 'Full endpoint reference with request/response schema.', href: '/docs/chat-completions' },
                { label: 'Routing Strategies', desc: 'Configure cost vs. latency vs. quality tradeoffs.', href: '/docs/routing-strategies' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                >
                  <div className="text-sm font-semibold text-white group-hover:text-neon transition-colors mb-1">{item.label}</div>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Waitlist */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-neutral-950/80 border border-neutral-800 p-6 rounded-2xl">
            <div>
              <div className="text-xs font-mono text-neon uppercase font-bold tracking-wider mb-1">
                Genesis Developer Access
              </div>
              <h3 className="text-lg font-bold text-white">Join the Verified Pilot Queue</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                Get early API key provisioning and devnet allocation for high-throughput routing.
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <WaitlistForm />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-neutral-800/60 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          Back to Homepage
        </Link>
        <Link href="/docs/architecture" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          Architecture
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
