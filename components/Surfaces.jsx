'use client';

import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Terminal, Globe, MessageCircle, ArrowRight, Server, Shield, Cpu } from 'lucide-react';

const terminalLines = [
  { text: '$ meida -> route payload --optimize-latency', type: 'command', delay: 0 },
  { text: '  ✓ Connected to Meida Edge Gateway (3.8ms)', type: 'success', delay: 800 },
  { text: '  ✓ Fallback cluster: 4 Nodes Active', type: 'success', delay: 1200 },
  { text: '', type: 'blank', delay: 1600 },
  { text: '> Analyzing incoming payload...', type: 'info', delay: 2000 },
  { text: '  ▸ Intent: Smart Contract Audit. Complexity: High.', type: 'info', delay: 2600 },
  { text: '  ⚡ Routing to Claude 3.5 Sonnet...', type: 'link', delay: 3200 },
  { text: '  ✓ Turn complete. Sub-50ms verified (38.2ms). Saved: 68% cost.', type: 'success', delay: 4000 },
];

const gatewayNodes = [
  {
    title: 'Clients',
    items: ['Web UI', 'DApps', 'Channels'],
    icon: <Globe className="w-4 h-4" />,
    color: 'border-blue-500/30',
  },
  {
    title: 'Gateway',
    items: ['Sessions', 'Approvals', 'Scheduler'],
    icon: <Server className="w-4 h-4" />,
    color: 'border-neon/30',
  },
  {
    title: 'Execution',
    items: ['Router', 'Tools', 'Execution Engine'],
    icon: <Cpu className="w-4 h-4" />,
    color: 'border-purple-500/30',
  },
];

function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    const resetTimer = setTimeout(() => setVisibleLines(0), 6000);
    const restartTimer = setTimeout(() => {
      const restart = terminalLines.map((line, i) =>
        setTimeout(() => setVisibleLines(i + 1), line.delay)
      );
      return () => restart.forEach(clearTimeout);
    }, 6500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
      clearTimeout(restartTimer);
    };
  }, []);

  // Continuous loop
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(0);
      terminalLines.forEach((line, i) => {
        setTimeout(() => setVisibleLines(i + 1), line.delay);
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const getLineColor = (type) => {
    switch (type) {
      case 'command': return 'text-white';
      case 'success': return 'text-neon';
      case 'info': return 'text-yellow-400';
      case 'link': return 'text-cyan-400';
      default: return 'text-neutral-400';
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden flex flex-col h-full">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
        </div>
        <span className="text-xs font-mono text-neutral-500">terminal</span>
        <div className="w-16" />
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-6 font-mono text-sm flex-1 min-h-[280px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`${getLineColor(line.type)} transition-opacity duration-300 leading-7`}
            style={{ opacity: i < visibleLines ? 1 : 0 }}
          >
            {line.text === '' ? <br /> : line.text}
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-5 bg-neon animate-pulse" />
        )}
      </div>
    </div>
  );
}

export default function Surfaces() {
  return (
    <section id="surfaces" className="relative py-28 lg:py-36 border-t border-neutral-800/60 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headline="One intelligence. Any surface."
          description="Deploy the Meida Router API seamlessly across your custom Web UI, Discord bots, or existing Web3 infrastructure."
        />

        {/* Surface Cards */}
        <div className="mt-16 flex flex-col gap-4">
          {/* Top Row: Full-width Terminal Dashboard */}
          <div className="flex flex-col w-full">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-5 h-5 text-neon" />
                <h4 className="text-white font-semibold text-xl">Real-Time Routing Analytics Dashboard</h4>
              </div>
              <p className="text-sm text-neutral-400">
                Monitor intent detection, model selection, and token savings live in a powerful command center.
              </p>
            </div>
            <div className="w-full h-[350px]">
              <TerminalAnimation />
            </div>
          </div>

          {/* Bottom Row: Chat & Web UI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Web UI Card */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-[#0a0a0a]/80 hover:border-neon/20 transition-all duration-300 group flex flex-col">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 inline-flex w-fit mb-4">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Web Dashboard</h4>
              <p className="text-sm text-neutral-400 leading-relaxed flex-1">
                Monitor your total API savings, manage fallback rules, and inspect real-time router decisions.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                dashboard.meida.agent
              </div>
            </div>

            {/* Chat Channels Card */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-[#0a0a0a]/80 hover:border-neon/20 transition-all duration-300 group flex flex-col">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 inline-flex w-fit mb-4">
                <MessageCircle className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Bot Integration</h4>
              <p className="text-sm text-neutral-400 leading-relaxed flex-1">
                Bring intelligent routing directly into your community channels to handle thousands of users cheaply.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Telegram, Discord, Slack API
              </div>
            </div>
          </div>
        </div>

        {/* Gateway Diagram */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-bold text-white mb-8">
            Gateway Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {gatewayNodes.map((node, i) => (
              <div key={i} className="relative">
                <div className={`p-5 rounded-2xl border ${node.color} bg-[#0a0a0a]/80 text-center`}>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-neutral-400">{node.icon}</span>
                    <h4 className="text-white font-semibold">{node.title}</h4>
                  </div>
                  <div className="space-y-1.5">
                    {node.items.map((item, j) => (
                      <div
                        key={j}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-neutral-800/50 text-neutral-400"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                {i < gatewayNodes.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-neutral-600">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
