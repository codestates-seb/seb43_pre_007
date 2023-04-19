package com.codestates.tag.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TagsAllResponseDto {
    private TagsUserDto user;
    private long questionId;
    private String title;
    private String body;
    private boolean isAnswered;
    private boolean isAccepted;
    private int answerCount;
    private LocalDateTime creationDate;
    private TagsResponseDto.TagsQuestionResponseDto tags;

}
