package com.cipress.backend.service;

import com.cipress.backend.entity.PremiumSponsor;
import com.cipress.backend.repository.PremiumSponsorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PremiumSponsorService {
    @Autowired
    private PremiumSponsorRepository repository;

    public List<PremiumSponsor> getAll() {
        return repository.findAll();
    }

    public PremiumSponsor save(PremiumSponsor sponsor) {
        return repository.save(sponsor);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
