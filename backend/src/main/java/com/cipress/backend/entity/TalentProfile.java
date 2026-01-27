package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "talent_profiles")
@Data
public class TalentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "avatar_url")
    private String avatarUrl;

    private String title;

    @ElementCollection
    @CollectionTable(name = "talent_skills", joinColumns = @JoinColumn(name = "talent_id"))
    @Column(name = "skill")
    private List<String> skills;

    private String availability;

    @Column(name = "expected_salary")
    private String expectedSalary;

    private String region;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
