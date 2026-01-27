package com.cipress.backend.repository;

import com.cipress.backend.entity.ShareablePhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareablePhotoRepository extends JpaRepository<ShareablePhoto, Long> {
}
