package com.codestates.tag.mapper;

import com.codestates.question.entity.QuestionTag;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.dto.TagsUserDto;
import com.codestates.tag.dto.TagsAllResponseDto;
import com.codestates.tag.dto.TagsResponseDto;
import com.codestates.tag.entity.Tag;
import com.codestates.user.entity.User;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {

    // [태그조회 : response]
    // 특정 태그를 클릭하면 해당태그가 사용된 질문목록 페이지로 이동
    default List<TagDto.ResponseDto> tagToTagResponseDto(List<QuestionTag> tagList){
        if(tagList == null){
            return null;
        }
        List<TagDto.ResponseDto> responseList = new ArrayList<>(tagList.size());
        for(QuestionTag tag : tagList){
            TagsAllResponseDto responseDto = new TagsAllResponseDto();
            responseDto.setUser(ToTagUserDto(tag.getQuestion().getUser()));
            responseDto.setQuestionId(tag.getQuestion().getQuestionId());
            responseDto.setTitle(tag.getQuestion().getTitle());
            responseDto.setBody(tag.getQuestion().getBody());
            responseDto.setAnswered(tag.getQuestion().isAnswered());
            responseDto.setAccepted(tag.getQuestion().isAccepted());
            responseDto.setAnswerCount(tag.getQuestion().getAnswerCount());
            responseDto.setCreationDate(tag.getQuestion().getCreationDate());
            responseDto.setTags(ToTagsDto(tag));

            TagDto.ResponseDto tagDto = new TagDto.ResponseDto();
            tagDto.setName(tag.getTag().getName());
            tagDto.setInfo(tag.getTag().getInfo());
            tagDto.setData(responseDto);
            responseList.add(tagDto);
        }
        return responseList;
    }

    // [태그조회 : users]
    default TagsUserDto ToTagUserDto(User user){
        TagsUserDto responseDto = new TagsUserDto();
        responseDto.setUserId(user.getUserId());
        responseDto.setDisplayName(user.getDisplayName());
        return responseDto;
    }

    // [태그조회 : tags]
    TagsResponseDto.TagsQuestionResponseDto ToTagsDto(QuestionTag tag);


    // [태그전체조회 : response] - score 일단 제외
    List<TagDto.ResponseDtos> tagsToTagResponseDtos(List<Tag> tagList);
}



