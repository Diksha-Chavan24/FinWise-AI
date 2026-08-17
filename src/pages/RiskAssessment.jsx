import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const QUESTIONS = [
  {
    id: 'q1',
    title: 'Investment Horizon & Liquidity Needs',
    desc: 'When do you anticipate needing access to the majority of your invested capital?',
    options: [
      { text: 'Within 1 to 3 years (Short term / Emergency readiness)', points: 1 },
      { text: 'In 3 to 7 years (Medium term milestones like home downpayment)', points: 2 },
      { text: 'More than 7 to 15+ years (Long term wealth & retirement)', points: 3 }
    ]
  },
  {
    id: 'q2',
    title: 'Reaction to Sudden Market Correction',
    desc: 'If the Indian stock market (Nifty 50) falls by 25% in 3 months (like in March 2020), what would you do?',
    options: [
      { text: 'Panic and redeem all equity investments into bank Fixed Deposits', points: 1 },
      { text: 'Hold existing funds, pause new SIPs, and wait for recovery', points: 2 },
      { text: 'Invest additional lump sum aggressively at lower NAV valuations', points: 3 }
    ]
  },
  {
    id: 'q3',
    title: 'Primary Investment Objective',
    desc: 'What is the primary goal for your investment portfolio in India?',
    options: [
      { text: '100% Capital preservation with guaranteed sovereign returns (PPF/FD)', points: 1 },
      { text: 'Moderate wealth growth while beating domestic CPI inflation (~5-6%)', points: 2 },
      { text: 'Maximum long-term capital compounding and multi-bagger wealth creation', points: 3 }
    ]
  },
  {
    id: 'q4',
    title: 'Income Stability & Dependents',
    desc: 'How stable is your current monthly income and dependent family responsibility?',
    options: [
      { text: 'Single breadwinner with multiple dependents and fluctuating income', points: 1 },
      { text: 'Steady salaried job or profitable business with moderate commitments', points: 2 },
      { text: 'Dual-income household with no urgent debt obligations or high surplus', points: 3 }
    ]
  },
  {
    id: 'q5',
    title: 'Knowledge & Experience with Volatile Assets',
    desc: 'What is your familiarity with Direct Equity, Smallcap Mutual Funds, and SGBs?',
    options: [
      { text: 'Beginner: Prefer fixed return bank deposits and Post Office schemes', points: 1 },
      { text: 'Intermediate: Invest regularly in Nifty Large & Flexicap Index SIPs', points: 2 },
      { text: 'Advanced: Actively invest in Mid/Smallcaps, ETFs, and sectoral themes', points: 3 }
    ]
  }
];

export default function RiskAssessment() {
  const navigate = useNavigate();
  const { selectedProfile, handleSaveCustomProfile } = useAppContext();
  
  const [answers, setAnswers] = useState({
    q1: 2,
    q2: selectedProfile.riskAppetite === 'Aggressive' ? 3 : selectedProfile.riskAppetite === 'Conservative' ? 1 : 2,
    q3: selectedProfile.riskAppetite === 'Aggressive' ? 3 : selectedProfile.riskAppetite === 'Conservative' ? 1 : 2,
    q4: 2,
    q5: 2
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Compute Score (5 to 15)
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  
  let riskProfile = 'Moderate';
  let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let description = 'Optimal balance of equity growth (55%) and fixed income stability (45%) for consistent inflation-beating returns.';

  if (totalScore <= 8) {
    riskProfile = 'Conservative';
    badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    description = 'Capital preservation focused. Emphasizes Sovereign G-Secs, PPF (7.1%), Bank FDs, and Gold with minimal equity drawdowns.';
  } else if (totalScore >= 12) {
    riskProfile = 'Aggressive';
    badgeColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    description = 'High alpha seeker. Heavy equity weighting (70% Large/Mid/Smallcap) aiming for maximum 14-16% compounding over 7+ years.';
  }

  const handleApplyRisk = () => {
    const updated = {
      ...selectedProfile,
      riskAppetite: riskProfile
    };
    handleSaveCustomProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/plans');
    }, 800);
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              SEBI RISK TOLERANCE & CAPACITY ASSESSMENT
            </span>
          </div>
          <h1 className="text-lg font-bold text-white mt-1 font-heading">
            Personalized Risk Profiler for {selectedProfile.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Answer the 5 behavioral questions below to calculate your risk tolerance and align your asset allocation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Questionnaire Column */}
        <div className="lg:col-span-8 space-y-4">
          {QUESTIONS.map((q, idx) => (
            <div key={q.id} className="glass-panel p-5 border border-slate-800 space-y-3">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">{q.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{q.desc}</p>
                </div>
              </div>

              <div className="space-y-2 pt-1 pl-7">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[q.id] === opt.points;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => setAnswers({ ...answers, [q.id]: opt.points })}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-white font-medium shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{opt.text}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-400 bg-emerald-500' : 'border-slate-700'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 border border-slate-800 sticky top-24 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Assessment Outcome
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                Score: {totalScore} / 15
              </span>
            </div>

            {/* Risk Badge */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}`}>
                {riskProfile} Risk Appetite
              </span>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {description}
              </p>
            </div>

            {/* Score Breakdown Meter */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Conservative (5-8)</span>
                <span>Moderate (9-11)</span>
                <span>Aggressive (12-15)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    riskProfile === 'Conservative' ? 'bg-amber-400' :
                    riskProfile === 'Moderate' ? 'bg-emerald-400' : 'bg-cyan-400'
                  }`}
                  style={{ width: `${Math.round(((totalScore - 5) / 10) * 100)}%` }}
                />
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={handleApplyRisk}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved! Redirecting to Plans...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Apply & Regenerate Plans</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
