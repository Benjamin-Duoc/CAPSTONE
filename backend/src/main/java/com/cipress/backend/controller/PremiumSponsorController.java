package com.cipress.backend.controller;

import com.cipress.backend.entity.PremiumSponsor;
import com.cipress.backend.service.PremiumSponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/premium-sponsors")
public class PremiumSponsorController {
    @Autowired
    private PremiumSponsorService service;

    @GetMapping
    public ResponseEntity<List<PremiumSponsor>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<PremiumSponsor> save(@RequestBody PremiumSponsor sponsor) {
        return ResponseEntity.ok(service.save(sponsor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
