package com.cipress.backend.service;

import com.cipress.backend.entity.NgoSpotlight;
import com.cipress.backend.repository.NgoSpotlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NgoSpotlightService {
    @Autowired
    private NgoSpotlightRepository repository;

    public List<NgoSpotlight> getAll() {
        return repository.findAll();
    }

    public NgoSpotlight save(NgoSpotlight spotlight) {
        return repository.save(spotlight);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
