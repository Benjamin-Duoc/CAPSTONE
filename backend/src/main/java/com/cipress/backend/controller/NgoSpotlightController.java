package com.cipress.backend.controller;

import com.cipress.backend.entity.NgoSpotlight;
import com.cipress.backend.service.NgoSpotlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ngo-spotlights")
public class NgoSpotlightController {
    @Autowired
    private NgoSpotlightService service;

    @GetMapping
    public ResponseEntity<List<NgoSpotlight>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<NgoSpotlight> save(@RequestBody NgoSpotlight spotlight) {
        return ResponseEntity.ok(service.save(spotlight));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
