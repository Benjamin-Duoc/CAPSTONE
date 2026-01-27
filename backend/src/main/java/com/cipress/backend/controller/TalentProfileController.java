package com.cipress.backend.controller;

import com.cipress.backend.entity.TalentProfile;
import com.cipress.backend.service.TalentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/talent-profiles")
public class TalentProfileController {
    @Autowired
    private TalentProfileService service;

    @GetMapping
    public ResponseEntity<List<TalentProfile>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<TalentProfile> save(@RequestBody TalentProfile profile) {
        return ResponseEntity.ok(service.save(profile));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
