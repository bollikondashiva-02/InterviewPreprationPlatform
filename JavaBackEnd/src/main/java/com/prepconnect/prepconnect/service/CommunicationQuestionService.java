
package com.prepconnect.prepconnect.service;

import java.util.List;

import com.prepconnect.prepconnect.entity.CommunicationQuestion;

public interface CommunicationQuestionService {

    List<CommunicationQuestion> getAllQuestions();

    List<CommunicationQuestion> getQuestionsByCategory(String category);

    List<CommunicationQuestion> getQuestionsByDifficulty(String difficulty);
}

