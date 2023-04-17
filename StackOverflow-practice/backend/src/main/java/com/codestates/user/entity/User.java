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
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String aboutMe;

    @Column
    private String location;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    private LocalDateTime lastModifiedDate;

    @Column
    private int questionCount;

    @Column
    private int answerCount;

    @OneToMany(mappedBy = "user")
    private List<Question> question;

    @OneToMany(mappedBy = "user")
    private List<Answer> answer;

    @OneToMany(mappedBy = "user")
    private List<UserTag> userTagList = new ArrayList<>();




    public enum UserType{
        REGISTERED("등록된 회원");

        @Getter
        private String status;

        UserType(String status) {
            this.status = status;
        }
    }


}
