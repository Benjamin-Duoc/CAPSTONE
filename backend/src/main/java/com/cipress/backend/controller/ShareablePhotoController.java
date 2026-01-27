package com.cipress.backend.controller;

import com.cipress.backend.entity.ShareablePhoto;
import com.cipress.backend.service.ShareablePhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shareable-photos")
public class ShareablePhotoController {
    @Autowired
    private ShareablePhotoService service;

    @GetMapping
    public ResponseEntity<List<ShareablePhoto>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<ShareablePhoto> save(@RequestBody ShareablePhoto photo) {
        return ResponseEntity.ok(service.save(photo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
