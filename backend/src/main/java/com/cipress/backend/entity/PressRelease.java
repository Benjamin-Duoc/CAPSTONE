package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PressRelease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String institution;
    private String author;
    private String date;
    private String imageUrl;

    @Column(columnDefinition = "text")
    private String summary;

    @Column(columnDefinition = "text")
    private String reportContent;

    private String reportAuthor;
    private String reportDate;
}
