package com.cipress.backend.service;

import com.cipress.backend.entity.AppConfig;
import com.cipress.backend.repository.AppConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppConfigService {
    @Autowired
    private AppConfigRepository repository;

    public List<AppConfig> getAll() {
        return repository.findAll();
    }

    public AppConfig save(AppConfig config) {
        return repository.save(config);
    }
}
