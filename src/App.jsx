import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FinancialProfile from './pages/FinancialProfile';
import RiskAssessment from './pages/RiskAssessment';
import FinancialGoals from './pages/FinancialGoals';
import PersonalizedPlans from './pages/PersonalizedPlans';
import WhatIfSimulator from './pages/WhatIfSimulator';
import AIAssistant from './pages/AIAssistant';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<FinancialProfile />} />
            <Route path="/risk-assessment" element={<RiskAssessment />} />
            <Route path="/goals" element={<FinancialGoals />} />
            <Route path="/plans" element={<PersonalizedPlans />} />
            <Route path="/simulator" element={<WhatIfSimulator />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="font-bold text-slate-400">FinWise AI</span> • GenAI Personalized Financial Planning for Indian Citizens
            </div>
            <div>
              SEBI Guidelines & RBI Regulatory Compliant • Currency in ₹ INR
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
