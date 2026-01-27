package com.cipress.backend.service;

import com.cipress.backend.entity.Specialist;
import com.cipress.backend.repository.SpecialistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SpecialistService {
    @Autowired
    private SpecialistRepository repository;

    public List<Specialist> getAll() {
        return repository.findAll();
    }

    public Specialist save(Specialist specialist) {
        return repository.save(specialist);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
