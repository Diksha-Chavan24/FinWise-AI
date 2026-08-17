import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  FileText,
  Clock,
  ArrowRight,
  PieChart,
  HelpCircle
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';
import { generateAiPlanRationale } from '../engine/aiAdvisorEngine';

export default function PlanDetailModal({ plan, profile, onClose, onSelectPlan, isSelected }) {
  const [activeSubTab, setActiveSubTab] = useState('goals'); // 'goals' | 'trajectory' | 'tax' | 'rationale'

  if (!plan) return null;

  const rationaleText = generateAiPlanRationale(profile, plan);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700 shadow-2xl flex flex-col rounded-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${plan.badgeColor}`}>
                {plan.badge}
              </span>
              <span className="text-xs text-slate-400">
                Customer: <strong className="text-white">{profile.name}</strong> ({profile.city})
              </span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                {plan.expectedCAGR}% Expected CAGR
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5 font-heading">
              {plan.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {plan.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subtabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/80 px-6 gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'goals', label: 'Goal-by-Goal SIP Breakdown', icon: Target },
            { id: 'trajectory', label: '15-Year Wealth Trajectory', icon: TrendingUp },
            { id: 'tax', label: 'Indian Tax Saving Blueprint', icon: ShieldCheck },
            { id: 'rationale', label: 'GenAI Strategic Rationale', icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3 border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Subtab: Goal-by-Goal Schedule */}
          {activeSubTab === 'goals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Monthly SIP Allocation per Financial Goal</h3>
                  <p className="text-xs text-slate-400">
                    Computed via backward compounding with inflation adjustments and existing allocated corpus.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total Monthly SIP Needed</div>
                  <div className="text-base font-bold font-mono text-emerald-400">
                    {formatINR(plan.totalMonthlySIPNeeded)}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="text-[11px] uppercase bg-slate-950 text-slate-400">
                    <tr>
                      <th className="py-2.5 px-3">Goal / Milestone</th>
                      <th className="py-2.5 px-3">Horizon</th>
                      <th className="py-2.5 px-3">Future Target Value</th>
                      <th className="py-2.5 px-3">Current Corpus</th>
                      <th className="py-2.5 px-3 text-emerald-400">Required Monthly SIP</th>
                      <th className="py-2.5 px-3 text-cyan-400">With 10% Step-Up</th>
                      <th className="py-2.5 px-3">Feasibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {plan.goalCalculations.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-sans font-semibold text-white">
                          <div className="flex items-center gap-1.5">
                            <span className="text-emerald-400">▪</span>
                            <span>{g.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal">
                            Category: {g.category} ({g.priority} Priority)
                          </span>
                        </td>
                        <td className="py-3 px-3">{g.targetYears} Yrs ({2025 + g.targetYears})</td>
                        <td className="py-3 px-3 font-bold text-white">{formatINR(g.inflationAdjustedValue)}</td>
                        <td className="py-3 px-3 text-slate-400">{formatINR(g.currentCorpusAssigned || 0)}</td>
                        <td className="py-3 px-3 font-bold text-emerald-400">{formatINR(g.requiredSIP)}/mo</td>
                        <td className="py-3 px-3 font-bold text-cyan-400">{formatINR(g.requiredStepUpSIP)}/mo</td>
                        <td className="py-3 px-3 font-sans">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {g.feasibility}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recommended Indian Portfolios */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 mt-4">
                <h4 className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-emerald-400" />
                  <span>Curated Domestic Financial Instruments</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plan.indianInstruments.map((item, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Subtab: 15-Year Trajectory */}
          {activeSubTab === 'trajectory' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">15-Year Wealth Trajectory Forecast</h3>
                <p className="text-xs text-slate-400">
                  Compounding projection assuming monthly SIP of {formatINR(plan.totalMonthlySIPNeeded)} at {plan.expectedCAGR}% CAGR.
                </p>
              </div>

              <div className="overflow-x-auto max-h-80 overflow-y-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="text-[11px] uppercase bg-slate-950 text-slate-400 sticky top-0">
                    <tr>
                      <th className="py-2 px-3">Year / Age</th>
                      <th className="py-2 px-3">Calendar Year</th>
                      <th className="py-2 px-3">Principal Invested</th>
                      <th className="py-2 px-3 text-cyan-400">Estimated Gains</th>
                      <th className="py-2 px-3 text-emerald-400">Total Net Worth Corpus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {plan.trajectory.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 font-sans font-bold text-white">
                          Year {row.year} (Age {row.age})
                        </td>
                        <td className="py-2 px-3">{row.calendarYear}</td>
                        <td className="py-2 px-3 text-slate-400">{formatINR(row.totalInvested)}</td>
                        <td className="py-2 px-3 text-cyan-400">+{formatINR(row.gains)}</td>
                        <td className="py-2 px-3 font-bold text-emerald-400">{formatINR(row.projectedCorpus)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtab: Tax Saving Blueprint */}
          {activeSubTab === 'tax' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Indian Income Tax Optimization (Budget 2024-25 Revisions)</h3>
                <p className="text-xs text-slate-400">
                  Actionable tax exemptions and harvesting strategies tailored for {profile.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Section 80CCD(1B) - NPS Exclusive ₹50,000 Benefit</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Investing ₹50,000 in Tier-1 National Pension System yields an extra deduction above Section 80C. 
                    Saves up to **₹15,600/year** in taxes for 30% tax slab earners.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>LTCG Tax-Harvesting (₹1.25 Lakhs / Year Free)</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Budget 2024 expanded LTCG tax-free limit to ₹1.25 Lakhs (12.5% tax thereafter). 
                    Redeem and immediately reinvest gains every financial year before March 31 to reset acquisition cost.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Sovereign Gold Bonds (SGB) 100% Tax Exemption</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Under Indian Income Tax rules, capital gains on redemption of SGBs at maturity (8 years) 
                    are completely tax-exempt, unlike physical gold or gold ETFs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-bold text-purple-400 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Regime Selection Recommendation</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Current selection: **{profile.taxRegime}**. With standard deduction revised to ₹75,000 in New Regime, 
                    ensure your HRA and loan interest justify Old Regime if retained.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Subtab: GenAI Rationale */}
          {activeSubTab === 'rationale' && (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Synthesized GenAI Model Logic</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {rationaleText}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Success Probability: <strong className="text-cyan-400 font-mono">{plan.successProbability}%</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelectPlan(plan);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSelected ? 'Currently Selected' : 'Activate This Strategy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
