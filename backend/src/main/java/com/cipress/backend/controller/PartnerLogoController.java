package com.cipress.backend.controller;

import com.cipress.backend.entity.PartnerLogo;
import com.cipress.backend.service.PartnerLogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/partner-logos")
public class PartnerLogoController {
    @Autowired
    private PartnerLogoService service;

    @GetMapping
    public ResponseEntity<List<PartnerLogo>> getAllLogos() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<PartnerLogo> saveLogo(@RequestBody PartnerLogo logo) {
        return ResponseEntity.ok(service.save(logo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogo(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
