package com.codestates.tag.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class TagsAllResponseDto {
    private TagUserDto user;
    private long questionId;
    private String title;
    private String body;
    private boolean isAnswered;
    private boolean isAccepted;
    private int answerCount;
    private int score;
    private LocalDateTime creationDate;
    private TagsResponseDto.TagsQuestionResponseDto tags;

}
