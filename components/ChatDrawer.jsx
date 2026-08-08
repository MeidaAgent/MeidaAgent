'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, Loader2, TerminalSquare, RotateCcw, Zap } from 'lucide-react';

export default function ChatDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thoughts, setThoughts] = useState([]);
  const [tokensSaved, setTokensSaved] = useState(1402300);
  const [glitchTick, setGlitchTick] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [autoSubmitTrigger, setAutoSubmitTrigger] = useState(0);
  
  // Boot Sequence State
  const [isBooting, setIsBooting] = useState(false);
  const [bootLogs, setBootLogs] = useState([]);
  const hasBooted = useRef(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    const saved = localStorage.getItem('meida_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasUserInteraction = parsed.some(m => m.role === 'user');
        if (hasUserInteraction) {
          // Remove any old system memory messages
          const cleanParsed = parsed.filter(m => !m.isSystemMemory);
          
          cleanParsed.push({
            role: 'system',
            content: 'Welcome back. I have retained the context of our previous session.',
            isSystemMemory: true
          });
          
          setMessages(cleanParsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }
    
    // Default greeting if no history
    setMessages([
      { role: 'assistant', content: 'Initiating secure channel... done. I am Meida. What do you want to optimize today?' }
    ]);
  }, []);

  // Save chat history on change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('meida_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  const clearMemory = () => {
    localStorage.removeItem('meida_chat_history');
    setMessages([
      { role: 'assistant', content: 'Memory wiped. Secure channel re-initiated. How can I help you?' }
    ]);
  };

  useEffect(() => {
    if (autoSubmitTrigger > 0 && input.trim() !== '') {
      handleSubmit();
    }
  }, [autoSubmitTrigger]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setAutoSubmitTrigger(prev => prev + 1);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }
  }, []);

  const savingsPercentage = 48.2;
  useEffect(() => {
    setTokensSaved(1402300);
  }, []);

  // Glitch animation loop
  useEffect(() => {
    let interval;
    if (isLoading || isThinking) {
      interval = setInterval(() => setGlitchTick(t => t + 1), 40); // 40ms flicker
    }
    return () => clearInterval(interval);
  }, [isLoading, isThinking]);


  useEffect(() => {
    if (isOpen && !hasBooted.current) {
      hasBooted.current = true;
      setIsBooting(false);
    }
  }, [isOpen]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput(''); // Clear input when starting fresh
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessage = (text) => {
    if (!text) return text;
    
    let processedText = text;

    const boldParts = processedText.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((bPart, bIndex) => {
      if (bPart.startsWith('**') && bPart.endsWith('**')) {
        return (
          <strong key={bIndex} className="text-white font-bold">
            {bPart.slice(2, -2)}
          </strong>
        );
      }
      
      const italicParts = bPart.split(/(\*.*?\*)/g);
      return italicParts.map((iPart, iIndex) => {
        if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length > 2) {
          return (
            <em key={`${bIndex}-${iIndex}`} className="italic text-white/90">
              {iPart.slice(1, -1)}
            </em>
          );
        }
        return <span key={`${bIndex}-${iIndex}`}>{iPart}</span>;
      });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isLoading]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setIsThinking(true);
    setThoughts([]);


    setThoughts(["Agent is thinking..."]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      if (!res.ok) {
        const errorData = await res.text();
        console.error("Groq API Error:", errorData);
        throw new Error(errorData);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      setIsThinking(false);
      
      // Determine simulated routing metadata based on user input
      let routedModel = "Llama-3.1-8B";
      let baseTime = 0.1;
      let routedSaved = "$0.0001";
      
      const lowerInput = input.toLowerCase();
      const wordCount = input.split(' ').length;
      
      if (wordCount < 4 && !lowerInput.match(/(buatkan|bikin|trading|bot|system|error|debug|analisa|data|router|web3|agent|api|smart contract|defi)/)) {
        routedModel = "Llama-3.1-8B";
        baseTime = 0.1;
        routedSaved = "$0.008";
      } else if (lowerInput.match(/(buatkan|bikin|trading|bot|sistem|error|debug|kode|code|python|react|html|analisa|data|router|web3|agent|api|smart contract|defi)/) || wordCount > 20) {
        const models = ["Claude 3.5 Sonnet", "GPT-4o"];
        routedModel = models[Math.floor(Math.random() * models.length)];
        baseTime = routedModel === "GPT-4o" ? 0.9 : 1.1;
        routedSaved = "$0.045"; 
      } else {
        routedModel = "GPT-4o-mini";
        baseTime = 0.3;
        routedSaved = "$0.012";
      }

      const jitter = (Math.random() * 0.25).toFixed(2);
      const routedTime = (baseTime + parseFloat(jitter)).toFixed(2) + "s";

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '',
        routingMetadata: { model: routedModel, time: routedTime, saved: routedSaved }
      }]);

      let done = false;
      let buffer = '';
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop(); // keep the last incomplete line in the buffer

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
              try {
                const data = JSON.parse(trimmed.slice(6));
                const text = data.choices[0]?.delta?.content || '';
                setMessages(prev => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  updated[lastIdx] = {
                    ...updated[lastIdx],
                    content: updated[lastIdx].content + text
                  };
                  return updated;
                });
              } catch (e) {
                console.error("Error parsing stream chunk", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: `API Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[99] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Frosted Side-Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] z-[100] transform transition-transform duration-500 ease-out flex flex-col bg-white/5 backdrop-blur-md border-l border-white/10 shadow-2xl shadow-black/50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {isBooting ? (
          <div className="flex-1 bg-black p-8 font-mono text-[11px] text-neon flex flex-col justify-end shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
            <div className="flex flex-col gap-3">
              <div className="mb-4">
                <div className="w-12 h-12 border-2 border-neon/50 rounded-full flex items-center justify-center animate-[spin_3s_linear_infinite] mx-auto mb-6">
                  <div className="w-6 h-6 border-t-2 border-neon rounded-full" />
                </div>
                <div className="text-center text-neon/50 tracking-[0.3em] font-bold text-xs uppercase mb-8">
                  XYPHERAR PROTOCOL
                </div>
              </div>
              {bootLogs.map((log, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <span className="text-neon/50 mr-2">{'>'}</span>{log}
                </div>
              ))}
              <div className="animate-pulse w-2 h-3 bg-neon mt-2 shadow-[0_0_8px_#ccff00]" />
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neon/50 flex items-center justify-center bg-neon/10">
              <TerminalSquare className="w-5 h-5 text-neon" />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wide">MEIDA</h3>
              <p className="text-neon text-[10px] tracking-widest uppercase">Agent // Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Tokens Saved</span>
              <span className="text-xs text-neon font-mono font-bold animate-pulse">{tokensSaved.toLocaleString()}</span>
            </div>
            <button 
              onClick={clearMemory}
              title="Clear Memory"
              className="text-neutral-400 hover:text-neon transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Server Health Panel */}
        <div className="bg-black/40 border-b border-neon/10 px-6 py-2.5 flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-500 uppercase select-none shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)]">
          <div className="flex gap-4">
             <span className="flex items-center gap-1.5" title="Core NLP & Logic Processor">
               <div className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_5px_#ccff00] animate-pulse" /> 
               [Synapse-Core]
             </span>
             <span className="flex items-center gap-1.5" title="Real-time Crypto & Market Data Node">
               <div className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_5px_#ccff00] animate-pulse" style={{ animationDelay: '500ms' }} /> 
               [xypher-IquR2]
             </span>
          </div>
          <span className="text-neon/70 flex items-center gap-1.5">
            <span className="animate-[ping_3s_infinite] w-1 h-1 bg-neon rounded-full"></span> 
            SYS: 100%
          </span>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {messages.map((m, idx) => {
            if (m.role === 'system') {
              return (
                <div key={idx} className="flex justify-center my-2">
                  <div className="bg-neon/10 border border-neon/30 text-neon font-mono text-[9px] px-3 py-1.5 rounded-full tracking-widest uppercase shadow-[0_0_10px_rgba(204,255,0,0.1)]">
                    {m.content}
                  </div>
                </div>
              );
            }
            
            return (
              <div key={idx} className={`flex flex-col gap-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className={`text-[10px] text-neutral-500 font-mono ${m.role === 'user' ? 'mr-2' : 'ml-2'}`}>
                  {m.role === 'user' ? 'USER' : 'MEIDA'}
                </span>
                <div 
                  className={`text-white p-4 max-w-[85%] whitespace-pre-wrap ${
                    m.role === 'user' 
                      ? 'bg-white/10 border border-white/5 rounded-2xl rounded-tr-sm' 
                      : 'bg-neon/10 border border-neon/20 rounded-2xl rounded-tl-sm shadow-[0_0_15px_rgba(204,255,0,0.05)]'
                  }`}
                >
                  <p className="text-sm leading-relaxed">
                    {formatMessage(m.content)}
                  </p>
                </div>
                {m.role === 'assistant' && m.routingMetadata && (!isLoading || idx !== messages.length - 1) && (
                  <div className="text-[10px] text-neutral-500 font-mono mt-1 ml-2 animate-in fade-in duration-1000 flex items-center gap-1">
                    ↳ <Zap className="w-3 h-3 text-neon" /> Routed to {m.routingMetadata.model} • Latency: {m.routingMetadata.time} • Saved {m.routingMetadata.saved}
                  </div>
                )}
              </div>
            );
          })}
          {isThinking && (
            <div className="ml-2 p-3 bg-white/5 border border-white/10 rounded-lg max-w-[85%] shadow-sm">
              <div className="flex items-center gap-2 text-neutral-400 text-xs animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          {isLoading && !isThinking && (
            <div className="flex items-center gap-2 text-neon text-xs font-mono ml-2 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              Receiving transmission...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 bg-black/20 shrink-0">
          <div className="relative flex items-center">
            <button 
              onClick={toggleListening}
              className={`absolute left-4 transition-colors ${isListening ? 'text-neon animate-pulse' : 'text-neutral-400 hover:text-neon'}`} 
              title={isListening ? "Listening..." : "Click to speak"}
            >
              <Mic className="w-5 h-5" />
            </button>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Send a secure message..."
              className="w-full bg-black/50 border border-white/10 rounded-full py-4 pl-12 pr-12 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neon/50 transition-colors disabled:opacity-50"
            />
            <button 
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className={`absolute right-4 transition-colors ${!input.trim() || isLoading ? 'text-neutral-500' : 'text-neon hover:text-white'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-[10px] text-neutral-600 mt-4 font-mono">ENCRYPTED P2P CONNECTION WITH AEGISTECH SECURE RELAY</p>
        </div>
        </>
        )}
      </div>
    </>
  );
}
