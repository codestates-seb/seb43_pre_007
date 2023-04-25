package com.codestates.user.entity;

import com.codestates.answer.entity.Answer;
import com.codestates.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column
    private String aboutMe;

    @Column
    private String location;

    @Column
    private String imageUrl;

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
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserTag> userTagLists = new ArrayList<>();



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
