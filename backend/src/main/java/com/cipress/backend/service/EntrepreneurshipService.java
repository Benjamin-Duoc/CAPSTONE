package com.cipress.backend.service;

import com.cipress.backend.entity.Entrepreneurship;
import com.cipress.backend.repository.EntrepreneurshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EntrepreneurshipService {
    @Autowired
    private EntrepreneurshipRepository repository;

    public List<Entrepreneurship> getAll() {
        return repository.findAll();
    }

    public Entrepreneurship save(Entrepreneurship entity) {
        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
