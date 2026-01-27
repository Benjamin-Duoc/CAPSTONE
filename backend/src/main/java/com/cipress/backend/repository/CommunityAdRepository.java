package com.cipress.backend.repository;

import com.cipress.backend.entity.CommunityAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityAdRepository extends JpaRepository<CommunityAd, Long> {
}
