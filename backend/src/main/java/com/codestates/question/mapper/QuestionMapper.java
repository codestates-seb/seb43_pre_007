package com.codestates.question.mapper;

import com.codestates.answer.entity.Answer;
import com.codestates.question.dto.QuestionAnswerResponseDto;
import com.codestates.question.dto.QuestionDto;
import com.codestates.question.dto.QuestionTagDto;
import com.codestates.question.dto.QuestionUserResponseDto;
import com.codestates.question.entity.Question;
import com.codestates.question.entity.QuestionTag;
import com.codestates.tag.entity.Tag;
import com.codestates.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

//TODO : Mapper 작성
@Mapper(componentModel = "spring")
public interface QuestionMapper {

    default Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto) {
        if ( questionPostDto == null ) {
            return null;
        }

        Question question = new Question();

        User user = new User();
        user.setUserId(questionPostDto.getUserId());
        question.setUser(user);
        question.setTitle( questionPostDto.getTitle() );
        question.setBody( questionPostDto.getBody() );

        //questionTag 해결
        List<QuestionTag> questionTags = questionPostDto.getTags()
                        .stream().map(questionTagDto ->{
                            QuestionTag questionTag = new QuestionTag();

                            Tag tag = new Tag();
                            tag.setTagId(questionTagDto.getTagId());
                            tag.setName(questionTagDto.getName());
                            questionTag.setTag(tag);

                            questionTag.setQuestion(question);
                            return questionTag;
                    }).collect(Collectors.toList());
        question.setTags( questionTags );

        return question;
    }

    List<QuestionTag> questionTagDtoListToQuestionTagList(List<QuestionTagDto> list);

    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);

    default QuestionTag questionTagDtoToQuestionTag(QuestionTagDto questionTagDto) {
        if ( questionTagDto == null ) {
            return null;
        }

        QuestionTag questionTag = new QuestionTag();

        Tag tag = new Tag();
        tag.setTagId(questionTagDto.getTagId());
        tag.setName(questionTagDto.getName());
        questionTag.setTag(tag);

        return questionTag;
    }

    default QuestionDto.POSTResponse questionToQuestionPOSTResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDto.POSTResponse pOSTResponse = new QuestionDto.POSTResponse();

        pOSTResponse.setUser( userToquestionUserResponseDto( question.getUser() ) );
        pOSTResponse.setQuestion( questionToQuestionResponseDto( question ));

        return pOSTResponse;
    }


    default QuestionDto.GETResponse questionToQuestionGETResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDto.GETResponse gETResponse = new QuestionDto.GETResponse();

        gETResponse.setUser( userToquestionUserResponseDto( question.getUser() ) );
        gETResponse.setQuestion( questionToQuestionResponseDto( question ));
        gETResponse.setAnswers( answerListToQuestionAnswerResponseDtoList( question.getAnswers() ) );

        return gETResponse;
    }

    default QuestionDto.GETALLResponse questionToGETALLResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDto.GETALLResponse gETALLResponse = new QuestionDto.GETALLResponse();

        gETALLResponse.setUser( userToquestionUserResponseDto( question.getUser() ) );
        gETALLResponse.setQuestion( questionToQuestionResponseDto( question ));

        return gETALLResponse;
    }

    List<QuestionDto.GETALLResponse> questionsToQuestionGETALLResponseDtos(List<Question> questions);

   default QuestionDto.Response questionToQuestionResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDto.Response response = new QuestionDto.Response();

        response.setQuestionId(question.getQuestionId());
        response.setTitle(question.getTitle());
        response.setBody(question.getBody());
        response.setAnswered(question.isAnswered());
        response.setAccepted(question.isAccepted());
        response.setViewCount(question.getViewCount());
        response.setAnswerCount(question.getAnswerCount());
        response.setCreationDate(question.getCreationDate());
        response.setLastEditDate(question.getLastEditDate());
        //questionTag 해결
        response.setTags(questionTagListToQuestionTagDtoList(question.getTags()));
        return response;
    }

    List<QuestionTagDto> questionTagListToQuestionTagDtoList(List<QuestionTag> list);
    default QuestionTagDto questionTagToquestionTagDto(QuestionTag questionTag) {
        if ( questionTag== null ) {
            return null;
        }

        QuestionTagDto questionTagDto = new QuestionTagDto();

        questionTagDto.setTagId(questionTag.getTag().getTagId());
        questionTagDto.setName(questionTag.getTag().getName());

        return questionTagDto;
    }

    default QuestionUserResponseDto userToquestionUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        QuestionUserResponseDto questionUserResponseDto = new QuestionUserResponseDto();
        questionUserResponseDto.setUserId(user.getUserId());
        questionUserResponseDto.setDisplayName(user.getDisplayName());
        questionUserResponseDto.setImageUrl(user.getImageUrl());

        return questionUserResponseDto;
    }

    List<QuestionAnswerResponseDto> answerListToQuestionAnswerResponseDtoList(List<Answer> answers);

    default QuestionAnswerResponseDto answerToquestionAnswerResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        QuestionAnswerResponseDto questionAnswerResponseDto = new QuestionAnswerResponseDto();
        questionAnswerResponseDto.setUser(userToquestionUserResponseDto(answer.getUser()));
        questionAnswerResponseDto.setAnswerId(answer.getAnswerId());
        questionAnswerResponseDto.setBody(answer.getBody());
        questionAnswerResponseDto.setAccepted(answer.isAccepted());
        questionAnswerResponseDto.setCreationDate(answer.getCreationDate());
        questionAnswerResponseDto.setLastEditDate(answer.getLastEditDate());

        return questionAnswerResponseDto;
    }



}
