package com.codestates.__auth.auth;

import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserDto.UserAuthDto> getCurrentUser(HttpServletRequest request){
        String userId = request.getUserPrincipal().getName();

        User user = userService.findUser(Long.parseLong(userId));
        UserDto.UserAuthDto authDto = convertToDto(user);

        return ResponseEntity.ok(authDto);
    }

    private UserDto.UserAuthDto convertToDto(User user) {
        UserDto.UserAuthDto authDto = new UserDto.UserAuthDto();
        authDto.setUserId(user.getUserId());
        authDto.setDisplayName(user.getDisplayName());
        authDto.setImageUrl(user.getImageUrl());
        return authDto;
    }
}
