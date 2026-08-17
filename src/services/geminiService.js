/**
 * Google Gemini AI Service
 * Uses the free tier of the Gemini API for AI-powered financial advice.
 * Falls back to local responses if no API key is configured.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI = null;
let model = null;

if (API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  } catch (err) {
    console.warn('Gemini API initialization failed:', err.message);
  }
}

export function isGeminiAvailable() {
  return !!model;
}

function buildSystemPrompt(profile, plan) {
  return `You are FinWise AI, a GenAI-powered Indian financial advisor. You provide personalized financial guidance exclusively for Indian resident citizens.

IMPORTANT RULES:
- All currency is in Indian Rupees (₹ INR). Use Lakhs and Crores notation.
- Only recommend SEBI-regulated Indian financial instruments (Mutual Funds, SIPs, PPF, EPF, NPS, SGB, Indian stocks, FDs).
- Reference Indian tax laws: Budget 2024 LTCG (12.5% above ₹1.25L), STCG (20%), Section 80C, 80CCD(1B), 80D.
- Do NOT invent financial numbers. Use the profile data provided.
- Keep answers concise (3-5 bullet points max) and actionable.
- Be friendly. Use "Namaste" for greetings.

CUSTOMER PROFILE:
- Name: ${profile.name}
- Age: ${profile.age}
- City: ${profile.city}
- Occupation: ${profile.occupation}
- Monthly Income: ₹${(profile.monthlyIncome || 0).toLocaleString('en-IN')}
- Monthly Expenses: ₹${(profile.monthlyExpenses || 0).toLocaleString('en-IN')}
- Monthly Surplus: ₹${((profile.monthlySurplus || profile.monthlyIncome - profile.monthlyExpenses) || 0).toLocaleString('en-IN')}
- Risk Appetite: ${profile.riskAppetite}
- Tax Regime: ${profile.taxRegime}

ACTIVE FINANCIAL PLAN:
- Strategy: ${plan?.name || 'Balanced'}
- Expected CAGR: ${plan?.expectedCAGR || 12}%
- Required Monthly SIP: ₹${(plan?.totalMonthlySIPNeeded || 0).toLocaleString('en-IN')}
- Success Probability: ${plan?.successProbability || 85}%

FINANCIAL GOALS:
${(profile.goals || []).map((g, i) => `${i + 1}. ${g.title} — ₹${(g.targetAmount || 0).toLocaleString('en-IN')} in ${g.targetYears} years (${g.priority} priority)`).join('\n')}`;
}

export async function askGemini(query, profile, plan) {
  if (!model) {
    return null; // Caller should fall back to local engine
  }

  try {
    const systemPrompt = buildSystemPrompt(profile, plan);
    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\nUser Question: ' + query }] }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    const response = result.response;
    const text = response.text();
    return text || null;
  } catch (err) {
    console.warn('Gemini API error:', err.message);
    return null;
  }
}
