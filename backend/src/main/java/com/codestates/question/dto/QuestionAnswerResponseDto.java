package com.codestates.question.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class QuestionAnswerResponseDto {
    private QuestionUserResponseDto user;
    private long answerId;
    private String body;
    @JsonProperty("is_accepted")
    private boolean isAccepted;
    private int isVote; //vote 추가
    private int score; //vote 추가
    private LocalDateTime creationDate;
    private LocalDateTime lastEditDate;
}
