package com.cipress.backend.service;

import com.cipress.backend.entity.CommunityAd;
import com.cipress.backend.repository.CommunityAdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommunityAdService {
    @Autowired
    private CommunityAdRepository repository;

    public List<CommunityAd> getAll() {
        return repository.findAll();
    }

    public CommunityAd save(CommunityAd ad) {
        return repository.save(ad);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
