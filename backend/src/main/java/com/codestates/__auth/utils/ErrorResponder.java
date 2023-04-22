package com.codestates.__auth.utils;

import com.codestates.__response.ErrorResponse;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {

    public static void sendErrorResponse(HttpServletResponse response,
                                         HttpStatus httpStatus) throws IOException{

        // HttpServletResponse 객체와 HttpStatus 객체를 받아서
        // ErrorResponse 객체를 생성하여 JSON 형태로 변환해서 HTTP 응답본문에 작성한다.
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(httpStatus);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(httpStatus.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
