import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 pt-12 pb-24">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 md:top-1/4 -left-10 md:-left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px]"></div>
          <div className="absolute bottom-0 md:bottom-1/4 -right-10 md:-right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-tertiary/10 rounded-full blur-[80px] md:blur-[120px]"></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <img className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" alt="Civic Background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZSNe_i0vkF71TgG38psQlkrZjQp-EeeDXMgg7bs9AnD_bV9leUSc747k67QJGXfpNMVbq4AR_g-pZ0GaQ5JUNEOgvkeVkZjG873z4_XdIF1fZYdT5HDNFScqTZSqwgzb2syeI6krmkcAYS9K_ICoa2Ao2YjWL69kES6_gGdHLOXA4qkc4YwvNNrHesxYWsCv1XwvpMAtnsgxyER5e8VE3e5JTD2iXna8p2WaXsTlKSFtK9ecbH6Hjn3DvKpKQJhjSL0l8nwOF7u0" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,122,255,0.8)]"></span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Next-Gen Election Intelligence</span>
            </div>
            <h1 className="font-display-lg text-[3.5rem] md:text-[4.5rem] text-white mb-6 leading-[1.1] tracking-tight">
              Understand Elections, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">Your Way.</span>
            </h1>
            <p className="font-body-lg text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
              Your personalized AI assistant for clear, unbiased, and accessible election information. Navigate democracy with military-grade clarity and real-time data.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link to="/assistant" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-slate-900 border border-primary/40 text-primary font-black text-lg hover:bg-primary hover:text-white hover:shadow-[0_0_40px_rgba(0,122,255,0.4)] transition-all flex items-center justify-center gap-3 group">
                Launch AI Assistant
                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">smart_toy</span>
              </Link>
              <button className="w-full sm:w-auto px-10 py-5 rounded-2xl glass border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all">
                Explore Dashboard
              </button>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Grid (Replacing the photo) */}
          <div className="hidden lg:grid grid-cols-2 gap-6 relative">
            <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            {/* Feature 1: AI Analysis */}
            <div className="glass-panel p-6 rounded-[2rem] border border-white/10 hover:border-primary/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3 className="text-white font-bold mb-2">AI Analysis</h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">Deep-dive comparisons of policy impacts and candidate records.</p>
            </div>

            {/* Feature 2: Smart Timeline */}
            <div className="glass-panel p-6 rounded-[2rem] border border-white/10 hover:border-secondary/40 transition-all group mt-8">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">event_note</span>
              </div>
              <h3 className="text-white font-bold mb-2">Live Timeline</h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">Never miss a registration or voting deadline in your precinct.</p>
            </div>

            {/* Feature 3: Secure Portal */}
            <div className="glass-panel p-6 rounded-[2rem] border border-white/10 hover:border-tertiary/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">encrypted</span>
              </div>
              <h3 className="text-white font-bold mb-2">Secure Portal</h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">Verify your voter status via our fully encrypted, private gateway.</p>
            </div>

            {/* Feature 4: Booth Finder */}
            <div className="glass-panel p-6 rounded-[2rem] border border-white/10 hover:border-primary-container/40 transition-all group mt-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">distance</span>
              </div>
              <h3 className="text-white font-bold mb-2">Booth Finder</h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">Locate your nearest station with real-time wait time updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-xl max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-xl text-center">
          <h2 className="font-headline-lg text-headline-lg text-white mb-4">Intelligent Civic Tools</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Feature 1: Smart Assistant */}
          <div className="glass-card ai-glow p-lg rounded-xl flex flex-col gap-sm group transition-all">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <span className="material-symbols-outlined text-3xl">smart_toy</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-white">Smart Assistant</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Get instant, cited answers to your complex voting questions. Our AI analyzes official legislative data to provide unbiased clarity on policies and candidates.
            </p>
            <Link to="/assistant" className="mt-auto pt-md flex items-center text-primary font-label-md group-hover:gap-2 transition-all cursor-pointer">
              Ask a question <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </Link>
          </div>
          {/* Feature 2: Timeline */}
          <div className="glass-card p-lg rounded-xl flex flex-col gap-sm group transition-all">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary/10 text-secondary mb-2">
              <span className="material-symbols-outlined text-3xl">calendar_month</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-white">Timeline</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Never miss a deadline. Track voter registration dates, mail-in ballot requests, and early voting windows tailored specifically to your precinct.
            </p>
            <Link to="/timeline" className="mt-auto pt-md flex items-center text-secondary font-label-md group-hover:gap-2 transition-all cursor-pointer">
              View calendar <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </Link>
          </div>
          {/* Feature 3: Eligibility */}
          <div className="glass-card p-lg rounded-xl flex flex-col gap-sm group transition-all">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-tertiary/10 text-tertiary mb-2">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-white">Eligibility</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Check your voter status in seconds. Our encrypted portal connects with state databases to verify your registration and provides steps to update it if needed.
            </p>
            <Link to="/eligibility" className="mt-auto pt-md flex items-center text-tertiary font-label-md group-hover:gap-2 transition-all cursor-pointer">
              Check status <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </Link>
          </div>
          {/* Feature 4: Polling Booths */}
          <div className="glass-card p-lg rounded-xl flex flex-col gap-sm group transition-all">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-container/10 text-primary-container mb-2">
              <span className="material-symbols-outlined text-3xl">map</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-white">Polling Booths</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Find your nearest polling station with ease. Get real-time updates on wait times, accessibility features, and required identification documents.
            </p>
            <div className="mt-auto pt-md flex items-center text-primary-container font-label-md group-hover:gap-2 transition-all cursor-pointer">
              Open maps <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mb-xl">
        <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col lg:flex-row items-center border-primary/20">
          <div className="p-lg lg:p-xl lg:w-1/2">
            <span className="font-label-sm text-label-sm text-primary mb-sm block tracking-widest uppercase">Empowering Democracy</span>
            <h2 className="font-display-lg text-headline-lg text-white mb-md">Ready to cast your most informed vote yet?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
              Join over 500,000 citizens using ElectraGuide to cut through the noise and focus on what matters most to their communities.
            </p>
            <div className="flex flex-wrap gap-md">
              <button className="px-8 py-3 bg-white text-surface font-label-md text-label-md rounded-xl hover:bg-on-surface transition-colors">Create Free Profile</button>
              <button className="px-8 py-3 border border-outline/30 text-white font-label-md text-label-md rounded-xl hover:bg-white/5 transition-colors">Learn More</button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-80 lg:h-auto min-h-[400px] relative">
            <img className="absolute inset-0 w-full h-full object-cover" alt="A modern data visualization dashboard shown on a sleek tablet screen. The interface displays vibrant blue and purple bar charts, circular progress indicators, and clean typography against a dark glass background. Soft ambient light from the screen illuminates the surrounding minimalist workspace. The visual style is premium and analytical, echoing the intelligence and clarity of the ElectraGuide platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC08ZVnRQZFQPzDLe680BHoORJWHaZp98fY8thxe3XyO97303bEuJSdgitpejn8H773SolvTrQOPn-QanyXseodNggX71c3ucwNu7w92S930LhURBJNciPbLsLByPG-aQexKadMUt-KsM9zn_UuygKAOHx-p7LoqCWqBO7-qqHn0MYJk9-ULXJz_Ztvrrje_b1U9wyxdwOfwpaDGbrfYxmWL_VAYKIo2AYvjgXZJMThy82XbT75cbsM54vJxa92zW2mRqv3ACmXuXM" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent hidden lg:block"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
