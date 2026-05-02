import { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';

const SentimentDashboard = () => {
  const [polls, setPolls] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/dashboard`);
        if (response.ok) {
          const data = await response.json();
          setPolls(data.polls || []);
          setInsights(data.insights || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="pt-8 pb-20 px-6 max-w-screen-2xl mx-auto space-y-md min-h-screen">
        {/* Dashboard Header */}
        <header className="mb-12">
          <h1 className="font-display-lg text-[2rem] md:text-[2.5rem] text-white mb-2 leading-none">Community Pulse Dashboard</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Shape the future through collective insight. Participate in real-time democratic inquiry.</p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          {/* Trending Topics (Left Column) */}
          <aside className="md:col-span-3 space-y-gutter sticky top-24">
            <div className="glass-panel p-md rounded-xl h-full">
              <div className="flex items-center gap-2 mb-md text-primary">
                <span className="material-symbols-outlined">trending_up</span>
                <h2 className="font-label-md text-label-md uppercase tracking-widest">Trending Topics</h2>
              </div>
              <ul className="space-y-4">
                {isLoading ? (
                  <p className="text-on-surface-variant text-sm">Loading insights...</p>
                ) : insights.length > 0 ? (
                  insights.map((insight) => (
                    <li key={insight._id} className="p-sm bg-white/5 rounded-lg border border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-start">
                        <span className="text-secondary font-label-sm block mb-xs">#{insight.topic.replace(/\s+/g, '')}</span>
                        {insight.trend === 'up' && <span className="material-symbols-outlined text-[14px] text-green-400">trending_up</span>}
                        {insight.trend === 'down' && <span className="material-symbols-outlined text-[14px] text-red-400">trending_down</span>}
                        {insight.trend === 'stable' && <span className="material-symbols-outlined text-[14px] text-gray-400">trending_flat</span>}
                      </div>
                      <p className="text-white font-label-md">{insight.topic}</p>
                      <span className="text-on-surface-variant text-[12px] mt-1 block">{insight.mentions} participants today</span>
                    </li>
                  ))
                ) : (
                  <p className="text-on-surface-variant text-sm">No trending topics available. Ensure MongoDB is running and seeded.</p>
                )}
              </ul>
              <div className="mt-lg pt-md border-t border-white/10">
                <div className="ai-border p-md rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-tertiary">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    <h3 className="font-label-sm uppercase">AI Insight</h3>
                  </div>
                  <p className="text-label-md leading-relaxed text-on-surface-variant italic">"Current sentiment suggests an 84% increase in concern regarding urban infrastructure compared to last quarter."</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Active Polls (Center Column) */}
          <section className="md:col-span-6 space-y-gutter">
            {isLoading ? (
              <div className="glass-panel p-lg rounded-xl flex justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
              </div>
            ) : polls.length > 0 ? (
              polls.map((poll) => (
                <div key={poll._id} className="glass-panel p-lg rounded-xl mb-6">
                  <div className="flex justify-between items-start mb-md">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest mb-base block w-fit">Active National Poll</span>
                      <h3 className="font-headline-md text-headline-md text-white">{poll.title}</h3>
                      <p className="text-on-surface-variant text-sm mt-2">{poll.description}</p>
                    </div>
                    <span className="text-on-surface-variant font-label-sm">{poll.timeLeft} left</span>
                  </div>
                  <div className="space-y-md mb-lg mt-4">
                    {poll.options.map((opt, idx) => (
                      <div key={idx} className="space-y-xs">
                        <div className="flex justify-between text-label-md text-on-surface">
                          <span>{opt.label}</span>
                          <span>{opt.percentage}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full shadow-[0_0_10px_rgba(173,198,255,0.4)] ${idx === 0 ? 'bg-gradient-to-r from-transparent to-primary bg-primary' : 'bg-secondary'}`}
                            style={{ width: `${opt.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-sm">
                    <button className="bg-primary text-on-primary font-label-md py-3 px-6 rounded-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">how_to_vote</span>
                      Cast Your Vote
                    </button>
                    <button className="glass-panel text-white font-label-md py-3 px-6 rounded-lg hover:bg-white/10 transition-colors border-white/20">
                      View Methodology
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel p-lg rounded-xl text-center py-20">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">cloud_off</span>
                <h3 className="text-white font-headline-md mb-2">No Active Polls</h3>
                <p className="text-on-surface-variant">Please ensure the backend is running and the database is seeded.</p>
              </div>
            )}
          </section>

          {/* Community Insights (Right Column) */}
          <section className="md:col-span-3 space-y-gutter sticky top-24">
            <div className="glass-panel p-md rounded-xl">
              <h2 className="font-label-md text-label-md text-white mb-md uppercase tracking-widest">Sentiment Analysis</h2>
              <div className="relative w-full aspect-square mb-md flex items-center justify-center">
                {/* Simulated Radar Chart with CSS/HTML */}
                <div className="absolute inset-0 border border-white/5 rounded-full scale-100"></div>
                <div className="absolute inset-0 border border-white/5 rounded-full scale-75"></div>
                <div className="absolute inset-0 border border-white/5 rounded-full scale-50"></div>
                <div className="absolute w-full h-[1px] bg-white/5 rotate-0"></div>
                <div className="absolute w-full h-[1px] bg-white/5 rotate-45"></div>
                <div className="absolute w-full h-[1px] bg-white/5 rotate-90"></div>
                <div className="absolute w-full h-[1px] bg-white/5 rotate-135"></div>
                {/* Radar Shape */}
                <div className="w-[80%] h-[80%] bg-secondary/20 border border-secondary shadow-[0_0_15px_rgba(104,211,255,0.3)]" style={{ clipPath: "polygon(50% 0%, 90% 40%, 70% 90%, 30% 80%, 10% 30%)" }}></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="text-[12px] text-on-surface-variant">Economic Optimism</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-[12px] text-on-surface-variant">Social Cohesion</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="text-[12px] text-on-surface-variant">Policy Confidence</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden group">
              <div className="relative h-40">
                <img alt="Modern Architecture" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg7BrdfRwTTDj2rD0ZkV5R36uZlQBSnBb2FgVPMRvBIcJK1IkuW518bQypIBmk4xgIkH7hHCSxaK9qr-EUWaGbpQhaGDJHUTlj2dSuxp17du2dIKcUTjsWoX7dLKYwjkXkQOOz1_ooK23M0r_t8hrmGemW6GKGEe7wL-V_Sg7lcPRLyLf8g3uB_0lBUkVrCQD_rhP7sZuH9wIq_g3qkYykm20Euud2JNtBHE8Tx6BWYnLBcFgHZT2vViXk3LDpoaHZfAWfLq5ckGA" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-label-md">Poll Archives</h4>
                  <p className="text-[12px] text-on-surface-variant">248 historic issues resolved</p>
                </div>
              </div>
              <div className="p-md">
                <button className="w-full py-2 text-[12px] text-secondary font-bold uppercase tracking-widest border border-secondary/20 rounded-lg hover:bg-secondary/10 transition-all">Explore Data Lake</button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Action Button for Dashboard */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-[0_0_20px_rgba(0,122,255,0.4)] flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        </button>
      </div>
    </>
  );
};

export default SentimentDashboard;
