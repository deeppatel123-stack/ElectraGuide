import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const getLinkClasses = ({ isActive }) => 
    `font-inter text-sm font-medium tracking-tight transition-all duration-200 ${
      isActive 
        ? 'text-blue-500 border-b-2 border-blue-500 pb-1' 
        : 'text-slate-400 hover:text-blue-400'
    }`;

  return (
    <header className="bg-slate-950/40 backdrop-blur-[20px] docked full-width top-0 sticky z-50 border-b border-white/10 shadow-2xl shadow-blue-500/5">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-black tracking-tighter text-white flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform duration-300">how_to_vote</span>
          ElectraGuide
        </Link>
        <nav className="hidden md:flex items-center gap-gutter h-full">
          <NavLink to="/" end className={getLinkClasses}>
            Features
          </NavLink>
          <NavLink to="/timeline" className={getLinkClasses}>
            Timeline
          </NavLink>
          <NavLink to="/eligibility" className={getLinkClasses}>
            Eligibility
          </NavLink>
          <NavLink to="/dashboard" className={getLinkClasses}>
            Dashboard
          </NavLink>
        </nav>
        <Link to="/assistant" className="bg-primary-container text-on-primary-container px-5 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all duration-150 shadow-[0_0_20px_rgba(0,122,255,0.3)]">
          Start Guide
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
