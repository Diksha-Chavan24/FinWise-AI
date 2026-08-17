import React, { useState } from 'react';
import { Sliders, TrendingUp, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SimulatorView from '../components/SimulatorView';
import MarketTrendsView from '../components/MarketTrendsView';

export default function WhatIfSimulator() {
  const { selectedProfile, activePlan } = useAppContext();
  const [activeSubTab, setActiveSubTab] = useState('simulator'); // 'simulator' | 'trends'

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Sub Navigation Switcher */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 p-1.5 rounded-xl gap-2 w-fit">
        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition ${
            activeSubTab === 'simulator'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>What-If Sandbox</span>
        </button>

        <button
          onClick={() => setActiveSubTab('trends')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition ${
            activeSubTab === 'trends'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Past Indian Market Trends (2004 - 2024)</span>
        </button>
      </div>

      {activeSubTab === 'simulator' ? (
        <SimulatorView
          profile={selectedProfile}
          defaultPlan={activePlan}
        />
      ) : (
        <MarketTrendsView />
      )}
    </main>
  );
}
