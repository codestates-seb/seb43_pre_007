package com.codestates.tag.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.question.entity.QuestionTag;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.repository.TagRepository;
import com.codestates.user.entity.UserTag;
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

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
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


    // [태그조회] : 태그를 클릭하면 해당태그를 사용한 질문목록 페이지로 넘어감.
    public Page<QuestionTag> findTag(long tagId, int page, int size) {
        //1. DB에서 태그찾기
        //2. 질문에 사용된 태그를 저장하는 questionTag 페이지 가져오기
        //3. 페이지의 컨텐츠 List로 저장
        findVerifyTags(tagId);
        Page<Tag> questionPage =tagRepository.findAll(PageRequest.of(page, size));
        List<Tag> questionTagList = questionPage.getContent();

        questionTagList.stream().filter(q->!q.getQuestionTagList().contains(tagId))
                .collect(Collectors.toList());

        questionPage = new PageImpl<>(questionTagList,questionPage.getPageable(),questionTagList.size());

        List<QuestionTag> questionTags = questionTagList.stream().map(tag->{
            QuestionTag questionTag = new QuestionTag();
            questionTag.getTag().setName(tag.getName());
        return questionTag; })
                .collect(Collectors.toList());

        return new PageImpl<>(questionTags,questionPage.getPageable(),questionPage.getTotalElements());
      }


    // [태그전체조회]
    public Page<Tag> findTags(int page, int size) {
        Page<Tag> tagPage = tagRepository.findAll(PageRequest.of(page,size, Sort.by("tagId").descending()));
        List<Tag> tagList = tagPage.getContent();

        return tagPage = new PageImpl<>(tagList,tagPage.getPageable(),tagList.size());
    }


    // [태그존재여부]
    private Tag findVerifyTags(long tagId) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        Tag findTag = optionalTag.orElseThrow(()-> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return findTag;
    }

    // [postCount 증가]
    private void increamentPostCount(UserTag tag){
        if(tag.getUser().getQuestions().contains(tag.getTag().getName())){
            tag.setPostsCount(tag.getPostsCount()+1);
        }
    }
}
