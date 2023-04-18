package com.codestates.user.dto;

import lombok.Getter;

@Getter //JWT 적용시 auth 폴더로 옮기기
public class LoginDto {
    private String email;
    private String password;
}
