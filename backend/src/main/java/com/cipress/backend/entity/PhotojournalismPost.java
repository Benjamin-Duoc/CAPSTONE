package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "photojournalism_posts")
@Data
public class PhotojournalismPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "image_url")
    private String imageUrl;

    private String caption;

    @Column(name = "photographer_name")
    private String photographerName;

    @Column(name = "photographer_avatar_url")
    private String photographerAvatarUrl;

    @Column(name = "date_taken")
    private String dateTaken;

    @Column(name = "whatsapp_contact")
    private String whatsappContact;

    @Column(name = "date_added")
    private LocalDateTime dateAdded;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
