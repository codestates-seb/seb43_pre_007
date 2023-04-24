package com.codestates.answer.controller;

import com.codestates.answer.dto.AnswerDto;
import com.codestates.answer.mapper.AnswerMapper;
import com.codestates.answer.service.AnswerService;
import com.codestates.question.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Map;


@RestController
@RequestMapping("/answers")
@Validated
public class AnswerController {

    private final static String Answer_DEFAULT_URL = "/answers";
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    private final QuestionService questionService;

    public AnswerController(AnswerService answerService,
                            AnswerMapper mapper,
                            QuestionService questionService) {
        this.answerService = answerService;
        this.mapper = mapper;
        this.questionService = questionService;
    }

    @PostMapping("/add")
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post answerPostDto,
                                     Authentication authentication) {
        Map<String,Object> principal = (Map) authentication.getPrincipal();
        long userId = ((Number) principal.get("userId")).longValue();

        //질문작성자가 답변을 작성할 경우
        long findUserId = questionService.findQuestion(answerPostDto.getQuestionId()).getUser().getUserId();
        if(userId == findUserId) return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        answerPostDto.setUserId(userId);
        answerService.createAnswer(mapper.answerPostDtoToAnswer(answerPostDto)); //리턴 값 필요없음

        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @PatchMapping("/{answer-id}/edit")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                        @Valid @RequestBody AnswerDto.Patch answerPatchDto,
                                      Authentication authentication) {
        Map<String,Object> principal = (Map) authentication.getPrincipal();
        long userId = ((Number) principal.get("userId")).longValue();

        //답변작성자가 아닌 사용자가 답변 수정 요청을 했을 경우
        long findUserId = answerService.findAnswer(answerId).getUser().getUserId();
        if(userId != findUserId) return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        answerPatchDto.setAnswerId(answerId);
        answerService.updateAnswer(mapper.answerPatchDtoToAnswer(answerPatchDto)); //리턴값 필요없음

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId,
                                       Authentication authentication) {
        Map<String,Object> principal = (Map) authentication.getPrincipal();
        long userId = ((Number) principal.get("userId")).longValue();

        //답변작성자가 아닌 사용자가 답변 수정 요청을 했을 경우
        long findUserId = answerService.findAnswer(answerId).getUser().getUserId();
        if(userId != findUserId) return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
