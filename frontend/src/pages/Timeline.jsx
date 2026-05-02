import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/timeline`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error("Failed to fetch timeline:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  return (
    <div className="pt-8 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Hero Section */}
      <header className="mb-16 text-center">
        <h1 className="font-display-lg text-display-lg mb-4 text-white">Democratic <span className="text-secondary">Milestones</span></h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Your high-fidelity roadmap to the upcoming election cycle. Stay informed with verified dates for registration, mail-in ballots, and voting events.
        </p>
      </header>
      
      {/* Bento Timeline Grid */}
      <div className="relative">
        {/* Vertical Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full timeline-line hidden lg:block opacity-30"></div>
        <div className="space-y-12 relative">
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
            </div>
          ) : events.length > 0 ? (
            events.map((event, index) => (
              <div key={event._id} className={`flex flex-col lg:flex-row items-center justify-between w-full ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-[45%]">
                  <div className={`glass-panel p-6 rounded-xl ${event.type === 'current' ? 'indigo-glow-border border-primary' : 'border-white/10'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-label-sm uppercase tracking-widest border ${
                        event.type === 'past' ? 'bg-outline-variant/20 text-on-surface-variant border-outline-variant/30' :
                        event.type === 'current' ? 'bg-primary-container/20 text-primary border-primary/30' :
                        'bg-tertiary-container/20 text-tertiary border-tertiary/30'
                      }`}>
                        {event.type.toUpperCase()}
                      </span>
                      <span className="text-on-surface-variant font-label-md">{event.date}, 2024</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-secondary">{event.icon}</span>
                      <h3 className="font-headline-md text-headline-md text-white">{event.title}</h3>
                    </div>
                    <p className="text-on-surface-variant mb-6 font-body-md leading-relaxed">{event.description}</p>
                    <button className="flex items-center gap-2 text-primary font-label-md hover:underline transition-all">
                      Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className={`hidden lg:flex w-10 h-10 rounded-full bg-slate-950 z-10 items-center justify-center border-2 ${
                  event.type === 'past' ? 'border-outline-variant' :
                  event.type === 'current' ? 'border-primary shadow-[0_0_15px_rgba(0,122,255,0.5)]' :
                  'border-tertiary'
                }`}>
                  <span className={`w-3 h-3 rounded-full ${
                    event.type === 'past' ? 'bg-outline-variant' :
                    event.type === 'current' ? 'bg-primary' :
                    'bg-tertiary'
                  }`}></span>
                </div>
                
                <div className="w-full lg:w-[45%] mt-6 lg:mt-0">
                  <div className="h-48 rounded-xl overflow-hidden glass border border-white/5 relative group">
                    {event.imageUrl ? (
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500" 
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-6xl text-white/5 group-hover:scale-110 transition-transform">{event.icon}</span>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                      <span className="font-label-md text-white/80 group-hover:text-white transition-colors">Digital Verification Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 glass-panel rounded-xl">
               <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">event_busy</span>
               <p className="text-on-surface-variant">No election milestones found. Please ensure the backend is running and the database is seeded.</p>
            </div>
          )}

        </div>
      </div>

      {/* AI Assistant Prompt Section */}
      <section className="mt-24">
        <div className="indigo-glow-border rounded-2xl p-8 bg-slate-900/40 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-primary/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-4xl">smart_toy</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="font-headline-lg text-headline-lg text-white mb-4">Confused about deadlines?</h3>
              <p className="text-on-surface-variant font-body-lg mb-6">Our Intelligent Assistant can parse complex state regulations to give you a personalized timeline based on your specific location and voter status.</p>
              <Link to="/assistant" className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all">
                Talk to AI Assistant
                <span className="material-symbols-outlined">smart_toy</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;
