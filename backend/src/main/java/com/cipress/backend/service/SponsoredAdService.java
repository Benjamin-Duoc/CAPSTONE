package com.cipress.backend.service;

import com.cipress.backend.entity.SponsoredAd;
import com.cipress.backend.repository.SponsoredAdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SponsoredAdService {
    @Autowired
    private SponsoredAdRepository repository;

    public List<SponsoredAd> getAll() {
        return repository.findAll();
    }

    public SponsoredAd save(SponsoredAd ad) {
        return repository.save(ad);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
