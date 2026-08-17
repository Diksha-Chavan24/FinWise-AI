import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, FileDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PlanComparisonView from '../components/PlanComparisonView';
import PlanDetailModal from '../components/PlanDetailModal';
import ExportReportModal from '../components/ExportReportModal';

export default function PersonalizedPlans() {
  const { 
    selectedProfile, 
    generatedPlans, 
    activePlan, 
    setSelectedPlanId 
  } = useAppContext();

  const [detailModalPlan, setDetailModalPlan] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#06b6d4', '#f59e0b']
    });
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-3.5 py-2 rounded-lg border border-slate-700 transition"
        >
          <FileDown className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export Plan PDF</span>
        </button>
      </div>

      {/* Plan Comparison View */}
      <PlanComparisonView
        plans={generatedPlans}
        selectedPlan={activePlan}
        onSelectPlan={handleSelectPlan}
        onOpenPlanDetails={(plan) => setDetailModalPlan(plan)}
        profile={selectedProfile}
      />

      {/* Plan Detail Modal */}
      {detailModalPlan && (
        <PlanDetailModal
          plan={detailModalPlan}
          profile={selectedProfile}
          onClose={() => setDetailModalPlan(null)}
          onSelectPlan={handleSelectPlan}
          isSelected={detailModalPlan.id === activePlan?.id}
        />
      )}

      {/* Export Report Modal */}
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
