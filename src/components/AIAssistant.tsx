import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Search, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  Fingerprint,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, NeonButton } from './UI';
import { getGemini, cn } from '../lib/utils';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; content: string }[]>([
    { role: 'ai', content: "Identity verified. I am FortiBot. How can I optimize your financial kernel today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const ai = getGemini();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: "You are FortiBot, the advanced AI financial advisor for the FortiFin system. You are technical, futuristic, and highly secure. Your goal is to provide concise, data-driven financial advice for wealthy or tech-savvy users. Use terms like 'kernel', 'optimization', 'engine', 'vault'. Always ensure the user feels their assets are ultra-secure. Keep responses short and impactful."
        }
      });
      
      const aiResponse = response.text || "Neural connection interrupted. Please re-verify.";
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Encryption error. Check your API layer." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-white/20 group"
        >
          <Bot className="w-8 h-8 text-white group-hover:animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100, x: 50 }}
            className="fixed bottom-28 right-8 w-[400px] h-[550px] z-[100] flex flex-col glass rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border-white/20"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Fingerprint className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">FortiBot Neural Unit</h4>
                  <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> High Trust Active
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex flex-col max-w-[85%]",
                   msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                )}>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/20' 
                      : 'bg-white/10 text-white/90 rounded-tl-none border border-white/10'
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 p-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>

            {/* Input & Quick Actions */}
            <div className="p-6 bg-white/5 border-t border-white/10 space-y-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Check Budget', icon: Zap, prompt: "What's my remaining budget for the month?" },
                  { label: 'Recent Events', icon: History, prompt: "Show me recent security anomalies." },
                  { label: 'Risk Score', icon: ShieldCheck, prompt: "Analyze my current financial risk score." }
                ].map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setInput(action.prompt);
                      // Auto-send if desired, or just set input
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-mono text-white/60 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                  >
                    <action.icon className="w-3 h-3" />
                    {action.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask neural advisor..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
