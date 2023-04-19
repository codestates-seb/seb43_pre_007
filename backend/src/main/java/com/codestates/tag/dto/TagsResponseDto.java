package com.codestates.tag.dto;

import lombok.Builder;
import lombok.Getter;

public class TagsResponseDto {
        @Builder
        @Getter
        public static class TagsQuestionResponseDto {
            private long tagId;
            private String name;
        }

        public static class TagsQuestionResponseDtos{
            private long tagId;
            private String name;
            private String info;
            private int count;
        }
    }

