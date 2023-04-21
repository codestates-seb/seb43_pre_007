package com.codestates.tag.controller;

import com.codestates.dto.MultiResponseDto;
import com.codestates.question.entity.QuestionTag;
import com.codestates.tag.dto.TagDto;
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
    public ResponseEntity getTag(@Positive@PathVariable long tagId,
                                 @Positive @RequestParam("page") int page,
                                 @Positive @RequestParam("size") int size){
        Page<QuestionTag> tagPage = tagService.findTag(tagId, page-1, size);
        List<QuestionTag> tagList = tagPage.getContent();
        List<TagDto.ResponseDto> responseDtos = tagMapper.tagToTagResponseDto(tagList);
        return new ResponseEntity<>(
                new MultiResponseDto<>(responseDtos, tagPage), HttpStatus.OK);
    }

    //태그전체조회
    @GetMapping
    public ResponseEntity getTags(@Positive @RequestParam int page,
                                  @Positive @RequestParam int size){
        Page<Tag> tagPage = tagService.findTags(page,size);
        List<Tag> tagList = tagPage.getContent();
        List<TagDto.ResponseDtos> responseDtos = tagMapper.tagsToTagResponseDtos(tagList);
        return new ResponseEntity<>(
                new MultiResponseDto<>(responseDtos,tagPage),HttpStatus.OK);
    }
}
