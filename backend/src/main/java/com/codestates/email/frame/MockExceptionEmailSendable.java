package com.codestates.email.frame;

import com.codestates.email.sender.EmailSendable;

public class MockExceptionEmailSendable implements EmailSendable {

    @Override
    public void send(String[] to, String subject, String message,
                     String templateName) throws InterruptedException {

        System.out.println("Sent mock email.");

    }
}
