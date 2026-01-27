package com.cipress.backend.controller;

import com.cipress.backend.entity.CommunityPost;
import com.cipress.backend.service.CommunityPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/community-posts")
public class CommunityPostController {
    @Autowired
    private CommunityPostService service;

    @GetMapping
    public ResponseEntity<List<CommunityPost>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<CommunityPost> save(@RequestBody CommunityPost post) {
        return ResponseEntity.ok(service.save(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
