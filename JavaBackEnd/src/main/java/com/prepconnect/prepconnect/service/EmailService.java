package com.prepconnect.prepconnect.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // =========================
    // EMAIL VERIFICATION
    // =========================
    public void sendVerificationEmail(
            String email,
            String verificationToken) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom("prepconnect05@gmail.com");
        message.setTo(email);
        message.setSubject(
                "PrepConnect Email Verification"
        );

        message.setText(
                "Welcome to PrepConnect!\n\n"
                + "Please verify your email using the link below:\n\n"
                + "http://127.0.0.1:5500/FrontEnd/verify.html?token="
                + verificationToken
                + "\n\n"
                + "Thank you,\n"
                + "PrepConnect Team"
        );

        mailSender.send(message);
    }


    // =========================
    // PASSWORD RESET EMAIL
    // =========================
    public void sendPasswordResetEmail(
            String email,
            String resetToken) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom("prepconnect05@gmail.com");
        message.setTo(email);

        message.setSubject(
                "PrepConnect Password Reset"
        );

        message.setText(
                "Hello!\n\n"
                + "We received a request to reset your "
                + "PrepConnect password.\n\n"
                + "Click the link below to reset your password:\n\n"
                + "http://127.0.0.1:5500/FrontEnd/reset-password.html?token="
                + resetToken
                + "\n\n"
                + "This link will expire in 15 minutes.\n\n"
                + "If you did not request a password reset, "
                + "please ignore this email.\n\n"
                + "Thank you,\n"
                + "PrepConnect Team"
        );

        mailSender.send(message);
    }
}