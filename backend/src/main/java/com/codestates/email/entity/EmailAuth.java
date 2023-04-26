package com.codestates.email.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailAuth {

    private static final Long MAX_EXPIRE_TIME=5L;

    @Id
    @GeneratedValue
    private long emailId;
    private String authToken;
    private boolean expired;
    private LocalDateTime expireDate;


    public EmailAuth(Long emailId, String authToken, boolean expired, LocalDateTime expireDate) {
        this.emailId = emailId;
        this.authToken = authToken;
        this.expired = expired;
        this.expireDate = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
    }

    private void userToken(){
        this.expired = true;
    }

}
