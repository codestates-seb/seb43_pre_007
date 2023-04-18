package com.codestates.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class TagDto {

    @Getter
    @AllArgsConstructor
    public static class ResponseDto{
        private String name;
        private String info;
        private TagsAllResponseDto data;

    }

    @Getter
    @AllArgsConstructor
    public static class ResponseDtos{
        private TagsResponseDto.TagsQuestionResponseDtos data;
    }
}
