package com.cipress.backend.repository;

import com.cipress.backend.entity.ShortCollaboration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortCollaborationRepository extends JpaRepository<ShortCollaboration, Long> {
}
