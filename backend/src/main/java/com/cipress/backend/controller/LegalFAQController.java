package com.cipress.backend.controller;

import com.cipress.backend.entity.LegalFAQ;
import com.cipress.backend.service.LegalFAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/legal-faqs")
public class LegalFAQController {
    @Autowired
    private LegalFAQService service;

    @GetMapping
    public ResponseEntity<List<LegalFAQ>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<LegalFAQ> save(@RequestBody LegalFAQ faq) {
        return ResponseEntity.ok(service.save(faq));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
