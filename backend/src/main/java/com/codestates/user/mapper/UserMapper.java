package com.codestates.user.mapper;

import com.codestates.answer.entity.Answer;
import com.codestates.question.entity.Question;
import com.codestates.user.dto.*;
import com.codestates.user.entity.User;
import com.codestates.user.entity.UserTag;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToMember(UserDto.PostDto requestBody);

    User userPatchDtoToUser(UserDto.PatchDto requestBody);

    UserDto.UserResponseDto userToUserResponseDto(User user);


    // [회원조회 : response]
    // 회원프로필 페이지에 필요한 user, question, answer, tag 정보를 매핑하는 로직
    default UserDto.UserGetResponseDto userToUserGetResponseDto(User user) {
        if (user == null) {
            return null;
        }
        UserDto.UserGetResponseDto userGetResponseDto = new UserDto.UserGetResponseDto();
        userGetResponseDto.setUserId(user.getUserId());
        userGetResponseDto.setDisplayName(user.getDisplayName());
        userGetResponseDto.setAboutMe(user.getAboutMe());
        userGetResponseDto.setLocation(user.getLocation());
        userGetResponseDto.setCreationDate(user.getCreationDate());
        userGetResponseDto.setQuestionCount(user.getQuestionCount());
        userGetResponseDto.setAnswerCount(user.getAnswerCount());
        userGetResponseDto.setQuestions(ToQuestionResponseDto(user.getQuestion()));
        userGetResponseDto.setAnswers(ToAnswerResponseDto(user.getAnswer()));
        userGetResponseDto.setTags(ToTagResponseDtos(user.getUserTagList()));
        return userGetResponseDto;
    }


    // [회원조회요청 : question]
    default List<UsersQuestionResponseDto> ToQuestionResponseDto(List<Question> question) {
        if (question == null) {
            return null;
        }
        List<UsersQuestionResponseDto> list = new ArrayList<UsersQuestionResponseDto>(question.size());
        for (Question question1 : question) {
            list.add(questionToQuestionResponseDto(question1));
        }
        return list;
    }

    // 응답시 question 부분을 매핑하는 로직 (score 후순위 구현예정으로 현재 빠짐)
    default UsersQuestionResponseDto questionToQuestionResponseDto(Question question) {
        if (question == null) {
            return null;
        }
        UsersQuestionResponseDto usersQuestionResponseDto = new UsersQuestionResponseDto();
        usersQuestionResponseDto.setQuestionId(question.getQuestionId());
        usersQuestionResponseDto.setTitle(question.getTitle());
        usersQuestionResponseDto.setCreationDate(question.getCreationDate());
        usersQuestionResponseDto.setAnswered(question.isAnswered());
        usersQuestionResponseDto.setAccepted(question.isAccepted());
        return usersQuestionResponseDto;
    }


    // [회원조회요청 : answers]
    default List<UsersAnswerResponseDto> ToAnswerResponseDto(List<Answer> answer) {
        if (answer == null) {
            return null;
        }
        List<UsersAnswerResponseDto> list = new ArrayList<UsersAnswerResponseDto>(answer.size());
        for (Answer answer1 : answer) {
            list.add(answerToUsersAnswerResponseDto(answer1));
        }
        return list;
    }

    //응답시 answer 부분을 매핑하는 로직
    default UsersAnswerResponseDto answerToUsersAnswerResponseDto(Answer answer) {
        UsersAnswerResponseDto responseDto = new UsersAnswerResponseDto();
        responseDto.setAnswerId(answer.getAnswerId());
        responseDto.setQuestionId(answer.getQuestion().getQuestionId());
        responseDto.setTitle(answer.getQuestion().getTitle());
        responseDto.setCreationDate(answer.getCreationDate());
        responseDto.setAccepted(answer.isAccepted());
        return responseDto;
    }


    // [회원조회요청 : tags]
    default List<UsersTagResponseDto.UserTagResponseDtos> ToTagResponseDtos(List<UserTag> userTagList) {
        if (userTagList == null) {
            return null;
        }
        List<UsersTagResponseDto.UserTagResponseDtos> list = new ArrayList<UsersTagResponseDto.UserTagResponseDtos>(userTagList.size());
        for (UserTag userTag : userTagList) {
            list.add(tagToTagResponseDtos(userTag));
        }
        return list;
    }

    //응답시 tag 부분을 매핑하는 로직
    default UsersTagResponseDto.UserTagResponseDtos tagToTagResponseDtos(UserTag tag) {
        UsersTagResponseDto.UserTagResponseDtos responseDto = new UsersTagResponseDto.UserTagResponseDtos();
        responseDto.setName(tag.getTag().getName());
        responseDto.setPostsCount(tag.getPostsCount());

        return responseDto;
    }


    // [회원전체조회 : response]
    default List<UsersAllResponseDtos> userToUsersAllResponseDtos(List<User> userList) {
        if (userList == null) {
            return null;
        }
        //🟡 이중으로 감싸진 data, 이부분 주석 1
        //   List<UserDto.UserGetResponseDtos> responseList = new ArrayList<>(userList.size());

        List<UsersAllResponseDtos> responseList = new ArrayList<>(userList.size());
        for (User user : userList) {
            UsersAllResponseDtos usersAllResponseDtos = new UsersAllResponseDtos();
            usersAllResponseDtos.setUserId(user.getUserId());
            usersAllResponseDtos.setDisplayName(user.getDisplayName());
            usersAllResponseDtos.setAboutMe(user.getAboutMe());
            usersAllResponseDtos.setLocation(user.getLocation());
            usersAllResponseDtos.setCreationDate(user.getCreationDate());
            usersAllResponseDtos.setQuestionCount(user.getQuestionCount());
            usersAllResponseDtos.setAnswerCount(user.getAnswerCount());
            usersAllResponseDtos.setTags(ToTagResponseDto(user.getUserTagList()));

//            UserDto.UserGetResponseDtos userGetResponseDtos = new UserDto.UserGetResponseDtos();
//            userGetResponseDtos.setData(allResponseDtos);

            //🟡 이부분 주석 2 해서 테스트해보자
            responseList.add(usersAllResponseDtos);
        }
        return responseList;
    }

    // [회원전체조회 : tagList]
    default List<UsersTagResponseDto.UserTagResponseDto> ToTagResponseDto(List<UserTag> userTagList) {
        if (userTagList == null) {return null;}

        List<UsersTagResponseDto.UserTagResponseDto> tags = new ArrayList<UsersTagResponseDto.UserTagResponseDto>(userTagList.size());
        for (UserTag userTag : userTagList) {
            tags.add(tagToTagResponseDto(userTag));
        }
        return tags;
    }

    // 회원전체조회에서 tagList 에 태그 네임정보를 담아주는 로직
    default UsersTagResponseDto.UserTagResponseDto tagToTagResponseDto(UserTag tag){
        UsersTagResponseDto.UserTagResponseDto responseDto = new UsersTagResponseDto.UserTagResponseDto();
        responseDto.setName(tag.getTag().getName());
        return responseDto;
    }
}