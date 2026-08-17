import React from 'react';
import { 
  Building, 
  Coins, 
  PiggyBank, 
  TrendingUp, 
  Landmark, 
  CreditCard,
  Target,
  Calendar,
  AlertCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { formatINR, calculateNetWorth } from '../utils/formatters';
import { calculateInflationAdjustedGoal } from '../engine/financialEngine';

export default function NetWorthOverview({ profile, onGeneratePlan }) {
  const { totalAssets, totalLiabilities, netWorth } = calculateNetWorth(profile);
  const nw = profile.existingNetWorth || {};

  const assetCategories = [
    {
      name: 'Mutual Funds & Flexicap',
      amount: nw.mutualFundsEquity || 0,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      description: 'Nifty 50, Midcap, and Flexicap SIP holdings'
    },
    {
      name: 'Direct Indian Stocks',
      amount: nw.directStocks || 0,
      icon: Landmark,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      description: 'NSE / BSE Demat portfolio'
    },
    {
      name: 'EPF / PPF / NPS',
      amount: nw.epfPpf || 0,
      icon: PiggyBank,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      description: 'Government backed retirement corpus (EEE)'
    },
    {
      name: 'Sovereign Gold Bonds / Gold',
      amount: nw.goldSgb || 0,
      icon: Coins,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      description: 'RBI SGB Tranches & 24K digital gold'
    },
    {
      name: 'Liquid Savings & FD',
      amount: nw.savingsAccount || 0,
      icon: Landmark,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      description: 'Emergency reserve & high-yield sweep accounts'
    },
    {
      name: 'Real Estate / Property',
      amount: nw.realEstate || 0,
      icon: Building,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
      description: 'Residential & commercial property value in India'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Advisory Callout */}
      <div className="glass-panel p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Customer Financial Profile & Balance Sheet</span>
            <span className="text-xs font-normal px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              Verified Domestic Assets
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Reviewing asset distribution and goal target horizons for <strong className="text-slate-200">{profile.name}</strong> ({profile.city}).
          </p>
        </div>
        <button
          onClick={onGeneratePlan}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition shadow-md shadow-emerald-500/20 whitespace-nowrap"
        >
          <span>Synthesize GenAI Plans</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Asset Allocation Breakdown Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <span>Current Asset Breakdown (₹ INR)</span>
          <span className="text-xs text-slate-500 font-normal">
            Total Assets: {formatINR(totalAssets)}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assetCategories.map((item, idx) => {
            const Icon = item.icon;
            const pct = totalAssets > 0 ? ((item.amount / totalAssets) * 100).toFixed(1) : 0;
            return (
              <div key={idx} className="glass-panel p-4 border border-slate-800/80 glass-panel-hover">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${item.bg}`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.description}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">{pct}%</span>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-base font-bold font-mono text-white">
                    {formatINR(item.amount)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.color.replace('text-', 'bg-')}`} 
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Liabilities / Loans if any */}
      {totalLiabilities > 0 && (
        <div className="glass-panel p-4 bg-rose-950/20 border border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-300">Outstanding Liabilities & Home Loans</div>
              <div className="text-[11px] text-slate-400">Home loan / Auto loans under Indian bank amortization</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold font-mono text-rose-400">
              {formatINR(totalLiabilities)}
            </div>
            <div className="text-[10px] text-slate-400">Deducted from Net Worth</div>
          </div>
        </div>
      )}

      {/* Financial Goals & Inflation-Adjusted Targets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-200">Customer Financial Goals & Milestones</h3>
            <p className="text-xs text-slate-400">
              Inflation-adjusted target corpus required using Indian education, real estate, and lifestyle inflation benchmarks.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
            {profile.goals?.length || 0} Target Goals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(profile.goals || []).map((goal) => {
            const inflationData = calculateInflationAdjustedGoal(goal);
            const assigned = goal.currentCorpusAssigned || 0;
            const progressPct = Math.min(100, Math.round((assigned / goal.targetAmount) * 100));

            return (
              <div key={goal.id} className="glass-panel p-5 border border-slate-800 glass-panel-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {goal.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      goal.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      goal.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {goal.priority} Priority
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-3 line-clamp-2">
                    {goal.title}
                  </h4>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Target Horizon:</span>
                      <span className="font-semibold text-white flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        {goal.targetYears} Years ({2025 + goal.targetYears})
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span>Present Value Cost:</span>
                      <span className="font-mono text-slate-300">{formatINR(goal.targetAmount)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300 font-semibold bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                      <span>Inflation Adjusted Target:</span>
                      <span className="font-mono text-emerald-400">{formatINR(inflationData.futureValue)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Assigned Corpus: {formatINR(assigned)}</span>
                    <span className="font-semibold text-slate-200">{progressPct}% Funded</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" 
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
