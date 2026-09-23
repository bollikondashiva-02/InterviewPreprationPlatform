package com.prepconnect.prepconnect.service;

import com.prepconnect.prepconnect.entity.User;

public interface UserService {

    User registerUser(User user);

    User findByEmail(String email);

    User loginUser(String email, String password);

    User saveUser(User user);

    String verifyEmail(String token);

    // Forgot Password
    String forgotPassword(String email);

    // Find user using reset token
    User findByResetPasswordToken(String token);

    // Reset password
    void resetPassword(
            User user,
            String newPassword
    );
}