package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class NewsArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;
    private String author;
    private String date; // Using String to match likely seeding format, usually YYYY-MM-DD
    private String imageUrl;

    @Column(columnDefinition = "text")
    private String summary;

    @Column(columnDefinition = "text")
    private String reportContent;
}
