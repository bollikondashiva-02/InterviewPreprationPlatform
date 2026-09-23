package com.prepconnect.prepconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepconnect.prepconnect.entity.AptitudeQuestion;

public interface AptitudeQuestionRepository
extends JpaRepository<AptitudeQuestion, Long> {


List<AptitudeQuestion> findByCategory(String category);

List<AptitudeQuestion> findByDifficulty(String difficulty);

List<AptitudeQuestion> findByCategoryAndDifficulty(
        String category,
        String difficulty
);


}
