package com.codestates.user.controller;

import com.codestates.dto.MultiResponseDto;
import com.codestates.user.dto.UsersAllResponseDtos;
import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.User;
import com.codestates.user.mapper.UserMapper;
import com.codestates.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    // [회원등록]
    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserDto.PostDto requestBody){
        User user = userMapper.userPostDtoToMember(requestBody);
        User createdUser = userService.createUser(user);

        return new ResponseEntity<>(userMapper.userToUserResponseDto(createdUser), HttpStatus.CREATED);
    }


    // [회원프로필 수정]
    @PatchMapping("/{user-id}/edit")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive long userId,
                                    @Valid @RequestBody UserDto.PatchDto requestBody){
        User user = userService.updateUser(userMapper.userPatchDtoToUser(requestBody.addUserId(userId)));
        return new ResponseEntity<>(userMapper.userToUserResponseDto(user),HttpStatus.OK);
    }

    // [회원조회]
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive long userId){
        User user = userService.findUser(userId);
        return new ResponseEntity<>(userMapper.userToUserGetResponseDto(user), HttpStatus.OK);
    }

    // [전체회원조회]
    @GetMapping
    public ResponseEntity getUsers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size){
        Page<User> userPage = userService.findUsers(page-1,size);
        List<User> userList = userPage.getContent();
        List<UsersAllResponseDtos> usersAllResponseDtos = userMapper.userToUsersAllResponseDtos(userList);

        return new ResponseEntity<>(
                new MultiResponseDto<>(usersAllResponseDtos,userPage),HttpStatus.OK);
    }

    //회원탈퇴
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive long userId){
        userService.removeUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
