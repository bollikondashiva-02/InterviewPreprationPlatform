package com.prepconnect.prepconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepconnect.prepconnect.entity.CommunicationResult;

public interface CommunicationResultRepository
extends JpaRepository<CommunicationResult, Long> {


List<CommunicationResult> findByEmailOrderByTestDateDesc(String email);


}
