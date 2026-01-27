package com.cipress.backend.service;

import com.cipress.backend.entity.SpecialAd;
import com.cipress.backend.repository.SpecialAdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SpecialAdService {
    @Autowired
    private SpecialAdRepository repository;

    public List<SpecialAd> getAll() {
        return repository.findAll();
    }

    public SpecialAd save(SpecialAd ad) {
        return repository.save(ad);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
