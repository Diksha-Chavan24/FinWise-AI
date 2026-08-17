/**
 * GenAI Financial Advisor Reasoning Engine
 * Specialized in Indian financial markets, SEBI guidelines, RBI monetary trends,
 * Indian tax codes, and customized multi-plan advisory.
 */

import { formatINR } from '../utils/formatters';

export function generateAiPlanRationale(profile, plan) {
  const isAggressive = plan.riskRating === 'Aggressive';
  const isConservative = plan.riskRating === 'Conservative';
  const surplus = profile.monthlySurplus || 100000;
  const isCovered = plan.totalMonthlySIPNeeded <= surplus;

  let rationale = `### 🤖 GenAI Strategic Rationale for ${profile.name}\n\n`;
  
  rationale += `Based on your profile as a **${profile.age}-year-old resident in ${profile.city}** with a monthly surplus of **${formatINR(surplus)}**, here is how **${plan.name}** was synthesized:\n\n`;

  if (isAggressive) {
    rationale += `1. **Alpha Compounding Strategy**: Because of your long investment horizon and aggressive risk appetite, 70% of your portfolio is weighted into Indian equities (45% Mid/Small Cap + 25% Large Cap). Historical 20-year NSE data shows Mid & Small caps deliver ~16.4% CAGR over 7+ year cycles.\n`;
    rationale += `2. **Downside Airbag**: We incorporated 10% Gold (SGB) and 15% Debt/Liquid. During past crisis cycles (like the 2008 crash and 2020 pandemic dip), Gold cushioned portfolio drawdowns by generating +28% to +29% positive gains.\n`;
    rationale += `3. **Tax Shielding**: To optimize under the revised Budget 2024 rules (12.5% LTCG above ₹1.25L), annual tax harvesting across equity funds is recommended.\n`;
  } else if (isConservative) {
    rationale += `1. **Sovereign Capital Preservation**: Prioritizes capital security with 55% allocated to Government G-Secs, PPF (7.1% tax-exempt), and Bank FDs. This protects against market volatility while maintaining stable cashflows.\n`;
    rationale += `2. **Inflation Defense**: 20% Large-cap equity and 15% Gold ensure your wealth beats domestic CPI inflation (currently ~5.1%) without exposing your principal to deep market drawdowns.\n`;
    rationale += `3. **Milestone Certainty**: Perfect for near-term milestones (e.g. within 3-5 years) where market fluctuations cannot be risked.\n`;
  } else {
    rationale += `1. **Hybrid Core-Satellite Approach**: 55% Equity (35% Large-Cap Nifty 50 + 20% Flexicap) acts as the wealth engine, while 30% Debt/PPF/NPS provides steady bedrock income.\n`;
    rationale += `2. **Goal Feasibility**: Your required monthly SIP of **${formatINR(plan.totalMonthlySIPNeeded)}** is ${isCovered ? 'fully within' : 'close to'} your monthly disposable surplus of **${formatINR(surplus)}**.\n`;
    rationale += `3. **NPS + SGB Advantage**: 10% allocation to NPS unlocks the extra ₹50,000 Section 80CCD(1B) tax deduction, saving up to ₹15,600 annually in taxes.\n`;
  }

  rationale += `\n**Estimated Goal Success Probability:** **${plan.successProbability}%** based on 500 Monte Carlo runs stress-tested with past Indian economic cycles.`;

  return rationale;
}

export const PRESET_AI_QUESTIONS = [
  {
    id: 'q1',
    text: 'What if I increase my monthly SIP by 10% every year (Step-up SIP)?',
    category: 'SIP & Compounding'
  },
  {
    id: 'q2',
    text: 'Should I choose the New Tax Regime (Sec 115BAC) or Old Regime?',
    category: 'Indian Taxation'
  },
  {
    id: 'q3',
    text: 'How does the Budget 2024 LTCG tax rate of 12.5% impact my wealth plan?',
    category: 'Tax & Regulation'
  },
  {
    id: 'q4',
    text: 'How will historical Indian inflation (Education at ~9.5%) affect my child goal?',
    category: 'Inflation Stress Test'
  },
  {
    id: 'q5',
    text: 'What happens to my financial plan if the Indian market experiences a 2008-like crash?',
    category: 'Market Stress Testing'
  },
  {
    id: 'q6',
    text: 'Why are Sovereign Gold Bonds (SGB) recommended over physical gold jewellery?',
    category: 'Asset Allocation'
  }
];

export function answerAiAdvisorQuery(query, profile, activePlan) {
  const q = query.toLowerCase();
  const surplus = profile.monthlySurplus || (profile.monthlyIncome - profile.monthlyExpenses);
  const netWorth = (profile.existingNetWorth?.mutualFundsEquity || 0) + (profile.existingNetWorth?.directStocks || 0) + (profile.existingNetWorth?.epfPpf || 0);

  if (q.includes('step-up') || q.includes('increase') || q.includes('10%')) {
    return {
      title: '🚀 Step-Up SIP Power Multiplier Analysis',
      answer: `By incorporating an **annual 10% Step-Up SIP**, your wealth trajectory accelerates significantly:
- **Immediate Benefit:** Your required initial monthly SIP drops by **~28%** (from ${formatINR(activePlan.totalMonthlySIPNeeded)} to **${formatINR(activePlan.totalStepUpSIPNeeded)}/month**), making your goals immediately affordable today.
- **Compounding Boost:** As your salary grows in ${profile.city}, stepping up your SIP annually adds an estimated **₹45 Lakhs to ₹1.2 Crores** in extra compounding over a 15-year horizon.
- **Action Step:** Enable auto-step-up in your Indian Mutual Fund folio apps (e.g. Zerodha Coin, Groww, Kuvera, CAMS/KFintech).`
    };
  }

  if (q.includes('new tax regime') || q.includes('old regime') || q.includes('115bac') || q.includes('tax')) {
    const annualIncome = (profile.monthlyIncome || 150000) * 12;
    return {
      title: '⚖️ New vs Old Tax Regime Optimization (Budget 2024-25)',
      answer: `For your profile earning **${formatINR(annualIncome)}/year**:
1. **New Tax Regime (Section 115BAC):** Standard deduction has increased to **₹75,000**. Tax slabs are concessional (0% up to ₹3L, 5% up to ₹7L, 10% up to ₹10L, 15% up to ₹12L, 20% up to ₹15L, 30% above ₹15L).
2. **Old Tax Regime:** Only beneficial if your total deductions (Section 80C ₹1.5L + Section 80D ₹25k-₹50k + Section 24b Home Loan Interest ₹2L + HRA) exceed **₹3.75 Lakhs to ₹4.25 Lakhs**.
3. **Recommendation:** ${annualIncome > 2000000 ? 'The New Tax Regime will leave you with higher net disposable in-hand cashflow for SIP investing.' : 'Review your Section 24(b) home loan interest and HRA rent receipts before selecting at your employer portal.'}`
    };
  }

  if (q.includes('ltcg') || q.includes('budget 2024') || q.includes('12.5%') || q.includes('tax rate')) {
    return {
      title: '📊 Budget 2024 LTCG & STCG Tax Rules',
      answer: `Key updates affecting your investment strategy:
1. **Equity LTCG:** Raised from 10% to **12.5%**, but the annual tax-free exemption limit was expanded from ₹1,00,000 to **₹1,25,000 per financial year**.
2. **Equity STCG (<1 year):** Increased to **20%**.
3. **GenAI Action Plan:** Practice *Tax-Gain Harvesting* by realizing up to ₹1.25 Lakh of long-term capital gains every March tax-free, then reinvesting immediately to reset your purchase NAV base.`
    };
  }

  if (q.includes('inflation') || q.includes('education') || q.includes('child')) {
    return {
      title: '📈 Indian Inflation Dynamics & Goal Protection',
      answer: `In India, headline CPI is ~5.1%, but **lifestyle, education, and healthcare inflations** run much higher:
- **Indian Higher Education (Engineering/Management/Medical):** Inflating at **~9.5% to 10.5% per year**. An IIT/IIM or private university fee of ₹25 Lakhs today will cost ~₹65 to ₹75 Lakhs in 12-14 years.
- **Healthcare Costs:** Inflating at **11.0%** annually in Indian private hospitals.
- **Solution:** A conservative FD (yielding 7%) loses real purchasing power after tax. That is why your **${activePlan.name}** allocates significant weight to Equity Index & Midcap funds (13-16% CAGR) to generate a net positive real return.`
    };
  }

  if (q.includes('crash') || q.includes('2008') || q.includes('drawdown') || q.includes('loss')) {
    return {
      title: '🛡️ Market Stress Test & Downside Resilience',
      answer: `How your portfolio is engineered against historic Indian crashes:
- **2008 Global Meltdown:** While Nifty fell -51.8%, Gold rallied **+29.5%** and Indian Debt returned **+8.5%**.
- **2020 Pandemic Shock:** Nifty plunged 38% in March 2020 but fully recovered in 6 months and doubled over the next 3 years.
- **Protection in your plan:** Your portfolio's **${activePlan.assetAllocation.goldSGB}% Gold** and **${activePlan.assetAllocation.corporateDebtFD}% Debt** allocation prevents panic selling and allows automatic rebalancing into discounted Indian equities during bear markets.`
    };
  }

  if (q.includes('sgb') || q.includes('gold') || q.includes('jewellery')) {
    return {
      title: '👑 Sovereign Gold Bonds (SGB) vs Physical Gold',
      answer: `Why your plan recommends SGB / Gold ETFs over physical jewellery:
1. **2.50% Annual Sovereign Interest:** Paid semi-annually directly to your Indian bank account on the nominal value.
2. **100% Tax-Free Capital Gains:** Capital gains on SGB redemption upon 8-year maturity are completely exempt from Indian income tax (unlike physical gold or gold ETFs).
3. **Zero Making Charges or Impurity Deduction:** Saves 8% to 18% in jewellery wastage and locker storage costs.`
    };
  }

  // Fallback dynamic AI response
  return {
    title: `🤖 AI Financial Analysis for ${profile.name}`,
    answer: `Regarding your question: "${query}"

For your profile with a monthly income of **${formatINR(profile.monthlyIncome)}** and current net worth of **${formatINR(netWorth)}** in **${profile.city}**:
- Under **${activePlan.name}**, your assets are structured to yield an expected **${activePlan.expectedCAGR}% CAGR** with an estimated **${activePlan.successProbability}% probability** of achieving all listed milestones.
- To improve risk-adjusted alpha, ensure you maintain an Emergency Fund of 6 months expenses in Liquid/Savings accounts and rebalance your asset allocation once every 12 months.
- Feel free to adjust the interactive SIP sliders or test different economic scenarios in the simulator!`
  };
}
