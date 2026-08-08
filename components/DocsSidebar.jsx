'use client';

import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const sidebarGroups = [
  {
    label: 'GETTING STARTED',
    items: [
      { name: 'Introduction', href: '/docs' },
      { name: 'Architecture', href: '/docs/architecture' },
      { name: 'Authentication', href: '/docs/authentication' },
    ],
  },
  {
    label: 'API REFERENCE',
    items: [
      { name: 'Chat Completions', href: '/docs/chat-completions' },
      { name: 'Routing Strategies', href: '/docs/routing-strategies' },
      { name: 'Error Codes', href: '/docs/error-codes' },
      { name: 'Rate Limits', href: '/docs/rate-limits' },
    ],
  },
  {
    label: 'INTEGRATION',
    items: [
      { name: 'REST API', href: '#', comingSoon: true },
      { name: 'Telegram Bot', href: '#', comingSoon: true },
      { name: 'Discord Bot', href: '#', comingSoon: true },
    ],
  },
  {
    label: 'RESOURCES',
    items: [
      { name: 'Changelog', href: '#', comingSoon: true },
      { name: 'FAQ', href: '#', comingSoon: true },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 border-r border-neutral-800/50 bg-[#050505] hidden md:block pt-32 h-screen sticky top-0 overflow-y-auto custom-scrollbar">
      <div className="px-6 pb-20">
        
        {/* Search Bar */}
        <button className="w-full flex items-center justify-between px-3 py-2 bg-[#111] border border-neutral-800 hover:border-neutral-700 rounded-lg text-sm text-neutral-400 transition-colors mb-8 group cursor-not-allowed">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-neutral-500 transition-colors" />
            <span>Search (Disabled)</span>
          </div>
        </button>

        {/* Navigation Groups */}
        <div className="space-y-8">
          {sidebarGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-[11px] font-bold text-neutral-500 tracking-[0.15em] mb-4 uppercase">
                {group.label}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item, i) => {
                  const isActive = pathname === item.href;
                  if (item.comingSoon) {
                    return (
                      <li key={i}>
                        <span className="text-[14.5px] text-neutral-600 cursor-not-allowed flex items-center gap-2">
                          {item.name}
                          <span className="text-[9px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-500 px-1.5 py-0.5 rounded uppercase tracking-wider">Soon</span>
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className={`text-[14.5px] transition-colors block ${
                          isActive
                            ? 'text-neon font-medium'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        
      </div>
    </aside>
  );
}
