package com.codestates.tag.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OneTagResponseDto {
    private long questionId;
    private String title;
    private String body;
    @JsonProperty("is_answered")
    private boolean isAnswered;
    @JsonProperty("is_accepted")
    private boolean isAccepted;
    private int answerCount;
    private int score;
    private LocalDateTime creationDate;
    private long userId;
    private String displayName;
    private String imageUrl;
    private List<TagDto.TagQuestionResponseDto> tags;
}

