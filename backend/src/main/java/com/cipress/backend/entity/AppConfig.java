package com.cipress.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "app_config")
@Data
public class AppConfig {
    @Id
    private String key;

    private String value;

    private String description;
}
