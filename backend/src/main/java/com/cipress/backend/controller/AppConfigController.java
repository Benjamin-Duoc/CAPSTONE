package com.cipress.backend.controller;

import com.cipress.backend.entity.AppConfig;
import com.cipress.backend.service.AppConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/app-config")
public class AppConfigController {
    @Autowired
    private AppConfigService service;

    @GetMapping
    public ResponseEntity<List<AppConfig>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<AppConfig> save(@RequestBody AppConfig config) {
        return ResponseEntity.ok(service.save(config));
    }
}
