import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Wallet, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Sliders, 
  MessageSquareText, 
  ArrowRight, 
  UserCheck, 
  FileDown, 
  PlusCircle,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  PieChart,
  ShieldAlert
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProfileHeader from '../components/ProfileHeader';
import ProfileBuilderModal from '../components/ProfileBuilderModal';
import ExportReportModal from '../components/ExportReportModal';
import { formatINR, calculateNetWorth } from '../utils/formatters';
import { calculateFinancialHealth, detectGoalConflicts } from '../engine/financialEngine';

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    profiles, 
    selectedProfile, 
    handleSelectProfile, 
    handleSaveCustomProfile,
    activePlan 
  } = useAppContext();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const { totalAssets, totalLiabilities, netWorth } = calculateNetWorth(selectedProfile);
  const surplus = selectedProfile.monthlySurplus || (selectedProfile.monthlyIncome - selectedProfile.monthlyExpenses);

  const health = calculateFinancialHealth(selectedProfile);
  const conflicts = detectGoalConflicts(selectedProfile, activePlan);

  const nw = selectedProfile.existingNetWorth || {};

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Customer Switcher & Export Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400">Active Profile:</span>
          <select
            value={selectedProfile.id}
            onChange={(e) => {
              const p = profiles.find((item) => item.id === e.target.value);
              if (p) handleSelectProfile(p);
            }}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-1.5 border border-slate-700 outline-none cursor-pointer max-w-[280px] sm:max-w-none truncate"
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.avatar} {p.name} ({p.city.split(',')[0]} • ₹{(p.monthlyIncome / 100000).toFixed(1)}L/mo)
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-500 hidden md:inline">
            ({profiles.length} Indian Profiles Available)
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-2 rounded-lg transition shadow-md shadow-emerald-600/20"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Profile</span>
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-3 py-2 rounded-lg border border-slate-700 transition"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Customer Header Banner */}
      <ProfileHeader profile={selectedProfile} />

      {/* Financial Health Score & Hidden Risk Detection Card */}
      <div className="glass-panel p-5 border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-lg font-mono">
              {health.score}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-heading">
                  Financial Health Score
                </h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${health.badgeColor}`}>
                  Grade {health.grade}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated from savings rate ({health.savingsRate}%), emergency runway ({health.emergencyFundMonths} mo), and leverage ratio ({health.debtToAssetRatio}%).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Emergency Fund</span>
              <strong className={health.emergencyFundMonths >= 6 ? 'text-emerald-400' : 'text-amber-400'}>
                {health.emergencyFundMonths} Months
              </strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Savings Rate</span>
              <strong className="text-cyan-400">{health.savingsRate}%</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Debt Ratio</span>
              <strong className={health.debtToAssetRatio === 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {health.debtToAssetRatio}%
              </strong>
            </div>
          </div>
        </div>

        {/* Hidden Risks and Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
          {health.hiddenRisks.length > 0 ? (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Detected Vulnerabilities ({health.hiddenRisks.length})</span>
              </span>
              {health.hiddenRisks.slice(0, 2).map((risk, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-300">
                  <div className="font-semibold">{risk.title}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{risk.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
              <div className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Critical Risks Detected</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Asset allocation satisfies Indian domestic resilience standards.</p>
            </div>
          )}

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Balance Sheet Strengths</span>
            </span>
            {health.strengths.slice(0, 2).map((str, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                <p className="text-[11px] text-slate-300">✓ {str}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal Conflict Banner (If Any) */}
      {conflicts.hasConflict && (
        <div className="glass-panel p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-300">
                Goal Conflict Detected: Total SIP ({formatINR(activePlan?.totalMonthlySIPNeeded)}) exceeds Monthly Surplus ({formatINR(surplus)})
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {conflicts.resolutionOptions[0]?.description}
              </p>
            </div>
          </div>

          <Link
            to="/plans"
            className="text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition whitespace-nowrap"
          >
            Resolve in Plans
          </Link>
        </div>
      )}

      {/* Core Action Navigation Cards */}
      <div>
        <h2 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Financial Planning Modules</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Multi-Plan Comparison */}
          <Link
            to="/plans"
            className="glass-panel p-5 border border-slate-800 hover:border-emerald-500/50 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  3 AI Strategies
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3 group-hover:text-emerald-400 transition">
                GenAI Multi-Plan Strategies
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Current selection: <strong className="text-slate-200">{activePlan?.name.split(':')[0]}</strong> with {activePlan?.expectedCAGR}% expected CAGR.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>View & Compare Plans</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2: Financial Goals */}
          <Link
            to="/goals"
            className="glass-panel p-5 border border-slate-800 hover:border-cyan-500/50 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {selectedProfile.goals?.length || 0} Milestones
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3 group-hover:text-cyan-400 transition">
                Financial Goals & Milestones
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Inflation-adjusted targets, SIP backward calculations, and funding horizons.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
              <span>Manage Goals</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3: Risk Assessment */}
          <Link
            to="/risk-assessment"
            className="glass-panel p-5 border border-slate-800 hover:border-indigo-500/50 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  {selectedProfile.riskAppetite}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3 group-hover:text-indigo-300 transition">
                Risk Assessment Questionnaire
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Interactive scoring evaluating capacity, tolerance, and asset volatility resilience.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400">
              <span>Take Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4: Financial Profile */}
          <Link
            to="/profile"
            className="glass-panel p-5 border border-slate-800 hover:border-purple-500/50 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  Balance Sheet
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3 group-hover:text-purple-400 transition">
                Profile & Net Worth Breakdown
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Detailed view of Mutual Funds, Stocks, EPF/PPF, SGB Gold, and Real Estate holdings.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-400">
              <span>Inspect Assets</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 5: What-If Simulator */}
          <Link
            to="/simulator"
            className="glass-panel p-5 border border-slate-800 hover:border-amber-500/50 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Compounding
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3 group-hover:text-amber-400 transition">
                What-If Compounding Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tweak monthly SIP sliders, CAGR benchmarks, and annual 10% Step-Up multipliers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>Launch Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 6: AI Financial Advisor */}
          <Link
            to="/assistant"
            className="glass-panel p-5 border border-slate-800 hover:border-emerald-500/50 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <MessageSquareText className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Gemini GenAI
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3 group-hover:text-emerald-400 transition">
                AI Wealth Advisor Chat
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ask about Budget 2024 capital gains, NPS Section 80CCD, SGB vs Jewellery, and SIPs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Chat with Advisor</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </div>

      {/* Modals */}
      {showProfileModal && (
        <ProfileBuilderModal
          onClose={() => setShowProfileModal(false)}
          onSaveProfile={(newProfile) => {
            handleSaveCustomProfile(newProfile);
            setShowProfileModal(false);
          }}
        />
      )}

      {showExportModal && (
        <ExportReportModal
          profile={selectedProfile}
          plan={activePlan}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </main>
  );
}
