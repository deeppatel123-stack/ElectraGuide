import { useState } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({ state: '', county: '', zip: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!formData.state || !formData.zip) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: formData.state, details: formData })
      });
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      }
    } catch (error) {
      console.error("Failed to check eligibility:", error);
      setResult({ status: 'error', message: 'Network error. Could not connect to backend.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-8 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Hero & Intro */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="font-display-lg text-[2rem] md:text-[2.5rem] text-white mb-4 leading-none">Check Your Voter Eligibility</h1>
        <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant">Verify your status and understand registration requirements for your jurisdiction with our secure, AI-powered portal.</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center mb-12 gap-base">
        <div className="flex items-center gap-xs">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">1</div>
          <span className="hidden sm:block font-label-md text-primary">Location</span>
        </div>
        <div className="w-12 h-[2px] bg-outline-variant"></div>
        <div className={`flex items-center gap-xs ${result ? '' : 'opacity-50'}`}>
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold ${result ? 'bg-primary border-primary' : 'border-outline'}`}>2</div>
          <span className={`hidden sm:block font-label-md ${result ? 'text-primary' : ''}`}>Identity</span>
        </div>
        <div className="w-12 h-[2px] bg-outline-variant"></div>
        <div className="flex items-center gap-xs opacity-50">
          <div className="w-10 h-10 rounded-full border border-outline flex items-center justify-center font-bold">3</div>
          <span className="hidden sm:block font-label-md">Verify</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Column */}
        <div className="lg:col-span-8 space-y-8">
          <section className="glass rounded-xl p-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <h2 className="font-headline-md text-headline-md mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">pin_drop</span>
              Where are you registered?
            </h2>
            
            {result ? (
              <div className="animate-fade-in p-6 bg-slate-900/60 rounded-xl border border-primary/30 shadow-[0_0_20px_rgba(173,198,255,0.1)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`material-symbols-outlined text-3xl ${result.status === 'eligible' ? 'text-primary' : 'text-error'}`}>
                    {result.status === 'eligible' ? 'check_circle' : 'error'}
                  </span>
                  <h3 className="text-xl font-bold text-white">Status: {result.status.charAt(0).toUpperCase() + result.status.slice(1)}</h3>
                </div>
                <p className="text-on-surface-variant font-body-md mb-4">{result.message}</p>
                {result.registrationDeadline && (
                  <div className="bg-primary-container/20 p-4 rounded-lg inline-block">
                    <span className="text-primary font-bold text-sm block">Registration Deadline</span>
                    <span className="text-white text-lg">{result.registrationDeadline}</span>
                  </div>
                )}
                <div className="mt-6">
                   <button onClick={() => setResult(null)} className="text-label-md text-secondary hover:text-white transition-colors">Start Over</button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-md">
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant mb-xs block">Select Your State</label>
                    <select 
                      value={formData.state} 
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none outline-none">
                      <option disabled value="">Choose state...</option>
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                      <option>Florida</option>
                      <option>Pennsylvania</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant mb-xs block">County (Optional)</label>
                      <input 
                        value={formData.county}
                        onChange={(e) => setFormData({...formData, county: e.target.value})}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="Enter county" type="text" />
                    </div>
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant mb-xs block">Zip Code</label>
                      <input 
                        value={formData.zip}
                        onChange={(e) => setFormData({...formData, zip: e.target.value})}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="12345" type="text" />
                    </div>
                  </div>
                </div>
                <div className="mt-lg flex justify-between items-center">
                  <div className="flex items-center gap-xs text-secondary-fixed-dim">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    <span className="text-label-sm font-label-sm">Official state-level database query</span>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.state || !formData.zip}
                    className="px-6 py-3 bg-primary-container text-on-primary-container font-label-md rounded-xl hover:shadow-[0_0_15px_rgba(0,122,255,0.4)] transition-all disabled:opacity-50 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[18px]">autorenew</span>
                        Processing...
                      </>
                    ) : (
                      'Next Step'
                    )}
                  </button>
                </div>
              </>
            )}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-md rounded-xl text-center">
              <span className="material-symbols-outlined text-secondary mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              <h4 className="font-label-md text-label-md">256-bit AES</h4>
              <p className="text-label-sm text-slate-500">End-to-End Encrypted</p>
            </div>
            <div className="glass p-md rounded-xl text-center">
              <span className="material-symbols-outlined text-secondary mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>visibility_off</span>
              <h4 className="font-label-md text-label-md">Privacy First</h4>
              <p className="text-label-sm text-slate-500">No data stored</p>
            </div>
            <div className="glass p-md rounded-xl text-center">
              <span className="material-symbols-outlined text-secondary mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
              <h4 className="font-label-md text-label-md">Direct Sync</h4>
              <p className="text-label-sm text-slate-500">Official State API</p>
            </div>
          </div>
        </div>

        {/* Sidebar Info/Assistant Column */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          {/* AI Assistant Contextual Box */}
          <div className="ai-border glass-primary rounded-xl p-md">
            <div className="flex items-center gap-xs mb-sm">
              <span className="material-symbols-outlined text-primary text-md">auto_awesome</span>
              <h3 className="font-label-md text-primary uppercase tracking-widest">Election Assistant</h3>
            </div>
            <p className="text-body-md text-on-surface-variant mb-md">
              "In your state, you must be a resident for at least 30 days prior to the election to be eligible. Would you like me to check the specific deadline for your zip code?"
            </p>
            <button className="w-full py-xs px-sm border border-primary/30 rounded-lg text-primary text-label-sm hover:bg-primary/10 transition-colors">
              Ask about deadlines
            </button>
          </div>

          {/* Registration Requirements Card */}
          <div className="glass rounded-xl p-md">
            <h3 className="font-headline-md text-label-md mb-md border-b border-white/10 pb-xs">General Requirements</h3>
            <ul className="space-y-sm">
              <li className="flex items-start gap-sm group">
                <span className="material-symbols-outlined text-secondary text-sm mt-1">info</span>
                <div className="relative">
                  <span className="font-body-md text-on-surface hover:text-primary cursor-help">US Citizenship</span>
                  <div className="absolute bottom-full left-0 mb-xs w-48 p-xs glass rounded text-label-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    Must be a citizen by birth or naturalization.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary text-sm mt-1">info</span>
                <span className="font-body-md text-on-surface">Age 18+ by election day</span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary text-sm mt-1">info</span>
                <span className="font-body-md text-on-surface">Residency status</span>
              </li>
            </ul>
          </div>

          {/* Map Contextual */}
          <div className="rounded-xl overflow-hidden glass h-48 relative">
            <img className="w-full h-full object-cover opacity-60" alt="A clean, minimalist digital map of the United States rendered in a deep blue and slate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsMXja7tGKRIJLIJ7k3Gw_2F8sLHtrftiyQ5P-cD3uglwRTfXcFYBMDsFV8LPoQvW6_Ul6PL-ywKYeFp6ju88IjXg5pVP5DN4v916_00ZlQN-Oi-YPh2aqPoURKMybUYyDIz1-nhoWO0hOsbrPylNh1CM0m4qxaxnNwehwV06rnTODY_HDiJrYSbM6gUM2FY5YCIeuLT66YxzcchAG4_bdi-Zc6kpCSDdhYMhw03dXgs6QP0AkkB6rvTL_-aO9uo5QL6DbepfC084" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            <div className="absolute bottom-md left-md">
              <span className="text-label-sm uppercase tracking-widest text-secondary font-bold">Jurisdiction Map</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Bottom Section: FAQ/Resources */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 glass rounded-xl p-md flex flex-col justify-between">
          <div>
            <h4 className="font-headline-md text-headline-md text-on-surface mb-sm">Moving soon?</h4>
            <p className="text-on-surface-variant body-md">Update your registration records if you have moved within the state or to a new state.</p>
          </div>
          <Link className="text-primary font-label-md mt-md flex items-center gap-xs group" to="#">
            Change Address Guide <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>
        <div className="glass rounded-xl p-md">
          <span className="material-symbols-outlined text-tertiary mb-sm">how_to_vote</span>
          <h4 className="font-label-md mb-xs">Absentee Ballots</h4>
          <p className="text-label-sm text-slate-500">Learn how to request a mail-in ballot in your county.</p>
        </div>
        <div className="glass rounded-xl p-md">
          <span className="material-symbols-outlined text-error mb-sm">event_busy</span>
          <h4 className="font-label-md mb-xs">Deadlines</h4>
          <p className="text-label-sm text-slate-500">Never miss a cut-off date for local or national polls.</p>
        </div>
      </div>
    </div>
  );
};

export default EligibilityChecker;
