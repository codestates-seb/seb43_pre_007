package com.codestates.user.entity;

import com.codestates.answer.entity.Answer;
import com.codestates.question.entity.Question;
import com.codestates.question.entity.QuestionTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Table(name = "users")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String aboutMe;

    @Column
    private String location;

    @Column(name="CREATED_AT",nullable = false)
    private LocalDateTime creationDate;

    @Column(name="MODIFIED_AT",nullable = false)
    private LocalDateTime lastModifiedDate;

    @Column(nullable = false)
    private int questionCount;

    @Column(nullable = false)
    private int answerCount;

    @Column(name = "USER_STATUS")
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    @OneToMany(mappedBy = "user")
    private List<Question> question = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Answer> answer = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserTag> userTagList = new ArrayList<>();




    public enum UserStatus{
        USER_ACTIVE("활동 회원"),
        USER_DELETED("탈퇴 회원");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }

    @PrePersist
    public void prePersist() {
        this.creationDate = LocalDateTime.now();
        this.lastModifiedDate = LocalDateTime.now();
    }


}
