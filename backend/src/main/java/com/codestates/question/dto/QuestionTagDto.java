package com.codestates.question.dto;

import lombok.Getter;
import lombok.Setter;

//TODO : DTO 작성
@Getter
@Setter
public class QuestionTagDto {
    long tagId; //json의 tag_id와 dto의 tagId는 매핑이 될까?
    String name;

}
