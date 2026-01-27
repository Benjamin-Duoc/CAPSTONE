package com.cipress.backend.service;

import com.cipress.backend.entity.Resource;
import com.cipress.backend.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository repository;

    public List<Resource> getAll() {
        return repository.findAll();
    }

    public Resource save(Resource resource) {
        return repository.save(resource);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
