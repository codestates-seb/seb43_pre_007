package com.codestates.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UsersQuestionResponseDto {
    private long questionId;
    private String title;
    private String creationDate;
    private boolean isAnswered;
    private boolean isAccepted;
    private int score;
}
