package com.cipress.backend.controller;

import com.cipress.backend.entity.Specialist;
import com.cipress.backend.service.SpecialistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/specialists")
public class SpecialistController {
    @Autowired
    private SpecialistService service;

    @GetMapping
    public ResponseEntity<List<Specialist>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Specialist> save(@RequestBody Specialist specialist) {
        return ResponseEntity.ok(service.save(specialist));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
