package com.prepconnect.prepconnect.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prepconnect.prepconnect.entity.CodingQuestion;
import com.prepconnect.prepconnect.repository.CodingQuestionRepository;

@RestController
@RequestMapping("/api/coding")
@CrossOrigin(origins = "*")
public class CodingQuestionController {

    private final CodingQuestionRepository codingQuestionRepository;

    public CodingQuestionController(
            CodingQuestionRepository codingQuestionRepository) {

        this.codingQuestionRepository = codingQuestionRepository;
    }

    // ========================================
    // GET ALL CODING QUESTIONS
    // ========================================

    @GetMapping("/questions")
    public List<CodingQuestion> getAllQuestions() {

        return codingQuestionRepository.findAll();
    }

    // ========================================
    // GET QUESTIONS BY CATEGORY
    // ========================================

    @GetMapping("/questions/category/{category}")
    public List<CodingQuestion> getQuestionsByCategory(
            @PathVariable String category) {

        return codingQuestionRepository
                .findByCategoryIgnoreCase(category);
    }

    // ========================================
    // GET QUESTIONS BY DIFFICULTY
    // ========================================

    @GetMapping("/questions/difficulty/{difficulty}")
    public List<CodingQuestion> getQuestionsByDifficulty(
            @PathVariable String difficulty) {

        return codingQuestionRepository
                .findByDifficultyIgnoreCase(difficulty);
    }
}