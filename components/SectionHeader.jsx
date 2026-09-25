export default function SectionHeader({ badge, headline, description, align = 'center', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 mb-6 ${align === 'center' ? 'mx-auto' : ''}`}>
          <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
          <span className="text-xs font-mono text-neon uppercase tracking-wider">{badge}</span>
        </div>
      )}
      {headline && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
          {headline}
        </h2>
      )}
      {description && (
        <p className={`mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
