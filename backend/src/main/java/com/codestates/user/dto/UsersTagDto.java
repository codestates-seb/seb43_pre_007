package com.codestates.user.dto;

import lombok.*;

public class UsersTagDto {
    @Builder
    @Getter
    @AllArgsConstructor
    public static class UserTagResponseDto {
        private String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class UserTagsResponseDtos {
        private String name;
        private int postsCount;
    }
}
