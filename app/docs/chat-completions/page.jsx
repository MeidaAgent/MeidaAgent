'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy, Check } from 'lucide-react';
import Link from 'next/link';

const requestExample = `{
  "model": "auto-route",
  "messages": [
    { "role": "system", "content": "You are a Web3 security auditor." },
    { "role": "user", "content": "Audit this Solidity contract for reentrancy..." }
  ],
  "temperature": 0.2,
  "max_tokens": 4096,
  "strategy": "cost-latency-balanced"
}`;

const responseExample = `{
  "id": "meida-chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1723056000,
  "model": "claude-3.5-sonnet",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I've identified 2 critical vulnerabilities..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 842,
    "completion_tokens": 1205,
    "total_tokens": 2047
  },
  "router_telemetry": {
    "selected_tier": "T4_PREMIUM",
    "selected_provider": "anthropic/claude-3.5-sonnet",
    "classification_ms": 3.8,
    "arbitrage_ms": 7.2,
    "total_routing_ms": 11.0,
    "cost_saved_vs_default": "68%",
    "fallback_triggered": false
  }
}`;

const requestFields = [
  { field: 'model', type: 'string', required: true, desc: 'Use "auto-route" for intelligent routing, or specify a provider directly (e.g., "claude-3.5-sonnet").' },
  { field: 'messages', type: 'array', required: true, desc: 'Standard OpenAI message array with role/content pairs.' },
  { field: 'temperature', type: 'number', required: false, desc: 'Sampling temperature (0–2). Lower = more deterministic.' },
  { field: 'max_tokens', type: 'integer', required: false, desc: 'Maximum tokens in the completion response.' },
  { field: 'strategy', type: 'string', required: false, desc: 'Routing strategy override. See Routing Strategies page for options.' },
  { field: 'stream', type: 'boolean', required: false, desc: 'Enable Server-Sent Events streaming (default: false).' },
];

const telemetryFields = [
  { field: 'selected_tier', desc: 'The tier level chosen by the arbitrage engine (T1–T4).' },
  { field: 'selected_provider', desc: 'The exact provider/model combination that served the request.' },
  { field: 'classification_ms', desc: 'Time spent on semantic classification (typically <4ms).' },
  { field: 'arbitrage_ms', desc: 'Time spent on tier selection and cost comparison.' },
  { field: 'total_routing_ms', desc: 'Total overhead added by the Meida routing pipeline.' },
  { field: 'cost_saved_vs_default', desc: 'Percentage cost savings vs. always routing to the most expensive model.' },
  { field: 'fallback_triggered', desc: 'Whether a failover reroute occurred during this request.' },
];

export default function ChatCompletionsPage() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-between">
      <div>
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-8">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span>/</span>
          <Link href="/docs" className="hover:text-white transition-colors">docs</Link>
          <span>/</span>
          <span className="text-neon">chat-completions</span>
        </nav>

        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Chat Completions
          </h1>
          <span className="px-2.5 py-1 rounded-lg bg-neon/10 border border-neon/20 text-neon text-[10px] font-mono font-bold uppercase">POST</span>
        </div>
        <p className="text-sm text-neutral-400 leading-relaxed mb-2 max-w-2xl">
          The primary endpoint for all AI interactions. 100% compatible with the OpenAI Chat Completions API schema.
        </p>
        <div className="bg-[#0a0a0a] border border-neutral-800/60 rounded-lg px-4 py-2.5 inline-block mb-10">
          <code className="text-sm font-mono text-neon">POST /v1/chat/completions</code>
        </div>
        <hr className="border-neutral-800/60 mb-10" />

        <div className="space-y-12 text-neutral-300">

          {/* Request Body */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Request Body</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider">
                    <th className="text-left py-3 pr-4">Field</th>
                    <th className="text-left py-3 pr-4">Type</th>
                    <th className="text-left py-3 pr-4">Required</th>
                    <th className="text-left py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {requestFields.map((f, i) => (
                    <tr key={i} className="border-b border-neutral-800/50">
                      <td className="py-3 pr-4 text-white font-semibold">{f.field}</td>
                      <td className="py-3 pr-4 text-neutral-400">{f.type}</td>
                      <td className="py-3 pr-4">
                        {f.required ? (
                          <span className="text-neon text-[10px] font-bold">REQUIRED</span>
                        ) : (
                          <span className="text-neutral-600 text-[10px]">optional</span>
                        )}
                      </td>
                      <td className="py-3 text-neutral-400 text-[11px] leading-relaxed">{f.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Request Example */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Example Request</h2>
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#070707]">
              <div className="bg-[#111] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">POST /v1/chat/completions</span>
                <button onClick={() => handleCopy(requestExample, 'req')} className="text-xs font-mono text-neutral-400 hover:text-white transition-colors">
                  {copied === 'req' ? <span className="text-neon">Copied!</span> : 'Copy'}
                </button>
              </div>
              <div className="p-5 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">{requestExample}</pre>
              </div>
            </div>
          </section>

          {/* Response Example */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Example Response</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              The response follows the standard OpenAI schema with an additional <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">router_telemetry</code> object unique to Meida.
            </p>
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#070707]">
              <div className="bg-[#111] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">200 OK</span>
                <button onClick={() => handleCopy(responseExample, 'res')} className="text-xs font-mono text-neutral-400 hover:text-white transition-colors">
                  {copied === 'res' ? <span className="text-neon">Copied!</span> : 'Copy'}
                </button>
              </div>
              <div className="p-5 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">{responseExample}</pre>
              </div>
            </div>
          </section>

          {/* Router Telemetry Fields */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Router Telemetry Fields</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              The <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">router_telemetry</code> object is appended to every response and provides full transparency into routing decisions.
            </p>

            <div className="space-y-3">
              {telemetryFields.map((f, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800/60">
                  <code className="text-xs font-mono text-neon font-semibold whitespace-nowrap shrink-0">{f.field}</code>
                  <p className="text-xs text-neutral-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-neutral-800/60 flex items-center justify-between">
        <Link href="/docs/authentication" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Authentication
        </Link>
        <Link href="/docs/routing-strategies" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          Routing Strategies
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
