package com.codestates.__event;

import com.codestates.user.entity.User;
import lombok.Getter;

@Getter
public class UserRegistrationEvent {
    private User user;
    public UserRegistrationEvent(User user) {
        this.user = user;
    }
}
