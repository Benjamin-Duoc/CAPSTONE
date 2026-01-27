package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "legal_topics")
@Data
public class LegalTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;
}
