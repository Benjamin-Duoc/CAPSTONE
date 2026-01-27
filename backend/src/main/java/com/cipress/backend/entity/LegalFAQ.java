package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "legal_faqs")
@Data
public class LegalFAQ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String answer;
}
