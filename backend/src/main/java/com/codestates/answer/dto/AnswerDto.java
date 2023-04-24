package com.codestates.answer.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;


public class AnswerDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Post{

        @Positive
        private long userId;  // TODO : jwt로 유저정보를 받아와야한다... 일단 적용전까진 유저 정보를 수동으로 받고있음 (현재는 API 명세서대로 프론트에서 요청못받음)
        @Positive
        private long questionId;
        @NotBlank
        @Size(min= 30)
        private String body;

    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Patch{
        private long answerId;
        @NotBlank
        @Size(min= 30)
        private String body;

        public void setAnswerId(long answerId) {
            this.answerId = answerId;
        }
    }

}
