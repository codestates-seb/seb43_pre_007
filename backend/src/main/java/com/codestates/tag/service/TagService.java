package com.codestates.tag.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.question.entity.Question;
import com.codestates.question.repository.QuestionRepository;
import com.codestates.question.service.QuestionService;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.repository.TagRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagService {
    private final TagRepository tagRepository;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;

    public TagService(TagRepository tagRepository, QuestionService questionService, QuestionRepository questionRepository) {
        this.tagRepository = tagRepository;
        this.questionService = questionService;
        this.questionRepository = questionRepository;
    }

//    질문등록시 필요한 태그생성 로직
//    public Tag createTag(Tag tag){
//        if(tagRepository.findById(tag.getTagId()) == null){return null;}//1개 이상, 5개 이하, 태그를 입력하세요
//        else {
//            QuestionTag question = new QuestionTag();
//            question.getTag().setName(tag.getName());
//            return tagRepository.save(question.getTag());
//        }
//    }


    public Page<Question> findTag(String name, int size, int page) {
        //1. DB에서 태그찾기
        //2. 질문에 사용된 태그를 저장하는 questionTag 페이지 가져오기
        //3. 페이지의 컨텐츠 List로 저장
        findVerifyTags(name);
        Page<Question> questionPage =questionRepository.findAll(PageRequest.of(page, size));
        List<Question> questionTagList = questionPage.getContent();
        questionTagList.stream().filter(q->!q.getTags().contains(name))
                .collect(Collectors.toList());

        questionPage = new PageImpl<>(questionTagList,questionPage.getPageable(),questionTagList.size());
        return questionPage;
    }

    //DB 에서 태그 찾기
    private Tag findVerifyTags(String name) {
        Optional<Tag> optionalTag = tagRepository.findByName(name);
        Tag findTag = optionalTag.orElseThrow(()-> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return findTag;
    }


    public Page<Tag> findTags(int size, int page) {
        return tagRepository.findAll(PageRequest.of(size,page, Sort.by("tagId").descending()));
    }
}
