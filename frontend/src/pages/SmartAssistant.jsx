import { useState, useRef, useEffect } from 'react';

const SmartAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content, context: {} })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, data]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my servers right now. Please try again later." }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error. Please check your connection to the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handlePromptClick = (prompt) => {
    setInputValue(prompt);
  };

  return (
    <>
      <div className="py-6 flex flex-col items-center h-[calc(100vh-76px)] w-full overflow-hidden">
        <div className="w-full max-w-5xl mx-auto px-6 flex flex-col flex-1 h-full">
          {/* Welcome Section (Visible when no chat) */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center space-y-md mb-6 shrink-0 animate-fade-in">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-tertiary-container flex items-center justify-center shadow-[0_0_30px_rgba(173,198,255,0.4)]">
                <span className="material-symbols-outlined text-[32px] md:text-[40px] text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <h1 className="font-display-lg text-[2rem] md:text-display-lg text-white">How can I guide your vote today?</h1>
              <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-xl mx-auto">
                Access deep legislative data, unbiased candidate comparisons, and real-time policy analysis.
              </p>
            </div>
          )}

          <div className="glass rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] flex flex-col flex-1 min-h-0">

            {/* Suggested Prompts Grid */}
            {messages.length === 0 && (
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 shrink-0">
                <button onClick={() => handlePromptClick("Compare Candidate A and B on renewable energy policies.")} className="glass-panel p-4 rounded-xl text-left hover:bg-white/10 transition-all group border-white/5">
                  <span className="material-symbols-outlined text-primary mb-2 block group-hover:scale-110 transition-transform">compare_arrows</span>
                  <span className="font-label-md text-on-surface block mb-1">Candidate Comparison</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">"Compare Candidate A and B on renewable energy policies."</p>
                </button>
                <button onClick={() => handlePromptClick("Summarize the main goals of the 2024 Digital Privacy Bill.")} className="glass-panel p-4 rounded-xl text-left hover:bg-white/10 transition-all group border-white/5 hidden md:block">
                  <span className="material-symbols-outlined text-secondary mb-2 block group-hover:scale-110 transition-transform">gavel</span>
                  <span className="font-label-md text-on-surface block mb-1">Policy Research</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">"Summarize the main goals of the 2024 Digital Privacy Bill."</p>
                </button>
                <button onClick={() => handlePromptClick("Show me the voting history for the recent housing initiative.")} className="glass-panel p-4 rounded-xl text-left hover:bg-white/10 transition-all group border-white/5 hidden md:block">
                  <span className="material-symbols-outlined text-tertiary mb-2 block group-hover:scale-110 transition-transform">database</span>
                  <span className="font-label-md text-on-surface block mb-1">Legislative Data</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">"Show me the voting history for the recent housing initiative."</p>
                </button>
              </section>
            )}

            {/* Chat History Area */}
            <div className="space-y-6 mb-4 px-2 flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-4'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                      <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] px-6 py-5 rounded-3xl shadow-xl ${
                    msg.role === 'user' 
                      ? 'glass-panel bg-primary-container/20 rounded-tr-none' 
                      : 'ai-border rounded-tl-none bg-slate-900/40'
                  }`}>
                    {msg.role === 'assistant' && msg.type === 'comparison' ? (
                      <>
                        <p className="text-on-surface font-body-md text-[15px] leading-relaxed mb-4">{msg.content}</p>
                        <div className="mt-6 pt-4 border-t border-white/5 flex gap-6">
                          <button className="text-label-sm text-slate-400 hover:text-primary flex items-center gap-2 transition-colors">
                            <span className="material-symbols-outlined text-[16px]">content_copy</span> Copy
                          </button>
                          <button className="text-label-sm text-slate-400 hover:text-primary flex items-center gap-2 transition-colors">
                            <span className="material-symbols-outlined text-[16px]">share</span> Share Analysis
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="text-on-surface font-body-md text-[15px] leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                    <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  </div>
                  <div className="px-6 py-5 rounded-3xl rounded-tl-none shadow-xl ai-border bg-slate-900/40 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area (Sticky Bottom within the panel) */}
            <div className="mt-8 border-t border-white/10 pt-6 shrink-0">
              <div className="glass-panel p-2 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(0,0,0,0.3)] border-white/20 bg-slate-900/60">
                <button className="p-3 hover:bg-white/10 rounded-xl text-slate-400 transition-colors">
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
                <input 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 font-body-md text-[16px] outline-none px-2" 
                  placeholder="Ask about policy, history, or candidates..." 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary-container text-on-primary-fixed font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(173,198,255,0.4)] hover:shadow-[0_0_30px_rgba(173,198,255,0.6)] disabled:opacity-50">
                  Send
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
              <div className="text-center mt-6">
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-inter font-semibold">ElectraGuide AI provides neutral, data-driven insights. Verify critical info.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements (Glass Background Blurs) */}
      <div className="fixed top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-tertiary-container/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
    </>
  );
};

export default SmartAssistant;
