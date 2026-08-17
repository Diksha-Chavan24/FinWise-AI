import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Target, 
  Wallet, 
  IndianRupee, 
  MapPin, 
  Briefcase, 
  Plus, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

const INDIAN_CITIES = [
  'Bengaluru, Karnataka',
  'Mumbai, Maharashtra',
  'Pune, Maharashtra',
  'Delhi-NCR (Gurugram / Noida)',
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu',
  'Ahmedabad, Gujarat',
  'Kolkata, West Bengal',
  'Jaipur, Rajasthan',
  'Kochi, Kerala'
];

export default function ProfileBuilderModal({ onClose, onSaveProfile }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(30);
  const [city, setCity] = useState(INDIAN_CITIES[0]);
  const [occupation, setOccupation] = useState('Senior Product Engineer');
  const [taxRegime, setTaxRegime] = useState('New Regime (Sec 115BAC)');
  const [monthlyIncome, setMonthlyIncome] = useState(180000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(70000);
  const [riskAppetite, setRiskAppetite] = useState('Moderate');

  // Existing Net Worth in INR
  const [savingsAccount, setSavingsAccount] = useState(300000);
  const [mutualFundsEquity, setMutualFundsEquity] = useState(1200000);
  const [directStocks, setDirectStocks] = useState(400000);
  const [epfPpf, setEpfPpf] = useState(500000);
  const [goldSgb, setGoldSgb] = useState(250000);
  const [realEstate, setRealEstate] = useState(0);
  const [liabilitiesLoans, setLiabilitiesLoans] = useState(0);

  // Financial Goals
  const [goals, setGoals] = useState([
    {
      id: 'custom-goal-1',
      title: 'Buy Residential Apartment in Indian Metro',
      category: 'Real Estate',
      targetAmount: 9000000,
      targetYears: 5,
      priority: 'High',
      currentCorpusAssigned: 500000
    },
    {
      id: 'custom-goal-2',
      title: 'Long Term Retirement & FIRE Corpus',
      category: 'Retirement',
      targetAmount: 50000000,
      targetYears: 18,
      priority: 'Medium',
      currentCorpusAssigned: 1000000
    }
  ]);

  const addGoal = () => {
    setGoals((prev) => [
      ...prev,
      {
        id: 'custom-goal-' + Date.now(),
        title: 'New Financial Milestone',
        category: 'Wealth Accumulation',
        targetAmount: 2500000,
        targetYears: 5,
        priority: 'High',
        currentCorpusAssigned: 200000
      }
    ]);
  };

  const updateGoal = (index, field, value) => {
    setGoals((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const removeGoal = (index) => {
    setGoals((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProfile = {
      id: 'custom-' + Date.now(),
      name: name.trim(),
      avatar: '🇮🇳',
      age: Number(age),
      city,
      occupation,
      taxRegime,
      monthlyIncome: Number(monthlyIncome),
      monthlyExpenses: Number(monthlyExpenses),
      monthlySurplus: Number(monthlyIncome) - Number(monthlyExpenses),
      existingNetWorth: {
        savingsAccount: Number(savingsAccount),
        mutualFundsEquity: Number(mutualFundsEquity),
        directStocks: Number(directStocks),
        epfPpf: Number(epfPpf),
        goldSgb: Number(goldSgb),
        realEstate: Number(realEstate),
        liabilitiesLoans: Number(liabilitiesLoans)
      },
      riskAppetite,
      goals,
      notes: 'Custom Indian Resident Profile created by user.'
    };

    onSaveProfile(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 shadow-2xl flex flex-col rounded-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-heading">
                Create Indian Resident Customer Profile
              </h2>
              <p className="text-xs text-slate-400">
                All values configured strictly in Indian Rupees (₹ INR) for domestic residents.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Personal Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              <span>1. Indian Resident Demographics</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen, Arjun Kapoor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="18"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Resident City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  {INDIAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Occupation / Profession</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Tax Regime</label>
                <select
                  value={taxRegime}
                  onChange={(e) => setTaxRegime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="New Regime (Sec 115BAC)">New Regime (Sec 115BAC)</option>
                  <option value="Old Regime (80C, 80D, HRA)">Old Regime (80C, 80D, HRA)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Risk Appetite</label>
                <select
                  value={riskAppetite}
                  onChange={(e) => setRiskAppetite(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Conservative">Conservative (Low Risk / Debt focus)</option>
                  <option value="Moderate">Moderate (Balanced Alpha)</option>
                  <option value="Aggressive">Aggressive (High Equity / Smallcap)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cashflow */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-cyan-400" />
              <span>2. Monthly Inflow & Outflow (₹ INR)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Monthly In-Hand Income (₹)</label>
                <input
                  type="number"
                  step="5000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Monthly Living Expenses (₹)</label>
                <input
                  type="number"
                  step="5000"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Calculated Monthly Surplus</label>
                <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-emerald-400 font-bold font-mono">
                  {formatINR(monthlyIncome - monthlyExpenses)}
                </div>
              </div>
            </div>
          </div>

          {/* Existing Net Worth Assets */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-indigo-400" />
              <span>3. Existing Net Worth Assets (₹ INR)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Mutual Funds / Equity (₹)</label>
                <input
                  type="number"
                  value={mutualFundsEquity}
                  onChange={(e) => setMutualFundsEquity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Direct Stocks / Demat (₹)</label>
                <input
                  type="number"
                  value={directStocks}
                  onChange={(e) => setDirectStocks(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">EPF / PPF / NPS (₹)</label>
                <input
                  type="number"
                  value={epfPpf}
                  onChange={(e) => setEpfPpf(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Gold / SGB (₹)</label>
                <input
                  type="number"
                  value={goldSgb}
                  onChange={(e) => setGoldSgb(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Savings Account / FD (₹)</label>
                <input
                  type="number"
                  value={savingsAccount}
                  onChange={(e) => setSavingsAccount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Liabilities / Home Loan (₹)</label>
                <input
                  type="number"
                  value={liabilitiesLoans}
                  onChange={(e) => setLiabilitiesLoans(e.target.value)}
                  className="w-full bg-slate-950 border border-rose-900/50 rounded-lg px-3 py-2 text-rose-400 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Financial Goals List */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>4. Financial Goals & Target Timelines</span>
              </h3>
              <button
                type="button"
                onClick={addGoal}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Goal</span>
              </button>
            </div>

            <div className="space-y-3">
              {goals.map((g, idx) => (
                <div key={g.id || idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      placeholder="Goal Title (e.g. Buy 3BHK Flat, Child IIT Degree)"
                      value={g.title}
                      onChange={(e) => updateGoal(idx, 'title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                    />
                  </div>

                  <div className="w-36">
                    <input
                      type="number"
                      placeholder="Target ₹"
                      value={g.targetAmount}
                      onChange={(e) => updateGoal(idx, 'targetAmount', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-emerald-400 font-mono"
                    />
                  </div>

                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Years"
                      min="1"
                      max="30"
                      value={g.targetYears}
                      onChange={(e) => updateGoal(idx, 'targetYears', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-cyan-400 font-mono"
                      title="Years to achieve"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeGoal(idx)}
                    disabled={goals.length <= 1}
                    className="p-1.5 text-slate-500 hover:text-rose-400 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 -mx-6 -mb-6 mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate GenAI Wealth Plans</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
