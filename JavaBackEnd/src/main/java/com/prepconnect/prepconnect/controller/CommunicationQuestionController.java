
package com.prepconnect.prepconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.prepconnect.prepconnect.entity.CommunicationQuestion;
import com.prepconnect.prepconnect.service.CommunicationQuestionService;

@RestController
@RequestMapping("/api/communication")
@CrossOrigin(
        origins = "http://127.0.0.1:5500",
        allowedHeaders = "*",
        methods = {
                RequestMethod.GET,
                RequestMethod.OPTIONS
        }
)
public class CommunicationQuestionController {

    private final CommunicationQuestionService service;

    public CommunicationQuestionController(
            CommunicationQuestionService service) {

        this.service = service;
    }

    @GetMapping("/questions")
    public ResponseEntity<List<CommunicationQuestion>> getAllQuestions() {

        return ResponseEntity.ok(
                service.getAllQuestions()
        );
    }

    @GetMapping("/questions/category/{category}")
    public ResponseEntity<List<CommunicationQuestion>> getQuestionsByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                service.getQuestionsByCategory(category)
        );
    }

    @GetMapping("/questions/difficulty/{difficulty}")
    public ResponseEntity<List<CommunicationQuestion>> getQuestionsByDifficulty(
            @PathVariable String difficulty) {

        return ResponseEntity.ok(
                service.getQuestionsByDifficulty(difficulty)
        );
    }
}

