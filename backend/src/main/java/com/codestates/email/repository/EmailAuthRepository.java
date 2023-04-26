package com.codestates.email.repository;

import com.codestates.email.entity.EmailAuth;

import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailAuthRepository {
    Optional<EmailAuth> findAuthByEmail(String email, String authToken, LocalDateTime currentTime);
}
