package com.cipress.backend.service;

import com.cipress.backend.entity.HeroHeading;
import com.cipress.backend.repository.HeroHeadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HeroHeadingService {
    @Autowired
    private HeroHeadingRepository repository;

    public List<HeroHeading> getAll() {
        return repository.findAll();
    }

    // Convention: Assuming single record or return first
    public HeroHeading getFirst() {
        return repository.findAll().stream().findFirst().orElse(null);
    }

    public HeroHeading save(HeroHeading entity) {
        return repository.save(entity);
    }
}
