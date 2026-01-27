package com.cipress.backend.repository;

import com.cipress.backend.entity.SponsoredAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SponsoredAdRepository extends JpaRepository<SponsoredAd, Long> {
}
