package com.cipress.backend.repository;

import com.cipress.backend.entity.LegalFAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LegalFAQRepository extends JpaRepository<LegalFAQ, Long> {
}
