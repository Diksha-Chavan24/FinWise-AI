import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  Sliders, 
  ArrowRight, 
  CheckCircle,
  IndianRupee,
  Bot,
  Zap,
  Lock
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Landing Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-slate-950 text-xl font-heading shadow-md shadow-emerald-500/20">
              ₹
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                FinWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI</span>
              </span>
              <span className="text-[10px] ml-2 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                INDIA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-lg transition shadow-md shadow-emerald-500/20 flex items-center gap-1"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex-1 flex flex-col justify-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Financial Planning for Indian Resident Citizens</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Personalized Wealth Planning with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300">GenAI & Market Trends</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Customize financial plans tailored to your net worth, risk appetite, and goals. 
            Backed by 20+ years of Indian historical data (Nifty 50, Gold, PPF, Debt) and SEBI guidelines.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <span>Explore Live Prototype</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-semibold transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Sign In / Demo Accounts</span>
            </Link>
          </div>

          {/* Highlights summary */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-slate-400">Currency</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">₹ INR (Lakhs/Cr)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-slate-400">Strategies</div>
              <div className="text-base font-bold text-cyan-400 mt-0.5">3 Multi-Plans</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-slate-400">Tax Regimes</div>
              <div className="text-base font-bold text-indigo-300 mt-0.5">Budget 2024-25</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-slate-400">GenAI Engine</div>
              <div className="text-base font-bold text-amber-400 mt-0.5">Gemini Free API</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Complete Financial Planning Suite
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Strict separation between mathematical computation and generative AI explanation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                Goal-Based SIP Planning
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Backward induction with Indian inflation benchmarks (education @9.5%, healthcare @11%, housing @7.5%). Step-up SIP recommendations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">
                20-Year Indian Market Trends
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Nifty 50, Mid/Smallcap, Sovereign Gold Bonds (SGB), PPF, Debt FDs, and CPI. Stress-tested against 2008 & 2020 market crashes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                GenAI Conversational Advisor
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Powered by Google Gemini free API. Explains trade-offs, tax optimization (80C vs Sec 115BAC), and portfolio rebalancing in plain language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-bold text-slate-400">FinWise AI</span> • Personalized Financial Planning for Indian Citizens
          </div>
          <div>
            ₹ INR Currency • SEBI & RBI Guidelines Compliant Prototype
          </div>
        </div>
      </footer>
    </div>
  );
}
