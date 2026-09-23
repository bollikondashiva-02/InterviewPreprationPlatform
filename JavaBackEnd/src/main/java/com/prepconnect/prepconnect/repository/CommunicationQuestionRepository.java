
package com.prepconnect.prepconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepconnect.prepconnect.entity.CommunicationQuestion;

public interface CommunicationQuestionRepository
        extends JpaRepository<CommunicationQuestion, Long> {

    List<CommunicationQuestion> findByCategoryIgnoreCase(String category);

    List<CommunicationQuestion> findByDifficultyIgnoreCase(String difficulty);
}

