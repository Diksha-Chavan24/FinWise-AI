import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  UserCheck,
  Sliders,
  MessageSquareText,
  PlusCircle,
  LayoutDashboard,
  Target,
  ShieldCheck,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/profile', label: 'Profile', icon: UserCheck },
  { path: '/risk-assessment', label: 'Risk', icon: ShieldCheck },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/plans', label: 'Plans', icon: Sparkles },
  { path: '/simulator', label: 'Simulator', icon: Sliders },
  { path: '/assistant', label: 'AI Advisor', icon: MessageSquareText },
];

export default function Navbar() {
  const { isLoggedIn, handleLogout, selectedProfile } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't render navbar on landing, login, register
  const hiddenPaths = ['/', '/login', '/register'];
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 px-4 py-1.5 border-b border-emerald-500/20 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            🇮🇳 INDIAN EDITION
          </span>
          <span className="hidden sm:inline">₹ INR Currency • SEBI & Budget 2024 Compliant</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
          <span>Nifty 50 20Y CAGR: <strong className="text-emerald-400">13.8%</strong></span>
          <span>•</span>
          <span>Gold 20Y CAGR: <strong className="text-amber-400">11.2%</strong></span>
          <span>•</span>
          <span>PPF Rate: <strong className="text-purple-400">7.1%</strong></span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-bold text-slate-950 text-lg">
              ₹
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                FinWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI</span>
              </span>
              <span className="text-[10px] ml-2 uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                GenAI
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                      isActive
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {selectedProfile && (
              <span className="hidden md:inline text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                {selectedProfile.avatar} {selectedProfile.name}
              </span>
            )}

            <button
              onClick={() => { handleLogout(); navigate('/'); }}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs px-3 py-2 rounded-lg border border-slate-700 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-slate-800 py-2 flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition ${
                      isActive
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
