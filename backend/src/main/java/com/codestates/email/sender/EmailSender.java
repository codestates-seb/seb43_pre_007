package com.codestates.email.sender;

import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

@Service
public class EmailSender {
    private final EmailSendable emailSendable;

    public EmailSender(EmailSendable emailSendable) {
        this.emailSendable = emailSendable;
    }

    public void sendEmail(String[] to, String subject,
                          String message, String templateName) throws MailSendException, InterruptedException{

        emailSendable.send(to,subject,message,templateName);
    }
}
