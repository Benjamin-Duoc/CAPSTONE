package com.cipress.backend.controller;

import com.cipress.backend.entity.ShortCollaboration;
import com.cipress.backend.service.ShortCollaborationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/short-collaborations")
public class ShortCollaborationController {
    @Autowired
    private ShortCollaborationService service;

    @GetMapping
    public ResponseEntity<List<ShortCollaboration>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<ShortCollaboration> save(@RequestBody ShortCollaboration colab) {
        return ResponseEntity.ok(service.save(colab));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
