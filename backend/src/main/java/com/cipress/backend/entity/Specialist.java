package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "specialists")
@Data
public class Specialist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String title;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "specialty_description")
    private String specialtyDescription;

    @Column(name = "whatsapp_contact")
    private String whatsappContact;

    @Column(name = "date_added")
    private LocalDate dateAdded;

    @Column(name = "text_color")
    private String textColor;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
