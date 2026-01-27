package com.cipress.backend.controller;

import com.cipress.backend.entity.CommunityAd;
import com.cipress.backend.service.CommunityAdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/community-ads")
public class CommunityAdController {
    @Autowired
    private CommunityAdService service;

    @GetMapping
    public ResponseEntity<List<CommunityAd>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<CommunityAd> save(@RequestBody CommunityAd ad) {
        return ResponseEntity.ok(service.save(ad));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
