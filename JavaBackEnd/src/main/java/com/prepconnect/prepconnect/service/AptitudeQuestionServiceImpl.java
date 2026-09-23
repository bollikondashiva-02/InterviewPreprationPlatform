package com.prepconnect.prepconnect.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prepconnect.prepconnect.entity.AptitudeQuestion;
import com.prepconnect.prepconnect.repository.AptitudeQuestionRepository;

@Service
public class AptitudeQuestionServiceImpl
implements AptitudeQuestionService {


private final AptitudeQuestionRepository questionRepository;

public AptitudeQuestionServiceImpl(
        AptitudeQuestionRepository questionRepository) {

    this.questionRepository = questionRepository;
}

// =========================
// GET ALL QUESTIONS
// =========================
@Override
public List<AptitudeQuestion> getAllQuestions() {

    return questionRepository.findAll();
}

// =========================
// GET BY CATEGORY
// =========================
@Override
public List<AptitudeQuestion> getQuestionsByCategory(
        String category) {

    return questionRepository
            .findByCategory(category);
}

// =========================
// GET BY DIFFICULTY
// =========================
@Override
public List<AptitudeQuestion> getQuestionsByDifficulty(
        String difficulty) {

    return questionRepository
            .findByDifficulty(difficulty);
}

// =========================
// GET BY CATEGORY + DIFFICULTY
// =========================
@Override
public List<AptitudeQuestion>
        getQuestionsByCategoryAndDifficulty(
                String category,
                String difficulty) {

    return questionRepository
            .findByCategoryAndDifficulty(
                    category,
                    difficulty
            );
}

// =========================
// GET QUESTION BY ID
// =========================
@Override
public AptitudeQuestion getQuestionById(
        Long id) {

    return questionRepository
            .findById(id)
            .orElse(null);
}

// =========================
// SAVE QUESTION
// =========================
@Override
public AptitudeQuestion saveQuestion(
        AptitudeQuestion question) {

    return questionRepository.save(question);
}

// =========================
// DELETE QUESTION
// =========================
@Override
public void deleteQuestion(Long id) {

    questionRepository.deleteById(id);
}


}
