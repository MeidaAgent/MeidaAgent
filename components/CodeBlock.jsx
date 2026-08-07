'use client';

import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

function highlightBash(line) {
  if (line.startsWith('#')) {
    return <span className="text-neutral-500">{line}</span>;
  }
  if (line.startsWith('$') || line.startsWith('→') || line.startsWith('//')) {
    const parts = line.split(' ');
    const prompt = parts[0];
    const cmd = parts[1] || '';
    const rest = parts.slice(2).join(' ');
    return (
      <>
        <span className="text-neutral-500">{prompt} </span>
        <span className="text-neon">{cmd}</span>
        {rest && <span className="text-neutral-300"> {rest}</span>}
      </>
    );
  }
  if (line.includes('http://') || line.includes('https://')) {
    return <span className="text-cyan-400">{line}</span>;
  }
  return <span className="text-neutral-300">{line}</span>;
}

export default function CodeBlock({ code, title, showLineNumbers = false, className = '' }) {
  const [copied, setCopied] = useState(false);
  const lines = code.trim().split('\n');

  const handleCopy = async () => {
    const cleanCode = lines
      .filter((l) => !l.startsWith('#') && !l.startsWith('//'))
      .map((l) => (l.startsWith('$ ') ? l.slice(2) : l))
      .join('\n');
    await navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group relative rounded-xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-xs font-mono text-neutral-500">{title}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-neutral-600 w-8 text-right mr-4 flex-shrink-0">
                    {i + 1}
                  </span>
                )}
                <span>{highlightBash(line)}</span>
              </div>
            ))}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-neon" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
