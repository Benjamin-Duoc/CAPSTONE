package com.cipress.backend.controller;

import com.cipress.backend.entity.FundingOpportunity;
import com.cipress.backend.service.FundingOpportunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/funding-opportunities")
public class FundingOpportunityController {
    @Autowired
    private FundingOpportunityService service;

    @GetMapping
    public ResponseEntity<List<FundingOpportunity>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<FundingOpportunity> save(@RequestBody FundingOpportunity opportunity) {
        return ResponseEntity.ok(service.save(opportunity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
