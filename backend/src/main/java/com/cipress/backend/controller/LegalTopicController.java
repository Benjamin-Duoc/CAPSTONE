package com.cipress.backend.controller;

import com.cipress.backend.entity.LegalTopic;
import com.cipress.backend.service.LegalTopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/legal-topics")
public class LegalTopicController {
    @Autowired
    private LegalTopicService service;

    @GetMapping
    public ResponseEntity<List<LegalTopic>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<LegalTopic> save(@RequestBody LegalTopic topic) {
        return ResponseEntity.ok(service.save(topic));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
