package com.cipress.backend.service;

import com.cipress.backend.entity.LegalTopic;
import com.cipress.backend.repository.LegalTopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LegalTopicService {
    @Autowired
    private LegalTopicRepository repository;

    public List<LegalTopic> getAll() {
        return repository.findAll();
    }

    public LegalTopic save(LegalTopic topic) {
        return repository.save(topic);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
