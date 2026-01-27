package com.cipress.backend.repository;

import com.cipress.backend.entity.PromoVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromoVideoRepository extends JpaRepository<PromoVideo, Long> {
}
