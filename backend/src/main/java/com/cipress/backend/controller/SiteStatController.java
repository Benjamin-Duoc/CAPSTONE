package com.cipress.backend.controller;

import com.cipress.backend.entity.SiteStat;
import com.cipress.backend.service.SiteStatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/site-stats")
public class SiteStatController {
    @Autowired
    private SiteStatService service;

    @GetMapping
    public ResponseEntity<List<SiteStat>> getAllStats() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<List<SiteStat>> saveStats(@RequestBody List<SiteStat> stats) {
        return ResponseEntity.ok(service.saveAll(stats));
    }
}
