package com.codestates.tag.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.question.entity.QuestionTag;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.repository.TagRepository;
import com.codestates.user.entity.UserTag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;


    // [태그조회] : 태그를 클릭하면 해당태그를 사용한 질문목록 페이지로 넘어감.
    public Page<QuestionTag> findTag(int page, int size, long tagId) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("tagId").descending());
        Tag tag = findVerifyTags(tagId);
        tag.setTagId(tagId);

        List<QuestionTag> questions = tag.getQuestionTagList()
                .stream()
                .filter(q->!q.getQuestion().getTags().contains(tagId))
                .collect(Collectors.toList());

        if(questions == null || questions.isEmpty()){
            return new PageImpl<>(new ArrayList<>(),pageable,0);
        }

        return new PageImpl<>(questions,pageable,questions.size());
      }


    // [태그전체조회]
    public Page<Tag> findTags(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("tagId").descending());
        return tagRepository.findAll(pageable);
    }


    // [태그존재여부]
    public Tag findVerifyTags(long tagId) {
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






//    질문등록시 필요한 태그생성 로직
//    public Tag createTag(Tag tag){
//        if(tagRepository.findById(tag.getTagId()) == null){return null;}//1개 이상, 5개 이하, 태그를 입력하세요
//        else {
//            QuestionTag question = new QuestionTag();
//            question.getTag().setName(tag.getName());
//            return tagRepository.save(question.getTag());
//        }
//    }
