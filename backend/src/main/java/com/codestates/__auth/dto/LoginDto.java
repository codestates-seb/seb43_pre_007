package com.codestates.__auth.dto;

import lombok.Getter;

@Getter //JWT 적용시 auth 폴더로 옮기기
public class LoginDto {
    private String email;
    private String password;
}
