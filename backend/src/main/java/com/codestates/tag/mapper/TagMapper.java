package com.codestates.tag.mapper;

import com.codestates.question.entity.Question;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    List<TagDto.ResponseDto> tagToTagResponseDto(List<Question> tagList);
    List<TagDto.ResponseDtos> tagsToTagResponseDtos(List<Tag> tagList);
}
