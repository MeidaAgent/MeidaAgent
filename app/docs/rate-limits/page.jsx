'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import WaitlistForm from '@/components/WaitlistForm';

const tiers = [
  {
    name: 'Developer',
    badge: 'Free',
    badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    limits: [
      { label: 'Requests / Minute', value: '60 RPM' },
      { label: 'Requests / Day', value: '1,000' },
      { label: 'Max Context Length', value: '8,192 tokens' },
      { label: 'Concurrent Connections', value: '2' },
      { label: 'Providers Available', value: 'Llama-3, DeepSeek' },
      { label: 'Failover', value: 'Single fallback' },
    ],
  },
  {
    name: 'Professional',
    badge: 'Pro',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    highlight: false,
    limits: [
      { label: 'Requests / Minute', value: '1,000 RPM' },
      { label: 'Requests / Day', value: '50,000' },
      { label: 'Max Context Length', value: '32,768 tokens' },
      { label: 'Concurrent Connections', value: '10' },
      { label: 'Providers Available', value: 'All (GPT-4o, Claude, etc.)' },
      { label: 'Failover', value: '2-deep cascade' },
    ],
  },
  {
    name: 'Enterprise',
    badge: 'Enterprise',
    badgeColor: 'bg-neon/10 text-neon border-neon/20',
    highlight: true,
    limits: [
      { label: 'Requests / Minute', value: '10,000+ RPM' },
      { label: 'Requests / Day', value: 'Unlimited' },
      { label: 'Max Context Length', value: '200,000 tokens' },
      { label: 'Concurrent Connections', value: 'Unlimited' },
      { label: 'Providers Available', value: 'All + Priority Queue' },
      { label: 'Failover', value: '3-deep cascade + Hot Standby' },
    ],
  },
];

const headers = [
  { header: 'X-RateLimit-Limit', desc: 'Maximum number of requests allowed in the current window.' },
  { header: 'X-RateLimit-Remaining', desc: 'Number of requests remaining before hitting the limit.' },
  { header: 'X-RateLimit-Reset', desc: 'Unix timestamp (seconds) when the rate limit window resets.' },
  { header: 'Retry-After', desc: 'Seconds to wait before retrying (only present on 429 responses).' },
];

export default function RateLimitsPage() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-between">
      <div>
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-8">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span>/</span>
          <Link href="/docs" className="hover:text-white transition-colors">docs</Link>
          <span>/</span>
          <span className="text-neon">rate-limits</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Rate Limits
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed mb-10 max-w-2xl">
          Rate limits are enforced per API key and vary by tier. All limits use a sliding window. Exceeding limits returns a <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">429</code> status with a <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">Retry-After</code> header.
        </p>
        <hr className="border-neutral-800/60 mb-10" />

        <div className="space-y-12 text-neutral-300">

          {/* Tier Comparison */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Limits by Tier
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tiers.map((tier, i) => (
                <div key={i} className={`rounded-xl border p-5 flex flex-col ${tier.highlight ? 'border-neon/30 bg-neon/[0.02]' : 'border-neutral-800 bg-neutral-950'}`}>
                  <div className="flex items-center gap-2 mb-5">
                    <h3 className="text-sm font-bold text-white">{tier.name}</h3>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {tier.limits.map((limit, j) => (
                      <div key={j} className="flex items-center justify-between">
                        <span className="text-[11px] text-neutral-500">{limit.label}</span>
                        <span className="text-[11px] font-mono text-white font-semibold">{limit.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Rate Limit Headers */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Response Headers</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Every API response includes rate limit headers so you can monitor usage programmatically.
            </p>

            <div className="space-y-3">
              {headers.map((h, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800/60">
                  <code className="text-xs font-mono text-neon font-semibold whitespace-nowrap shrink-0">{h.header}</code>
                  <p className="text-xs text-neutral-400 leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Best Practices */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Best Practices</h2>
            <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-neon mt-1">•</span>
                Implement exponential backoff when receiving 429 responses.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon mt-1">•</span>
                Monitor <code className="text-white bg-neutral-800 px-1 py-0.5 rounded text-[11px]">X-RateLimit-Remaining</code> to proactively throttle before hitting limits.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon mt-1">•</span>
                Use batch endpoints for bulk workloads instead of sending individual requests.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon mt-1">•</span>
                Contact the Xypherar team for custom Enterprise limits tailored to your throughput needs.
              </li>
            </ul>
          </section>

          {/* Upgrade CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-neutral-950/80 border border-neutral-800 p-6 rounded-2xl">
            <div>
              <div className="text-xs font-mono text-neon uppercase font-bold tracking-wider mb-1">
                Need Higher Limits?
              </div>
              <h3 className="text-lg font-bold text-white">Join the Genesis Pilot Queue</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                Get priority access to Professional and Enterprise tiers with custom rate limits.
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <WaitlistForm />
            </div>
          </div>

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-neutral-800/60 flex items-center justify-between">
        <Link href="/docs/error-codes" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Error Codes
        </Link>
        <Link href="/docs" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          Back to Docs
        </Link>
      </div>
    </div>
  );
}
