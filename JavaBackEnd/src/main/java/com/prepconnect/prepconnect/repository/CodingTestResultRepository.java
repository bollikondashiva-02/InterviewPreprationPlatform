package com.prepconnect.prepconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepconnect.prepconnect.entity.CodingTestResult;

public interface CodingTestResultRepository
        extends JpaRepository<CodingTestResult, Long> {

    List<CodingTestResult> findByUserId(Long userId);

    List<CodingTestResult> findByUserIdAndLanguage(
            Long userId,
            String language
    );
}