package com.cipress.backend.repository;

import com.cipress.backend.entity.PressRelease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PressReleaseRepository extends JpaRepository<PressRelease, Long> {
}
