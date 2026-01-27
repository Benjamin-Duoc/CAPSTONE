package com.cipress.backend.controller;

import com.cipress.backend.entity.FreelanceService;
import com.cipress.backend.service.FreelanceServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/freelance-services")
public class FreelanceServiceController {
    @Autowired
    private FreelanceServiceService service;

    @GetMapping
    public ResponseEntity<List<FreelanceService>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<FreelanceService> save(@RequestBody FreelanceService item) {
        return ResponseEntity.ok(service.save(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
