package com.codestates.question.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

//TODO : DTO 작성
@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class QuestionTagDto {
    private long tagId; //json의 tag_id와 dto의 tagId는 매핑이 될까?
    private String name;

}
