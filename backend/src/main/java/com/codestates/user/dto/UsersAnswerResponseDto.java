package com.codestates.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class UsersAnswerResponseDto {
    private long answerId;
    private long questionId;
    private String title;
    private LocalDateTime creationDate;
    private boolean isAccepted;
}
