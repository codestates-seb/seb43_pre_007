package com.codestates.exception;

import lombok.Getter;

//⭐️API 명세서에서 정한 에러코드와 일치시켜야하는지 물어보기.
public enum ExceptionCode {
    USER_NOT_FOUND(404,"User not found"),
    USER_EXIST(409, "User exists");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
