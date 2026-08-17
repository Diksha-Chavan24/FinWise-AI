/**
 * Indian Currency & Number Formatting Utilities
 * Adheres strictly to Indian numbering system (Lakhs and Crores).
 */

export function formatINR(val, options = {}) {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  const num = Math.round(Number(val));
  
  if (options.compact) {
    const abs = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    if (abs >= 10000000) { // 1 Crore
      return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;
    } else if (abs >= 100000) { // 1 Lakh
      return `${sign}₹${(abs / 100000).toFixed(2)} L`;
    } else if (abs >= 1000) {
      return `${sign}₹${(abs / 1000).toFixed(1)} K`;
    }
    return `${sign}₹${abs}`;
  }

  // Full Indian number format with comma separation (e.g., ₹12,50,000)
  const isNegative = num < 0;
  const absStr = Math.abs(num).toString();
  
  let lastThree = absStr.substring(absStr.length - 3);
  const otherNumbers = absStr.substring(0, absStr.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return `${isNegative ? '-' : ''}₹${formatted}`;
}

export function formatCroreLakhWords(val) {
  if (!val || isNaN(val)) return '₹0';
  const num = Number(val);
  const cr = Math.floor(num / 10000000);
  const rem = num % 10000000;
  const lk = Math.floor(rem / 100000);
  const th = Math.floor((rem % 100000) / 1000);

  const parts = [];
  if (cr > 0) parts.push(`${cr} Crore${cr > 1 ? 's' : ''}`);
  if (lk > 0) parts.push(`${lk} Lakh${lk > 1 ? 's' : ''}`);
  if (th > 0 && cr === 0) parts.push(`${th} Thousand`);
  
  if (parts.length === 0) return formatINR(val);
  return `₹ ${parts.join(' ')}`;
}

export function formatPercent(val, decimals = 1) {
  if (val === undefined || val === null || isNaN(val)) return '0%';
  return `${Number(val).toFixed(decimals)}%`;
}

export function calculateNetWorth(profile) {
  if (!profile || !profile.existingNetWorth) return { totalAssets: 0, totalLiabilities: 0, netWorth: 0 };
  const nw = profile.existingNetWorth;
  const totalAssets = (nw.savingsAccount || 0) +
                      (nw.mutualFundsEquity || 0) +
                      (nw.directStocks || 0) +
                      (nw.epfPpf || 0) +
                      (nw.goldSgb || 0) +
                      (nw.realEstate || 0);
  const totalLiabilities = nw.liabilitiesLoans || 0;
  return {
    totalAssets,
    totalLiabilities,
    netWorth: totalAssets - totalLiabilities
  };
}
