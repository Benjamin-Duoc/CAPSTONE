package com.cipress.backend.controller;

import com.cipress.backend.entity.SponsoredAd;
import com.cipress.backend.service.SponsoredAdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sponsored-ads")
public class SponsoredAdController {
    @Autowired
    private SponsoredAdService service;

    @GetMapping
    public ResponseEntity<List<SponsoredAd>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<SponsoredAd> save(@RequestBody SponsoredAd ad) {
        return ResponseEntity.ok(service.save(ad));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
