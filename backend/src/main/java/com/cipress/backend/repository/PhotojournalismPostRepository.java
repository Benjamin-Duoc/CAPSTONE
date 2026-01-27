package com.cipress.backend.repository;

import com.cipress.backend.entity.PhotojournalismPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotojournalismPostRepository extends JpaRepository<PhotojournalismPost, Long> {
}
