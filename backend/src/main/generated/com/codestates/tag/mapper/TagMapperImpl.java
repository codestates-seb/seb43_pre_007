package com.codestates.tag.mapper;

import com.codestates.question.entity.QuestionTag;
import com.codestates.tag.dto.TagDto.ResponseDtos;
import com.codestates.tag.dto.TagsResponseDto.TagsQuestionResponseDto;
import com.codestates.tag.entity.Tag;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-25T14:23:00+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.19 (Oracle Corporation)"
)
@Component
public class TagMapperImpl implements TagMapper {

    @Override
    public TagsQuestionResponseDto ToTagsDto(QuestionTag tag) {
        if ( tag == null ) {
            return null;
        }

        TagsQuestionResponseDto tagsQuestionResponseDto = new TagsQuestionResponseDto();

        return tagsQuestionResponseDto;
    }

    @Override
    public List<ResponseDtos> tagsToTagResponseDtos(List<Tag> tagList) {
        if ( tagList == null ) {
            return null;
        }

        List<ResponseDtos> list = new ArrayList<ResponseDtos>( tagList.size() );
        for ( Tag tag : tagList ) {
            list.add( tagToResponseDtos( tag ) );
        }

        return list;
    }

    protected ResponseDtos tagToResponseDtos(Tag tag) {
        if ( tag == null ) {
            return null;
        }

        ResponseDtos responseDtos = new ResponseDtos();

        return responseDtos;
    }
}
