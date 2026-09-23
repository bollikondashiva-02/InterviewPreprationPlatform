package com.prepconnect.prepconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepconnect.prepconnect.entity.CodingQuestion;

public interface CodingQuestionRepository
        extends JpaRepository<CodingQuestion, Long> {

    List<CodingQuestion> findByCategoryIgnoreCase(String category);

    List<CodingQuestion> findByDifficultyIgnoreCase(String difficulty);
}