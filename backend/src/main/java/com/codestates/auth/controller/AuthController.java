package com.codestates.auth.controller;

import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JwtTokenizer jwtTokenizer;

    public AuthController(UserService userService, JwtTokenizer jwtTokenizer) {
        this.userService = userService;
        this.jwtTokenizer = jwtTokenizer;
    }

    @GetMapping
    public ResponseEntity<UserDto.UserAuthDto> getCurrentUser(HttpServletRequest request){

        String token = request.getHeader("Authorization").replace("Bearer ","");
        String secretKey = jwtTokenizer.getSecretKey();
        String key = jwtTokenizer.encodeBase64SecretKey(secretKey);

        Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
        String userId = String.valueOf(claims.get("userId", Integer.class));

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
