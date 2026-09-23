
package com.prepconnect.prepconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepconnect.prepconnect.entity.CodingAttempt;

public interface CodingAttemptRepository
        extends JpaRepository<CodingAttempt, Long> {

    List<CodingAttempt> findByUserIdAndLanguage(
            Long userId,
            String language
    );

    List<CodingAttempt> findByUserIdAndQuestionId(
            Long userId,
            Long questionId
    );
}

