import React from 'react';
import { 
  MapPin, 
  Briefcase, 
  Wallet, 
  ArrowUpRight, 
  Shield, 
  Target,
  IndianRupee,
  FileSpreadsheet
} from 'lucide-react';
import { formatINR, calculateNetWorth } from '../utils/formatters';

export default function ProfileHeader({ profile }) {
  const { totalAssets, totalLiabilities, netWorth } = calculateNetWorth(profile);
  const surplus = profile.monthlySurplus || (profile.monthlyIncome - profile.monthlyExpenses);

  const getRiskBadge = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'aggressive':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'conservative':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="glass-panel p-6 mb-6 border border-slate-800 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Profile Info */}
        <div className="lg:col-span-4 flex items-start gap-4">
          <div className="text-4xl p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner">
            {profile.avatar || '👤'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-white font-heading">{profile.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Age {profile.age}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getRiskBadge(profile.riskAppetite)}`}>
                {profile.riskAppetite} Risk
              </span>
            </div>
            
            <div className="flex flex-col gap-1 mt-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.occupation}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.city}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">{profile.taxRegime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Net Worth */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
              <span>Total Net Worth</span>
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-emerald-400 mt-1 font-mono">
              {formatINR(netWorth, { compact: true })}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Assets: {formatINR(totalAssets, { compact: true })}
            </div>
          </div>

          {/* Monthly Income */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
              <span>Monthly In-Hand</span>
              <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-cyan-400 mt-1 font-mono">
              {formatINR(profile.monthlyIncome, { compact: true })}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Expenses: {formatINR(profile.monthlyExpenses, { compact: true })}
            </div>
          </div>

          {/* Monthly Disposable Surplus */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
              <span>Monthly Surplus</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-lg font-bold text-indigo-300 mt-1 font-mono">
              {formatINR(surplus, { compact: true })}
            </div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">
              Investable Capacity ({Math.round((surplus / profile.monthlyIncome) * 100)}%)
            </div>
          </div>

          {/* Financial Goals Count */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
              <span>Active Goals</span>
              <Target className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-amber-400 mt-1 font-mono">
              {profile.goals?.length || 0} Milestones
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              AI Strategy Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
