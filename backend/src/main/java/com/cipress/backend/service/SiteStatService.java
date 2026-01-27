package com.cipress.backend.service;

import com.cipress.backend.entity.SiteStat;
import com.cipress.backend.repository.SiteStatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SiteStatService {
    @Autowired
    private SiteStatRepository repository;

    public List<SiteStat> getAll() {
        return repository.findAll();
    }

    public List<SiteStat> saveAll(List<SiteStat> stats) {
        return repository.saveAll(stats);
    }
}
