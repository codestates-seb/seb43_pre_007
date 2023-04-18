package com.codestates.user.mapper;

import com.codestates.user.dto.UserDto;
import com.codestates.user.dto.UsersTagDto;
import com.codestates.user.entity.User;
import com.codestates.user.entity.UserTag;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import static com.codestates.user.entity.User.UserStatus.USER_DELETED;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToMember(UserDto.PostDto requestBody);
    User userPatchDtoToUser(UserDto.PatchDto requestBody);
    UserDto.UserResponseDto userToUserResponseDto(User user);
    UserDto.UserGetResponseDto userToUserGetResponseDto(User user);

    //회원전체조회에서 사용
    List<UserDto.UsersGetResponseDtos> userToUserGetResponseDtos(List<User> userList);

    //회원전체조회에서 리턴하는 DTO 필드 중 tag 리스트를 매핑하는 리스트
    default List<UsersTagDto.UserTagResponseDto> userTagsToDto(List<UserTag> userTagList){
        return userTagList
                .stream()
                .map(tag-> UsersTagDto.UserTagResponseDto
                        .builder()
                        .name(userTagList.toString())
                        .build())
                .collect(Collectors.toList());
    }
}

