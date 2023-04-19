package com.codestates.user.dto;

import lombok.*;


public class UsersTagResponseDto {
    @Getter
    @Setter
    public static class UserTagResponseDto {
        private String name;
    }

    @Getter
    @Setter
    public static class UserTagResponseDtos {
        private String name;
        private int postsCount;
    }
}
