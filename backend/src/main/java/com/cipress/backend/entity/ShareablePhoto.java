package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class ShareablePhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;
    private String caption;
    private String photographerName;
    private String photographerAvatarUrl;
    private String whatsappContact;

    @ElementCollection
    private List<String> keywords;

    private String dateAdded;
    private String textColor;
}
