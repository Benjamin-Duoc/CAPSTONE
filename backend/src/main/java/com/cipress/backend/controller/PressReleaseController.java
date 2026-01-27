package com.cipress.backend.controller;

import com.cipress.backend.entity.PressRelease;
import com.cipress.backend.service.PressReleaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/press-releases")
public class PressReleaseController {
    @Autowired
    private PressReleaseService service;

    @GetMapping
    public ResponseEntity<List<PressRelease>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<PressRelease> save(@RequestBody PressRelease pressRelease) {
        return ResponseEntity.ok(service.save(pressRelease));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
