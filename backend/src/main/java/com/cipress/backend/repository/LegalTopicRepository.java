package com.cipress.backend.repository;

import com.cipress.backend.entity.LegalTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LegalTopicRepository extends JpaRepository<LegalTopic, Long> {
}
