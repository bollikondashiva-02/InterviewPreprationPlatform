
package com.prepconnect.prepconnect.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prepconnect.prepconnect.entity.CommunicationQuestion;
import com.prepconnect.prepconnect.repository.CommunicationQuestionRepository;

@Service
public class CommunicationQuestionServiceImpl
        implements CommunicationQuestionService {

    private final CommunicationQuestionRepository repository;

    public CommunicationQuestionServiceImpl(
            CommunicationQuestionRepository repository) {

        this.repository = repository;
    }

    @Override
    public List<CommunicationQuestion> getAllQuestions() {

        return repository.findAll();
    }

    @Override
    public List<CommunicationQuestion> getQuestionsByCategory(
            String category) {

        return repository.findByCategoryIgnoreCase(category);
    }

    @Override
    public List<CommunicationQuestion> getQuestionsByDifficulty(
            String difficulty) {

        return repository.findByDifficultyIgnoreCase(difficulty);
    }
}

