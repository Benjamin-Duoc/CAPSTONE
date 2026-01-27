package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;
    private String level;
    private String format;
    private String cost;
    private Double rating;
    private Integer reviewCount;
    private String imageUrl;

    @Column(columnDefinition = "text")
    private String description;

    private String instructorName;
    private String instructorTitle;
    private String instructorAvatarUrl;
    private String duration;

    @ElementCollection
    private List<String> topics;

    private String enrollmentStartDate;
    private String enrollmentEndDate;
    private String courseStartDate;
    private String courseEndDate;
    private String accessLink;
}
