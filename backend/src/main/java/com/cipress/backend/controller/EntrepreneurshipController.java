package com.cipress.backend.controller;

import com.cipress.backend.entity.Entrepreneurship;
import com.cipress.backend.service.EntrepreneurshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/entrepreneurships")
public class EntrepreneurshipController {
    @Autowired
    private EntrepreneurshipService service;

    @GetMapping
    public ResponseEntity<List<Entrepreneurship>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Entrepreneurship> save(@RequestBody Entrepreneurship entity) {
        return ResponseEntity.ok(service.save(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
