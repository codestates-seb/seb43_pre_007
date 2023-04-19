package com.codestates.tag.dto;

import lombok.Getter;
import lombok.Setter;

public class TagsResponseDto {
        @Getter
        @Setter
        public static class TagsQuestionResponseDto {
            private long tagId;
            private String name;
        }

        @Getter
        @Setter
        public static class TagsQuestionResponseDtos{
            private long tagId;
            private String name;
            private String info;
            private int count;
        }
    }

