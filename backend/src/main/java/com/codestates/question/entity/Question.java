package com.codestates.question.entity;

import com.codestates.answer.entity.Answer;
import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//TODO : Entity 작성

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private boolean isAnswered;

    @Column(nullable = false)
    private boolean isAccepted;
    @Column
    private int viewCount;

    @Column
    private int answerCount;

    @Column(nullable = false)
    private LocalDateTime creationDate = LocalDateTime.now();;

    @Column(nullable = false)
    private LocalDateTime lastEditDate = LocalDateTime.now();;

    @OneToMany(mappedBy = "question")
    private List<QuestionTag> tags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers;



}
