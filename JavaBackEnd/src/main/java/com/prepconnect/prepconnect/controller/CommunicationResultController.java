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

import com.prepconnect.prepconnect.entity.CommunicationResult;
import com.prepconnect.prepconnect.service.CommunicationResultService;

@RestController
@RequestMapping("/api/communication/results")
@CrossOrigin(
origins = "http://127.0.0.1:5500",
allowedHeaders = "*",
methods = {
RequestMethod.GET,
RequestMethod.POST,
RequestMethod.OPTIONS
}
)
public class CommunicationResultController {


private final CommunicationResultService resultService;

public CommunicationResultController(
        CommunicationResultService resultService) {

    this.resultService = resultService;
}

// ==========================================
// SAVE COMMUNICATION RESULT
// ==========================================

@PostMapping
public ResponseEntity<CommunicationResult> saveResult(
        @RequestBody CommunicationResult result,
        Authentication authentication) {

    String email = authentication.getName();

    result.setEmail(email);

    CommunicationResult savedResult =
            resultService.saveResult(result);

    return ResponseEntity.ok(savedResult);
}

// ==========================================
// GET MY COMMUNICATION RESULTS
// ==========================================

@GetMapping
public ResponseEntity<List<CommunicationResult>> getMyResults(
        Authentication authentication) {

    String email = authentication.getName();

    return ResponseEntity.ok(
            resultService.getResultsByEmail(email)
    );
}


}
