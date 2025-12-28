
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Cpu, CreditCard } from 'lucide-react';
import { getBuildRecommendation } from '../services/geminiService';
import { BuildAssistantMessage } from '../types';

export const BuildAssistant: React.FC = () => {
  const [messages, setMessages] = useState<BuildAssistantMessage[]>([
    { role: 'assistant', content: "Hello! I'm your WynderPC Building Expert. What's your budget and what kind of gaming performance are you looking for?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input } as BuildAssistantMessage;
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await getBuildRecommendation(newMessages);
    setMessages([...newMessages, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tighter uppercase mb-4 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-cyan-400 mr-4" />
          Build Assistant
        </h2>
        <p className="text-zinc-500">Let Gemini AI design your ultimate gaming rig based on your specific needs.</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
        {/* Chat window */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-black/20">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'ml-3 bg-zinc-700' : 'mr-3 bg-cyan-900/50 border border-cyan-500/50'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-zinc-300" /> : <Bot className="w-5 h-5 text-cyan-400" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-zinc-800/80 text-zinc-200 rounded-tl-none border border-zinc-700'}`}>
                  {msg.content.split('\n').map((line, i) => <p key={i} className="mb-2 last:mb-0">{line}</p>)}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex mr-3">
                <div className="w-10 h-10 rounded-full bg-cyan-900/50 border border-cyan-500/50 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                </div>
              </div>
              <div className="bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none border border-zinc-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell me what you want to play and your budget..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 p-1.5 bg-cyan-500 text-black rounded hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 flex justify-center space-x-4">
             <span className="text-[10px] text-zinc-600 uppercase tracking-widest flex items-center"><Cpu className="w-3 h-3 mr-1" /> Powered by Gemini 3.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
