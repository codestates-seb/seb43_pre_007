package com.codestates.dto;

import com.codestates.tag.dto.OneTagResponseDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NonNull;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CustomResponseDto {
    @NonNull
    private String name;
    @NonNull
    private String info;
    private List<OneTagResponseDto> data;
    private PageInfo pageInfo;

    public CustomResponseDto(String name, String info, List<OneTagResponseDto> data, Page page) {
        this.name = name;
        this.info = info;
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber()+1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());

    }
}

