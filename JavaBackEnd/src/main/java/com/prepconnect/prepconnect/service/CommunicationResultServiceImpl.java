package com.prepconnect.prepconnect.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prepconnect.prepconnect.entity.CommunicationResult;
import com.prepconnect.prepconnect.repository.CommunicationResultRepository;

@Service
public class CommunicationResultServiceImpl
implements CommunicationResultService {


private final CommunicationResultRepository repository;

public CommunicationResultServiceImpl(
        CommunicationResultRepository repository) {

    this.repository = repository;
}

@Override
public CommunicationResult saveResult(
        CommunicationResult result) {

    return repository.save(result);
}

@Override
public List<CommunicationResult> getResultsByEmail(
        String email) {

    return repository
            .findByEmailOrderByTestDateDesc(email);
}


}
