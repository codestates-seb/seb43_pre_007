package com.codestates.email.config;

import com.codestates.email.frame.MockExceptionEmailSendable;
import com.codestates.email.frame.SimpleEmailSendable;
import com.codestates.email.frame.TemplateEmailSendable;
import com.codestates.email.sender.EmailSendable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Properties;

// Todo
//메일전송에 필요한 구성을 제공하는 config 클래스
@Configuration
public class EmailConfiguration {

    // 외부설정파일에서 속성 가져오기
    @Value("${mail.smtp.host}")
    private String host;

    @Value("${mail.smtp.port}")
    private int port;

    @Value("${mail.smtp.display_name}")
    private String displayName;

    @Value("${mail.smtp.email}")
    private String email;

    @Value("${mail.smtp.password}")
    private String password;

    @Value("${mail.smtp.auth}")
    private String auth;

    @Value("${mail.smtp.starttls.enable}")
    private String tlsEnable;

    @Primary
    @Bean
    public EmailSendable simpleEmailSendable() {
        return new SimpleEmailSendable(javaMailSender());
    }

    @Bean
    public EmailSendable templateEmailSendable(TemplateEngine templateEngine){
        return new TemplateEmailSendable(javaMailSender(), templateEngine, new Context());
    }


    @Bean //전송기능 확인용 모의객체
    public EmailSendable mockExceptionEmailSendable(){
        return new MockExceptionEmailSendable();
    }

    @Bean
    public JavaMailSender javaMailSender(){
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(email);
        mailSender.setPassword(password);

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.auth", auth);
        properties.put("mail.smtp.starttls.enable", tlsEnable);

        return mailSender;
    }
}
