package com.codestates.user.mapper;

import com.codestates.user.dto.UserDto.PatchDto;
import com.codestates.user.dto.UserDto.PostDto;
import com.codestates.user.dto.UserDto.UserResponseDto;
import com.codestates.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-25T14:23:00+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.19 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToMember(PostDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setDisplayName( requestBody.getDisplayName() );
        user.setEmail( requestBody.getEmail() );
        user.setPassword( requestBody.getPassword() );

        return user;
    }

    @Override
    public User userPatchDtoToUser(PatchDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setUserId( requestBody.getUserId() );
        user.setDisplayName( requestBody.getDisplayName() );
        user.setAboutMe( requestBody.getAboutMe() );
        user.setLocation( requestBody.getLocation() );

        return user;
    }

    @Override
    public UserResponseDto userToUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setUserId( user.getUserId() );
        userResponseDto.setDisplayName( user.getDisplayName() );
        userResponseDto.setEmail( user.getEmail() );
        userResponseDto.setAboutMe( user.getAboutMe() );
        userResponseDto.setLocation( user.getLocation() );
        userResponseDto.setCreationDate( user.getCreationDate() );
        userResponseDto.setLastModifiedDate( user.getLastModifiedDate() );
        userResponseDto.setQuestionCount( user.getQuestionCount() );
        userResponseDto.setAnswerCount( user.getAnswerCount() );

        return userResponseDto;
    }
}
