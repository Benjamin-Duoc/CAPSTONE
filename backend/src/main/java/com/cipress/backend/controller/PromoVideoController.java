package com.cipress.backend.controller;

import com.cipress.backend.entity.PromoVideo;
import com.cipress.backend.service.PromoVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/promo-videos")
public class PromoVideoController {
    @Autowired
    private PromoVideoService service;

    @GetMapping
    public ResponseEntity<List<PromoVideo>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<PromoVideo> save(@RequestBody PromoVideo video) {
        return ResponseEntity.ok(service.save(video));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
