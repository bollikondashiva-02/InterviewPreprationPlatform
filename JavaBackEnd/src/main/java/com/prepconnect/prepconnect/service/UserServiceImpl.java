package com.prepconnect.prepconnect.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.prepconnect.prepconnect.entity.User;
import com.prepconnect.prepconnect.repository.UserRepository;
import com.prepconnect.prepconnect.security.JwtService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder
            = new BCryptPasswordEncoder();

    public UserServiceImpl(
            UserRepository userRepository,
            JwtService jwtService,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // =========================
    // REGISTER USER
    // =========================
    @Override
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Encrypt password
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        // Generate verification token
        String verificationToken =
                jwtService.generateToken(
                        user.getEmail(),
                        "verification"
                );

        // Store verification token
        user.setVerificationToken(
                verificationToken
        );

        // User is not verified yet
        user.setVerified(false);

        // Save user
        User savedUser =
                userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(
                savedUser.getEmail(),
                verificationToken
        );

        return savedUser;
    }

    // =========================
    // FIND USER BY EMAIL
    // =========================
    @Override
    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElse(null);
    }

    // =========================
    // LOGIN
    // =========================
    @Override
    public User loginUser(
            String email,
            String password) {

        User user =
                userRepository.findByEmail(email)
                        .orElse(null);

        if (user == null) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        if (!user.isVerified()) {
            throw new RuntimeException(
                    "Please verify your email before login"
            );
        }

        return user;
    }

    // =========================
    // VERIFY EMAIL
    // =========================
    @Override
    public String verifyEmail(String token) {

        try {

            String email =
                    jwtService.extractEmail(token);

            User user =
                    userRepository.findByEmail(email)
                            .orElse(null);

            if (user == null) {
                return "User not found";
            }

            user.setVerified(true);

            user.setVerificationToken(null);

            userRepository.save(user);

            return "Email verified successfully";

        } catch (Exception e) {

            return "Invalid or expired verification link";
        }
    }

    // =========================
    // FORGOT PASSWORD
    // =========================
    @Override
    public String forgotPassword(String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElse(null);

        if (user == null) {
            throw new RuntimeException(
                    "Email not registered"
            );
        }

        if (!user.isVerified()) {
            throw new RuntimeException(
                    "Please verify your email first"
            );
        }

        // Generate random reset token
        String resetToken =
                UUID.randomUUID().toString();

        // Store token
        user.setResetPasswordToken(
                resetToken
        );

        // Token valid for 15 minutes
        user.setResetPasswordExpiry(
                LocalDateTime.now().plusMinutes(15)
        );

        userRepository.save(user);

        // Send reset email
        emailService.sendPasswordResetEmail(
                user.getEmail(),
                resetToken
        );

        return "Password reset email sent";
    }

    // =========================
    // FIND USER BY RESET TOKEN
    // =========================
    @Override
    public User findByResetPasswordToken(
            String token) {

        return userRepository
                .findByResetPasswordToken(token)
                .orElse(null);
    }

    // =========================
    // RESET PASSWORD
    // =========================
    @Override
    public void resetPassword(
            User user,
            String newPassword) {

        // Encrypt new password
        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );

        // Remove reset token
        user.setResetPasswordToken(null);

        // Remove expiry
        user.setResetPasswordExpiry(null);

        // Save user
        userRepository.save(user);
    }
}