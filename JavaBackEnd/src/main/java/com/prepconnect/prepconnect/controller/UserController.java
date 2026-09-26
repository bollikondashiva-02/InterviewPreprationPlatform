package com.prepconnect.prepconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prepconnect.prepconnect.dto.LoginRequestDTO;
import com.prepconnect.prepconnect.dto.LoginResponseDTO;
import com.prepconnect.prepconnect.dto.UserResponseDTO;
import com.prepconnect.prepconnect.entity.User;
import com.prepconnect.prepconnect.security.JwtService;
import com.prepconnect.prepconnect.service.UserService;

@RestController
@RequestMapping("/api/users")

@CrossOrigin(
        origins = {
            "http://127.0.0.1:5500",
            "https://interview-prepration-platform-psi.vercel.app"
        },
        allowedHeaders = "*",
        methods = {
            org.springframework.web.bind.annotation.RequestMethod.GET,
            org.springframework.web.bind.annotation.RequestMethod.POST,
            org.springframework.web.bind.annotation.RequestMethod.OPTIONS
        }
)
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(
            UserService userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(
            @RequestBody User user) {

        User savedUser
                = userService.registerUser(user);

        UserResponseDTO response
                = new UserResponseDTO(
                        savedUser.getId(),
                        savedUser.getName(),
                        savedUser.getEmail(),
                        savedUser.getRole(),
                        savedUser.isVerified()
                );

        return ResponseEntity.ok(response);
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO request) {

        User user
                = userService.loginUser(
                        request.getEmail(),
                        request.getPassword()
                );

        String token
                = jwtService.generateToken(
                        user.getEmail(),
                        user.getRole()
                );

        UserResponseDTO userResponse
                = new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        user.isVerified()
                );

        LoginResponseDTO response
                = new LoginResponseDTO(
                        token,
                        userResponse
                );

        return ResponseEntity.ok(response);
    }

    // =========================
    // FIND USER BY EMAIL
    // =========================
    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponseDTO> getUserByEmail(
            @PathVariable String email) {

        User user
                = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        UserResponseDTO response
                = new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        user.isVerified()
                );

        return ResponseEntity.ok(response);
    }

    // =========================
    // VERIFY EMAIL
    // =========================
    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(
            @RequestParam String token) {

        try {

            String email
                    = jwtService.extractEmail(token);

            User user
                    = userService.findByEmail(email);

            if (user == null) {
                return ResponseEntity
                        .badRequest()
                        .body("User not found");
            }

            if (user.isVerified()) {
                return ResponseEntity.ok(
                        "Email already verified"
                );
            }

            if (!token.equals(
                    user.getVerificationToken())) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Invalid verification token"
                        );
            }

            user.setVerified(true);

            user.setVerificationToken(null);

            userService.saveUser(user);

            return ResponseEntity.ok(
                    "Email verified successfully"
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Invalid or expired verification token"
                    );
        }
    }

    // =========================
    // FORGOT PASSWORD
    // =========================
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestParam String email) {

        try {

            String message
                    = userService.forgotPassword(email);

            return ResponseEntity.ok(message);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================
// RESET PASSWORD
// =========================
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {

        try {

            User user
                    = userService.findByResetPasswordToken(token);

            if (user == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid reset token");
            }

            // Check token expiry
            if (user.getResetPasswordExpiry() == null
                    || user.getResetPasswordExpiry()
                            .isBefore(java.time.LocalDateTime.now())) {

                return ResponseEntity
                        .badRequest()
                        .body("Reset token expired");
            }

            // Reset password
            userService.resetPassword(
                    user,
                    newPassword
            );

            return ResponseEntity.ok(
                    "Password reset successfully"
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Password reset failed");
        }
    }
}
