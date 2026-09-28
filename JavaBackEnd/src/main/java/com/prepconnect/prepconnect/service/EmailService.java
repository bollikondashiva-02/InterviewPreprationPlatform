package com.prepconnect.prepconnect.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY:}")
    private String brevoApiKey;

    private static final String BREVO_URL = "https://api.brevo.com/v3/smtp/email";

    private final HttpClient httpClient = HttpClient.newHttpClient();

    // =========================
    // EMAIL VERIFICATION
    // =========================
    public void sendVerificationEmail(
            String email,
            String verificationToken) {

        String verificationLink =
                "http://127.0.0.1:5500/FrontEnd/verify.html?token="
                + verificationToken;

        String subject = "PrepConnect Email Verification";

        String text =
                "Welcome to PrepConnect!\n\n"
                + "Please verify your email using the link below:\n\n"
                + verificationLink
                + "\n\n"
                + "Thank you,\n"
                + "PrepConnect Team";

        sendEmail(email, subject, text);
    }

    // =========================
    // PASSWORD RESET EMAIL
    // =========================
    public void sendPasswordResetEmail(
            String email,
            String resetToken) {

        String resetLink =
                "http://127.0.0.1:5500/FrontEnd/reset-password.html?token="
                + resetToken;

        String subject = "PrepConnect Password Reset";

        String text =
                "Hello!\n\n"
                + "We received a request to reset your "
                + "PrepConnect password.\n\n"
                + "Click the link below to reset your password:\n\n"
                + resetLink
                + "\n\n"
                + "This link will expire in 15 minutes.\n\n"
                + "If you did not request a password reset, "
                + "please ignore this email.\n\n"
                + "Thank you,\n"
                + "PrepConnect Team";

        sendEmail(email, subject, text);
    }

    // =========================
    // BREVO EMAIL SENDER
    // =========================
    private void sendEmail(
            String recipient,
            String subject,
            String text) {

        if (brevoApiKey == null || brevoApiKey.isBlank()) {
            throw new RuntimeException("BREVO_API_KEY is not configured");
        }

        String json =
                "{"
                + "\"sender\":{"
                + "\"name\":\"PrepConnect\","
                + "\"email\":\"prepconnect002@gmail.com\""
                + "},"
                + "\"to\":[{"
                + "\"email\":\"" + escapeJson(recipient) + "\""
                + "}],"
                + "\"subject\":\"" + escapeJson(subject) + "\","
                + "\"textContent\":\"" + escapeJson(text) + "\""
                + "}";

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BREVO_URL))
                    .header("accept", "application/json")
                    .header("api-key", brevoApiKey)
                    .header("content-type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() < 200
                    || response.statusCode() >= 300) {

                throw new RuntimeException(
                        "Brevo email failed. HTTP "
                        + response.statusCode()
                        + ": "
                        + response.body()
                );
            }

            System.out.println(
                    "Brevo email sent successfully to: "
                    + recipient
            );

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to send email through Brevo: "
                    + e.getMessage(),
                    e
            );
        }
    }

    private String escapeJson(String value) {
        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "\\r")
                .replace("\n", "\\n")
                .replace("\t", "\\t");
    }
}
