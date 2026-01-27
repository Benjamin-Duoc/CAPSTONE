package com.cipress.backend.controller;

import com.cipress.backend.entity.SpecialAd;
import com.cipress.backend.service.SpecialAdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/special-ads")
public class SpecialAdController {
    @Autowired
    private SpecialAdService service;

    @GetMapping
    public ResponseEntity<List<SpecialAd>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<SpecialAd> save(@RequestBody SpecialAd ad) {
        return ResponseEntity.ok(service.save(ad));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
