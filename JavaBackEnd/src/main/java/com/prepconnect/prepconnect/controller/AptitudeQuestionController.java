package com.prepconnect.prepconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prepconnect.prepconnect.entity.AptitudeQuestion;
import com.prepconnect.prepconnect.service.AptitudeQuestionService;

@RestController
@RequestMapping("/api/aptitude")
@CrossOrigin(
origins = "http://127.0.0.1:5500",
allowedHeaders = "*",
methods = {
RequestMethod.GET,
RequestMethod.POST,
RequestMethod.DELETE,
RequestMethod.OPTIONS
}
)
public class AptitudeQuestionController {


private final AptitudeQuestionService questionService;

public AptitudeQuestionController(
        AptitudeQuestionService questionService) {

    this.questionService = questionService;
}

// =========================
// GET ALL QUESTIONS
// =========================

@GetMapping("/questions")
public ResponseEntity<List<AptitudeQuestion>> getAllQuestions() {

    return ResponseEntity.ok(
            questionService.getAllQuestions()
    );
}

// =========================
// GET QUESTION BY ID
// =========================

@GetMapping("/questions/{id}")
public ResponseEntity<AptitudeQuestion> getQuestionById(
        @PathVariable Long id) {

    AptitudeQuestion question =
            questionService.getQuestionById(id);

    if (question == null) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(question);
}

// =========================
// GET BY CATEGORY
// =========================

@GetMapping("/questions/category/{category}")
public ResponseEntity<List<AptitudeQuestion>>
        getQuestionsByCategory(
                @PathVariable String category) {

    return ResponseEntity.ok(
            questionService.getQuestionsByCategory(
                    category
            )
    );
}

// =========================
// GET BY DIFFICULTY
// =========================

@GetMapping("/questions/difficulty/{difficulty}")
public ResponseEntity<List<AptitudeQuestion>>
        getQuestionsByDifficulty(
                @PathVariable String difficulty) {

    return ResponseEntity.ok(
            questionService.getQuestionsByDifficulty(
                    difficulty
            )
    );
}

// =========================
// GET BY CATEGORY + DIFFICULTY
// =========================

@GetMapping("/questions/filter")
public ResponseEntity<List<AptitudeQuestion>>
        getQuestionsByCategoryAndDifficulty(
                @RequestParam String category,
                @RequestParam String difficulty) {

    return ResponseEntity.ok(
            questionService
                    .getQuestionsByCategoryAndDifficulty(
                            category,
                            difficulty
                    )
    );
}

// =========================
// ADD QUESTION
// =========================

@PostMapping("/questions")
public ResponseEntity<AptitudeQuestion> saveQuestion(
        @RequestBody AptitudeQuestion question) {

    return ResponseEntity.ok(
            questionService.saveQuestion(question)
    );
}

// =========================
// DELETE QUESTION
// =========================

@DeleteMapping("/questions/{id}")
public ResponseEntity<String> deleteQuestion(
        @PathVariable Long id) {

    AptitudeQuestion question =
            questionService.getQuestionById(id);

    if (question == null) {
        return ResponseEntity.notFound().build();
    }

    questionService.deleteQuestion(id);

    return ResponseEntity.ok(
            "Question deleted successfully"
    );
}


}
