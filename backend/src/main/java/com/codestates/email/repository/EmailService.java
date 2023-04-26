package com.codestates.email.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@EnableAsync
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Async
    public void send(String email, String authToken){

    }
}
