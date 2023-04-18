package com.codestates.user.dto;

import lombok.*;
import org.springframework.util.Assert;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class UserDto {
    @Getter
    public static class PostDto{
        @NotBlank
        private String displayName;

        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class PatchDto{
        private long userId; //추가
        private String displayName;
        private String aboutMe;
        private String location;

        public PatchDto addUserId(long userId){
            Assert.notNull(userId,"user id must not be null!");
            this.userId = userId;
            return this;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class UserResponseDto{
        private long userId;
        private String displayName;
        private String email;
        private String aboutMe;
        private String location;
        private LocalDateTime creationDate;
        private LocalDateTime lastModifiedDate;
        private int questionCount;
        private int answerCount;
    }

    @Getter
    @AllArgsConstructor
    public static class UserGetResponseDto{
        private long userId;
        private String displayName;
        private String aboutMe;
        private String location;
        private LocalDateTime creationDate;
        private int questionCount;
        private int answerCount;
        private List<UsersQuestionResponseDto> questions;
        private List<UsersAnswerResponseDto> answers;
        private List<UsersTagDto.UserTagsResponseDtos> tags;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class UsersGetResponseDtos {
            private long userId;
            private String displayName;
            private String aboutMe;
            private String location;
            private LocalDateTime creationDate;
            private int questionCount;
            private int answerCount;
            private UsersTagDto.UserTagResponseDto tag;
        }

    }

