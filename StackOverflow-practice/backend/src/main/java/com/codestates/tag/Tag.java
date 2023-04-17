package com.codestates.tag;

import com.codestates.question.entity.Question;
import com.codestates.question.entity.QuestionTag;
import com.codestates.user.entity.UserTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tagId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String info;

    @OneToMany
    private List<QuestionTag> questionTagList = new ArrayList<>();

    @OneToMany
    private List<UserTag> userTagList = new ArrayList<>();



}
