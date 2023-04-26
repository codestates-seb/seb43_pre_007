package com.codestates.auth.handler;

import com.codestates.auth.dto.LoginResponseDto;
import com.codestates.auth.userdetails.UserDetailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        //인증성공시, 로그를 기록하거나 사용자정보를 response 로 전송하는 등의 추가작업 가능
        log.info("# 로그인 인증 성공");

        UserDetailService.UserDetail userDetail = (UserDetailService.UserDetail) authentication.getPrincipal();
        Long userId = userDetail.getUserId();
        String displayName = userDetail.getDisplayName();
        String imageUrl = userDetail.getImageUrl();

        String accessToken = response.getHeader("Authorization");
        String refreshToken = response.getHeader("Refresh");

        if (accessToken != null && accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.substring(7);
        }

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setUserId(userId);
        loginResponseDto.setDisplayName(displayName);
        loginResponseDto.setImage(imageUrl);
        loginResponseDto.setAccessToken(accessToken);
        loginResponseDto.setRefreshToken(refreshToken);

        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponseDto));
    }
}
