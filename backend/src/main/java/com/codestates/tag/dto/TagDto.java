package com.codestates.tag.dto;

import lombok.Getter;
import lombok.Setter;

public class TagDto {

    @Getter
    @Setter
    public static class ResponseDto{
        private String name;
        private String info;
        private TagsAllResponseDto data;

    }

    @Getter
    @Setter
    public static class ResponseDtos{
        private TagsResponseDto.TagsQuestionResponseDtos data;
    }
}
