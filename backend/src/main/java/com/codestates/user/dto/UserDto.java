package com.codestates.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import org.springframework.util.Assert;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class UserDto {
    // [회원가입 요청 DTO]
    @Getter
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostDto{
        @NotBlank
        private String displayName;

        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;
    }

    // [프로필수정 요청 DTO]
    @Getter
    @Setter
    @AllArgsConstructor
    public static class PatchDto{
        private long userId; //추가
        private String displayName;
        @JsonProperty("about_me")
        private String aboutMe;
        private String location;

        public PatchDto addUserId(long userId){
            Assert.notNull(userId,"user id must not be null!");
            this.userId = userId;
            return this;
        }
    }

    // [회원가입 응답 DTO]
    @Getter
    @Setter
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class UserResponseDto{
        private long userId;
        private String displayName;
        private String email;
        @JsonProperty("about_me")
        private String aboutMe;
        private String location;
        private LocalDateTime creationDate;
        private LocalDateTime lastModifiedDate;
        private int questionCount;
        private int answerCount;
    }

    @Getter
    @Setter
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class UserGetResponseDto{
        @NotBlank
        private long userId;
        @NotBlank
        private String displayName;
        @JsonProperty("about_me")
        private String aboutMe;
        private String location;
        private LocalDateTime creationDate;
        private int questionCount;
        private int answerCount;
        private List<UsersQuestionResponseDto> questions;
        private List<UsersAnswerResponseDto> answers;
        private List<UsersTagResponseDto.UserTagResponseDtos> tags;
    }
}

