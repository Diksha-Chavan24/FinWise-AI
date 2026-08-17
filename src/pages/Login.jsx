import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, User, ShieldCheck, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { profiles, handleSelectProfile, handleLogin } = useAppContext();
  const [email, setEmail] = useState('aarav.sharma@techcorp.in');
  const [password, setPassword] = useState('••••••••••••');

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    navigate('/dashboard');
  };

  const onQuickDemoSelect = (p) => {
    handleSelectProfile(p);
    handleLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-slate-950 text-xl font-heading shadow-md shadow-emerald-500/20">
            ₹
          </div>
          <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
            FinWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold text-white font-heading">
          Sign in to your financial account
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Indian Resident Financial Portal • Secured with JWT
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
          <form onSubmit={onFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. priya.patel@mumbai.co.in"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-emerald-400 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Selector */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>One-Click Demo Indian Profiles</span>
            </div>
            <div className="space-y-1.5">
              {profiles.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => onQuickDemoSelect(p)}
                  type="button"
                  className="w-full p-2 rounded-lg bg-slate-950/60 hover:bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 flex items-center justify-between transition group"
                >
                  <span className="flex items-center gap-2">
                    <span>{p.avatar}</span>
                    <span className="group-hover:text-emerald-400 font-medium">{p.name}</span>
                    <span className="text-[10px] text-slate-500">({p.city.split(',')[0]})</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    ₹{(p.monthlyIncome / 100000).toFixed(1)}L/mo
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-emerald-400 hover:underline">
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
