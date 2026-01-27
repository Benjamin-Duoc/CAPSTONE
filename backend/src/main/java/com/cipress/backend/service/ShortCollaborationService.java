package com.cipress.backend.service;

import com.cipress.backend.entity.ShortCollaboration;
import com.cipress.backend.repository.ShortCollaborationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShortCollaborationService {
    @Autowired
    private ShortCollaborationRepository repository;

    public List<ShortCollaboration> getAll() {
        return repository.findAll();
    }

    public ShortCollaboration save(ShortCollaboration colab) {
        return repository.save(colab);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
