package com.prepconnect.prepconnect.service;

import java.util.List;

import com.prepconnect.prepconnect.entity.Result;

public interface ResultService {

    Result saveResult(Result result);

    List<Result> getResultsByEmail(String email);

}