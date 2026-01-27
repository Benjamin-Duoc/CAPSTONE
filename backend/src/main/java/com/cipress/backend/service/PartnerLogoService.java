package com.cipress.backend.service;

import com.cipress.backend.entity.PartnerLogo;
import com.cipress.backend.repository.PartnerLogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PartnerLogoService {
    @Autowired
    private PartnerLogoRepository repository;

    public List<PartnerLogo> getAll() {
        return repository.findAll();
    }

    public PartnerLogo save(PartnerLogo logo) {
        return repository.save(logo);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
