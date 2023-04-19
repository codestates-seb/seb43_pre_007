package com.codestates.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class UsersQuestionResponseDto {
    private long questionId;
    private String title;
    private LocalDateTime creationDate;
    private boolean isAnswered;
    private boolean isAccepted;
    private int score;
}
