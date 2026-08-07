'use client';

import SectionHeader from './SectionHeader';

const providers = [
  'OpenRouter',
  'OpenAI',
  'Anthropic',
  'Gemini',
  'DeepSeek',
  'DashScope',
  'Ollama',
  'Qwen',
  'MiniMax',
  'OpenCAP',
];

function ProviderPill({ name }) {
  return (
    <div className="flex-shrink-0 px-6 py-3 rounded-full border border-neutral-800 bg-[#0a0a0a]/80 hover:border-neon/20 hover:bg-neon/[0.02] transition-all duration-300 cursor-default">
      <span className="text-sm font-medium text-neutral-300 whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function SchemaProviders() {
  // Double the list for seamless loop
  const doubledProviders = [...providers, ...providers];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-y border-neutral-800/50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headline="One API. Every AI Provider."
          description="Route your agent's tasks to the best LLM instantly. Switch between providers without rewriting your DApp or Smart Contract logic."
        />
      </div>

      {/* Marquee */}
      <div className="mt-16 relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Left to Right */}
        <div className="overflow-hidden mb-4">
          <div className="flex gap-4 animate-marquee">
            {doubledProviders.map((provider, i) => (
              <ProviderPill key={`row1-${i}`} name={provider} />
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-reverse">
            {[...doubledProviders].reverse().map((provider, i) => (
              <ProviderPill key={`row2-${i}`} name={provider} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
