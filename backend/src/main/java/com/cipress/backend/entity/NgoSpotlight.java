package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "ngo_spotlights")
@Data
public class NgoSpotlight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String institution;

    private String author;

    @Column(name = "date_published")
    private String datePublished;

    @Column(name = "image_url")
    private String imageUrl;

    private String summary;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
