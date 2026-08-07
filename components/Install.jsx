'use client';

import { useState } from 'react';
import SectionHeader from './SectionHeader';
import CodeBlock from './CodeBlock';
import Link from 'next/link';
import { Terminal, Check, Copy, ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

const codeExamples = {
  typescript: {
    lang: 'TypeScript / Node.js',
    installCmd: 'npm install @meida/router',
    code: `// 1. Swap only 1 line of import (Drop-In Compatible):
import { MeidaRouter } from '@meida/router';

// 2. Initialize with your Meida API Key
const ai = new MeidaRouter({
  apiKey: process.env.MEIDA_API_KEY,
  routingStrategy: 'arbitrage-fastest', // sub-50ms auto tier
});

// 3. Keep 100% of your existing OpenAI SDK logic unchanged!
const response = await ai.chat.completions.create({
  model: 'auto-route', // Meida handles GPT-4o, Claude 3.5, or DeepSeek
  messages: [{ role: 'user', content: 'Audit this smart contract...' }],
  temperature: 0.2,
});

console.log(response.choices[0].message.content);`,
  },
  python: {
    lang: 'Python SDK',
    installCmd: 'pip install meida-router',
    code: `# 1. Swap only 1 line of import (Drop-In Compatible):
from meida import MeidaRouter

# 2. Initialize client
client = MeidaRouter(
    api_key="me_live_99481a8b...",
    strategy="lowest-cost-capable"
)

# 3. Exact same OpenAI API schema - zero refactor!
response = client.chat.completions.create(
    model="auto-route",
    messages=[{"role": "user", "content": "Analyze trading volume..."}]
)

print(response.choices[0].message.content)`,
  },
  curl: {
    lang: 'cURL / REST API',
    installCmd: 'curl -X POST https://api.meida.cloud/v1/chat/completions',
    code: `curl https://api.meida.cloud/v1/chat/completions \\
  -H "Authorization: Bearer $MEIDA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto-route",
    "strategy": "sub-50ms",
    "messages": [
      {"role": "user", "content": "Classify incoming customer intent"}
    ]
  }'`,
  },
};

const steps = [
  {
    number: '01',
    title: 'Install Meida SDK',
    description: 'Lightning-fast client package with zero external dependencies.',
    code: `$ npm install @meida/router`,
  },
  {
    number: '02',
    title: 'Configure Edge Gateway',
    description: 'Set your routing strategy for cost arbitrage or sub-50ms speed.',
    code: `$ export MEIDA_API_KEY="me_live_..."`,
  },
  {
    number: '03',
    title: 'Route Without Refactoring',
    description: 'Your existing OpenAI API calls automatically gain multi-model failover.',
    code: `const client = new MeidaRouter();`,
  },
];

export default function Install() {
  const [activeTab, setActiveTab] = useState('typescript');
  const [copied, setCopied] = useState(false);

  const activeExample = codeExamples[activeTab];

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(activeExample.installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="install" className="relative py-28 lg:py-36 border-t border-neutral-800/60 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-neon/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          headline="1-Line Drop-in SDK. Zero Refactoring."
          description="Meida adopts the standard OpenAI API specification. Migrate in 30 seconds by changing only 1 line of import without touching your application logic."
        />

        {/* Interactive Drop-In SDK Playground */}
        <div className="mt-16 rounded-2xl border border-neutral-800 bg-[#080808] overflow-hidden shadow-2xl">
          
          {/* Top Bar: Language Tabs & Quick Install Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#0d0d0d] border-b border-neutral-800 gap-3">
            
            {/* Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-black/60 border border-neutral-800 rounded-xl">
              {Object.entries(codeExamples).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeTab === key
                      ? 'bg-neon/15 text-neon border border-neon/30 shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.lang}
                </button>
              ))}
            </div>

            {/* Quick Install Copy pill */}
            <button
              onClick={handleCopyInstall}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:border-neutral-700 transition-colors group"
            >
              <Terminal className="w-3.5 h-3.5 text-neon" />
              <span className="text-[11px] text-neutral-400">{activeExample.installCmd}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-neon" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
              )}
            </button>
          </div>

          {/* Code Viewer Area */}
          <div className="p-6 sm:p-8 bg-[#050505]">
            <CodeBlock code={activeExample.code} />
          </div>

          {/* Highlights Footer */}
          <div className="p-4 bg-[#0a0a0a] border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-neon shrink-0" />
              <span>100% OpenAI Schema Compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neon shrink-0" />
              <span>Built-in Fallback Failover</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-neon shrink-0" />
              <span>Sub-50ms Routing Overhead</span>
            </div>
          </div>

        </div>

        {/* Bottom Steps & Documentation Link */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-neon font-bold block mb-2">{step.number}</span>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{step.description}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-900 font-mono text-[11px] text-neutral-300">
                <code>{step.code}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/docs" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 hover:border-neutral-500 text-sm font-medium text-white transition-all duration-300 group"
          >
            <span>Explore Full Developer Documentation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
