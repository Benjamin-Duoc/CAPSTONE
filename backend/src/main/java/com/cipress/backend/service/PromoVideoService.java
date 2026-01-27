package com.cipress.backend.service;

import com.cipress.backend.entity.PromoVideo;
import com.cipress.backend.repository.PromoVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PromoVideoService {
    @Autowired
    private PromoVideoRepository repository;

    public List<PromoVideo> getAll() {
        return repository.findAll();
    }

    public PromoVideo save(PromoVideo video) {
        return repository.save(video);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
