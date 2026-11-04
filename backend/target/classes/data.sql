-- ==========================================================
-- FinWise AI - Initial Seed Data for Financial Products
-- Timestamped with Official Bank & Insurance Source URLs
-- ==========================================================

INSERT INTO financial_products 
(category, provider, product_name, interest_rate_min, interest_rate_max, rate_type, max_tenure_years, processing_fee_pct, processing_fee_flat, eligibility_criteria, collateral_requirement, pros, cons, source_url, last_updated)
VALUES
-- 1. State Bank of India - Student Loan Scheme
('EDUCATION_LOAN', 'State Bank of India (SBI)', 'SBI Student Loan Scheme', 8.15, 9.15, 'Floating (EBLR linked)', 15, 0.00, 0.00, 'Indian Resident secured admission to higher education in India/Abroad via entrance/merit', 'Nil up to ₹7.5 Lakhs; Tangible collateral for loans > ₹7.5 Lakhs', 'Lowest sovereign interest rates; 0.50% concession for female students; 1-year post-study moratorium', 'Documentation turnaround can take 2-3 weeks at public branches', 'https://sbi.co.in/web/personal-banking/loans/education-loans/student-loan-scheme', '2026-08-15'),

-- 2. Bank of Maharashtra - Maha Scholar Loan Scheme
('EDUCATION_LOAN', 'Bank of Maharashtra', 'Maha Scholar / Model Education Loan Scheme', 8.60, 9.35, 'Floating (RLLR linked)', 15, 0.00, 0.00, 'Indian national secured admission in premier recognized universities in India and abroad', 'No collateral up to ₹7.5 Lakhs (CGFSEL covered); Collateral required above ₹7.5L', 'Nil processing fee up to ₹7.5L; 0.50% interest concession for girl students; simple interest during moratorium', 'Requires physical branch verification in select clusters', 'https://bankofmaharashtra.in/education-loan', '2026-08-15'),

-- 3. HDFC Credila - Specialized Education Loan
('EDUCATION_LOAN', 'HDFC Credila', 'HDFC Credila Custom Education Loan', 9.50, 11.25, 'Floating', 15, 1.25, 0.00, 'Students admitted to 1000+ approved global universities across US, UK, Canada, Germany, India', 'Unsecured up to ₹50 Lakhs for top tier global universities; flexible co-borrower criteria', 'Fast 48-hour digital sanction; covers 100% cost including living expenses & exam fees', 'Slightly higher interest rate compared to PSU banks', 'https://www.hdfccredila.com/education-loan.html', '2026-08-15'),

-- 4. Canara Bank - Vidya Turan
('EDUCATION_LOAN', 'Canara Bank', 'Canara Vidya Turan Scheme', 8.50, 9.25, 'Floating (RLLR linked)', 15, 0.00, 0.00, 'Merit admission into premier Indian institutes (IITs, IIMs, NITs, AIIMS, BITS)', 'Nil collateral up to ₹40 Lakhs for Tier-1 Premier Institutes', 'Quick processing for premier institutes; 0.50% concession for girls; Nil processing fee', 'Strict institute tier listing (Tier-1 vs Tier-2 colleges)', 'https://canarabank.com/pages/vidya-turan-scheme', '2026-08-15'),

-- 5. Star Health - Star Health Assure Insurance
('HEALTH_INSURANCE', 'Star Health Insurance', 'Star Health Assure Plan', NULL, NULL, 'Annual Premium', NULL, NULL, NULL, 'Entry age 18 to 75 years; Individual and Floater options available', 'No collateral', 'Unlimited automatic restoration of sum insured; Coverage up to ₹2 Crores; Modern robotic treatments covered', '24-month waiting period for pre-existing diseases', 'https://www.starhealth.in/health-insurance-plans/star-health-assure-insurance-policy', '2026-08-15'),

-- 6. HDFC ERGO - Optima Secure
('HEALTH_INSURANCE', 'HDFC ERGO General Insurance', 'Optima Secure Health Policy', NULL, NULL, 'Annual Premium', NULL, NULL, NULL, 'Entry age 18 to 65 years; Lifelong renewability', 'No collateral', '4X coverage multiplier: 2X from Day 1 + 2X via Secure Bonus; Zero deduction on non-medical consumables', 'Higher premium tier compared to basic indemnity covers', 'https://www.hdfcergo.com/health-insurance/optima-secure', '2026-08-15'),

-- 7. Care Health - Care Supreme
('HEALTH_INSURANCE', 'Care Health Insurance', 'Care Supreme Comprehensive Policy', NULL, NULL, 'Annual Premium', NULL, NULL, NULL, 'Entry age 18+; Lifelong renewability', 'No collateral', 'Unlimited automatic recharge; Up to 500% Super NCB bonus; Unlimited e-consultations', 'Zone-based pricing structure (Tier 1 vs Tier 2 cities)', 'https://www.careinsurance.com/health-insurance/care-supreme', '2026-08-15'),

-- 8. Government of India - Public Provident Fund (PPF)
('GOVT_SCHEME', 'Government of India / RBI', 'Public Provident Fund (PPF)', 7.10, 7.10, 'Sovereign Fixed (Quarterly reset)', 15, 0.00, 0.00, 'Indian resident individuals (one account per person)', 'Sovereign Government Guarantee', 'EEE Tax Status: 100% Tax-free principal (80C), interest, and maturity; Zero credit risk', '15-year lock-in period with limited partial withdrawal from Year 7', 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=55', '2026-08-15'),

-- 9. Government of India - Sovereign Gold Bonds (SGB)
('GOVT_SCHEME', 'Reserve Bank of India (RBI)', 'Sovereign Gold Bonds (SGB Scheme)', 2.50, 2.50, 'Sovereign + Gold Capital Appreciation', 8, 0.00, 0.00, 'Indian resident individuals, HUFs, Trusts', 'Sovereign Government Guarantee', '2.50% annual fixed coupon paid semi-annually; 100% Capital Gains Tax exempt on maturity redemption', '8-year tenure (exit option after 5th year)', 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx', '2026-08-15'),

-- 10. National Pension System (NPS)
('GOVT_SCHEME', 'PFRDA / Government of India', 'National Pension System (NPS Tier-1)', 9.50, 12.80, 'Market-Linked Pension', 35, 0.00, 0.00, 'Indian citizen aged 18 to 70 years', 'Government Regulated Pension Fund', 'Exclusive additional ₹50,000 tax deduction under Section 80CCD(1B); Low fund management cost (0.09%)', 'Lock-in until age 60; 40% mandatory annuity purchase upon exit', 'https://www.npstrust.org.in/', '2026-08-15');
