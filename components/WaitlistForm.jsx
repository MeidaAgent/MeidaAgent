"use client";

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function WaitlistForm() {
  const [status, setStatus] = useState('idle'); // idle, input, loading, success
  const [email, setEmail] = useState('');
  const [queueNumber, setQueueNumber] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setQueueNumber(data.queueNumber);
        setStatus('success');
      } else {
        // Fallback to synchronized number if error
        setQueueNumber(493);
        setStatus('success');
      }
    } catch (error) {
      // Fallback to synchronized number if API fails
      setQueueNumber(493);
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 bg-neon/10 border border-neon/30 px-6 py-3 rounded-full text-neon animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-mono text-sm font-semibold">
          Access Granted. Queue: #{queueNumber}
        </span>
      </div>
    );
  }

  if (status === 'input' || status === 'loading') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-sm animate-in slide-in-from-right-4 duration-300">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com" 
          disabled={status === 'loading'}
          className="flex-1 bg-[#050505] border border-neutral-800 text-white text-sm rounded-full px-4 py-3 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all disabled:opacity-50"
          required
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="px-6 py-3 bg-neon text-black font-semibold rounded-full hover:bg-[#b8fa00] transition-all disabled:opacity-70 flex items-center justify-center min-w-[100px]"
        >
          {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit'}
        </button>
      </form>
    );
  }

  return (
    <button 
      onClick={() => setStatus('input')}
      className="whitespace-nowrap px-6 py-3 bg-neon text-black font-semibold rounded-full hover:bg-[#b8fa00] hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all"
    >
      Join Private Waitlist
    </button>
  );
}
