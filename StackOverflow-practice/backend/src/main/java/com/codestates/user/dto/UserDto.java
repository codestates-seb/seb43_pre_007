package com.codestates.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class UserDto {
    @Getter
    @AllArgsConstructor
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
    public static class PatchDto{
        private String displayName;
        private String aboutMe;
        private String location;
    }

    @Setter
    @Getter
    @NoArgsConstructor
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

    @Getter
    @AllArgsConstructor
    public static class UserGetResponseDtos {
        //page_info 추가해야함
        private UsersAllResponseDto data;
    }
}
