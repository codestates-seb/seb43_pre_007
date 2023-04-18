package com.codestates.user.dto;

import com.codestates.user.entity.UserTag;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

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
