import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Coins, 
  Building, 
  Landmark, 
  Percent,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  ASSET_CLASSES, 
  YEARLY_HISTORICAL_DATA, 
  CRISIS_STRESS_TESTS, 
  INFLATION_BENCHMARKS 
} from '../data/indianMarketTrends';
import { formatPercent } from '../utils/formatters';

export default function MarketTrendsView() {
  const [selectedAsset, setSelectedAsset] = useState('nifty50');
  const [activeCrisisTab, setActiveCrisisTab] = useState(0);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                INDIAN CAPITAL MARKETS BENCHMARK (2004 - 2024)
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1 font-heading">
              Past Trend Data & Multi-Decade Asset Behavior
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              Our GenAI Wealth Engine analyzes 20+ years of historical data from the National Stock Exchange (NSE), 
              Reserve Bank of India (RBI), Indian Bullion & Jewellers Association (IBJA), and National Housing Bank (NHB) 
              to optimize risk-adjusted returns and prevent capital depletion.
            </p>
          </div>
        </div>
      </div>

      {/* Asset Class CAGR & Risk Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(ASSET_CLASSES).map((asset) => {
          const isSelected = selectedAsset === asset.id;
          return (
            <div 
              key={asset.id} 
              onClick={() => setSelectedAsset(asset.id)}
              className={`glass-panel p-4 cursor-pointer transition-all border ${
                isSelected 
                  ? 'border-emerald-500/60 bg-slate-900/90 shadow-lg shadow-emerald-500/10' 
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: asset.color }} 
                  />
                  <span className="text-xs font-bold text-white">{asset.shortName}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {asset.riskLevel} Risk
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-center bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div>
                  <div className="text-[10px] text-slate-400">20Y CAGR</div>
                  <div className="text-sm font-bold font-mono text-emerald-400">
                    +{asset.cagr20Yr}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">10Y CAGR</div>
                  <div className="text-sm font-bold font-mono text-cyan-400">
                    +{asset.cagr10Yr}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Volatility (σ)</div>
                  <div className="text-sm font-bold font-mono text-slate-300">
                    {asset.volatility}%
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-slate-400 line-clamp-2">
                {asset.description}
              </div>

              <div className="mt-2 text-[10px] text-amber-400/90 bg-amber-500/5 p-1.5 rounded border border-amber-500/10">
                <strong>Taxation:</strong> {asset.taxation}
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical Performance Matrix & Crisis Stress-Testing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Yearly Return Trajectory Table */}
        <div className="lg:col-span-7 glass-panel p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Annual Returns by Asset Class (% in INR)</span>
              </h3>
              <p className="text-[11px] text-slate-400">Historical performance across major Indian economic cycles.</p>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">2004 - 2024</span>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto pr-1">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="text-[10px] uppercase bg-slate-900 text-slate-400 sticky top-0">
                <tr>
                  <th className="py-2 px-2.5">Year</th>
                  <th className="py-2 px-2 text-emerald-400">Nifty 50</th>
                  <th className="py-2 px-2 text-amber-400">Gold INR</th>
                  <th className="py-2 px-2 text-indigo-400">Debt/FD</th>
                  <th className="py-2 px-2 text-purple-400">PPF</th>
                  <th className="py-2 px-2 text-pink-400">Real Estate</th>
                  <th className="py-2 px-2 text-slate-400">CPI</th>
                  <th className="py-2 px-2">Key Event</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {YEARLY_HISTORICAL_DATA.slice().reverse().map((row) => (
                  <tr key={row.year} className="hover:bg-slate-900/60 transition">
                    <td className="py-1.5 px-2.5 font-bold text-white">{row.year}</td>
                    <td className={`py-1.5 px-2 font-semibold ${row.nifty >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {row.nifty > 0 ? `+${row.nifty}%` : `${row.nifty}%`}
                    </td>
                    <td className={`py-1.5 px-2 ${row.gold >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {row.gold > 0 ? `+${row.gold}%` : `${row.gold}%`}
                    </td>
                    <td className="py-1.5 px-2 text-indigo-300">+{row.debt}%</td>
                    <td className="py-1.5 px-2 text-purple-300">+{row.ppf}%</td>
                    <td className="py-1.5 px-2 text-pink-300">+{row.realEstate}%</td>
                    <td className="py-1.5 px-2 text-slate-400">{row.cpi}%</td>
                    <td className="py-1.5 px-2 text-[10px] font-sans text-slate-400 max-w-[140px] truncate" title={row.event}>
                      {row.event}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Crisis Stress Tests & Inflation Insights */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Historical Crisis Stress-Tests in India</span>
            </h3>

            <div className="space-y-3">
              {CRISIS_STRESS_TESTS.map((crisis, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveCrisisTab(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    activeCrisisTab === idx 
                      ? 'bg-slate-900 border-amber-500/40 shadow-sm' 
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{crisis.name}</span>
                    <span className="text-[10px] text-cyan-400">Recovery: {crisis.recoveryTimeMonths} Mo</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2 font-mono text-center text-xs">
                    <div className="bg-slate-950 p-1 rounded text-rose-400 font-bold">
                      Nifty: {crisis.niftyDrawdown}%
                    </div>
                    <div className="bg-slate-950 p-1 rounded text-amber-400 font-bold">
                      Gold: {crisis.goldPerformance}%
                    </div>
                    <div className="bg-slate-950 p-1 rounded text-indigo-400 font-bold">
                      Debt: {crisis.debtPerformance}%
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2">
                    {crisis.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* India Specific Inflation Benchmarks */}
          <div className="glass-panel p-4 border border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>India-Specific Category Inflation Rates</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Education Inflation</div>
                <div className="text-sm font-bold text-rose-400">~{INFLATION_BENCHMARKS.educationInflationIndia}% / yr</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Healthcare Inflation</div>
                <div className="text-sm font-bold text-rose-400">~{INFLATION_BENCHMARKS.healthcareInflationIndia}% / yr</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Lifestyle Inflation</div>
                <div className="text-sm font-bold text-amber-400">~{INFLATION_BENCHMARKS.lifestyleInflationIndia}% / yr</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Current Headline CPI</div>
                <div className="text-sm font-bold text-emerald-400">~{INFLATION_BENCHMARKS.currentCPI}% / yr</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
