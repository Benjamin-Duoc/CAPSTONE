package com.cipress.backend.repository;

import com.cipress.backend.entity.EntrepreneurshipTip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrepreneurshipTipRepository extends JpaRepository<EntrepreneurshipTip, Long> {
}
