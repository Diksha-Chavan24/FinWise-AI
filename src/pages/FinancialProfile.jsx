import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  Wallet, 
  Building2, 
  Coins, 
  TrendingUp, 
  PiggyBank, 
  Landmark, 
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Edit3
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import NetWorthOverview from '../components/NetWorthOverview';
import { formatINR, calculateNetWorth } from '../utils/formatters';

export default function FinancialProfile() {
  const navigate = useNavigate();
  const { selectedProfile, handleSaveCustomProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);

  // Form state initialized with selected profile
  const [name, setName] = useState(selectedProfile.name);
  const [age, setAge] = useState(selectedProfile.age);
  const [city, setCity] = useState(selectedProfile.city);
  const [occupation, setOccupation] = useState(selectedProfile.occupation);
  const [taxRegime, setTaxRegime] = useState(selectedProfile.taxRegime);
  const [monthlyIncome, setMonthlyIncome] = useState(selectedProfile.monthlyIncome);
  const [monthlyExpenses, setMonthlyExpenses] = useState(selectedProfile.monthlyExpenses);
  
  const nw = selectedProfile.existingNetWorth || {};
  const [mutualFunds, setMutualFunds] = useState(nw.mutualFundsEquity || 0);
  const [directStocks, setDirectStocks] = useState(nw.directStocks || 0);
  const [epfPpf, setEpfPpf] = useState(nw.epfPpf || 0);
  const [goldSgb, setGoldSgb] = useState(nw.goldSgb || 0);
  const [savingsAccount, setSavingsAccount] = useState(nw.savingsAccount || 0);
  const [realEstate, setRealEstate] = useState(nw.realEstate || 0);
  const [liabilitiesLoans, setLiabilitiesLoans] = useState(nw.liabilitiesLoans || 0);

  const onSave = (e) => {
    e.preventDefault();
    const updated = {
      ...selectedProfile,
      name,
      age: Number(age),
      city,
      occupation,
      taxRegime,
      monthlyIncome: Number(monthlyIncome),
      monthlyExpenses: Number(monthlyExpenses),
      monthlySurplus: Number(monthlyIncome) - Number(monthlyExpenses),
      existingNetWorth: {
        savingsAccount: Number(savingsAccount),
        mutualFundsEquity: Number(mutualFunds),
        directStocks: Number(directStocks),
        epfPpf: Number(epfPpf),
        goldSgb: Number(goldSgb),
        realEstate: Number(realEstate),
        liabilitiesLoans: Number(liabilitiesLoans)
      }
    };
    handleSaveCustomProfile(updated);
    setIsEditing(false);
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-400" />
              CUSTOMER FINANCIAL PROFILE & BALANCE SHEET
            </span>
          </div>
          <h1 className="text-lg font-bold text-white mt-1 font-heading">
            {selectedProfile.name}'s Financial Profile
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Resident of <strong className="text-white">{selectedProfile.city}</strong> • {selectedProfile.occupation} • {selectedProfile.taxRegime}
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2 rounded-lg border border-slate-700 transition"
        >
          <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile Data'}</span>
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={onSave} className="glass-panel p-6 border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400">Update Profile Details</h3>
            <span className="text-xs text-slate-400">Values in ₹ INR</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Monthly In-Hand Income (₹)</label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-emerald-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Monthly Expenses (₹)</label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-rose-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Tax Regime</label>
              <select
                value={taxRegime}
                onChange={(e) => setTaxRegime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              >
                <option value="New Regime (Sec 115BAC)">New Regime (Sec 115BAC)</option>
                <option value="Old Regime (80C, 80D, HRA)">Old Regime (80C, 80D, HRA)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 mb-2">Asset Breakdown (₹ INR)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Mutual Funds (₹)</label>
                <input
                  type="number"
                  value={mutualFunds}
                  onChange={(e) => setMutualFunds(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Direct Stocks (₹)</label>
                <input
                  type="number"
                  value={directStocks}
                  onChange={(e) => setDirectStocks(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">EPF / PPF (₹)</label>
                <input
                  type="number"
                  value={epfPpf}
                  onChange={(e) => setEpfPpf(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Gold / SGB (₹)</label>
                <input
                  type="number"
                  value={goldSgb}
                  onChange={(e) => setGoldSgb(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Savings / FD (₹)</label>
                <input
                  type="number"
                  value={savingsAccount}
                  onChange={(e) => setSavingsAccount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Real Estate (₹)</label>
                <input
                  type="number"
                  value={realEstate}
                  onChange={(e) => setRealEstate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Liabilities / Loans (₹)</label>
                <input
                  type="number"
                  value={liabilitiesLoans}
                  onChange={(e) => setLiabilitiesLoans(e.target.value)}
                  className="w-full bg-slate-950 border border-rose-900/50 rounded-lg px-2.5 py-1.5 text-rose-400 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      {/* Net Worth Overview Component */}
      <NetWorthOverview
        profile={selectedProfile}
        onGeneratePlan={() => navigate('/plans')}
      />
    </main>
  );
}
