package com.prepconnect.prepconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepconnect.prepconnect.entity.Result;

public interface ResultRepository
        extends JpaRepository<Result, Long> {

    List<Result> findByEmailOrderByTestDateDesc(String email);

}