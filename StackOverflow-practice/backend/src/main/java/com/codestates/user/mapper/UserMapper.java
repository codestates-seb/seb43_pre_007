package com.codestates.user.mapper;

import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    User userPostDtoToMember(UserDto.PostDto requestBody);
    User userPatchDtoToUser(UserDto.PatchDto requestBody);
    UserDto.UserResponseDto userToUserResponseDto(User user);
    UserDto.UserGetResponseDto userToUserGetResponseDto(User user);
    UserDto.UserGetResponseDtos userToUserGetResponseDtos(List<User> userList);
}
