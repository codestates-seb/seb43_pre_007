package com.codestates.question.mapper;

import com.codestates.answer.entity.Answer;
import com.codestates.question.dto.QuestionAnswerResponseDto;
import com.codestates.question.dto.QuestionDto.GETALLResponse;
import com.codestates.question.dto.QuestionDto.Patch;
import com.codestates.question.dto.QuestionTagDto;
import com.codestates.question.entity.Question;
import com.codestates.question.entity.QuestionTag;
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
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public List<QuestionTag> questionTagDtoListToQuestionTagList(List<QuestionTagDto> list) {
        if ( list == null ) {
            return null;
        }

        List<QuestionTag> list1 = new ArrayList<QuestionTag>( list.size() );
        for ( QuestionTagDto questionTagDto : list ) {
            list1.add( questionTagDtoToQuestionTag( questionTagDto ) );
        }

        return list1;
    }

    @Override
    public Question questionPatchDtoToQuestion(Patch questionPatchDto) {
        if ( questionPatchDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionId( questionPatchDto.getQuestionId() );
        question.setTitle( questionPatchDto.getTitle() );
        question.setBody( questionPatchDto.getBody() );
        question.setTags( questionTagDtoListToQuestionTagList( questionPatchDto.getTags() ) );

        return question;
    }

    @Override
    public List<GETALLResponse> questionsToQuestionGETALLResponseDtos(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<GETALLResponse> list = new ArrayList<GETALLResponse>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToGETALLResponse( question ) );
        }

        return list;
    }

    @Override
    public List<QuestionTagDto> questionTagListToQuestionTagDtoList(List<QuestionTag> list) {
        if ( list == null ) {
            return null;
        }

        List<QuestionTagDto> list1 = new ArrayList<QuestionTagDto>( list.size() );
        for ( QuestionTag questionTag : list ) {
            list1.add( questionTagToquestionTagDto( questionTag ) );
        }

        return list1;
    }

    @Override
    public List<QuestionAnswerResponseDto> answerListToQuestionAnswerResponseDtoList(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<QuestionAnswerResponseDto> list = new ArrayList<QuestionAnswerResponseDto>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToquestionAnswerResponseDto( answer ) );
        }

        return list;
    }
}
