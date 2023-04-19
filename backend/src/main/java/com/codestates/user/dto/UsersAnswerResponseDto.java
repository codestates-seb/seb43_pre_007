package com.codestates.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class UsersAnswerResponseDto {
    private long answerId;
    private long questionId;
    private String title;
    private LocalDateTime creationDate;
    private boolean isAccepted;
}
