package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Entrepreneurship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String founder;
    private String location;
    private String specialty;
    private String imageUrl;

    @Column(columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "text")
    private String reportContent;

    private String reportAuthor;
    private String reportDate;
}
