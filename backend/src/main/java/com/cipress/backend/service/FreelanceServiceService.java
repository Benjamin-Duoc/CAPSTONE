package com.cipress.backend.service;

import com.cipress.backend.entity.FreelanceService;
import com.cipress.backend.repository.FreelanceServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FreelanceServiceService { // Naming convention slightly repetitive but consistent with entity
    @Autowired
    private FreelanceServiceRepository repository;

    public List<FreelanceService> getAll() {
        return repository.findAll();
    }

    public FreelanceService save(FreelanceService service) {
        return repository.save(service);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
