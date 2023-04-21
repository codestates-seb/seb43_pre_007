package com.codestates.tag.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

public class TagsResponseDto {
        @Getter
        @Setter
        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        public static class TagsQuestionResponseDto {
            private long tagId;
            private String name;
        }

        @Getter
        @Setter
        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        public static class TagsQuestionResponseDtos{
            private long tagId;
            private String name;
            private String info;
        }
    }

