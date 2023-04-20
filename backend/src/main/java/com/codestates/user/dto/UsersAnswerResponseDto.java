package com.codestates.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UsersAnswerResponseDto {
    private long answerId;
    private long questionId;
    private String title;
    private LocalDateTime creationDate;
    @JsonProperty("is_accepted")
    private boolean isAccepted;
}
