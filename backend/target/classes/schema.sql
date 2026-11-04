-- ==========================================================
-- FinWise AI - Normalized MySQL Database Schema DDL
-- ==========================================================

CREATE DATABASE IF NOT EXISTS finwise_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finwise_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    city VARCHAR(100),
    occupation VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Financial Profiles Table
CREATE TABLE IF NOT EXISTS financial_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    monthly_income DECIMAL(15,2) NOT NULL,
    annual_income DECIMAL(15,2) NOT NULL,
    monthly_expenses DECIMAL(15,2) NOT NULL,
    risk_appetite VARCHAR(30) DEFAULT 'Moderate',
    tax_regime VARCHAR(50) DEFAULT 'New Regime (Sec 115BAC)',
    profile_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Assets Table (Normalized Itemized Assets)
CREATE TABLE IF NOT EXISTS assets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    asset_type VARCHAR(50) NOT NULL,
    asset_name VARCHAR(150),
    institution_name VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Liabilities Table (Normalized Itemized Loans)
CREATE TABLE IF NOT EXISTS liabilities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    liability_type VARCHAR(50) NOT NULL,
    institution_name VARCHAR(100),
    principal_amount DECIMAL(15,2) NOT NULL,
    outstanding_balance DECIMAL(15,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    monthly_emi DECIMAL(15,2) NOT NULL,
    tenure_remaining_months INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Goals Table
CREATE TABLE IF NOT EXISTS goals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    target_amount DECIMAL(15,2) NOT NULL,
    target_months INT NOT NULL,
    priority VARCHAR(20) DEFAULT 'Medium',
    current_corpus_assigned DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'IN_PROGRESS',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Financial Products Table (Decoupled Catalog with Official Sources & Timestamps)
CREATE TABLE IF NOT EXISTS financial_products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    interest_rate_min DECIMAL(5,2),
    interest_rate_max DECIMAL(5,2),
    rate_type VARCHAR(30),
    max_tenure_years INT,
    processing_fee_pct DECIMAL(5,2),
    processing_fee_flat DECIMAL(10,2),
    eligibility_criteria TEXT,
    collateral_requirement TEXT,
    pros TEXT,
    cons TEXT,
    source_url VARCHAR(500) NOT NULL,
    last_updated DATE NOT NULL
);

-- 7. Goal Simulations Table
CREATE TABLE IF NOT EXISTS goal_simulations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    goal_id BIGINT,
    user_id BIGINT NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    down_payment DECIMAL(15,2) NOT NULL,
    monthly_savings DECIMAL(15,2) NOT NULL,
    wait_months INT NOT NULL,
    option_a_json JSON,
    option_b_json JSON,
    option_c_json JSON,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
