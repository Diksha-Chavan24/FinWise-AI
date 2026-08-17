# FinWise AI 💰

AI-Powered Personalized Finance Planner built with React, Vite, Tailwind CSS, and React Router.

FinWise AI is an Indian fintech web application designed to create personalized financial planning experiences based on a customer's financial profile, risk tolerance, and financial goals.

---

## ✨ Features

- 🏠 **Landing Page**: Modern hero section with fintech highlights & regulatory compliance notices
- 🔐 **Authentication UI**: Login & Registration pages with 1-click Indian demo account access
- 📊 **Financial Dashboard**: Central control center with Financial Health Score (`A+` to `D`), Hidden Risk Detection, Goal Conflict alerts, and KPI metric cards
- 👤 **Financial Profile & Balance Sheet**: Interactive asset editor (Mutual Funds, Direct Stocks, EPF/PPF, SGB Gold, Real Estate, Debt)
- 🛡️ **Risk Assessment**: 5-question SEBI-aligned interactive risk profiler calculating Conservative, Moderate, or Aggressive score
- 🎯 **Financial Goals Roadmap**: Milestone tracker with Indian inflation adjustments (Education @9.5%, Real Estate @7.5%) and backward SIP calculations
- 📋 **Personalized Financial Plans**: 3 distinct multi-strategy plans (*Balanced Alpha*, *Wealth Accelerator*, *Capital Shield*) with 15-year wealth trajectory, Monte Carlo resilience score, and PDF export
- 🔮 **What-If Compounding Simulator**: Interactive Step-Up SIP sandbox + 20-year Indian market trend benchmarks (2004–2024: Nifty 50, Gold, PPF, Debt, CPI)
- 🤖 **GenAI Financial Advisor**: Live wealth advisor chat connected to Google Gemini free API (`gemini-2.0-flash`) with deterministic Indian finance reasoning fallback
- 📈 **100-Entries Indian Dataset**: Preloaded CSV database with 100 diverse Indian resident profiles across tier-1 & tier-2 cities

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS 3, React Router 6, Lucide React, Canvas Confetti
- **GenAI Layer**: `@google/generative-ai` (Gemini 2.0 Free Tier)
- **Math Engine**: Deterministic Indian Financial Reasoning Engine (Inflation modeling, Step-Up SIP, Monte Carlo stress testing, Budget 2024 tax optimization)
- **Data**: Indian Market Benchmark Dataset (2004–2024), 100-Entries Indian Resident CSV dataset

---

## 💻 Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional for Gemini API)
Copy `.env.example` to `.env` and add your free Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_free_gemini_api_key_here
```
*(Get a free API key at [Google AI Studio](https://aistudio.google.com/apikey). If not provided, the app operates automatically on built-in reasoning fallback.)*

### 3. Start the Development Server
```bash
npm run dev
```

Open `http://localhost:5174/` or `http://localhost:5173/` in your browser.

---

## 📄 License

Intended for educational, academic, and hackathon presentation purposes. SEBI & RBI regulatory compliant prototype.
