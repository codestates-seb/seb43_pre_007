package com.codestates.email.event;

import com.codestates.email.sender.EmailSender;
import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@EnableAsync
public class UserRegistrationEventListener {
    @Value("${mail.subject.user.registration}")
    private String subject;
    @Value("${mail.template.name.user.join}")
    private String templateName;
    private final EmailSender emailSender;
    private final UserService userService;

    public UserRegistrationEventListener(EmailSender emailSender, UserService userService) {
        this.emailSender = emailSender;
        this.userService = userService;
    }

    @Async
    @EventListener
    public void listen(UserRegistrationEvent event) throws Exception {
        String[] to = new String[]{event.getUser().getEmail()};
        String message = event.getUser().getEmail()+"님 회원가입이 성공적으로 완료됐습니다.";
        emailSender.sendEmail(to, subject, message,templateName);

        log.error("MailSendException: rollback for User Registration:");
        User user = event.getUser();
        userService.deleteUser(user.getUserId());
    }
}
