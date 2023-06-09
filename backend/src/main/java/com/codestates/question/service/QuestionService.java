package com.codestates.question.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.question.dto.QuestionUserResponseDto;
import com.codestates.question.entity.Question;
import com.codestates.question.entity.QuestionTag;
import com.codestates.question.repository.QuestionRepository;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.repository.TagRepository;
import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final TagRepository tagRepository;
    private final UserService userService;

    public QuestionService(QuestionRepository questionRepository,
                           TagRepository tagRepository,
                           UserService userService) {
        this.questionRepository = questionRepository;
        this.tagRepository =tagRepository;
        this.userService = userService;
    }

    public Question createQuestion(Question question) {

        //TODO: 있는 유저인지 확인

        // 이부분을 안해주면 user의 displayName이 null값으로 나온다. 왜지 영속성 컨텍스트와 관련이 있을까?
        long userId = question.getUser().getUserId();
        User user = userService.findUser(userId);
        question.setUser(user);

        //questionTag 해결
        List<QuestionTag> questionTags = question.getTags()
                .stream().map(questionTag ->{
                    String tagName = questionTag.getTag().getName();
                    Optional<Tag> optionalTag = tagRepository.findByName(tagName);

                    if(optionalTag.isPresent()) questionTag.setTag(optionalTag.get());
                    else{
                        questionTag.getTag().setInfo("Newly added tags require a description");
                        Tag newTag = tagRepository.save(questionTag.getTag());
                        questionTag.setTag(newTag);
                    }
                    return questionTag;
                }).collect(Collectors.toList());
        question.setTags( questionTags );

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(questionTitle -> findQuestion.setTitle(questionTitle));
        Optional.ofNullable(question.getBody())
                .ifPresent(questionBody -> findQuestion.setBody(questionBody));
        Optional.ofNullable(question.getTags())
                .ifPresent(questionTagList -> findQuestion.setTags(questionTagList));
        findQuestion.setLastEditDate(LocalDateTime.now());


        return questionRepository.save(findQuestion);
    }

    public Question findQuestion(long questionId) {

        Question findQuestion = questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        // 조회수 기능
        int updateViewCount = findQuestion.getViewCount() + 1;
        findQuestion.setViewCount(updateViewCount);
        Question updateQuestion = questionRepository.save(findQuestion);

        return updateQuestion;
    }

    public Page<Question> findQuestions(int page, int size) {

        return questionRepository.findAll(PageRequest.of(page, size,
                Sort.by("questionId").descending()));
    }

    public void deleteQuestion(long questionId) {

        Question findQuestion = findQuestion(questionId);

        questionRepository.delete(findQuestion);
    }

    private Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }


}
