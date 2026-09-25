import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Character */}
        <div className="animate-float mb-8 relative w-48 h-48 md:w-64 md:h-64">
          <div className="absolute inset-0 bg-neon/20 rounded-full blur-3xl animate-pulse-glow" />
          <Image 
            src="/profile-meida.png" 
            alt="Meida - Halaman Tidak Ditemukan" 
            fill 
            className="object-contain drop-shadow-[0_0_30px_rgba(168,230,0,0.3)]"
            priority
          />
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 animate-fade-in-up tracking-tighter" style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
          404
        </h1>
        
        {/* Decorative divider */}
        <div className="w-24 h-1 bg-neon mb-6 rounded-full animate-fade-in-up" style={{ animationDelay: '100ms' }} />

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          File Tidak Ditemukan!
        </h2>
        <p className="text-gray-400 max-w-md mb-8 animate-fade-in-up leading-relaxed" style={{ animationDelay: '300ms' }}>
          Ups! Sepertinya halaman atau file yang Anda cari belum di-upload, sedang bersembunyi, atau sudah tidak tersedia.
        </p>

        {/* Back button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-surface bg-neon rounded-full hover:bg-neon-alt transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,230,0,0.4)]"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
