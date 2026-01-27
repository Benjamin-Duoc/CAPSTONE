package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "community_ads")
@Data
public class CommunityAd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String category;

    @Column(name = "author_name")
    private String authorName;

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
