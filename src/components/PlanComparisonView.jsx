import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  PieChart, 
  Info, 
  Award,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

export default function PlanComparisonView({ 
  plans, 
  selectedPlan, 
  onSelectPlan, 
  onOpenPlanDetails, 
  profile 
}) {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const surplus = profile.monthlySurplus || 100000;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                GENAI MULTI-STRATEGY ENGINE
              </span>
              <span className="text-xs text-slate-400">
                Synthesized for <strong className="text-slate-200">{profile.name}</strong>
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1 font-heading">
              Personalized Indian Financial Strategies
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              Compare 3 distinct AI-generated investment plans engineered from 20-year Indian market data, 
              inflation trends, and your current surplus of <strong className="text-emerald-400">{formatINR(surplus)}/month</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Selected Strategy:</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              {selectedPlan?.name.split(':')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Plans Side-by-Side Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;
          const isAffordable = plan.totalMonthlySIPNeeded <= surplus;
          const alloc = plan.assetAllocation;

          return (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`glass-panel p-6 border transition-all duration-300 relative flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-slate-900/95 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500'
                  : 'border-slate-800/80 hover:border-slate-700 bg-slate-950/70'
              }`}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Risk: <strong className="text-slate-200">{plan.riskRating}</strong> ({plan.riskScore}/10)
                </span>
              </div>

              {/* Title & Philosophy */}
              <div className="mt-4">
                <h3 className="text-base font-bold text-white font-heading">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 min-h-[36px]">
                  {plan.tagline}
                </p>
              </div>

              {/* Key Metrics Dashboard */}
              <div className="grid grid-cols-2 gap-2.5 mt-5 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Expected CAGR</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                    {plan.expectedCAGR}% <span className="text-[10px] text-slate-400 font-sans">p.a.</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Goal Success Probability</div>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5">
                    {plan.successProbability}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Required Monthly SIP</div>
                  <div className="text-sm font-bold font-mono text-white mt-0.5">
                    {formatINR(plan.totalMonthlySIPNeeded)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">With 10% Step-Up</div>
                  <div className="text-sm font-bold font-mono text-indigo-300 mt-0.5">
                    {formatINR(plan.totalStepUpSIPNeeded)}
                  </div>
                </div>
              </div>

              {/* Surplus Feasibility Indicator */}
              <div className={`mt-3 p-2.5 rounded-lg text-xs flex items-center justify-between border ${
                isAffordable 
                  ? 'bg-emerald-950/20 text-emerald-300 border-emerald-500/20' 
                  : 'bg-amber-950/20 text-amber-300 border-amber-500/20'
              }`}>
                <div className="flex items-center gap-1.5">
                  {isAffordable ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Info className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isAffordable ? 'Fully covered by surplus' : 'Suggest 10% annual Step-Up'}</span>
                </div>
                <span className="font-mono font-bold">
                  {Math.round((surplus / Math.max(1, plan.totalMonthlySIPNeeded)) * 100)}% Capacity
                </span>
              </div>

              {/* Asset Allocation Breakdown Bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span className="font-semibold flex items-center gap-1">
                    <PieChart className="w-3.5 h-3.5 text-slate-400" />
                    Asset Allocation
                  </span>
                  <span className="text-[11px] text-slate-400">100% Total</span>
                </div>

                <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-800">
                  <div style={{ width: `${alloc.largeCapEquity}%` }} className="bg-emerald-500" title={`Large Cap: ${alloc.largeCapEquity}%`} />
                  <div style={{ width: `${alloc.midSmallCapEquity}%` }} className="bg-cyan-400" title={`Mid/Small Cap: ${alloc.midSmallCapEquity}%`} />
                  <div style={{ width: `${alloc.corporateDebtFD}%` }} className="bg-indigo-500" title={`Debt/FD: ${alloc.corporateDebtFD}%`} />
                  <div style={{ width: `${alloc.goldSGB}%` }} className="bg-amber-400" title={`Gold/SGB: ${alloc.goldSGB}%`} />
                  <div style={{ width: `${alloc.ppfNpsGovt}%` }} className="bg-purple-500" title={`PPF/NPS: ${alloc.ppfNpsGovt}%`} />
                  <div style={{ width: `${alloc.liquidEmergency}%` }} className="bg-slate-500" title={`Emergency: ${alloc.liquidEmergency}%`} />
                </div>

                <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Large Cap: {alloc.largeCapEquity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Mid/Small: {alloc.midSmallCapEquity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>Debt/FD: {alloc.corporateDebtFD}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Gold/SGB: {alloc.goldSGB}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>PPF/NPS: {alloc.ppfNpsGovt}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    <span>Liquid: {alloc.liquidEmergency}%</span>
                  </div>
                </div>
              </div>

              {/* Recommended Indian Vehicles Summary */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-slate-300 mb-1.5">
                  Core Indian Instruments:
                </div>
                <ul className="space-y-1 text-[11px] text-slate-400">
                  {plan.indianInstruments.slice(0, 3).map((inst, i) => (
                    <li key={i} className="flex items-center gap-1.5 truncate">
                      <span className="text-emerald-400">▪</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions: Select Plan & Detailed Breakdown */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Active Plan</span>
                    </>
                  ) : (
                    <span>Choose Strategy</span>
                  )}
                </button>

                <button
                  onClick={() => onOpenPlanDetails(plan)}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  title="View complete goal-by-goal schedule and 15-year trajectory"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
