package com.codestates.exception;

import lombok.Getter;

//⭐️API 명세서에서 정한 에러코드와 일치시켜야하는지 물어보기.
public enum ExceptionCode {
    USER_NOT_FOUND(404,"User not found"),
    USER_EXIST(409, "User exists"),
    TAG_NOT_FOUND(404,"Tag not found"),

    //에러 코드 추가 - 이채은
    QUESTION_NOT_FOUND(404, "Question not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
