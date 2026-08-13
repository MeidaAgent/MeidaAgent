import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function DocsPlaceholder() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background elements */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon/5 via-transparent to-transparent opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <div className="w-20 h-20 bg-neon/10 border border-neon/30 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(204,255,0,0.15)] animate-pulse">
          <Lock className="w-10 h-10 text-neon" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
          Classified Access
        </h1>
        
        <p className="text-neutral-400 leading-relaxed mb-10">
          The official Meida Agent documentation and API references are currently restricted. Access is exclusively granted to <strong className="text-white">Genesis Phase</strong> waitlist members.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
