package com.cipress.backend.service;

import com.cipress.backend.entity.FundingOpportunity;
import com.cipress.backend.repository.FundingOpportunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FundingOpportunityService {
    @Autowired
    private FundingOpportunityRepository repository;

    public List<FundingOpportunity> getAll() {
        return repository.findAll();
    }

    public FundingOpportunity save(FundingOpportunity opportunity) {
        return repository.save(opportunity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
