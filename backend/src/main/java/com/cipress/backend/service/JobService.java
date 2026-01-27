package com.cipress.backend.service;

import com.cipress.backend.entity.Job;
import com.cipress.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRepository repository;

    public List<Job> getAll() {
        return repository.findAll();
    }

    public Job save(Job job) {
        return repository.save(job);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
