package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String company;

    private String location;

    private String type; // Completo, Parcial, Freelance

    private String area; // Prensa, TV, Radio, Digital

    @Column(name = "date_posted")
    private String date; // date_posted in DB, date in frontend types often. Mapped to DB column.

    @Column(name = "logo_url")
    private String logoUrl;

    private String description;

    @Column(name = "apply_email")
    private String applyEmail;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
