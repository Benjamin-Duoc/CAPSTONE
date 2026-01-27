package com.cipress.backend.controller;

import com.cipress.backend.entity.PhotojournalismPost;
import com.cipress.backend.service.PhotojournalismPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/photojournalism-posts")
public class PhotojournalismPostController {
    @Autowired
    private PhotojournalismPostService service;

    @GetMapping
    public ResponseEntity<List<PhotojournalismPost>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<PhotojournalismPost> save(@RequestBody PhotojournalismPost post) {
        return ResponseEntity.ok(service.save(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
