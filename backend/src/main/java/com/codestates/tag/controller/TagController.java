package com.codestates.tag.controller;

import com.codestates.dto.MultiResponseDto;
import com.codestates.question.entity.Question;
import com.codestates.question.entity.QuestionTag;
import com.codestates.question.service.QuestionService;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.entity.Tag;
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
    @GetMapping("/{tags}")
    public ResponseEntity getTag(@PathVariable String tags,
                                 @Positive @RequestParam("size") int size,
                                 @Positive @RequestParam("page") int page){
        Page<QuestionTag> tagPage = tagService.findTag(tags, size, page-1);
        List<QuestionTag> tagList = tagPage.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(tagMapper.tagToTagResponseDto(tagList), tagPage), HttpStatus.OK);
    }

    //태그전체조회
    @GetMapping
    public ResponseEntity getTags(@Positive @RequestParam int size,
                                  @Positive @RequestParam int page){
        Page<Tag> tagPage = tagService.findTags(size, page-1);
        List<Tag> tagList = tagPage.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(tagMapper.tagsToTagResponseDtos(tagList),tagPage),HttpStatus.OK);
    }
}
