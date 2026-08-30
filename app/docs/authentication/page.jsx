'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy, Check, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AuthenticationPage() {
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
          <span className="text-neon">authentication</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Authentication
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed mb-10 max-w-2xl">
          Every request to the Meida API requires a valid API key passed as a Bearer token in the Authorization header. Keys are scoped by environment.
        </p>
        <hr className="border-neutral-800/60 mb-10" />

        <div className="space-y-10 text-neutral-300">

          {/* Key Format */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              API Key Format
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Meida uses prefixed API keys to distinguish between environments. This prevents accidental production usage during development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] font-mono text-neon uppercase tracking-wider font-bold mb-2">Production</div>
                <div className="flex items-center justify-between bg-[#0a0a0a] border border-neutral-800/60 rounded-lg px-3 py-2.5 mb-3">
                  <code className="text-sm font-mono text-white">me_live_xxxxxxxxxxxxxxxx</code>
                  <button onClick={() => handleCopy('me_live_xxxxxxxxxxxxxxxx', 'prod')} className="text-neutral-500 hover:text-white transition-colors">
                    {copied === 'prod' ? <Check className="w-3.5 h-3.5 text-neon" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-neutral-400">Full access to live routing clusters. All providers active.</p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-bold mb-2">Devnet / Sandbox</div>
                <div className="flex items-center justify-between bg-[#0a0a0a] border border-neutral-800/60 rounded-lg px-3 py-2.5 mb-3">
                  <code className="text-sm font-mono text-white">me_test_xxxxxxxxxxxxxxxx</code>
                  <button onClick={() => handleCopy('me_test_xxxxxxxxxxxxxxxx', 'test')} className="text-neutral-500 hover:text-white transition-colors">
                    {copied === 'test' ? <Check className="w-3.5 h-3.5 text-neon" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-neutral-400">Isolated sandbox for local testing. Rate limits relaxed.</p>
              </div>
            </div>
          </section>

          {/* Usage Example */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Passing the API Key
            </h2>

            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#070707]">
              <div className="bg-[#111] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">Authorization Header</span>
                <button
                  onClick={() => handleCopy('Authorization: Bearer me_live_xxxxxxxxxxxxxxxx', 'header')}
                  className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                >
                  {copied === 'header' ? <span className="text-neon">Copied!</span> : 'Copy'}
                </button>
              </div>
              <div className="p-5">
                <pre className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">{`curl https://api.meida.cloud/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer me_live_xxxxxxxxxxxxxxxx" \\
  -d '{ "model": "auto-route", "messages": [...] }'`}</pre>
              </div>
            </div>
          </section>

          {/* Security Notice */}
          <section className="space-y-4">
            <div className="flex items-start gap-3 p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Security Best Practices</h3>
                <ul className="text-xs text-neutral-400 leading-relaxed space-y-1.5">
                  <li>Never expose your <code className="text-white bg-neutral-800 px-1 py-0.5 rounded text-[11px]">me_live_</code> key in client-side code or public repositories.</li>
                  <li>Use environment variables (<code className="text-white bg-neutral-800 px-1 py-0.5 rounded text-[11px]">MEIDA_API_KEY</code>) on your backend server.</li>
                  <li>Rotate keys immediately if you suspect they have been compromised.</li>
                  <li>Use <code className="text-white bg-neutral-800 px-1 py-0.5 rounded text-[11px]">me_test_</code> keys during development and CI/CD pipelines.</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-neutral-800/60 flex items-center justify-between">
        <Link href="/docs/architecture" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Architecture
        </Link>
        <Link href="/docs/chat-completions" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
          Chat Completions
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
