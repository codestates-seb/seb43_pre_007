package com.codestates.answer.mapper;

import com.codestates.answer.dto.AnswerDto;
import com.codestates.answer.entity.Answer;
import com.codestates.question.entity.Question;
import com.codestates.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    default Answer answerPostDtoToAnswer(AnswerDto.Post answerPostDto) {
        if ( answerPostDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        User user = new User();
        user.setUserId(answerPostDto.getUserId());
        answer.setUser(user);

        Question question = new Question();
        question.setQuestionId(answerPostDto.getQuestionId());
        answer.setQuestion(question);

        answer.setBody( answerPostDto.getBody() );

        return answer;
    }
    Answer answerPatchDtoToAnswer(AnswerDto.Patch answerPatchDto);
}
