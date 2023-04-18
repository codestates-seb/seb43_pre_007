package com.codestates.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


public class UsersTagDto {
    @Builder
    @Getter
    @AllArgsConstructor
    public static class UserTagResponseDto {
        private String name;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class UserTagsResponseDtos {
        private String name;
        private int postsCount;
    }
}
