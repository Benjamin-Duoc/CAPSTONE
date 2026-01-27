package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PremiumSponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String tagline;
    private String imageUrl;
    private String ctaText;
    private String ctaLink;
    private String nameColor;
    private String ctaColor;

    @Column(columnDefinition = "text")
    private String reportContent;

    private String reportAuthor;
    private String reportDate;
}
