package com.cipress.backend.service;

import com.cipress.backend.entity.LegalFAQ;
import com.cipress.backend.repository.LegalFAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LegalFAQService {
    @Autowired
    private LegalFAQRepository repository;

    public List<LegalFAQ> getAll() {
        return repository.findAll();
    }

    public LegalFAQ save(LegalFAQ faq) {
        return repository.save(faq);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
