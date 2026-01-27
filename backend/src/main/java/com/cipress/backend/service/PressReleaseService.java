package com.cipress.backend.service;

import com.cipress.backend.entity.PressRelease;
import com.cipress.backend.repository.PressReleaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PressReleaseService {
    @Autowired
    private PressReleaseRepository repository;

    public List<PressRelease> getAll() {
        return repository.findAll();
    }

    public PressRelease save(PressRelease pressRelease) {
        return repository.save(pressRelease);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
