package com.cipress.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;

@Entity
@Table(name = "special_ads")
@Data
public class SpecialAd {
    @Id
    private String id;

    private String title;

    private String description;

    @Column(name = "cta_text")
    private String ctaText;
}
