package com.prepconnect.prepconnect.service;

import java.util.List;

import com.prepconnect.prepconnect.entity.CommunicationResult;

public interface CommunicationResultService {


CommunicationResult saveResult(CommunicationResult result);

List<CommunicationResult> getResultsByEmail(String email);


}
