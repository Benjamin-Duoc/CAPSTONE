package com.cipress.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "site_stats")
@Data
public class SiteStat {
    @Id
    private String id; // 'subscribers', 'visits', etc.

    private String label;

    @Column(name = "end_value")
    private Integer endValue;

    private String prefix;
}
