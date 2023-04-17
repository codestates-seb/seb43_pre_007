package com.codestates.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class UsersAllResponseDto {
    private long userId;
    private String displayName;
    private String aboutMe;
    private String location;
    private LocalDateTime creationDate;
    private int questionCount;
    private int answerCount;
    private UsersTagDto.UserTagResponseDto tags;
}
