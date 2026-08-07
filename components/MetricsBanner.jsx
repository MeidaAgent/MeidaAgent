import { Monitor, Terminal, MessageSquare } from 'lucide-react';

const metrics = [
  {
    icon: <Terminal className="w-5 h-5 text-neon" />,
    value: '3 surfaces',
    description: 'Web UI and Chat on one powerful Web3 Router runtime.',
  },
  {
    icon: <Monitor className="w-5 h-5 text-neon" />,
    value: '20+ providers',
    description: 'Switch backends without code changes.',
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-neon" />,
    value: 'On-device',
    description: 'Routing and embeddings stay local.',
  },
];

export default function MetricsBanner() {
  return (
    <section className="relative border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="flex flex-col py-8 px-6 md:px-10 border-b md:border-b-0 md:border-r border-neutral-800 last:border-b-0 md:last:border-r-0 group"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                {metric.value}
              </h3>
              <p className="text-[15px] text-neutral-500 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
