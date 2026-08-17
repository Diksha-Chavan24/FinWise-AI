import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight, ShieldCheck, IndianRupee } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const { handleSaveCustomProfile, handleLogin } = useAppContext();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(29);
  const [city, setCity] = useState('Bengaluru, Karnataka');
  const [income, setIncome] = useState(150000);
  const [risk, setRisk] = useState('Moderate');

  const onRegister = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProfile = {
      id: 'custom-' + Date.now(),
      name: name.trim(),
      avatar: '👤',
      age: Number(age),
      city,
      occupation: 'Professional / Business',
      taxRegime: 'New Regime (Sec 115BAC)',
      monthlyIncome: Number(income),
      monthlyExpenses: Math.round(Number(income) * 0.45),
      monthlySurplus: Math.round(Number(income) * 0.55),
      existingNetWorth: {
        savingsAccount: 250000,
        mutualFundsEquity: 800000,
        directStocks: 300000,
        epfPpf: 350000,
        goldSgb: 150000,
        realEstate: 0,
        liabilitiesLoans: 0
      },
      riskAppetite: risk,
      goals: [
        {
          id: 'goal-1',
          title: 'Emergency Fund & Milestone Accumulation',
          category: 'Emergency',
          targetAmount: 1000000,
          targetYears: 3,
          priority: 'High',
          currentCorpusAssigned: 200000
        },
        {
          id: 'goal-2',
          title: 'Retirement & Long-Term Compounding Corpus',
          category: 'Retirement',
          targetAmount: 30000000,
          targetYears: 20,
          priority: 'Medium',
          currentCorpusAssigned: 500000
        }
      ],
      notes: 'Registered user on FinWise AI.'
    };

    handleSaveCustomProfile(newProfile);
    handleLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-slate-950 text-xl font-heading shadow-md shadow-emerald-500/20">
            ₹
          </div>
          <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
            FinWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold text-white font-heading">
          Create your Indian Resident Profile
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Get started with personalized AI financial planning in minutes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10 px-4">
        <div className="glass-panel p-6 sm:p-8 border border-slate-800 space-y-5">
          <form onSubmit={onRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen, Rohan Joshi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  min="18"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Bengaluru, Karnataka">Bengaluru</option>
                  <option value="Mumbai, Maharashtra">Mumbai</option>
                  <option value="Pune, Maharashtra">Pune</option>
                  <option value="Delhi-NCR">Delhi-NCR</option>
                  <option value="Hyderabad, Telangana">Hyderabad</option>
                  <option value="Chennai, Tamil Nadu">Chennai</option>
                  <option value="Ahmedabad, Gujarat">Ahmedabad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Risk Profile
                </label>
                <select
                  value={risk}
                  onChange={(e) => setRisk(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Conservative">Conservative</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Monthly In-Hand Income (₹ INR)
              </label>
              <input
                type="number"
                step="5000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              <span>Create Account & View Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
