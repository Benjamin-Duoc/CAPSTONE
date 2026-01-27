package com.cipress.backend.repository;

import com.cipress.backend.entity.FundingOpportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundingOpportunityRepository extends JpaRepository<FundingOpportunity, Long> {
}
