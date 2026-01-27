package com.cipress.backend.repository;

import com.cipress.backend.entity.PremiumSponsor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PremiumSponsorRepository extends JpaRepository<PremiumSponsor, Long> {
}
