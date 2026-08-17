import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Plus, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  HeartPulse,
  Palmtree,
  Briefcase
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import { calculateInflationAdjustedGoal, calculateRequiredSIP } from '../engine/financialEngine';

export default function FinancialGoals() {
  const navigate = useNavigate();
  const { selectedProfile, handleSaveCustomProfile, activePlan } = useAppContext();
  
  const [goals, setGoals] = useState(selectedProfile.goals || []);
  const [showAddForm, setShowAddForm] = useState(false);

  // New goal state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Real Estate');
  const [newTarget, setNewTarget] = useState(2500000);
  const [newYears, setNewYears] = useState(5);
  const [newPriority, setNewPriority] = useState('High');
  const [newCorpus, setNewCorpus] = useState(200000);

  const saveUpdatedGoals = (updatedGoals) => {
    setGoals(updatedGoals);
    const updatedProfile = {
      ...selectedProfile,
      goals: updatedGoals
    };
    handleSaveCustomProfile(updatedProfile);
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal = {
      id: 'goal-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      targetAmount: Number(newTarget),
      targetYears: Number(newYears),
      priority: newPriority,
      currentCorpusAssigned: Number(newCorpus)
    };

    const updated = [...goals, newGoal];
    saveUpdatedGoals(updated);
    setNewTitle('');
    setShowAddForm(false);
  };

  const handleDeleteGoal = (id) => {
    const updated = goals.filter((g) => g.id !== id);
    saveUpdatedGoals(updated);
  };

  // Metrics
  const totalPresentValue = goals.reduce((a, b) => a + (b.targetAmount || 0), 0);
  const totalAssignedCorpus = goals.reduce((a, b) => a + (b.currentCorpusAssigned || 0), 0);
  const totalFutureValue = goals.reduce((a, b) => a + calculateInflationAdjustedGoal(b).futureValue, 0);

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'education': return GraduationCap;
      case 'healthcare': return HeartPulse;
      case 'real estate': return Building;
      case 'travel & lifestyle': return Palmtree;
      case 'business & startup': return Briefcase;
      default: return Target;
    }
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold flex items-center gap-1">
              <Target className="w-3 h-3 text-cyan-400" />
              FINANCIAL GOALS & MILESTONE ROADMAP
            </span>
          </div>
          <h1 className="text-lg font-bold text-white mt-1 font-heading">
            Target Milestones for {selectedProfile.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Inflation-adjusted projections using Indian higher education (9.5%), housing (7.5%), and retirement inflation rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Goal</span>
          </button>
          <button
            onClick={() => navigate('/plans')}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2 rounded-lg border border-slate-700 transition"
          >
            <span>View Plans</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 border border-slate-800 bg-slate-900/80">
          <div className="text-[11px] text-slate-400 font-medium">Total Present Value Needed</div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {formatINR(totalPresentValue, { compact: true })}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">{goals.length} Active Goals</div>
        </div>

        <div className="glass-panel p-4 border border-slate-800 bg-slate-900/80">
          <div className="text-[11px] text-slate-400 font-medium">Inflation-Adjusted Target Value</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
            {formatINR(totalFutureValue, { compact: true })}
          </div>
          <div className="text-[10px] text-emerald-500/80 mt-0.5">Real purchasing power needed</div>
        </div>

        <div className="glass-panel p-4 border border-slate-800 bg-slate-900/80">
          <div className="text-[11px] text-slate-400 font-medium">Corpus Already Assigned</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
            {formatINR(totalAssignedCorpus, { compact: true })}
          </div>
          <div className="text-[10px] text-cyan-300/80 mt-0.5">
            {totalPresentValue > 0 ? Math.round((totalAssignedCorpus / totalPresentValue) * 100) : 0}% Funded
          </div>
        </div>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <form onSubmit={handleAddGoal} className="glass-panel p-5 border border-emerald-500/30 space-y-4 bg-slate-900/90">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Add New Milestone
            </h3>
            <span className="text-[11px] text-slate-400">Values in ₹ INR</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">Goal Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Buy 3BHK Flat in Whitefield, Child Higher Studies at IIT"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              >
                <option value="Real Estate">Real Estate</option>
                <option value="Education">Education</option>
                <option value="Retirement">Retirement</option>
                <option value="Emergency">Emergency</option>
                <option value="Travel & Lifestyle">Travel & Lifestyle</option>
                <option value="Business & Startup">Business & Startup</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Target Amount Today (₹)</label>
              <input
                type="number"
                step="50000"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-emerald-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Target Horizon (Years)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={newYears}
                onChange={(e) => setNewYears(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md"
            >
              Save Milestone
            </button>
          </div>
        </form>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const inflationData = calculateInflationAdjustedGoal(goal);
          const sipData = calculateRequiredSIP(
            inflationData.futureValue,
            goal.currentCorpusAssigned || 0,
            goal.targetYears || 5,
            activePlan?.expectedCAGR || 12
          );
          const assigned = goal.currentCorpusAssigned || 0;
          const progressPct = Math.min(100, Math.round((assigned / goal.targetAmount) * 100));
          const Icon = getCategoryIcon(goal.category);

          return (
            <div key={goal.id} className="glass-panel p-5 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300">
                      {goal.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      goal.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      goal.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {goal.priority}
                    </span>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                      title="Delete goal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mt-3 line-clamp-2">
                  {goal.title}
                </h3>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Target Horizon:</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {goal.targetYears} Years ({2025 + goal.targetYears})
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>Present Value:</span>
                    <span className="font-mono text-slate-300">{formatINR(goal.targetAmount)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 font-semibold bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span>Inflation Adjusted ({inflationData.inflationRate}%):</span>
                    <span className="font-mono text-emerald-400">{formatINR(inflationData.futureValue)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800 font-mono">
                    <span className="text-[11px] font-sans text-slate-400">Required Monthly SIP:</span>
                    <span className="font-bold text-cyan-400">{formatINR(sipData.monthlySIP)}/mo</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Assigned: {formatINR(assigned)}</span>
                  <span className="font-semibold text-slate-200">{progressPct}% Funded</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" 
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
