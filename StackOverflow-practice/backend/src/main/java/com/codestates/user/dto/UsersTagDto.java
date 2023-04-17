package com.codestates.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class UsersTagDto {

    @Setter
    @Getter
    @NoArgsConstructor
    public static class UserTagResponseDto {
        private String name;
    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class UserTagsResponseDtos {
        private String name;
        private int postsCount;
    }
}
