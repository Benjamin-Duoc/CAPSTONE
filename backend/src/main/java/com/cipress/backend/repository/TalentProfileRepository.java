package com.cipress.backend.repository;

import com.cipress.backend.entity.TalentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentProfileRepository extends JpaRepository<TalentProfile, Long> {
}
