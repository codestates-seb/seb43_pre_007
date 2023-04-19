package com.codestates.user.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;
@Setter
@Getter
public class UsersAllResponseDtos {
    private long userId;
    private String displayName;
    private String aboutMe;
    private String location;
    private LocalDateTime creationDate;
    private int questionCount;
    private int answerCount;
    private List<UsersTagResponseDto.UserTagResponseDto> tags;
}
