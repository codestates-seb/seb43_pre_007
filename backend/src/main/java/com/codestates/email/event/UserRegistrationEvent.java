package com.codestates.email.event;

import com.codestates.user.entity.User;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class UserRegistrationEvent extends ApplicationEvent {
    private User user;

    public UserRegistrationEvent(Object source, User user) {
        super(source);
        this.user = user;
    }
}
