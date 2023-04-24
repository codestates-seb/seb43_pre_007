package com.codestates.__auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter //JWT 적용시 auth 폴더로 옮기기
@Setter
public class LoginDto {
    private String email;
    private String password;
}
