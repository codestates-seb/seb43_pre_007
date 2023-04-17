package com.codestates.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UsersAnswerResponseDto {
    private long answerId;
    private long questionId;
    private String title;
    private String creationDate;
    private boolean isAccepted;
}
