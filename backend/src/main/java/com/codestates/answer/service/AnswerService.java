package com.codestates.answer.service;

import com.codestates.answer.entity.Answer;
import com.codestates.answer.repository.AnswerRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.question.entity.Question;
import com.codestates.question.service.QuestionService;
import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final UserService userService;

    public AnswerService(AnswerRepository answerRepository,
                         QuestionService questionService,
                         UserService userService) {
        this.answerRepository = answerRepository;
        this.questionService = questionService;
        this.userService = userService;
    }

    public Answer createAnswer(Answer answer) {
        //TODO: 있는 유저인지 확인
        //TODO: 있는 질문인지 확인

        // 이부분을 안해주면 user의 displayName이 null값으로 나온다. 왜지 영속성 컨텍스트와 관련이 있을까?
        long userId = answer.getUser().getUserId();
        User user = userService.findUser(userId);

        answer.setUser(user);

        // 답변 달리면 질문의 답변 카운트+1
        Question findquestion = questionService.findQuestion(answer.getQuestion().getQuestionId());
        int updateAnswerCount = findquestion.getAnswerCount() + 1;
        findquestion.setAnswerCount(updateAnswerCount);

        // 답변이 처음 달리면 질문의 isAnswerd를 false에서 true로
        if(findquestion.isAnswered() == false) findquestion.setAnswered(true);
        questionService.updateQuestion(findquestion);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {

        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getBody())
                .ifPresent(answerBody -> findAnswer.setBody(answerBody));

        findAnswer.setLastEditDate(LocalDateTime.now());


        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long answerId) {


        return findVerifiedAnswer(answerId);
    }

    public void deleteAnswer(long answerId) {

        Answer findAnswer = findVerifiedAnswer(answerId);

        // 답변 삭제하면 질문의 답변 카운트-1
        Question findquestion = questionService.findQuestion(findAnswer.getQuestion().getQuestionId());
        int updateAnswerCount = findquestion.getAnswerCount() - 1;
        findquestion.setAnswerCount(updateAnswerCount);

        // 마지막 하나 남은 답변이 삭제되면 isAnswerd를 true에서 false로
        if(findquestion.getAnswerCount() == 0) findquestion.setAnswered(false);
        questionService.updateQuestion(findquestion);

        answerRepository.delete(findAnswer);
    }

    private Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }
}
