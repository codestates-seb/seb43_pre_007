package com.codestates.user.service;

//import com.codestates.event.UserRegistrationEvent;
import com.codestates.answer.entity.Answer;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.question.entity.Question;
import com.codestates.user.entity.User;
import com.codestates.user.repository.UserRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       ApplicationEventPublisher publisher,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
    }

    // [회원등록]
    public User createUser(User user) {
        verifyExistsEmail(user.getEmail());

        // 회원가입시, 사용자 password 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        User saveUser = userRepository.save(user);

        // 신규회원등록시 인증 이메일전송을 위한 event 발생로직
        //publisher.publishEvent(new UserRegistrationEvent(this,saveUser));
        return saveUser;
    }


    // [회원프로필수정]
    public User updateUser(User user) {

        User findUser = findVerifiedUser(user.getUserId());
        Optional.ofNullable(user.getDisplayName())
                .ifPresent(displayName->findUser.setDisplayName(displayName));
        Optional.ofNullable(user.getAboutMe())
                .ifPresent(aboutMe->findUser.setAboutMe(aboutMe));
        Optional.ofNullable(user.getLocation())
                .ifPresent(location->findUser.setLocation(location));
        Optional.ofNullable(user.getImageUrl())
                .ifPresent(imageUrl->findUser.setImageUrl(imageUrl));

        //questionCount 정보를 user 의 questionCount 필드에 불러오기
        findUser.setQuestionCount(getQuestionCount(user.getUserId()));
        findUser.setAnswerCount(getAnswerCount(user.getUserId()));

        return userRepository.save(findUser);
    }


    // 회원조회
    public User findUser(long userId){
       User user = findVerifiedUser(userId);
       user.setQuestionCount(getQuestionCount(user.getUserId()));
       user.setAnswerCount(getAnswerCount(user.getUserId()));
       return user;
    }


    // 전체회원조회(우선 id 기준 정렬)
    public Page<User> findUsers(int page, int size) {
        Page<User> users =  userRepository.findAll(PageRequest.of(page,size, Sort.by("userId").descending()));
        List<User> userList = users.getContent();
        List<User> updatedList = new ArrayList<>();

        for(User user : userList){
//            int questionCount = questionRepository.countByUserId(user.getUserId());
            int questionCount = getQuestionCount(user.getUserId());
            int answerCount = getAnswerCount(user.getUserId());
            user.setQuestionCount(questionCount);
            user.setAnswerCount(answerCount);
            updatedList.add(user);
        }
        return new PageImpl<>(updatedList, users.getPageable(), users.getTotalElements());
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


    // questionCount 정보불러오기
    private int getQuestionCount(long userId){
        Optional<User> findUser = userRepository.findById(userId);
        if(findUser.isPresent()){
            User user = findUser.get();
            List<Question> questionList = user.getQuestions();

            return questionList.size();

        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }


    private int getAnswerCount(long userId){
        Optional<User> findUser = userRepository.findById(userId);
        if(findUser.isPresent()){
            User user = findUser.get();
            List<Answer> answerList = user.getAnswers();

            return answerList.size();

        } else {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }

    // 이메일인증 실패시 가입전으로 롤백할때 user 정보 삭제
    public void deleteUser(long userId) {
        User user = findVerifiedUser(userId);
        userRepository.delete(user);
    }


//    // 로그인요청의 email 로 User 객체반환 (로그인요청시 JWT 토큰정보와 user DB 비교를위해 필요)
//    public User findUserEmail(LoginDto loginDto) {
//        String email = loginDto.getEmail();
//        Optional<User> optionalUser = userRepository.findByEmail(email);
//
//        if(optionalUser.isEmpty()){
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//        User user = optionalUser.get();
//        String password = loginDto.getPassword();
//
//        if(!password.equals(user.getPassword())){ //Error 리스폰스 적용해야합니다.
//            throw new BusinessLogicException(ExceptionCode.USER_EXIST); //일단 임시응답
//        }
//        return user;
//    }
}
