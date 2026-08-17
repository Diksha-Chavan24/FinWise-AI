package com.finwise.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "liabilities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Liability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "liability_type", nullable = false, length = 50)
    private String liabilityType; // EDUCATION_LOAN, PERSONAL_LOAN, HOME_LOAN, VEHICLE_LOAN

    @Column(name = "institution_name", length = 100)
    private String institutionName;

    @Column(name = "principal_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal principalAmount;

    @Column(name = "outstanding_balance", nullable = false, precision = 15, scale = 2)
    private BigDecimal outstandingBalance;

    @Column(name = "interest_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal interestRate;

    @Column(name = "monthly_emi", nullable = false, precision = 15, scale = 2)
    private BigDecimal monthlyEmi;

    @Column(name = "tenure_remaining_months")
    private Integer tenureRemainingMonths;

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
