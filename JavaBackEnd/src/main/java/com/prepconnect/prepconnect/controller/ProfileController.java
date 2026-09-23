package com.prepconnect.prepconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prepconnect.prepconnect.dto.UserResponseDTO;
import com.prepconnect.prepconnect.entity.User;
import com.prepconnect.prepconnect.service.UserService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(
origins = "http://127.0.0.1:5500",
allowedHeaders = "*"
)
public class ProfileController {

private final UserService userService;

public ProfileController(UserService userService) {
    this.userService = userService;
}

// =========================
// GET MY PROFILE
// =========================
@GetMapping
public ResponseEntity<UserResponseDTO> getProfile(
        Authentication authentication) {

    String email = authentication.getName();

    User user = userService.findByEmail(email);

    if (user == null) {
        return ResponseEntity.notFound().build();
    }

    UserResponseDTO response =
            new UserResponseDTO(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.isVerified()
            );

    return ResponseEntity.ok(response);
}


}
