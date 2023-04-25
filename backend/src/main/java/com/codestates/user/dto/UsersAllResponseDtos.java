package com.codestates.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
@Setter
@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UsersAllResponseDtos {
    private long userId;
    private String displayName;
    @JsonProperty("about_me")
    private String aboutMe;
    private String location;
    private String imageUrl;
    private LocalDateTime creationDate;
    private int questionCount;
    private int answerCount;
    private List<UsersTagResponseDto.UserTagResponseDto> tags;
}
