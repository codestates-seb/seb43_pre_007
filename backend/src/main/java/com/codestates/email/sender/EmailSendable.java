package com.codestates.email.sender;

import org.springframework.stereotype.Component;

@Component
public interface EmailSendable {
    void send(String[] to, String subject, String message,String templateName) throws InterruptedException;
}
