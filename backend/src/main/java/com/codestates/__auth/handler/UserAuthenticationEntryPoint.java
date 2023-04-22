package com.codestates.__auth.handler;

import com.codestates.__auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // Todo:
    // 미인증 사용자가 보호된 엔드포인트에 접근하려고 할때 호출되는 클래스
    // commence() 메소드는 사용자가 인증되지 않은 경우 호츨되어 인증실패에 대한 정보를 전달한다.

    @Override
    public void commence(HttpServletRequest request, //여기에서 요청정보를 가져온다
                         HttpServletResponse response,//이걸로 클라이언트에게 응답한다
                         AuthenticationException authException) throws IOException, ServletException {

        //Todo: AuthenticationException 은 스프링시큐리티 인증과정에서 발생한 예외다.
        //      보통 사용자 인증정보가 잘못됐을때 발생하기에 예외메시지에서 사용자에게 유용한 정보를 제공 X
        //      Exception 은 스프링시큐리티 이외의 예외도 포함하는 일반적인 예외다.
        //      보통 시스템 문제가 발생했을때 발생하므로 예외메시지에서 시스템운영자•개발자에 유용한 정보를 제공 O
        // 결론: exception 객체를 먼저 사용해 예외메시지를 출력!



        // 요청에서 이름이 "exception"으로 설정된 속성값을 가져와 Exception 타입으로 캐스팅해서 변수에 저장
        Exception exception = (Exception) request.getAttribute("exception");


        //에러메시지와 응답코드 전송
        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
        logExceptionMessage(authException,exception);

    }



    // AuthenticationException 및 Exception 객체를 사용해서 로그에 출력할 예외메시지를 생성하는 메소드
    // (두 객체 중 하나라도 존재하는 메시지를 로그에 출력)
    private void logExceptionMessage(AuthenticationException authException,
                                     Exception exception){
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }
}
