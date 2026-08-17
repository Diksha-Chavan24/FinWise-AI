import React, { useState } from 'react';
import { 
  Sliders, 
  TrendingUp, 
  PiggyBank, 
  Target, 
  Sparkles, 
  RotateCcw,
  Zap,
  IndianRupee,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

export default function SimulatorView({ profile, defaultPlan }) {
  const surplus = profile.monthlySurplus || 100000;
  
  // Interactive Simulator State
  const [monthlySIP, setMonthlySIP] = useState(defaultPlan?.totalMonthlySIPNeeded || 50000);
  const [expectedReturn, setExpectedReturn] = useState(defaultPlan?.expectedCAGR || 12);
  const [horizonYears, setHorizonYears] = useState(10);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);

  // Compute Future Value with Step-Up SIP
  const calculateSimulation = () => {
    let totalInvested = 0;
    let currentCorpus = 0;
    let currentSIP = monthlySIP;
    const yearByYearData = [];

    const initialAssets = (profile.existingNetWorth?.mutualFundsEquity || 0) +
                          (profile.existingNetWorth?.directStocks || 0) +
                          (profile.existingNetWorth?.savingsAccount || 0);

    currentCorpus = initialAssets;
    totalInvested = initialAssets;

    for (let yr = 1; yr <= horizonYears; yr++) {
      const yearlyInvestment = currentSIP * 12;
      totalInvested += yearlyInvestment;
      
      // Annual compounding with monthly inflows
      currentCorpus = (currentCorpus + yearlyInvestment) * (1 + expectedReturn / 100);

      // Step up SIP for next year
      currentSIP = currentSIP * (1 + stepUpPercent / 100);

      yearByYearData.push({
        year: yr,
        calendarYear: 2025 + yr,
        totalInvested: Math.round(totalInvested),
        projectedCorpus: Math.round(currentCorpus),
        estimatedGains: Math.round(Math.max(0, currentCorpus - totalInvested))
      });
    }

    const finalCorpus = yearByYearData[yearByYearData.length - 1]?.projectedCorpus || 0;
    const finalInvested = yearByYearData[yearByYearData.length - 1]?.totalInvested || 0;
    const wealthMultiplier = finalInvested > 0 ? (finalCorpus / finalInvested).toFixed(2) : 1;

    return {
      finalCorpus,
      finalInvested,
      estimatedGains: finalCorpus - finalInvested,
      wealthMultiplier,
      yearByYearData
    };
  };

  const simulation = calculateSimulation();

  const resetDefaults = () => {
    setMonthlySIP(defaultPlan?.totalMonthlySIPNeeded || 50000);
    setExpectedReturn(defaultPlan?.expectedCAGR || 12);
    setHorizonYears(10);
    setStepUpPercent(10);
    setInflationRate(6);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold flex items-center gap-1">
              <Sliders className="w-3 h-3 text-cyan-400" />
              DYNAMIC WHAT-IF SIMULATOR
            </span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1 font-heading">
            Indian Wealth Compounding & Step-Up Sandbox
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Tweak monthly SIP contributions, expected CAGR benchmarks, and annual step-up rates to observe real-time Indian Rupee compounding and goal milestone realization.
          </p>
        </div>

        <button
          onClick={resetDefaults}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg border border-slate-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Strategy Benchmarks</span>
        </button>
      </div>

      {/* Simulator Controls & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 glass-panel p-6 border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Interactive Parameters</span>
          </h3>

          {/* Monthly SIP Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Monthly SIP Contribution:</span>
              <span className="font-bold font-mono text-emerald-400 text-sm">
                {formatINR(monthlySIP)}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="300000"
              step="5000"
              value={monthlySIP}
              onChange={(e) => setMonthlySIP(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹5,000</span>
              <span>₹1.5 Lakh</span>
              <span>₹3.0 Lakh</span>
            </div>
          </div>

          {/* Expected Portfolio Return (CAGR) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Expected Annual Return (CAGR):</span>
              <span className="font-bold font-mono text-cyan-400 text-sm">
                {expectedReturn}% p.a.
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="18"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>6% (Debt/FD)</span>
              <span>12% (Nifty Index)</span>
              <span>18% (Smallcap Alpha)</span>
            </div>
          </div>

          {/* Time Horizon */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Time Horizon (Years):</span>
              <span className="font-bold font-mono text-indigo-300 text-sm">
                {horizonYears} Years ({2025 + horizonYears})
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={horizonYears}
              onChange={(e) => setHorizonYears(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 Year</span>
              <span>12 Years</span>
              <span>25 Years</span>
            </div>
          </div>

          {/* Annual Step-Up Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Annual SIP Step-Up:</span>
              <span className="font-bold font-mono text-amber-400 text-sm">
                {stepUpPercent}% / year
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={stepUpPercent}
              onChange={(e) => setStepUpPercent(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Flat)</span>
              <span>10% (Normal Increment)</span>
              <span>20% (High Growth)</span>
            </div>
          </div>

          {/* Inflation Expectation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Inflation Rate:</span>
              <span className="font-bold font-mono text-rose-400 text-sm">
                {inflationRate}% / year
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>4% (Low)</span>
              <span>6% (Headline CPI)</span>
              <span>10% (Higher Education)</span>
            </div>
          </div>
        </div>

        {/* Results & Trajectory Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Simulation Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-panel p-4 border border-slate-800 bg-slate-900/90">
              <div className="text-[11px] text-slate-400">Projected Final Corpus</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                {formatINR(simulation.finalCorpus, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {formatINR(simulation.finalCorpus)}
              </div>
            </div>

            <div className="glass-panel p-4 border border-slate-800 bg-slate-900/90">
              <div className="text-[11px] text-slate-400">Total Invested Principal</div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {formatINR(simulation.finalInvested, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Includes Step-Up increments
              </div>
            </div>

            <div className="glass-panel p-4 border border-slate-800 bg-slate-900/90">
              <div className="text-[11px] text-slate-400">Wealth Multiplier</div>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
                {simulation.wealthMultiplier}x
              </div>
              <div className="text-[10px] text-cyan-300/80 mt-0.5">
                Est. Gains: {formatINR(simulation.estimatedGains, { compact: true })}
              </div>
            </div>
          </div>

          {/* Yearly Milestones Table */}
          <div className="glass-panel p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-200">Yearly Compounding Progression</h4>
              <span className="text-[10px] text-slate-400">All figures in ₹ INR</span>
            </div>

            <div className="overflow-x-auto max-h-72 overflow-y-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="text-[10px] uppercase bg-slate-950 text-slate-400 sticky top-0">
                  <tr>
                    <th className="py-2 px-3">Year</th>
                    <th className="py-2 px-3">Calendar</th>
                    <th className="py-2 px-3">Principal Invested</th>
                    <th className="py-2 px-3 text-cyan-400">Estimated Gains</th>
                    <th className="py-2 px-3 text-emerald-400">Total Corpus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono">
                  {simulation.yearByYearData.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-800/40">
                      <td className="py-1.5 px-3 font-sans font-bold text-white">Year {row.year}</td>
                      <td className="py-1.5 px-3">{row.calendarYear}</td>
                      <td className="py-1.5 px-3 text-slate-400">{formatINR(row.totalInvested)}</td>
                      <td className="py-1.5 px-3 text-cyan-400">+{formatINR(row.estimatedGains)}</td>
                      <td className="py-1.5 px-3 font-bold text-emerald-400">{formatINR(row.projectedCorpus)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
