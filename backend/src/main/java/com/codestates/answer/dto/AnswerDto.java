package com.codestates.answer.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;


public class AnswerDto {
    @Getter
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Post{

        private long userId;  // TODO : jwt로 유저정보를 받아와야한다... 일단 적용전까진 유저 정보를 수동으로 받고있음 (현재는 API 명세서대로 프론트에서 요청못받음)
        private long questionId;
        private String body;

    }

    @Getter
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Patch{
        private long answerId;
        private String body;

        public void setAnswerId(long answerId) {
            this.answerId = answerId;
        }
    }

}
