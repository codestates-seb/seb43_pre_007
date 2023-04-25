package com.codestates.tag.controller;

import com.codestates.dto.CustomResponseDto;
import com.codestates.dto.MultiResponseDto;
import com.codestates.question.entity.QuestionTag;
import com.codestates.tag.dto.OneTagResponseDto;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;


@Slf4j
@Validated
@RestController
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;
    private final TagMapper tagMapper;

    public TagController(TagService tagService, TagMapper tagMapper) {
        this.tagService = tagService;
        this.tagMapper = tagMapper;
    }

    //태그조회
    @GetMapping("/{tag-id}")
    public ResponseEntity getTag(@Positive @RequestParam("page") int page,
                                 @Positive @RequestParam("size") int size,
                                 @Positive @PathVariable("tag-id") long tagId) {

        Page<QuestionTag> questionPage = tagService.findTag(page - 1, size, tagId);
        List<QuestionTag> questionList = questionPage.getContent();

        List<OneTagResponseDto> tagResponseDtoList = tagMapper.tagToTagResponseDto(questionList);

//        MultiResponseDto data = new MultiResponseDto(tagResponseDtoList, questionPage);
        Tag tag = tagService.findVerifyTags(tagId);
        String name = tag.getName();
        String info = tag.getInfo();

        CustomResponseDto responseDto = new CustomResponseDto(name,info,tagResponseDtoList,questionPage);


        //컴파일에러 검색
        //if 문 추가해서 null 값 안뜨게 처리
        //responseDto 필드 한겹 벗기
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }



    //태그전체조회
    @GetMapping
    public ResponseEntity getTags(@Positive @RequestParam("page") int page,
                                  @Positive @RequestParam("size") int size){
        Page<Tag> tagPage = tagService.findTags(page-1,size);
        List<Tag> tagList = tagPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(tagMapper.tagToTagResponseDtos(tagList),tagPage),HttpStatus.OK);
    }
}
