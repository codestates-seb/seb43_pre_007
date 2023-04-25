package com.codestates.tag.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AllTagResponseDto {
    private Long tagId;
    private String name;
    private String info;
    private int questionAmount; //태경임시추가
}
