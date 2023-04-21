package com.codestates.__auth.filter;

import com.codestates.__auth.dto.LoginDto;
import com.codestates.__auth.jwt.JwtTokenizer;
import com.codestates.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }



//Todo: attemptAuthentication 메소드
//    : 사용자가 입력한 로그인 정보를 담은 UsernamePasswordAuthenticationToken 객체를 생성한다.

//Todo: successfulAuthentication 메소드
//    : 사용자인증(Authentication)이 성공하면 호출되는 메서드.
//    : JWT 액세스토큰, 리프레시토큰을 생성해서 HTTP 응답헤더에 추가하고 인증성공핸들러를 호출하는 역할을 한다.

//Todo: delegateAccessToken 메소드
//    : User 객체에서 claims 정보를 추출해 토큰에 필요한 정보를 만든 뒤 JWT Access Token 을 생성한다.

//Todo: delegateRefreshToken 메소드
//    : 리프레시 토큰을 생성한다.
//    : 단순히 액세스토큰을 발급할 수 있는 권한을가진 사용자를 식별할 정보만 가지면돼서 클레임(권한정보 등)이 필요없다.


    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        //ObjectMapper 는 HTTP 요청바디를 LoginDto 객체(사용자가 입력한 로그인 정보)로 변환한다.
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(),LoginDto.class);

        //사용자가 입력한 로그인 정보가 담긴 객체
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(),loginDto.getPassword());

        //내부적으로 사용자의 로그인정보를 가지고 인증하고 성공하면 Authentication 객체반환
        return authenticationManager.authenticate(authenticationToken);
    }



    @Override //HTTP 요청•응답객체, 서블릿필터체인(요청넘기기), 인증객체를 인자로 받는다.
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        // 인증에 성공한 사용자정보를 가져온다
        User user = (User)authResult.getPrincipal();

        // 사용자 정보를 가지고 토큰을 생성한다
        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        //HTTP 응답 header 에 Authorization 키와 access token 값을 설정한다(Bearer: JWT 토큰임을 나타내는 문자열)
        response.setHeader("Authorization","Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        //인증에 성공한 사용자에게 서비스리소스에대한 접근권한이 부여된 상태로 리다이렉트할 때 호출됨.
        this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult);
    }



    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        //토큰발급시 userId 넣어보기
        claims.put("username", user.getEmail());

        String subject = user.getEmail(); //✅UserId 식별자로 대체해보기
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);

        return accessToken;
    }


    private String delegateRefreshToken(User user) {
        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);

            return refreshToken;
    }



}
