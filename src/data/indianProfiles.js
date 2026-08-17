/**
 * Indian Resident Customer Profiles Dataset
 * Strictly Indian Resident citizens residing in Indian cities.
 * Currency in INR (₹) across realistic net worth tiers and age brackets.
 */

export const INDIAN_PROFILES = [
  {
    id: 'aarav-sharma',
    name: 'Aarav Sharma',
    avatar: '👨‍💻',
    age: 28,
    city: 'Bengaluru, Karnataka',
    occupation: 'Lead Software Engineer (Fintech)',
    maritalStatus: 'Unmarried',
    taxRegime: 'New Regime (Sec 115BAC)',
    monthlyIncome: 210000, // ₹2.10 Lakhs/mo
    monthlyExpenses: 80000,
    monthlySurplus: 130000,
    existingNetWorth: {
      savingsAccount: 450000, // Emergency fund
      mutualFundsEquity: 1850000, // Large & Midcap MFs
      directStocks: 750000,
      epfPpf: 620000,
      goldSgb: 300000, // Sovereign Gold Bonds
      realEstate: 0,
      liabilitiesLoans: 0
    },
    riskAppetite: 'Aggressive', // Conservative | Moderate | Aggressive
    goals: [
      {
        id: 'goal-1',
        title: 'Buy 3BHK Flat in Whitefield, Bengaluru',
        category: 'Real Estate',
        targetAmount: 14000000, // ₹1.40 Crore
        targetYears: 5,
        priority: 'High',
        currentCorpusAssigned: 1200000
      },
      {
        id: 'goal-2',
        title: 'Financial Independence & Early Retirement (FIRE) by Age 45',
        category: 'Retirement',
        targetAmount: 60000000, // ₹6.00 Crores
        targetYears: 17,
        priority: 'Medium',
        currentCorpusAssigned: 1500000
      },
      {
        id: 'goal-3',
        title: 'Emergency Reserve Fund (6 Months Expenses)',
        category: 'Emergency',
        targetAmount: 600000, // ₹6 Lakhs
        targetYears: 1,
        priority: 'High',
        currentCorpusAssigned: 450000
      }
    ],
    notes: 'Young high-earning tech professional with long horizon. Wants aggressive compounding with minimum tax leakage under Budget 2024 LTCG rules.'
  },
  {
    id: 'priya-patel',
    name: 'Priya Patel',
    avatar: '👩‍💼',
    age: 35,
    city: 'Ahmedabad / Mumbai',
    occupation: 'VP of Product Management (E-Commerce)',
    maritalStatus: 'Married with 1 Child (Age 4)',
    taxRegime: 'Old Regime (80C, 80D, HRA deductions)',
    monthlyIncome: 320000, // ₹3.20 Lakhs/mo
    monthlyExpenses: 140000,
    monthlySurplus: 180000,
    existingNetWorth: {
      savingsAccount: 800000,
      mutualFundsEquity: 4200000,
      directStocks: 1500000,
      epfPpf: 1850000,
      goldSgb: 900000,
      realEstate: 8500000, // 2BHK flat in Ahmedabad
      liabilitiesLoans: 2800000 // Home loan outstanding
    },
    riskAppetite: 'Moderate',
    goals: [
      {
        id: 'goal-1',
        title: "Child's Higher Education (IIT/IIM/Top Tier College)",
        category: 'Education',
        targetAmount: 6500000, // ₹65 Lakhs (adjusted for 10% education inflation)
        targetYears: 14,
        priority: 'Critical',
        currentCorpusAssigned: 1000000
      },
      {
        id: 'goal-2',
        title: 'Home Loan Foreclosure / Prepayment',
        category: 'Debt Clearance',
        targetAmount: 2800000, // ₹28 Lakhs
        targetYears: 3,
        priority: 'High',
        currentCorpusAssigned: 800000
      },
      {
        id: 'goal-3',
        title: 'Comfortable Retirement Corpus at Age 55',
        category: 'Retirement',
        targetAmount: 85000000, // ₹8.50 Crores
        targetYears: 20,
        priority: 'High',
        currentCorpusAssigned: 3500000
      }
    ],
    notes: 'Prioritizes child education security and eliminating 8.6% home loan interest burden while building retirement corpus.'
  },
  {
    id: 'rohan-sneha-verma',
    name: 'Rohan & Sneha Verma',
    avatar: '👫',
    age: 42,
    city: 'Pune, Maharashtra',
    occupation: 'Dual-Income (Medical Specialist & IT Director)',
    maritalStatus: 'Married with 2 Children (Ages 12 & 9)',
    taxRegime: 'Old Regime & Mixed',
    monthlyIncome: 450000, // ₹4.50 Lakhs/mo combined
    monthlyExpenses: 190000,
    monthlySurplus: 260000,
    existingNetWorth: {
      savingsAccount: 1500000,
      mutualFundsEquity: 9200000,
      directStocks: 3400000,
      epfPpf: 3800000,
      goldSgb: 1800000,
      realEstate: 16000000, // Residential House in Kothrud, Pune
      liabilitiesLoans: 1200000 // Car Loan & minor mortgage
    },
    riskAppetite: 'Moderate',
    goals: [
      {
        id: 'goal-1',
        title: 'Both Children University Education & Post-Graduation',
        category: 'Education',
        targetAmount: 12000000, // ₹1.20 Crores
        targetYears: 6,
        priority: 'Critical',
        currentCorpusAssigned: 4000000
      },
      {
        id: 'goal-2',
        title: 'Retirement Fund with Monthly Passive Dividend Income',
        category: 'Retirement',
        targetAmount: 120000000, // ₹12.00 Crores
        targetYears: 16,
        priority: 'High',
        currentCorpusAssigned: 8000000
      },
      {
        id: 'goal-3',
        title: 'Purchase Vacation Villa in North Goa',
        category: 'Lifestyle & Real Estate',
        targetAmount: 22000000, // ₹2.20 Crores
        targetYears: 7,
        priority: 'Medium',
        currentCorpusAssigned: 1500000
      }
    ],
    notes: 'Established family aiming for wealth preservation with growth, multi-generational education funds, and inflation-hedged assets.'
  },
  {
    id: 'vikram-iyer',
    name: 'Vikram Iyer',
    avatar: '👨‍💼',
    age: 24,
    city: 'Chennai, Tamil Nadu',
    occupation: 'Fintech Quantitative Analyst',
    maritalStatus: 'Unmarried',
    taxRegime: 'New Regime (Sec 115BAC)',
    monthlyIncome: 125000, // ₹1.25 Lakhs/mo
    monthlyExpenses: 45000,
    monthlySurplus: 80000,
    existingNetWorth: {
      savingsAccount: 200000,
      mutualFundsEquity: 650000,
      directStocks: 480000,
      epfPpf: 150000,
      goldSgb: 120000,
      realEstate: 0,
      liabilitiesLoans: 0
    },
    riskAppetite: 'Aggressive',
    goals: [
      {
        id: 'goal-1',
        title: 'Seed Corpus to Launch Own Fintech Venture in India',
        category: 'Business & Startup',
        targetAmount: 5000000, // ₹50 Lakhs
        targetYears: 5,
        priority: 'Critical',
        currentCorpusAssigned: 500000
      },
      {
        id: 'goal-2',
        title: 'First ₹1 Crore Net Worth Milestone by Age 29',
        category: 'Wealth Accumulation',
        targetAmount: 10000000, // ₹1.00 Crore
        targetYears: 5,
        priority: 'High',
        currentCorpusAssigned: 800000
      },
      {
        id: 'goal-3',
        title: 'Royal Enfield & Ladakh Expedition Fund',
        category: 'Travel & Lifestyle',
        targetAmount: 400000, // ₹4 Lakhs
        targetYears: 2,
        priority: 'Medium',
        currentCorpusAssigned: 100000
      }
    ],
    notes: 'Gen-Z quant seeking aggressive alpha, willing to take calculated equity and momentum risks for exponential capital multiplication.'
  },
  {
    id: 'rajesh-gupta',
    name: 'Rajesh Gupta',
    avatar: '🧔',
    age: 52,
    city: 'Delhi-NCR (Gurugram)',
    occupation: 'SME Engineering Exporter & Manufacturing Owner',
    maritalStatus: 'Married with 2 Grown Children',
    taxRegime: 'Old Regime / Business Trust',
    monthlyIncome: 650000, // ₹6.50 Lakhs/mo draw
    monthlyExpenses: 220000,
    monthlySurplus: 430000,
    existingNetWorth: {
      savingsAccount: 3500000,
      mutualFundsEquity: 14500000,
      directStocks: 8500000,
      epfPpf: 7500000,
      goldSgb: 5200000,
      realEstate: 38000000, // Commercial Shop + Residential
      liabilitiesLoans: 0
    },
    riskAppetite: 'Conservative',
    goals: [
      {
        id: 'goal-1',
        title: 'Succession Trust & Guaranteed Monthly Pension of ₹2.5 Lakhs post-60',
        category: 'Retirement & Succession',
        targetAmount: 100000000, // ₹10.00 Crores
        targetYears: 8,
        priority: 'Critical',
        currentCorpusAssigned: 25000000
      },
      {
        id: 'goal-2',
        title: "Daughter's Grand Wedding & Family Gold Gift",
        category: 'Family Milestone',
        targetAmount: 15000000, // ₹1.50 Crores
        targetYears: 3,
        priority: 'High',
        currentCorpusAssigned: 10000000
      },
      {
        id: 'goal-3',
        title: 'Commercial Office Space Acquisition in Aerocity',
        category: 'Commercial Real Estate',
        targetAmount: 40000000, // ₹4.00 Crores
        targetYears: 5,
        priority: 'Medium',
        currentCorpusAssigned: 15000000
      }
    ],
    notes: 'Mature wealth creator focused on capital protection, sovereign safety, fixed debt annuities, and tax-efficient estate transfer.'
  }
];
