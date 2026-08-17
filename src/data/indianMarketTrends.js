/**
 * Historical Indian Financial Market & Macroeconomic Trend Data (2004 - 2024)
 * Source benchmarks: NSE Nifty 50 TRI, BSE Sensex, Gold (MCX / IBJA 24K INR per 10g),
 * RBI 10-Year Indian Government Securities (G-Sec), Public Provident Fund (PPF),
 * NHB Residex (Tier-1 Indian Metros Real Estate), and Indian CPI Inflation.
 */

export const ASSET_CLASSES = {
  nifty50: {
    id: 'nifty50',
    name: 'Nifty 50 (Indian Large Cap Equity)',
    shortName: 'Nifty 50',
    cagr20Yr: 13.8,
    cagr10Yr: 13.2,
    cagr5Yr: 15.6,
    volatility: 17.5,
    expectedReturnRange: [12.0, 15.0],
    riskLevel: 'Moderate to High',
    taxation: 'LTCG: 12.5% above ₹1.25L/yr; STCG: 20%',
    color: '#10b981', // Emerald
    description: 'Top 50 Indian companies by market capitalization on the National Stock Exchange.'
  },
  midSmallCap: {
    id: 'midSmallCap',
    name: 'Nifty MidSmallcap 400',
    shortName: 'Mid & Small Cap',
    cagr20Yr: 16.4,
    cagr10Yr: 17.8,
    cagr5Yr: 21.4,
    volatility: 22.1,
    expectedReturnRange: [14.0, 18.0],
    riskLevel: 'High',
    taxation: 'LTCG: 12.5% above ₹1.25L/yr; STCG: 20%',
    color: '#06b6d4', // Cyan
    description: 'High-growth emerging Indian enterprises with high compounding potential but higher volatility.'
  },
  gold: {
    id: 'gold',
    name: 'Gold INR (Sovereign Gold Bond / Physical)',
    shortName: 'Gold (INR)',
    cagr20Yr: 11.2,
    cagr10Yr: 9.8,
    cagr5Yr: 13.9,
    volatility: 12.8,
    expectedReturnRange: [8.5, 11.0],
    riskLevel: 'Moderate',
    taxation: 'SGB tax-free at maturity; Physical/ETF: Taxed at slab rate / LTCG rules',
    color: '#f59e0b', // Amber
    description: 'Traditional Indian wealth store and prime hedge against Rupee depreciation and inflation.'
  },
  debtFD: {
    id: 'debtFD',
    name: 'Indian Corporate Bonds & Bank Fixed Deposits',
    shortName: 'Debt & FDs',
    cagr20Yr: 7.4,
    cagr10Yr: 6.8,
    cagr5Yr: 6.9,
    volatility: 2.5,
    expectedReturnRange: [6.5, 7.5],
    riskLevel: 'Low',
    taxation: 'Taxed at applicable marginal income tax slab rate',
    color: '#6366f1', // Indigo
    description: 'Fixed income instruments providing predictable cashflows and capital stability.'
  },
  ppfEPF: {
    id: 'ppfEPF',
    name: 'PPF / EPF / National Pension System (NPS)',
    shortName: 'PPF / EPF / NPS',
    cagr20Yr: 8.1,
    cagr10Yr: 7.6,
    cagr5Yr: 7.4,
    volatility: 0.5,
    expectedReturnRange: [7.1, 8.2],
    riskLevel: 'Very Low',
    taxation: 'EEE (Exempt-Exempt-Exempt) under Old Regime; NPS 60% tax-free lump sum',
    color: '#8b5cf6', // Violet
    description: 'Government backed, sovereign guaranteed retirement compounding with tax benefits.'
  },
  realEstate: {
    id: 'realEstate',
    name: 'Tier-1 Indian Metro Real Estate',
    shortName: 'Real Estate',
    cagr20Yr: 8.8,
    cagr10Yr: 7.2,
    cagr5Yr: 8.5,
    volatility: 9.2,
    expectedReturnRange: [7.0, 9.5],
    riskLevel: 'Moderate',
    taxation: 'LTCG: 12.5% without indexation (Budget 2024 update)',
    color: '#ec4899', // Pink
    description: 'Physical residential/commercial property in Bengaluru, Mumbai, NCR, Pune, Hyderabad.'
  }
};

export const YEARLY_HISTORICAL_DATA = [
  { year: 2004, nifty: 10.7, gold: 6.2, debt: 5.8, ppf: 8.0, realEstate: 9.5, cpi: 3.8, event: 'India growth story begins' },
  { year: 2005, nifty: 36.3, gold: 13.8, debt: 6.2, ppf: 8.0, realEstate: 14.2, cpi: 4.2, event: 'Bull run and infrastructure boom' },
  { year: 2006, nifty: 39.8, gold: 20.8, debt: 6.5, ppf: 8.0, realEstate: 18.0, cpi: 5.8, event: 'High domestic GDP expansion' },
  { year: 2007, nifty: 54.8, gold: 16.5, debt: 7.2, ppf: 8.0, realEstate: 16.5, cpi: 6.4, event: 'Historic equity peak before global subprime' },
  { year: 2008, nifty: -51.8, gold: 29.5, debt: 8.5, ppf: 8.0, realEstate: 2.0, cpi: 8.3, event: 'Global Financial Crisis; Gold acts as anchor' },
  { year: 2009, nifty: 75.8, gold: 24.3, debt: 6.8, ppf: 8.0, realEstate: 5.5, cpi: 10.9, event: 'V-shaped recovery in Indian markets' },
  { year: 2010, nifty: 17.9, gold: 22.1, debt: 7.1, ppf: 8.0, realEstate: 11.0, cpi: 12.0, event: 'High domestic inflation decade' },
  { year: 2011, nifty: -24.6, gold: 31.7, debt: 8.2, ppf: 8.6, realEstate: 10.2, cpi: 8.9, event: 'Eurozone crisis; Gold rallies strongly' },
  { year: 2012, nifty: 27.7, gold: 12.4, debt: 8.6, ppf: 8.8, realEstate: 9.8, cpi: 9.3, event: 'Market stabilization & policy reforms' },
  { year: 2013, nifty: 6.8, gold: -4.5, debt: 8.1, ppf: 8.7, realEstate: 7.5, cpi: 10.9, event: 'Taper tantrum & Rupee pressure' },
  { year: 2014, nifty: 31.4, gold: -8.1, debt: 8.4, ppf: 8.7, realEstate: 6.8, cpi: 6.4, event: 'New government mandate & economic optimism' },
  { year: 2015, nifty: -4.1, gold: -6.7, debt: 7.9, ppf: 8.7, realEstate: 5.2, cpi: 5.9, event: 'Global commodity cool-off' },
  { year: 2016, nifty: 3.0, gold: 10.2, debt: 7.6, ppf: 8.1, realEstate: 3.5, cpi: 4.9, event: 'Demonetization & digitalization surge' },
  { year: 2017, nifty: 28.6, gold: 5.1, debt: 6.7, ppf: 7.8, realEstate: 4.8, cpi: 3.3, event: 'GST rollout and strong domestic retail SIP boom' },
  { year: 2018, nifty: 3.2, gold: 7.9, debt: 7.2, ppf: 7.6, realEstate: 4.0, cpi: 3.9, event: 'IL&FS NBFC crisis; Large caps outperform' },
  { year: 2019, nifty: 12.0, gold: 24.6, debt: 7.0, ppf: 7.9, realEstate: 4.5, cpi: 4.8, event: 'Corporate tax cuts in India' },
  { year: 2020, nifty: 14.9, gold: 28.0, debt: 6.2, ppf: 7.1, realEstate: 3.0, cpi: 6.2, event: 'Covid pandemic shock & tech-led rebound' },
  { year: 2021, nifty: 24.1, gold: -4.2, debt: 5.8, ppf: 7.1, realEstate: 6.5, cpi: 5.1, event: 'Post-pandemic economic reopening & startup boom' },
  { year: 2022, nifty: 4.3, gold: 13.9, debt: 6.8, ppf: 7.1, realEstate: 8.2, cpi: 6.7, event: 'Global inflation & Russia-Ukraine war; India resilient' },
  { year: 2023, nifty: 20.0, gold: 15.2, debt: 7.2, ppf: 7.1, realEstate: 11.5, cpi: 5.6, event: 'Capex revival & record foreign/domestic inflows' },
  { year: 2024, nifty: 18.2, gold: 21.0, debt: 7.1, ppf: 7.1, realEstate: 12.8, cpi: 5.1, event: 'Sensex crosses 80k milestone; Indian GDP at 7.2%' }
];

export const CRISIS_STRESS_TESTS = [
  {
    name: '2008 Global Subprime Meltdown',
    niftyDrawdown: -51.8,
    goldPerformance: +29.5,
    debtPerformance: +8.5,
    recoveryTimeMonths: 18,
    insight: 'Demonstrates why 10-15% Gold and 20% Debt allocation protects portfolio value during black swan equity crashes.'
  },
  {
    name: '2020 Covid-19 Flash Crash',
    niftyDrawdown: -38.4,
    goldPerformance: +28.0,
    debtPerformance: +6.2,
    recoveryTimeMonths: 6,
    insight: 'Indian markets rebounded sharply in 6 months; disciplined SIP investors generated extraordinary 3-year returns.'
  },
  {
    name: '2010 - 2013 High Inflation Cycle',
    niftyDrawdown: -12.5,
    goldPerformance: +45.2,
    debtPerformance: +7.8,
    recoveryTimeMonths: 24,
    insight: 'CPI inflation crossed 10%; Gold and Equities acted as superior purchasing power protectors compared to pure FDs.'
  }
];

export const INFLATION_BENCHMARKS = {
  currentCPI: 4.9,
  educationInflationIndia: 9.5, // Indian higher education inflates at 9-10% annually
  healthcareInflationIndia: 11.0, // Healthcare inflation in private Indian hospitals
  lifestyleInflationIndia: 7.0
};
