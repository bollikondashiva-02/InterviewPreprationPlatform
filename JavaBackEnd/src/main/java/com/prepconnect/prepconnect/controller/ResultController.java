package com.prepconnect.prepconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.prepconnect.prepconnect.entity.Result;
import com.prepconnect.prepconnect.service.ResultService;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(
        origins = "http://127.0.0.1:5500",
        allowedHeaders = "*",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.OPTIONS
        }
)
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    // ==========================================
    // SAVE RESULT
    // ==========================================

    @PostMapping
    public ResponseEntity<Result> saveResult(
            @RequestBody Result result,
            Authentication authentication) {

        // Get logged-in user's email from JWT
        String email = authentication.getName();

        // Set email automatically
        result.setEmail(email);

        // Save result
        Result savedResult =
                resultService.saveResult(result);

        return ResponseEntity.ok(savedResult);
    }

    // ==========================================
    // GET MY RESULTS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Result>> getMyResults(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                resultService.getResultsByEmail(email)
        );
    }
}