'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const errorCodes = [
  {
    code: '200',
    status: 'OK',
    color: 'text-neon',
    bgColor: 'bg-neon/10 border-neon/20',
    desc: 'Request completed successfully. The response body contains the completion and router telemetry.',
    action: 'No action needed.',
  },
  {
    code: '400',
    status: 'Bad Request',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/20',
    desc: 'The request body is malformed or missing required fields (e.g., messages array is empty or model field is missing).',
    action: 'Validate your request payload matches the Chat Completions schema.',
  },
  {
    code: '401',
    status: 'Unauthorized',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    desc: 'The API key is missing, invalid, expired, or does not have permission for the requested resource.',
    action: 'Check your Authorization header. Ensure the key starts with me_live_ or me_test_.',
  },
  {
    code: '403',
    status: 'Forbidden',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    desc: 'The API key is valid but lacks permission for this action (e.g., using a me_test_ key on a production-only endpoint).',
    action: 'Use the correct environment key for your request.',
  },
  {
    code: '429',
    status: 'Rate Limited',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/20',
    desc: 'You have exceeded your tier\'s rate limit (requests per minute). The response includes a Retry-After header.',
    action: 'Implement exponential backoff. Check the Retry-After header for the cooldown duration.',
  },
  {
    code: '500',
    status: 'Internal Server Error',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    desc: 'An unexpected error occurred within the Meida routing engine. This is rare and typically self-recovering.',
    action: 'Retry the request after a short delay. If persistent, contact support.',
  },
  {
    code: '502',
    status: 'Bad Gateway',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    desc: 'The selected upstream provider returned an invalid response. Meida\'s failover engine should have rerouted automatically.',
    action: 'Usually auto-recovered. If you see this, the fallback chain was also exhausted. Retry.',
  },
  {
    code: '503',
    status: 'Service Unavailable',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    desc: 'All providers in the requested tier are currently unavailable. This triggers the full failover cascade.',
    action: 'Meida reroutes automatically. If returned to client, all fallback nodes are down. Retry in 30s.',
  },
];

const errorResponseExample = `{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "You have exceeded 1000 RPM for your current tier.",
    "type": "rate_limit_error",
    "retry_after_ms": 12000
  }
}`;

export default function ErrorCodesPage() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-between">
      <div>
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-8">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span>/</span>
          <Link href="/docs" className="hover:text-white transition-colors">docs</Link>
          <span>/</span>
          <span className="text-neon">error-codes</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Error Codes
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed mb-10 max-w-2xl">
          Meida uses standard HTTP status codes. Errors include a structured JSON body with a machine-readable <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">code</code>, human-readable <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">message</code>, and optional <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">retry_after_ms</code>.
        </p>
        <hr className="border-neutral-800/60 mb-10" />

        <div className="space-y-10 text-neutral-300">

          {/* Error Table */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Status Code Reference
            </h2>

            <div className="space-y-3">
              {errorCodes.map((err, i) => (
                <div key={i} className={`rounded-xl border ${err.bgColor} p-5`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-lg font-mono font-bold ${err.color}`}>{err.code}</span>
                    <span className="text-sm font-semibold text-white">{err.status}</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-3">{err.desc}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase shrink-0 mt-0.5">Action:</span>
                    <span className="text-xs text-neutral-300">{err.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Error Response Example */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Error Response Format</h2>
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#070707]">
              <div className="bg-[#111] border-b border-neutral-800 px-4 py-2.5">
                <span className="text-xs text-neutral-500 font-mono">429 Rate Limited</span>
              </div>
              <div className="p-5 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">{errorResponseExample}</pre>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-neutral-800/60 flex items-center justify-between">
        <Link href="/docs/routing-strategies" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Routing Strategies
        </Link>
        <Link href="/docs/rate-limits" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          Rate Limits
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
