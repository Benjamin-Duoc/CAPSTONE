package com.cipress.backend.repository;

import com.cipress.backend.entity.HeroHeading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroHeadingRepository extends JpaRepository<HeroHeading, Long> {
}
