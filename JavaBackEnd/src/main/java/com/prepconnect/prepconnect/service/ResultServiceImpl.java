package com.prepconnect.prepconnect.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prepconnect.prepconnect.entity.Result;
import com.prepconnect.prepconnect.repository.ResultRepository;

@Service
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;

    public ResultServiceImpl(
            ResultRepository resultRepository) {

        this.resultRepository = resultRepository;
    }

    @Override
    public Result saveResult(Result result) {

        return resultRepository.save(result);
    }

    @Override
   
public List<Result> getResultsByEmail(
        String email) {

    return resultRepository.findByEmailOrderByTestDateDesc(email);
}
}