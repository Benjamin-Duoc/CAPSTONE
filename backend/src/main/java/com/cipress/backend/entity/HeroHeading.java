package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hero_heading")
@Data
public class HeroHeading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "main_text")
    private String mainText;

    @Column(name = "highlighted_text")
    private String highlightedText;

    @Column(name = "sub_text")
    private String subText;

    @Column(name = "featured_label")
    private String featuredLabel;

    @Column(name = "text_color")
    private String textColor;
}
