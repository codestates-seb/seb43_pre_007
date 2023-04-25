package com.codestates.tag.mapper;

import com.codestates.question.entity.QuestionTag;
import com.codestates.tag.dto.AllTagResponseDto;
import com.codestates.tag.dto.OneTagResponseDto;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.entity.Tag;
import com.codestates.user.entity.User;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
@Mapper(componentModel = "spring")
public interface TagMapper {

    //[태그조회 : mapper]
    default List<OneTagResponseDto> tagToTagResponseDto(List<QuestionTag> questionList) {
        if ( questionList == null ) {
            return null;
        }
        List<OneTagResponseDto> responseDtoList = new ArrayList<OneTagResponseDto>( questionList.size() );
        for ( QuestionTag questionTag : questionList ) {
            responseDtoList.add( questionTagToOneTagResponseDto( questionTag ) );
        }
        return responseDtoList;
    }


    //[태그조회 : Response field]
    default OneTagResponseDto questionTagToOneTagResponseDto(QuestionTag questionTag) {
        if ( questionTag == null ) {
            return null;
        }
        OneTagResponseDto responseDto = new OneTagResponseDto();
        responseDto.setQuestionId(questionTag.getQuestion().getQuestionId());
        responseDto.setTitle(questionTag.getQuestion().getTitle());
        responseDto.setBody(questionTag.getQuestion().getBody());
        responseDto.setAnswered(questionTag.getQuestion().isAnswered());
        responseDto.setAccepted(questionTag.getQuestion().isAccepted());
        responseDto.setAnswerCount(questionTag.getQuestion().getAnswerCount());
        responseDto.setCreationDate(questionTag.getQuestion().getCreationDate());
        responseDto.setUserId(questionTag.getQuestion().getUser().getUserId());
        responseDto.setDisplayName(questionTag.getQuestion().getUser().getDisplayName());
        responseDto.setImageUrl(questionTag.getQuestion().getUser().getImageUrl());
        responseDto.setTags(changeTags(questionTag.getQuestion().getTags()));
        return responseDto;
    }


    //[태그조회 : users]
    default TagDto.TagUserResponseDto changeUser(User user) {
        if ( user == null ) {
            return null;
        }
        TagDto.TagUserResponseDto responseDto = new TagDto.TagUserResponseDto();
        responseDto.setUserId( user.getUserId() );
        responseDto.setDisplayName( user.getDisplayName() );
        return responseDto;
    }


    //[태그조회 : tags]
    default List<TagDto.TagQuestionResponseDto> changeTags(List<QuestionTag> list) {
        if ( list == null ) {
            return null;
        }
        List<TagDto.TagQuestionResponseDto> responseDtoList = new ArrayList<TagDto.TagQuestionResponseDto>( list.size() );
        for ( QuestionTag questionTag : list ) {
            responseDtoList.add( questionTagToTagQuestionResponseDto( questionTag ) );
        }
        return responseDtoList;
    }


    //[태그조회 : tags 채우기]
    default TagDto.TagQuestionResponseDto questionTagToTagQuestionResponseDto(QuestionTag questionTag) {
        if ( questionTag == null ) {
            return null;
        }
        TagDto.TagQuestionResponseDto responseDto = new TagDto.TagQuestionResponseDto();
        responseDto.setTagId(questionTag.getTag().getTagId());
        responseDto.setName(questionTag.getTag().getName());
        return responseDto;
    }


    //[전체 태그조회 : mapper]
    default List<AllTagResponseDto> tagToTagResponseDtos(List<Tag> tagList) {
        if ( tagList == null ) {
            return null;
        }
        List<AllTagResponseDto> responseDtoList = new ArrayList<AllTagResponseDto>( tagList.size() );
        for ( Tag tag : tagList ) {
            responseDtoList.add(SubResponseDtos(tag));
        }
        return responseDtoList;
    }



    //[전체 태그조회 : Response field]
    default AllTagResponseDto SubResponseDtos(Tag tag) {
        if ( tag == null ) {
            return null;
        }
        AllTagResponseDto responseDto = new AllTagResponseDto();
        responseDto.setTagId(tag.getTagId());
        responseDto.setName(tag.getName());
        responseDto.setInfo(tag.getInfo());
        responseDto.setQuestionAmount(tag.getQuestionTagList().size());
        return responseDto;
    }
}
