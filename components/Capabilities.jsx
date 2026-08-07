'use client';

import SectionHeader from './SectionHeader';
import {
  Minimize2,
  Brain,
  Layers,
  Puzzle,
  Clock,
  Search,
  HardDrive,
  User,
  MessageSquare,
  Server,
  Bot,
  Route,
  Wrench,
  Reply,
  ArrowRight,
} from 'lucide-react';

const capabilities = [
  {
    icon: <Minimize2 className="w-5 h-5 text-neon" />,
    title: 'Dynamic Model Routing',
    desc: 'Intelligently analyzes query complexity and intent to route tasks to the most cost-effective and capable model in real-time.',
  },
  {
    icon: <Brain className="w-5 h-5 text-neon" />,
    title: 'Autonomous Cost Optimization',
    desc: 'Drastically reduces API expenses by defaulting to lightweight models for simple queries while reserving premium models for complex reasoning.',
  },
  {
    icon: <Layers className="w-5 h-5 text-neon" />,
    title: 'Smart Function Calling',
    desc: 'Seamlessly connects AI to external APIs, databases, and tools to fetch real-world data like crypto prices instantly.',
  },
  {
    icon: <Puzzle className="w-5 h-5 text-neon" />,
    title: 'Sub-50ms Routing Latency',
    desc: 'Edge-distributed semantic classification routes payloads in under 50ms with zero perceptible overhead.',
  },
  {
    icon: <Clock className="w-5 h-5 text-neon" />,
    title: 'Transparent Analytics',
    desc: 'Provides clear visibility into model selection, latency metrics, and exact dollar amounts saved per interaction.',
  },
  {
    icon: <Search className="w-5 h-5 text-neon" />,
    title: 'Zero-Config Integration',
    desc: 'Plug-and-play architecture that easily integrates into existing Web, Telegram, or Discord channels without complex setups.',
  },
  {
    icon: <HardDrive className="w-5 h-5 text-neon" />,
    title: 'Future-Proof Scalability',
    desc: 'Enterprise-grade AI routing designed to seamlessly handle millions of decentralized requests while maintaining high availability.',
  },
];

const lifecycle = [
  { icon: <User className="w-4 h-4" />, label: 'User', color: 'border-white/20' },
  { icon: <MessageSquare className="w-4 h-4" />, label: 'Channel', color: 'border-blue-500/30' },
  { icon: <Server className="w-4 h-4" />, label: 'Gateway', color: 'border-purple-500/30' },
  { icon: <Bot className="w-4 h-4" />, label: 'Agent', color: 'border-cyan-500/30' },
  { icon: <Route className="w-4 h-4" />, label: 'Router', color: 'border-yellow-500/30' },
  { icon: <Wrench className="w-4 h-4" />, label: 'Tools', color: 'border-orange-500/30' },
  { icon: <Reply className="w-4 h-4" />, label: 'Reply', color: 'border-neon/30' },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 lg:py-36 border-t border-neutral-800/60 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headline="Built for 24/7 Web3 Orchestration."
          description="Memory persists, tools stay controlled, and context remains focused across extended workstreams."
        />

        {/* Capability Grid */}
        <div className="mt-16">
          {/* Top Row: 2 Large Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {capabilities.slice(0, 2).map((cap, i) => (
              <div
                key={i}
                className="group relative p-8 md:p-10 rounded-2xl border border-neutral-800 overflow-hidden flex flex-col justify-end min-h-[300px]"
              >
                {/* Background Image */}
                {i === 0 && (
                  <img src="/meidalogo-removebg.png" alt="" className="absolute inset-0 w-full h-full object-contain opacity-20 group-hover:scale-105 transition-transform duration-700" />
                )}
                {i === 1 && (
                  <img src="/meidalogo5-removebg.png" alt="" className="absolute inset-0 w-full h-full object-contain opacity-20 group-hover:scale-105 transition-transform duration-700" />
                )}
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 text-neon mb-4">
                  {cap.icon}
                </div>
                <h4 className="relative z-10 text-white font-bold text-xl md:text-2xl mb-2">{cap.title}</h4>
                <p className="relative z-10 text-sm text-neutral-400 leading-relaxed max-w-sm">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Row: 5 Small Cards (Bento 6-col grid) */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {capabilities.slice(2).map((cap, i) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl border border-neutral-800 bg-[#0a0a0a]/80 hover:border-neon/20 hover:bg-neon/[0.02] transition-all duration-300 flex flex-col ${
                  i < 3 ? 'md:col-span-2' : 'md:col-span-3'
                }`}
              >
                <div className="p-3 rounded-xl bg-neon/5 border border-neon/10 inline-flex mb-4 group-hover:bg-neon/10 group-hover:border-neon/20 transition-all duration-300 w-fit">
                  {cap.icon}
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">{cap.title}</h4>
                <p className="text-[14px] text-neutral-400 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
