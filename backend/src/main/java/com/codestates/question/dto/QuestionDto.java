package com.codestates.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

//TODO : DTO 작성
//TODO : 유효성 검사
public class QuestionDto {


    @Getter
    public static class Post{
        //엥 유저아이디로 바꿔야함
        private long userId;  // TODO : jwt로 유저정보를 받아와야한다... 일단 적용전까진 유저 정보를 수동으로 받고있음 (현재는 API 명세서대로 프론트에서 요청못받음)
        private String title;
        private String body;
        private List<QuestionTagDto> tags;

    }

    @Getter
    public static class Patch{
        private long questionId;
        private String title;
        private String body;
        private List<QuestionTagDto> tags;

        public void setQuestionId(long questionId) {
            this.questionId = questionId;
        }
    }

    @Getter
    @Setter
    public static class POSTResponse{
        private QuestionUserResponseDto user;
        private Response question;

    }

    @Getter
    @Setter
    public static class GETResponse{
        private QuestionUserResponseDto user;
        private Response question;
        private List<QuestionAnswerResponseDto> answers;

    }

    @Getter
    @Setter
    public static class GETALLResponse {
        private QuestionUserResponseDto user;
        private Response question;

    }

    @Getter
    @Setter
    public static class Response{
        private long questionId;
        private String title;
        private String body;
        private boolean isAnswered;
        private boolean isAccepted;
        private int viewCount;
        private int answerCount;
        private LocalDateTime creationDate;
        private LocalDateTime lastEditDate;
        private List<QuestionTagDto> tags;

    }
}
