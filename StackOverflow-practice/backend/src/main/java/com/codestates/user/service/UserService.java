package com.codestates.user.service;

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

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        Optional.ofNullable(findUser.getAboutMe())
                .ifPresent(aboutMe->findUser.setAboutMe(aboutMe));
        Optional.ofNullable(findUser.getLocation())
                .ifPresent(location->findUser.setLocation(location));

        return userRepository.save(findUser);
    }

    // 회원조회
    public User findUser(long userId){
       User findUser = findVerifiedUser(userId);
       return findUser;
    }

    // 전체회원조회(우선 id 기준 정렬)
    public Page<User> findUsers(int size, int page) {
        return userRepository.findAll(PageRequest.of(size,page, Sort.by("userId").descending()));
    }

    // 회원탈퇴 (삭제버전)
    public void deleteUser(long userId){
        User user = findVerifiedUser(userId);
        userRepository.delete(user);
    }

    // 회원탈퇴 (탈퇴상태버전)
    public void removeUser(long userId){
        User user = findVerifiedUser(userId);
        user.setUserStatus(User.UserStatus.USER_DELETED);
        userRepository.save(user);
    }


    // 이미 등록된 이메일인지 확인
    private void verifyExistsEmail(String email) {
        userRepository.findByEmail(email);
    }

    // 존재하는 회원인지 확인
    private User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findUser;
    }
}
