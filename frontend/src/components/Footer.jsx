import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-[20px] full-width py-12 border-t border-white/10 flat no shadows">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold text-white/90">ElectraGuide</div>
          <p className="font-inter text-xs text-slate-500 max-w-xs text-center md:text-left">
            © 2024 ElectraGuide. Empowering democratic clarity through AI.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-md">
          <Link to="#" className="font-inter text-xs text-slate-500 hover:text-white transition-colors duration-200 opacity-80 hover:opacity-100">Privacy Policy</Link>
          <Link to="#" className="font-inter text-xs text-slate-500 hover:text-white transition-colors duration-200 opacity-80 hover:opacity-100">Terms of Service</Link>
          <Link to="#" className="font-inter text-xs text-slate-500 hover:text-white transition-colors duration-200 opacity-80 hover:opacity-100">Contact</Link>
          <Link to="#" className="font-inter text-xs text-slate-500 hover:text-white transition-colors duration-200 opacity-80 hover:opacity-100">FAQ</Link>
        </div>
        <div className="flex gap-md">
          <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">public</span>
          </div>
          <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">shield</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
