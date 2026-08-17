import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { formatINR, calculateNetWorth } from '../utils/formatters';

export default function ExportReportModal({ profile, plan, onClose }) {
  const { totalAssets, totalLiabilities, netWorth } = calculateNetWorth(profile);
  const surplus = profile.monthlySurplus || 100000;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 shadow-2xl flex flex-col rounded-2xl overflow-hidden my-auto">
        {/* Header Controls */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              EXECUTIVE WEALTH REPORT
            </span>
            <span className="text-xs text-slate-400">Ready to print or save as PDF</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1 bg-white text-slate-900 font-sans text-xs">
          {/* Bank / Wealth Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xl">
                ₹
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-slate-950 tracking-tight">
                  FinWise AI Wealth Advisory Services
                </h1>
                <p className="text-[10px] text-slate-600">
                  SEBI Registered Investment Advisory (INA00018942) • Indian Resident Wealth Practice
                </p>
              </div>
            </div>

            <div className="text-right text-[10px] text-slate-500">
              <div>Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              <div>Report Ref: FW-IND-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
          </div>

          {/* Customer Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Customer Name</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{profile.name}</div>
              <div className="text-[10px] text-slate-600">Age: {profile.age} Yrs</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">City & Tax Regime</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{profile.city.split(',')[0]}</div>
              <div className="text-[10px] text-slate-600">{profile.taxRegime}</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Net Worth</div>
              <div className="text-sm font-bold text-emerald-700 font-mono mt-0.5">
                {formatINR(netWorth)}
              </div>
              <div className="text-[10px] text-slate-600">Assets: {formatINR(totalAssets, { compact: true })}</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Monthly Surplus</div>
              <div className="text-sm font-bold text-indigo-700 font-mono mt-0.5">
                {formatINR(surplus)}
              </div>
              <div className="text-[10px] text-slate-600">Capacity: {Math.round((surplus / profile.monthlyIncome) * 100)}%</div>
            </div>
          </div>

          {/* Selected Strategy Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-emerald-50/50">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Recommended Strategy
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{plan.name}</h3>
                <p className="text-[11px] text-slate-600">{plan.tagline}</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500">Expected Portfolio CAGR</div>
                <div className="text-base font-bold font-mono text-emerald-700">{plan.expectedCAGR}% p.a.</div>
                <div className="text-[10px] text-slate-500">Success Probability: {plan.successProbability}%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-200 text-[11px]">
              <div>
                <span className="text-slate-500">Required Monthly SIP:</span>
                <div className="font-bold font-mono text-slate-900">{formatINR(plan.totalMonthlySIPNeeded)}</div>
              </div>
              <div>
                <span className="text-slate-500">With 10% Step-Up SIP:</span>
                <div className="font-bold font-mono text-indigo-700">{formatINR(plan.totalStepUpSIPNeeded)}</div>
              </div>
              <div>
                <span className="text-slate-500">Risk Assessment:</span>
                <div className="font-bold text-slate-900">{plan.riskRating} ({plan.riskScore}/10)</div>
              </div>
              <div>
                <span className="text-slate-500">Surplus Coverage:</span>
                <div className="font-bold text-emerald-700">{plan.surplusCoveragePercent}%</div>
              </div>
            </div>
          </div>

          {/* Goals Milestone Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              Financial Goal Funding Roadmap (₹ INR)
            </h4>

            <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 font-semibold">
                <tr>
                  <th className="py-2 px-3">Goal</th>
                  <th className="py-2 px-3">Target Horizon</th>
                  <th className="py-2 px-3">Inflation Adjusted Target</th>
                  <th className="py-2 px-3">Current Corpus</th>
                  <th className="py-2 px-3">Monthly SIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                {plan.goalCalculations.map((g) => (
                  <tr key={g.id}>
                    <td className="py-2 px-3 font-sans font-medium text-slate-900">{g.title}</td>
                    <td className="py-2 px-3">{g.targetYears} Yrs ({2025 + g.targetYears})</td>
                    <td className="py-2 px-3 font-bold text-slate-900">{formatINR(g.inflationAdjustedValue)}</td>
                    <td className="py-2 px-3 text-slate-600">{formatINR(g.currentCorpusAssigned || 0)}</td>
                    <td className="py-2 px-3 font-bold text-emerald-700">{formatINR(g.requiredSIP)}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Asset Allocation & Recommended Funds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <h5 className="font-bold text-slate-900 mb-2">Target Asset Allocation</h5>
              <ul className="space-y-1 text-[11px] text-slate-700">
                <li>• Large Cap Equity (Nifty 50): <strong>{plan.assetAllocation.largeCapEquity}%</strong></li>
                <li>• Mid & Small Cap Equity: <strong>{plan.assetAllocation.midSmallCapEquity}%</strong></li>
                <li>• Corporate Debt / Banking FDs: <strong>{plan.assetAllocation.corporateDebtFD}%</strong></li>
                <li>• Gold (Sovereign Gold Bonds): <strong>{plan.assetAllocation.goldSGB}%</strong></li>
                <li>• PPF / EPF / National Pension System: <strong>{plan.assetAllocation.ppfNpsGovt}%</strong></li>
                <li>• Emergency Cash / Liquid: <strong>{plan.assetAllocation.liquidEmergency}%</strong></li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <h5 className="font-bold text-slate-900 mb-2">Indian Tax Strategy Checklist</h5>
              <ul className="space-y-1 text-[11px] text-slate-700">
                <li>✓ Section 80CCD(1B): Invest ₹50,000 in NPS for up to ₹15,600 tax relief.</li>
                <li>✓ Budget 2024 LTCG: Harvest ₹1.25 Lakhs annual tax-free gains every March.</li>
                <li>✓ SGB Capital Gains: 100% Tax-exempt on 8-year maturity redemption.</li>
                <li>✓ Emergency Fund: 6 months living expenses parked in liquid sweep FD.</li>
              </ul>
            </div>
          </div>

          {/* Regulatory SEBI Disclaimer */}
          <div className="pt-3 border-t border-slate-200 text-[9px] text-slate-500 leading-normal">
            <strong>SEBI & RBI Regulatory Notice:</strong> Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing. Historical 20-year past trend data (Nifty 50, Gold INR, PPF, Debt) is provided for simulated educational modeling and does not guarantee future returns.
          </div>
        </div>
      </div>
    </div>
  );
}
