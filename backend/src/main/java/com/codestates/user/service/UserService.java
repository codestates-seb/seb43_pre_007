package com.codestates.user.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.question.repository.QuestionRepository;
import com.codestates.user.entity.User;
import com.codestates.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    public UserService(UserRepository userRepository, QuestionRepository questionRepository) {
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
    }

    // 회원등록
    public User createUser(User user) {
        verifyExistsEmail(user.getEmail());
        return userRepository.save(user);
    }

    // 회원프로필수정
    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());
        Optional.ofNullable(findUser.getDisplayName())
                .ifPresent(displayName->findUser.setDisplayName(displayName));
        Optional.ofNullable(user.getAboutMe())
                .ifPresent(aboutMe->findUser.setAboutMe(aboutMe));
        Optional.ofNullable(user.getLocation())
                .ifPresent(location->findUser.setLocation(location));

        return userRepository.save(findUser);
    }

    // 회원조회
    public User findUser(long userId){
       User user = findVerifiedUser(userId);
       return user;
    }

    // 전체회원조회(우선 id 기준 정렬)
    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page,size, Sort.by("userId").descending()));
    }

    // 회원탈퇴
    public void removeUser(long userId){
        User user = findVerifiedUser(userId);
        user.setUserStatus(User.UserStatus.USER_DELETED);
        userRepository.save(user);
    }

    // 이미 등록된 이메일인지 확인
    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXIST);
    }

    // 존재하는 회원인지 확인
    private User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(()->new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        if(findUser.getUserStatus().equals(User.UserStatus.USER_DELETED)){
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
        return findUser;
    }
}
