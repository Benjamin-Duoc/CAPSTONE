package com.cipress.backend.repository;

import com.cipress.backend.entity.SpecialAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialAdRepository extends JpaRepository<SpecialAd, String> {
}
