package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "short_collaborations")
@Data
public class ShortCollaboration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String deadline;

    private String budget;

    private String author;

    @Column(name = "author_avatar_url")
    private String authorAvatarUrl;

    @Column(name = "whatsapp_contact")
    private String whatsappContact;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
