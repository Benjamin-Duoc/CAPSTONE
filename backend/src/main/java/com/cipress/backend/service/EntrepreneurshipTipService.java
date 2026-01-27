package com.cipress.backend.service;

import com.cipress.backend.entity.EntrepreneurshipTip;
import com.cipress.backend.repository.EntrepreneurshipTipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EntrepreneurshipTipService {
    @Autowired
    private EntrepreneurshipTipRepository repository;

    public List<EntrepreneurshipTip> getAll() {
        return repository.findAll();
    }

    public EntrepreneurshipTip save(EntrepreneurshipTip tip) {
        return repository.save(tip);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
