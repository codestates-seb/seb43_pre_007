package com.codestates.question.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

//TODO : DTO 작성
//TODO : 유효성 검사
public class QuestionDto {


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Post{

        private long userId;  // TODO : jwt로 유저정보를 받아와야한다... 일단 적용전까진 유저 정보를 수동으로 받고있음 (현재는 API 명세서대로 프론트에서 요청못받음)
        @NotBlank
        private String title;
        @NotBlank
        @Size(min= 20)
        private String body;

        @Size(min = 1, max = 5)
        private List<String> tags;

    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Patch{
        private long questionId;
        @NotBlank
        private String title;
        @NotBlank
        @Size(min= 20)
        private String body;
        @Size(min = 1, max = 5)
        private List<QuestionTagDto> tags;

        public void setQuestionId(long questionId) {
            this.questionId = questionId;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class POSTResponse{
        private QuestionUserResponseDto user;
        private Response question;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class GETResponse{
        private QuestionUserResponseDto user;
        private Response question;
        private List<QuestionAnswerResponseDto> answers;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class GETALLResponse {
        private QuestionUserResponseDto user;
        private Response question;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response{
        private long questionId;
        private String title;
        private String body;
        @JsonProperty("is_answered")
        private boolean isAnswered;
        @JsonProperty("is_accepted")
        private boolean isAccepted;
        private int viewCount;
        private int answerCount;
        private QuestionVoteResponseDto vote = new QuestionVoteResponseDto(); //vote 추가
        private LocalDateTime creationDate;
        private LocalDateTime lastEditDate;
        private List<QuestionTagDto> tags;

    }
}
