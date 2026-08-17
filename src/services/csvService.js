/**
 * CSV Data Service
 * Loads and parses the 100 Indian customer dataset from /data/finwise_final_100_entries.csv
 */

export async function loadIndianProfilesFromCSV() {
  try {
    const response = await fetch('/data/finwise_final_100_entries.csv');
    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${response.statusText}`);
    }
    const csvText = await response.text();
    return parseProfilesCSV(csvText);
  } catch (err) {
    console.warn('Could not load CSV data, using fallback profiles:', err);
    return null;
  }
}

export function parseProfilesCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const profiles = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(cell => cell.trim());
    if (row.length < headers.length) continue;

    const [
      id,
      name,
      age,
      gender,
      city,
      occupation,
      maritalStatus,
      taxRegime,
      monthlyIncome,
      monthlyExpenses,
      savingsAccount,
      mutualFundsEquity,
      directStocks,
      epfPpf,
      goldSgb,
      realEstate,
      liabilitiesLoans,
      riskAppetite,
      primaryGoal,
      targetAmount,
      targetYears
    ] = row;

    const income = Number(monthlyIncome) || 100000;
    const expenses = Number(monthlyExpenses) || 40000;

    profiles.push({
      id: `csv-${id}-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name,
      avatar: gender === 'Female' ? '👩‍💼' : '👨‍💼',
      age: Number(age) || 30,
      gender,
      city,
      occupation,
      maritalStatus,
      taxRegime,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      monthlySurplus: income - expenses,
      existingNetWorth: {
        savingsAccount: Number(savingsAccount) || 0,
        mutualFundsEquity: Number(mutualFundsEquity) || 0,
        directStocks: Number(directStocks) || 0,
        epfPpf: Number(epfPpf) || 0,
        goldSgb: Number(goldSgb) || 0,
        realEstate: Number(realEstate) || 0,
        liabilitiesLoans: Number(liabilitiesLoans) || 0
      },
      riskAppetite: riskAppetite || 'Moderate',
      goals: [
        {
          id: `goal-${id}-1`,
          title: primaryGoal || 'Wealth Accumulation Goal',
          category: categorizeGoal(primaryGoal),
          targetAmount: Number(targetAmount) || 5000000,
          targetYears: Number(targetYears) || 5,
          priority: 'High',
          currentCorpusAssigned: Math.round((Number(savingsAccount) || 0) * 0.5)
        }
      ],
      notes: `Indian resident profile from FinWise dataset (Entry #${id}).`
    });
  }

  return profiles;
}

function categorizeGoal(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('flat') || t.includes('home') || t.includes('house') || t.includes('villa') || t.includes('estate') || t.includes('apartment')) {
    return 'Real Estate';
  }
  if (t.includes('education') || t.includes('college') || t.includes('mba') || t.includes('school') || t.includes('degree') || t.includes('masters')) {
    return 'Education';
  }
  if (t.includes('retirement') || t.includes('pension') || t.includes('fire')) {
    return 'Retirement';
  }
  if (t.includes('startup') || t.includes('venture') || t.includes('business') || t.includes('studio') || t.includes('office') || t.includes('firm') || t.includes('plant')) {
    return 'Business & Startup';
  }
  if (t.includes('tour') || t.includes('travel') || t.includes('car') || t.includes('suv')) {
    return 'Travel & Lifestyle';
  }
  return 'Wealth Accumulation';
}
