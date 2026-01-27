package com.cipress.backend.controller;

import com.cipress.backend.entity.HeroHeading;
import com.cipress.backend.service.HeroHeadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hero-heading")
public class HeroHeadingController {
    @Autowired
    private HeroHeadingService service;

    @GetMapping
    public ResponseEntity<HeroHeading> getHeroHeading() {
        HeroHeading heading = service.getFirst();
        return heading != null ? ResponseEntity.ok(heading) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<HeroHeading> saveHeroHeading(@RequestBody HeroHeading heading) {
        return ResponseEntity.ok(service.save(heading));
    }
}
