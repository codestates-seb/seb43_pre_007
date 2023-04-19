package com.codestates.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionAnswerResponseDto {
    private QuestionUserResponseDto user;
    private String body;
    private boolean isAccepted;
    private LocalDateTime creationDate;
    private LocalDateTime lastEditDate;
}
