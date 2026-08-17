package com.finwise.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "financial_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinancialProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "monthly_income", nullable = false, precision = 15, scale = 2)
    private BigDecimal monthlyIncome;

    @Column(name = "annual_income", nullable = false, precision = 15, scale = 2)
    private BigDecimal annualIncome;

    @Column(name = "monthly_expenses", nullable = false, precision = 15, scale = 2)
    private BigDecimal monthlyExpenses;

    @Column(name = "risk_appetite", length = 30)
    @Builder.Default
    private String riskAppetite = "Moderate"; // Conservative, Moderate, Aggressive

    @Column(name = "tax_regime", length = 50)
    @Builder.Default
    private String taxRegime = "New Regime (Sec 115BAC)";

    @Column(name = "profile_updated_at")
    @Builder.Default
    private LocalDateTime profileUpdatedAt = LocalDateTime.now();

    @PreUpdate
    public void onUpdate() {
        this.profileUpdatedAt = LocalDateTime.now();
    }
}
