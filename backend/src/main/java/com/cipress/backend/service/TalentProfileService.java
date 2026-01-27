package com.cipress.backend.service;

import com.cipress.backend.entity.TalentProfile;
import com.cipress.backend.repository.TalentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TalentProfileService {
    @Autowired
    private TalentProfileRepository repository;

    public List<TalentProfile> getAll() {
        return repository.findAll();
    }

    public TalentProfile save(TalentProfile profile) {
        return repository.save(profile);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
