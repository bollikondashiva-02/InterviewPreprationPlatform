package com.prepconnect.prepconnect.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "communication_results")
public class CommunicationResult {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false)
private String email;

@Column(nullable = false)
private String category;

@Column(nullable = false)
private int score;

@Column(nullable = false)
private int totalQuestions;

@Column(nullable = false)
private double percentage;

@Column(nullable = false)
private LocalDateTime testDate;

public CommunicationResult() {
}

@PrePersist
protected void onCreate() {
    testDate = LocalDateTime.now();
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getCategory() {
    return category;
}

public void setCategory(String category) {
    this.category = category;
}

public int getScore() {
    return score;
}

public void setScore(int score) {
    this.score = score;
}

public int getTotalQuestions() {
    return totalQuestions;
}

public void setTotalQuestions(int totalQuestions) {
    this.totalQuestions = totalQuestions;
}

public double getPercentage() {
    return percentage;
}

public void setPercentage(double percentage) {
    this.percentage = percentage;
}

public LocalDateTime getTestDate() {
    return testDate;
}

public void setTestDate(LocalDateTime testDate) {
    this.testDate = testDate;
}


}
