package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "freelance_services")
@Data
public class FreelanceService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String service;

    private String provider;

    private String category;

    private String rate;

    @Column(name = "image_url")
    private String imageUrl;

    private String description;

    @Column(name = "portfolio_url")
    private String portfolioUrl;

    @Column(name = "rating_average")
    private BigDecimal ratingAverage;

    @Column(name = "rating_count")
    private Integer ratingCount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
