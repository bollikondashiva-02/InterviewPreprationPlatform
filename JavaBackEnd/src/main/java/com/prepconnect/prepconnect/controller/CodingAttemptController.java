
package com.prepconnect.prepconnect.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prepconnect.prepconnect.entity.CodingAttempt;
import com.prepconnect.prepconnect.entity.CodingQuestion;
import com.prepconnect.prepconnect.entity.CodingTestResult;
import com.prepconnect.prepconnect.entity.User;
import com.prepconnect.prepconnect.repository.CodingAttemptRepository;
import com.prepconnect.prepconnect.repository.CodingQuestionRepository;
import com.prepconnect.prepconnect.repository.CodingTestResultRepository;
import com.prepconnect.prepconnect.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CodingAttemptController {

    private final CodingAttemptRepository codingAttemptRepository;
    private final CodingQuestionRepository codingQuestionRepository;
    private final UserRepository userRepository;
    private final CodingTestResultRepository codingTestResultRepository;

   public CodingAttemptController(
        CodingAttemptRepository codingAttemptRepository,
        CodingQuestionRepository codingQuestionRepository,
        UserRepository userRepository,
        CodingTestResultRepository codingTestResultRepository) {

        this.codingAttemptRepository = codingAttemptRepository;
        this.codingQuestionRepository = codingQuestionRepository;
        this.userRepository = userRepository;
        this.codingTestResultRepository = codingTestResultRepository;
    }

    // =========================================================
    // SUBMIT CODING ANSWER
    // =========================================================

    @PostMapping("/coding/submit")
    public ResponseEntity<?> submitAnswer(
            @RequestBody Map<String, Object> request,
            Authentication authentication) {

        try {

            // -------------------------------------------------
            // CHECK LOGIN
            // -------------------------------------------------

            if (authentication == null
                    || !authentication.isAuthenticated()) {

                return ResponseEntity
                        .status(401)
                        .body(Map.of(
                                "message",
                                "User is not authenticated."
                        ));
            }

            // -------------------------------------------------
            // GET LOGGED-IN USER EMAIL
            // -------------------------------------------------

            String email =
                    authentication.getName();

            System.out.println(
                    "Logged-in user: " + email
            );

            // -------------------------------------------------
            // FIND USER
            // -------------------------------------------------

            User user =
                    userRepository
                            .findByEmail(email)
                            .orElse(null);

            if (user == null) {

                return ResponseEntity
                        .status(404)
                        .body(Map.of(
                                "message",
                                "User not found."
                        ));
            }

            // -------------------------------------------------
            // GET QUESTION ID
            // -------------------------------------------------

            Object questionIdObject =
                    request.get("questionId");

            if (questionIdObject == null) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Question ID is required."
                        ));
            }

            Long questionId =
                    Long.valueOf(
                            questionIdObject.toString()
                    );

            // -------------------------------------------------
            // GET SELECTED ANSWER
            // -------------------------------------------------

            String selectedAnswer =
                    String.valueOf(
                            request.get("selectedAnswer")
                    );

            if (selectedAnswer == null
                    || selectedAnswer.equals("null")
                    || selectedAnswer.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Selected answer is required."
                        ));
            }

            // -------------------------------------------------
            // FIND QUESTION
            // -------------------------------------------------

            CodingQuestion question =
                    codingQuestionRepository
                            .findById(questionId)
                            .orElse(null);

            if (question == null) {

                return ResponseEntity
                        .status(404)
                        .body(Map.of(
                                "message",
                                "Coding question not found."
                        ));
            }

            // -------------------------------------------------
            // CHECK ANSWER
            // -------------------------------------------------

            String correctAnswer =
                    question.getAnswer();

            boolean correct =
                    correctAnswer.equalsIgnoreCase(
                            selectedAnswer
                    );

            String status =
                    correct
                            ? "Accepted"
                            : "Wrong Answer";

            // -------------------------------------------------
            // SAVE ATTEMPT
            // -------------------------------------------------

            CodingAttempt attempt =
                    new CodingAttempt();

            attempt.setUserId(
                    user.getId()
            );

            attempt.setQuestionId(
                    question.getId()
            );

            attempt.setLanguage(
                    question.getCategory()
            );

            attempt.setSelectedAnswer(
                    selectedAnswer
            );

            attempt.setCorrectAnswer(
                    correctAnswer
            );

            attempt.setStatus(
                    status
            );

            codingAttemptRepository.save(
                    attempt
            );

            // -------------------------------------------------
            // RESPONSE
            // -------------------------------------------------

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Answer submitted successfully."
            );

            response.put(
                    "correct",
                    correct
            );

            response.put(
                    "selectedAnswer",
                    selectedAnswer
            );

            response.put(
                    "correctAnswer",
                    correctAnswer
            );

            response.put(
                    "status",
                    status
            );

            return ResponseEntity.ok(
                    response
            );

        }
        catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(500)
                    .body(Map.of(
                            "message",
                            "Failed to submit answer.",
                            "error",
                            e.getMessage()
                    ));
        }
    }


    // =========================================================
    // GET CODING PROGRESS
    // =========================================================

    @GetMapping("/attempts/progress")
    public ResponseEntity<?> getProgress(
            @RequestParam String language,
            Authentication authentication) {

        try {

            // -------------------------------------------------
            // CHECK LOGIN
            // -------------------------------------------------

            if (authentication == null
                    || !authentication.isAuthenticated()) {

                return ResponseEntity
                        .status(401)
                        .body(Map.of(
                                "message",
                                "User is not authenticated."
                        ));
            }

            // -------------------------------------------------
            // GET USER
            // -------------------------------------------------

            String email =
                    authentication.getName();

            User user =
                    userRepository
                            .findByEmail(email)
                            .orElse(null);

            if (user == null) {

                return ResponseEntity
                        .status(404)
                        .body(Map.of(
                                "message",
                                "User not found."
                        ));
            }

            // -------------------------------------------------
            // GET ATTEMPTS
            // -------------------------------------------------

            List<CodingAttempt> attempts =
                    codingAttemptRepository
                            .findByUserIdAndLanguage(
                                    user.getId(),
                                    language
                            );

            // -------------------------------------------------
            // CALCULATE PROGRESS
            // -------------------------------------------------

            int attempted =
                    (int) attempts.stream()
                            .map(
                                    CodingAttempt::getQuestionId
                            )
                            .distinct()
                            .count();

            int solved =
                    (int) attempts.stream()
                            .filter(
                                    attempt ->
                                            "Accepted".equalsIgnoreCase(
                                                    attempt.getStatus()
                                            )
                            )
                            .map(
                                    CodingAttempt::getQuestionId
                            )
                            .distinct()
                            .count();

            // -------------------------------------------------
            // QUESTION STATUS
            // -------------------------------------------------

            Map<String, String> questionStatus =
                    new HashMap<>();

            for (CodingAttempt attempt : attempts) {

                String questionId =
                        String.valueOf(
                                attempt.getQuestionId()
                        );

                questionStatus.put(
                        questionId,
                        attempt.getStatus()
                );
            }

            // -------------------------------------------------
            // RESPONSE
            // -------------------------------------------------

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "attempted",
                    attempted
            );

            response.put(
                    "solved",
                    solved
            );

            response.put(
                    "questionStatus",
                    questionStatus
            );

            return ResponseEntity.ok(
                    response
            );

        }
        catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(500)
                    .body(Map.of(
                            "message",
                            "Failed to load progress.",
                            "error",
                            e.getMessage()
                    ));
        }
    }
    // =========================================================
// SAVE COMPLETED CODING TEST RESULT
// =========================================================

@PostMapping("/coding/test-result")
public ResponseEntity<?> saveTestResult(
        @RequestBody Map<String, Object> request,
        Authentication authentication) {

    try {

        // CHECK LOGIN
        if (authentication == null
                || !authentication.isAuthenticated()) {

            return ResponseEntity
                    .status(401)
                    .body(Map.of(
                            "message",
                            "User is not authenticated."
                    ));
        }

        // GET LOGGED-IN USER
        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .status(404)
                    .body(Map.of(
                            "message",
                            "User not found."
                    ));
        }

        // GET DATA FROM FRONTEND
        String language =
                String.valueOf(request.get("language"));

        int totalQuestions =
                Integer.parseInt(
                        String.valueOf(
                                request.get("totalQuestions")
                        )
                );

        int correctAnswers =
                Integer.parseInt(
                        String.valueOf(
                                request.get("correctAnswers")
                        )
                );

        int wrongAnswers =
                Integer.parseInt(
                        String.valueOf(
                                request.get("wrongAnswers")
                        )
                );

        int score =
                Integer.parseInt(
                        String.valueOf(
                                request.get("score")
                        )
                );

        // CREATE RESULT
        CodingTestResult result =
                new CodingTestResult();

        result.setUserId(user.getId());

        result.setLanguage(language);

        result.setTotalQuestions(totalQuestions);

        result.setCorrectAnswers(correctAnswers);

        result.setWrongAnswers(wrongAnswers);

        result.setScore(score);

        // SAVE TO DATABASE
        CodingTestResult savedResult =
                codingTestResultRepository.save(result);

        // RESPONSE
        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Coding test result saved successfully."
        );

        response.put(
                "resultId",
                savedResult.getId()
        );

        response.put(
                "language",
                language
        );

        response.put(
                "totalQuestions",
                totalQuestions
        );

        response.put(
                "correctAnswers",
                correctAnswers
        );

        response.put(
                "wrongAnswers",
                wrongAnswers
        );

        response.put(
                "score",
                score
        );

        return ResponseEntity.ok(response);

    }
    catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity
                .status(500)
                .body(Map.of(
                        "message",
                        "Failed to save coding test result.",
                        "error",
                        e.getMessage()
                ));
    }
}
// =========================================================
// GET COMPLETED CODING TEST RESULTS
// =========================================================

@GetMapping("/coding/test-results")
public ResponseEntity<?> getTestResults(
        Authentication authentication) {

    try {

        // CHECK LOGIN
        if (authentication == null
                || !authentication.isAuthenticated()) {

            return ResponseEntity
                    .status(401)
                    .body(Map.of(
                            "message",
                            "User is not authenticated."
                    ));
        }

        // GET LOGGED-IN USER
        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .status(404)
                    .body(Map.of(
                            "message",
                            "User not found."
                    ));
        }

        // GET ALL TEST RESULTS FOR THIS USER
        List<CodingTestResult> results =
                codingTestResultRepository
                        .findByUserId(user.getId());

        return ResponseEntity.ok(results);

    }
    catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity
                .status(500)
                .body(Map.of(
                        "message",
                        "Failed to load coding test results.",
                        "error",
                        e.getMessage()
                ));
    }
}
    
}

