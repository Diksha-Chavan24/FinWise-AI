package com.finwise.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "asset_type", nullable = false, length = 50)
    private String assetType; // SAVINGS_ACCOUNT, FIXED_DEPOSIT, MUTUAL_FUND, DIRECT_EQUITY, EPF_PPF, NPS, GOLD_SGB, REAL_ESTATE

    @Column(name = "asset_name", length = 150)
    private String assetName;

    @Column(name = "institution_name", length = 100)
    private String institutionName;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
