package com.prepconnect.prepconnect.service;

import java.util.List;

import com.prepconnect.prepconnect.entity.AptitudeQuestion;

public interface AptitudeQuestionService {


List<AptitudeQuestion> getAllQuestions();

List<AptitudeQuestion> getQuestionsByCategory(
        String category
);

List<AptitudeQuestion> getQuestionsByDifficulty(
        String difficulty
);

List<AptitudeQuestion> getQuestionsByCategoryAndDifficulty(
        String category,
        String difficulty
);

AptitudeQuestion getQuestionById(Long id);

AptitudeQuestion saveQuestion(
        AptitudeQuestion question
);

void deleteQuestion(Long id);


}
